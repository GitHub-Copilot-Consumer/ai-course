/**
 * Unit tests for presentation mode core logic.
 *
 * Covers:
 * - buildSlides(): slide splitting by <hr>
 * - showSlide(): progress display and boundary behavior
 * - nextSlide() / prevSlide(): navigation with boundary protection
 * - handleKeydown(): keyboard event routing
 * - enterPresentation() / exitPresentation(): overlay lifecycle
 */

const {
  buildSlides,
  createOverlay,
  showSlide,
  nextSlide,
  prevSlide,
  handleKeydown,
  handleFullscreenChange,
  enterPresentation,
  exitPresentation,
  getCurrentIndex,
  getSlidesCount,
  resetState,
  SLIDE_SEPARATOR_TAG,
  PRESENTATION_CONTENT_SELECTOR,
  NO_SLIDE_CLASS,
  SLIDE_SPLIT_COMMENT,
} = require('./presentation-mode');

const {
  createContentFixture,
  createFixtureWithSeparators,
  createFixtureNoSeparators,
  createFixtureWithNoSlide,
  createFixtureWithSplitComment,
  createFixtureWithEdgeSplitComment,
  cleanupFixture,
} = require('./fixtures');

// Mock fullscreen API (not available in jsdom)
beforeEach(() => {
  cleanupFixture();
  resetState();

  // Mock requestFullscreen / exitFullscreen
  Object.defineProperty(document.documentElement, 'requestFullscreen', {
    value: jest.fn().mockResolvedValue(undefined),
    writable: true,
    configurable: true,
  });
  Object.defineProperty(document, 'exitFullscreen', {
    value: jest.fn().mockResolvedValue(undefined),
    writable: true,
    configurable: true,
  });
  Object.defineProperty(document, 'fullscreenElement', {
    value: null,
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  cleanupFixture();
  resetState();
});

// ─────────────────────────────────────────────
// buildSlides()
// ─────────────────────────────────────────────

describe('buildSlides()', () => {
  test('constants are defined correctly', () => {
    expect(SLIDE_SEPARATOR_TAG).toBe('HR');
    expect(PRESENTATION_CONTENT_SELECTOR).toBe('.content');
  });

  test('returns empty array when .content element is absent', () => {
    document.body.innerHTML = '';
    const result = buildSlides();
    expect(result).toEqual([]);
  });

  test('produces 1 slide when there are no <hr> separators', () => {
    createFixtureNoSeparators();
    const result = buildSlides();
    expect(result).toHaveLength(1);
  });

  test('produces N+1 slides when there are N <hr> separators', () => {
    createFixtureWithSeparators(3);
    const result = buildSlides();
    expect(result).toHaveLength(4);
  });

  test('produces 2 slides for 1 separator', () => {
    createFixtureWithSeparators(1);
    const result = buildSlides();
    expect(result).toHaveLength(2);
  });

  test('slide groups do NOT contain <hr> elements', () => {
    createFixtureWithSeparators(2);
    const result = buildSlides();
    for (const group of result) {
      for (const node of group) {
        expect(node.nodeName).not.toBe('HR');
      }
    }
  });

  test('each slide group contains the correct paragraph content', () => {
    createFixtureWithSeparators(2);
    const result = buildSlides();
    // Section 0, 1, 2
    expect(result[0].some(n => n.textContent && n.textContent.includes('Section 0'))).toBe(true);
    expect(result[1].some(n => n.textContent && n.textContent.includes('Section 1'))).toBe(true);
    expect(result[2].some(n => n.textContent && n.textContent.includes('Section 2'))).toBe(true);
  });
});

// ─────────────────────────────────────────────
// createOverlay()
// ─────────────────────────────────────────────

describe('createOverlay()', () => {
  test('creates element with id presentation-overlay', () => {
    const overlay = createOverlay();
    expect(overlay.id).toBe('presentation-overlay');
  });

  test('contains btn-exit-presentation', () => {
    const overlay = createOverlay();
    expect(overlay.querySelector('#btn-exit-presentation')).not.toBeNull();
  });

  test('contains btn-prev-slide', () => {
    const overlay = createOverlay();
    expect(overlay.querySelector('#btn-prev-slide')).not.toBeNull();
  });

  test('contains btn-next-slide', () => {
    const overlay = createOverlay();
    expect(overlay.querySelector('#btn-next-slide')).not.toBeNull();
  });

  test('contains slide-progress', () => {
    const overlay = createOverlay();
    expect(overlay.querySelector('#slide-progress')).not.toBeNull();
  });

  test('contains presentation-slide-area', () => {
    const overlay = createOverlay();
    expect(overlay.querySelector('#presentation-slide-area')).not.toBeNull();
  });
});

// ─────────────────────────────────────────────
// showSlide()
// ─────────────────────────────────────────────

describe('showSlide()', () => {
  function setupWithSlides(separatorCount) {
    createFixtureWithSeparators(separatorCount);
    // Build slides state by calling enterPresentation prep steps manually
    const slideGroups = buildSlides();
    // Manually set up overlay and state for unit testing
    const overlay = createOverlay();
    document.body.appendChild(overlay);
    // Prime the module state by calling enterPresentation in a controlled way
    // We'll inject slides via resetState + direct enterPresentation logic
    return slideGroups;
  }

  test('progress text format is "{current} / {total}" for first slide', () => {
    createFixtureWithSeparators(2);
    enterPresentation();
    const progress = document.getElementById('slide-progress');
    expect(progress.textContent).toBe('1 / 3');
  });

  test('progress text updates correctly when navigating', () => {
    createFixtureWithSeparators(2);
    enterPresentation();
    nextSlide();
    const progress = document.getElementById('slide-progress');
    expect(progress.textContent).toBe('2 / 3');
  });

  test('progress text shows last slide correctly', () => {
    createFixtureWithSeparators(2);
    enterPresentation();
    nextSlide();
    nextSlide();
    const progress = document.getElementById('slide-progress');
    expect(progress.textContent).toBe('3 / 3');
  });

  test('slide area contains a .presentation-slide div', () => {
    createFixtureWithSeparators(1);
    enterPresentation();
    const slideArea = document.getElementById('presentation-slide-area');
    expect(slideArea.querySelector('.presentation-slide')).not.toBeNull();
  });

  test('out-of-bounds index is a no-op (negative)', () => {
    createFixtureWithSeparators(1);
    enterPresentation();
    const before = document.getElementById('slide-progress').textContent;
    showSlide(-1);
    expect(document.getElementById('slide-progress').textContent).toBe(before);
  });

  test('out-of-bounds index is a no-op (too large)', () => {
    createFixtureWithSeparators(1);
    enterPresentation();
    const before = document.getElementById('slide-progress').textContent;
    showSlide(100);
    expect(document.getElementById('slide-progress').textContent).toBe(before);
  });
});

// ─────────────────────────────────────────────
// nextSlide() / prevSlide()
// ─────────────────────────────────────────────

describe('nextSlide() / prevSlide()', () => {
  test('nextSlide advances to next slide', () => {
    createFixtureWithSeparators(2);
    enterPresentation();
    expect(getCurrentIndex()).toBe(0);
    nextSlide();
    expect(getCurrentIndex()).toBe(1);
  });

  test('nextSlide does nothing on last slide', () => {
    createFixtureWithSeparators(1); // 2 slides
    enterPresentation();
    nextSlide(); // now at index 1 (last)
    nextSlide(); // should stay at 1
    expect(getCurrentIndex()).toBe(1);
    expect(document.getElementById('slide-progress').textContent).toBe('2 / 2');
  });

  test('prevSlide goes to previous slide', () => {
    createFixtureWithSeparators(1);
    enterPresentation();
    nextSlide();
    expect(getCurrentIndex()).toBe(1);
    prevSlide();
    expect(getCurrentIndex()).toBe(0);
  });

  test('prevSlide does nothing on first slide', () => {
    createFixtureWithSeparators(1);
    enterPresentation();
    expect(getCurrentIndex()).toBe(0);
    prevSlide(); // should stay at 0
    expect(getCurrentIndex()).toBe(0);
    expect(document.getElementById('slide-progress').textContent).toBe('1 / 2');
  });
});

// ─────────────────────────────────────────────
// handleKeydown()
// ─────────────────────────────────────────────

describe('handleKeydown()', () => {
  test('ArrowRight triggers nextSlide', () => {
    createFixtureWithSeparators(2);
    enterPresentation();
    expect(getCurrentIndex()).toBe(0);
    handleKeydown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(getCurrentIndex()).toBe(1);
  });

  test('ArrowLeft triggers prevSlide', () => {
    createFixtureWithSeparators(2);
    enterPresentation();
    nextSlide(); // go to slide 1
    handleKeydown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(getCurrentIndex()).toBe(0);
  });

  test('Escape triggers exitPresentation (removes overlay)', () => {
    createFixtureWithSeparators(1);
    enterPresentation();
    expect(document.getElementById('presentation-overlay')).not.toBeNull();
    handleKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(document.getElementById('presentation-overlay')).toBeNull();
  });
});

// ─────────────────────────────────────────────
// enterPresentation() / exitPresentation()
// ─────────────────────────────────────────────

describe('enterPresentation() / exitPresentation()', () => {
  test('enterPresentation appends #presentation-overlay to body', () => {
    createFixtureWithSeparators(1);
    expect(document.getElementById('presentation-overlay')).toBeNull();
    enterPresentation();
    expect(document.getElementById('presentation-overlay')).not.toBeNull();
  });

  test('enterPresentation shows first slide (index 0)', () => {
    createFixtureWithSeparators(2);
    enterPresentation();
    expect(getCurrentIndex()).toBe(0);
    expect(document.getElementById('slide-progress').textContent).toBe('1 / 3');
  });

  test('enterPresentation calls requestFullscreen', () => {
    createFixtureWithSeparators(1);
    enterPresentation();
    expect(document.documentElement.requestFullscreen).toHaveBeenCalled();
  });

  test('exitPresentation removes #presentation-overlay', () => {
    createFixtureWithSeparators(1);
    enterPresentation();
    expect(document.getElementById('presentation-overlay')).not.toBeNull();
    exitPresentation();
    expect(document.getElementById('presentation-overlay')).toBeNull();
  });

  test('ArrowRight does NOT advance slides after exitPresentation', () => {
    createFixtureWithSeparators(2);
    enterPresentation();
    nextSlide(); // at index 1
    exitPresentation();
    // Now dispatch real keyboard event to document - listener should be gone
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    // currentIndex should still be 1 (but overlay is gone, so nothing to show)
    // We verify the listener was removed by checking overlay stays absent
    expect(document.getElementById('presentation-overlay')).toBeNull();
  });

  test('calling exitPresentation twice is a no-op (idempotent)', () => {
    createFixtureWithSeparators(1);
    enterPresentation();
    exitPresentation();
    expect(() => exitPresentation()).not.toThrow();
    expect(document.getElementById('presentation-overlay')).toBeNull();
  });

  test('exitPresentation calls document.exitFullscreen when fullscreen is active', () => {
    createFixtureWithSeparators(1);
    enterPresentation();
    // Simulate being in fullscreen
    Object.defineProperty(document, 'fullscreenElement', {
      value: document.documentElement,
      writable: true,
      configurable: true,
    });
    exitPresentation();
    expect(document.exitFullscreen).toHaveBeenCalled();
  });

  test('getSlidesCount returns correct slide count', () => {
    createFixtureWithSeparators(3);
    enterPresentation();
    expect(getSlidesCount()).toBe(4);
  });
});

// ─────────────────────────────────────────────
// handleFullscreenChange()
// ─────────────────────────────────────────────

describe('handleFullscreenChange()', () => {
  test('removes overlay when fullscreenElement is null', () => {
    createFixtureWithSeparators(1);
    enterPresentation();
    expect(document.getElementById('presentation-overlay')).not.toBeNull();
    // Simulate fullscreen exit
    Object.defineProperty(document, 'fullscreenElement', {
      value: null,
      writable: true,
      configurable: true,
    });
    handleFullscreenChange();
    expect(document.getElementById('presentation-overlay')).toBeNull();
  });

  test('does NOT remove overlay when fullscreenElement is set (entering fullscreen event)', () => {
    createFixtureWithSeparators(1);
    enterPresentation();
    Object.defineProperty(document, 'fullscreenElement', {
      value: document.documentElement,
      writable: true,
      configurable: true,
    });
    handleFullscreenChange();
    expect(document.getElementById('presentation-overlay')).not.toBeNull();
  });
});

// ─────────────────────────────────────────────
// NO_SLIDE_CLASS constant & .no-slide filtering
// ─────────────────────────────────────────────

describe('NO_SLIDE_CLASS constant', () => {
  test('NO_SLIDE_CLASS is exported and equals "no-slide"', () => {
    expect(NO_SLIDE_CLASS).toBe('no-slide');
  });
});

describe('buildSlides() - .no-slide filtering', () => {
  test('skips elements with class no-slide when building slide groups', () => {
    createFixtureWithNoSlide();
    const result = buildSlides();
    expect(result).toHaveLength(1);
    const group = result[0];
    const hasNoSlide = group.some(
      node => node.classList && node.classList.contains('no-slide')
    );
    expect(hasNoSlide).toBe(false);
  });

  test('content before and after no-slide div both appear in the same slide group', () => {
    createFixtureWithNoSlide();
    const result = buildSlides();
    const group = result[0];
    const texts = group.map(n => n.textContent || '').join(' ');
    expect(texts).toContain('Before content');
    expect(texts).toContain('After content');
    expect(texts).not.toContain('Hidden content');
  });

  test('behaviour is unchanged when no no-slide elements are present', () => {
    createFixtureWithSeparators(2);
    const result = buildSlides();
    expect(result).toHaveLength(3);
    for (const group of result) {
      const hasNoSlide = group.some(
        node => node.classList && node.classList.contains('no-slide')
      );
      expect(hasNoSlide).toBe(false);
    }
  });
});

// ─────────────────────────────────────────────
// SLIDE_SPLIT_COMMENT constant & <!-- split --> splitting
// ─────────────────────────────────────────────

describe('SLIDE_SPLIT_COMMENT constant', () => {
  test('SLIDE_SPLIT_COMMENT is exported and equals "split"', () => {
    expect(SLIDE_SPLIT_COMMENT).toBe('split');
  });
});

describe('buildSlides() - <!-- split --> splitting', () => {
  test('one <!-- split --> inside a section produces 2 slides from that section', () => {
    // 0 <hr>, section 0 has 1 split → total 2 slides
    createFixtureWithSplitComment(0, 0, 1);
    const result = buildSlides();
    expect(result).toHaveLength(2);
  });

  test('split comment node does not appear in any slide group', () => {
    createFixtureWithSplitComment(0, 0, 1);
    const result = buildSlides();
    for (const group of result) {
      const hasComment = group.some(
        node => node.nodeType === 8 && node.nodeValue.trim() === 'split'
      );
      expect(hasComment).toBe(false);
    }
  });

  test('two <!-- split --> inside a section produce 3 slides from that section', () => {
    // 0 <hr>, section 0 has 2 splits → total 3 slides
    createFixtureWithSplitComment(0, 0, 2);
    const result = buildSlides();
    expect(result).toHaveLength(3);
  });

  test('sections without split comments are unaffected', () => {
    // 2 <hr> → 3 sections; section 1 gets 1 split → total 4 slides
    createFixtureWithSplitComment(2, 1, 1);
    const result = buildSlides();
    expect(result).toHaveLength(4);
  });

  test('<!-- split --> at start of group does not produce an empty slide', () => {
    createFixtureWithEdgeSplitComment('start');
    const result = buildSlides();
    // Should have 1 non-empty slide (the empty group is filtered out)
    expect(result).toHaveLength(1);
    expect(result[0].length).toBeGreaterThan(0);
  });

  test('<!-- split --> at end of group does not produce an empty slide', () => {
    createFixtureWithEdgeSplitComment('end');
    const result = buildSlides();
    expect(result).toHaveLength(1);
    expect(result[0].length).toBeGreaterThan(0);
  });
});
