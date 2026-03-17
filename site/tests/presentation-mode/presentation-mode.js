/**
 * Presentation Mode - Core Logic
 *
 * This module contains all presentation mode functionality.
 * It is included verbatim inside presentation-mode.html as an inline <script>.
 * It is also exported here so that Jest unit tests can import it directly.
 */

// --- Constants ---
const SLIDE_SEPARATOR_TAG = 'HR';
const PRESENTATION_CONTENT_SELECTOR = '.content';
const NO_SLIDE_CLASS = 'no-slide';
const SLIDE_SPLIT_COMMENT = 'split';

// --- State ---
let slides = [];
let currentIndex = 0;
let _savedBodyOverflow = '';

// --- Slide Building ---

/**
 * Returns true if a node group contains only whitespace text nodes (or is empty).
 * Used to filter out empty groups produced by edge-placed split comments.
 *
 * @param {Node[]} group
 * @returns {boolean}
 */
function isEmptyGroup(group) {
  if (group.length === 0) return true;
  return group.every(
    node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() === ''
  );
}

/**
 * Splits a single node array into sub-arrays using COMMENT_NODE markers whose
 * nodeValue (trimmed) equals SLIDE_SPLIT_COMMENT. The comment nodes themselves
 * are not included in any sub-array. Empty sub-arrays are filtered out.
 *
 * @param {Node[]} group
 * @returns {Node[][]} one or more sub-groups
 */
function splitGroupByComment(group) {
  const subGroups = [];
  let current = [];

  for (const node of group) {
    if (node.nodeType === Node.COMMENT_NODE && node.nodeValue.trim() === SLIDE_SPLIT_COMMENT) {
      subGroups.push(current);
      current = [];
    } else {
      current.push(node);
    }
  }
  subGroups.push(current);

  return subGroups.filter(g => !isEmptyGroup(g));
}

/**
 * Reads the DOM content area and splits it into slide arrays
 * using <hr> elements as boundaries. Within each <hr>-bounded section,
 * <!-- split --> comment nodes further divide the section into sub-slides.
 * Elements with class NO_SLIDE_CLASS are excluded from all slide groups.
 *
 * @returns {Array<Array<Node>>} array of node-groups, one per slide
 */
function buildSlides() {
  const container = document.querySelector(PRESENTATION_CONTENT_SELECTOR);
  if (!container) return [];

  const nodes = Array.from(container.childNodes);
  const roughGroups = [];
  let currentGroup = [];

  for (const node of nodes) {
    if (node.nodeName === SLIDE_SEPARATOR_TAG) {
      // Separator found: close current group and start a new one
      roughGroups.push(currentGroup);
      currentGroup = [];
    } else if (node.classList && node.classList.contains(NO_SLIDE_CLASS)) {
      // Skip no-slide elements entirely
    } else {
      currentGroup.push(node);
    }
  }
  // Push the last group
  roughGroups.push(currentGroup);

  // Split each rough group by <!-- split --> comment nodes, flatten, filter empties
  const slides = [];
  for (const group of roughGroups) {
    const subGroups = splitGroupByComment(group);
    for (const sub of subGroups) {
      slides.push(sub);
    }
  }

  return slides;
}

// --- Overlay Construction ---

/**
 * Builds and returns the #presentation-overlay element (not yet appended).
 * Contains: exit button, prev/next nav, progress indicator, slide content area.
 *
 * @returns {HTMLElement}
 */
function createOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'presentation-overlay';

  // Top bar
  const topBar = document.createElement('div');
  topBar.id = 'presentation-topbar';

  const exitBtn = document.createElement('button');
  exitBtn.id = 'btn-exit-presentation';
  exitBtn.textContent = '✕ 退出';
  topBar.appendChild(exitBtn);

  overlay.appendChild(topBar);

  // Slide content area
  const slideArea = document.createElement('div');
  slideArea.id = 'presentation-slide-area';
  overlay.appendChild(slideArea);

  // Bottom navigation bar
  const bottomBar = document.createElement('div');
  bottomBar.id = 'presentation-bottombar';

  const prevBtn = document.createElement('button');
  prevBtn.id = 'btn-prev-slide';
  prevBtn.textContent = '← 上一張';

  const progress = document.createElement('span');
  progress.id = 'slide-progress';

  const nextBtn = document.createElement('button');
  nextBtn.id = 'btn-next-slide';
  nextBtn.textContent = '下一張 →';

  bottomBar.appendChild(prevBtn);
  bottomBar.appendChild(progress);
  bottomBar.appendChild(nextBtn);
  overlay.appendChild(bottomBar);

  return overlay;
}

// --- Slide Display ---

/**
 * Renders the slide at the given index into #presentation-slide-area.
 * Updates #slide-progress text.
 * No-op if index is out of bounds.
 *
 * @param {number} index - zero-based slide index
 */
function showSlide(index) {
  if (index < 0 || index >= slides.length) return;

  currentIndex = index;

  const slideArea = document.getElementById('presentation-slide-area');
  if (!slideArea) return;

  // Clone nodes from the slide group into the slide area
  slideArea.innerHTML = '';
  const slideDiv = document.createElement('div');
  slideDiv.className = 'presentation-slide';
  for (const node of slides[index]) {
    slideDiv.appendChild(node.cloneNode(true));
  }
  slideArea.appendChild(slideDiv);

  const progress = document.getElementById('slide-progress');
  if (progress) {
    progress.textContent = `${currentIndex + 1} / ${slides.length}`;
  }
}

// --- Navigation ---

/**
 * Advances to the next slide. No-op if already on the last slide.
 */
function nextSlide() {
  if (currentIndex < slides.length - 1) {
    showSlide(currentIndex + 1);
  }
}

/**
 * Goes back to the previous slide. No-op if already on the first slide.
 */
function prevSlide() {
  if (currentIndex > 0) {
    showSlide(currentIndex - 1);
  }
}

// --- Keyboard Handler ---

/**
 * Keyboard event handler for presentation mode.
 * Bound during enterPresentation(), removed on exitPresentation().
 *
 * @param {KeyboardEvent} event
 */
function handleKeydown(event) {
  switch (event.key) {
    case 'ArrowRight':
      nextSlide();
      break;
    case 'ArrowLeft':
      prevSlide();
      break;
    case 'Escape':
      exitPresentation();
      break;
  }
}

// --- Fullscreen change handler ---

/**
 * Listens for browser-native fullscreen exit (e.g. user presses Escape
 * while in fullscreen without going through our button).
 */
function handleFullscreenChange() {
  if (!document.fullscreenElement) {
    exitPresentation();
  }
}

// --- Enter / Exit ---

/**
 * Enters presentation mode:
 * 1. Builds slides from DOM
 * 2. Creates and appends overlay
 * 3. Shows first slide
 * 4. Requests fullscreen
 * 5. Registers keyboard + fullscreenchange listeners
 */
function enterPresentation() {
  slides = buildSlides();
  currentIndex = 0;

  // Lock body scroll
  _savedBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  const overlay = createOverlay();
  document.body.appendChild(overlay);

  // Wire up overlay buttons
  document.getElementById('btn-exit-presentation').addEventListener('click', exitPresentation);
  document.getElementById('btn-next-slide').addEventListener('click', nextSlide);
  document.getElementById('btn-prev-slide').addEventListener('click', prevSlide);

  showSlide(0);

  // Request fullscreen
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {
      // Fullscreen may be denied in some environments; continue anyway
    });
  }

  // Register listeners
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('fullscreenchange', handleFullscreenChange);
}

/**
 * Exits presentation mode:
 * 1. Removes overlay from DOM
 * 2. Exits fullscreen if active
 * 3. Removes event listeners
 */
function exitPresentation() {
  const overlay = document.getElementById('presentation-overlay');
  if (overlay) overlay.remove();

  // Restore body scroll
  document.body.style.overflow = _savedBodyOverflow;

  if (document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }

  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
}

// --- Module export (for Jest) / Browser global attachment ---

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    buildSlides,
    createOverlay,
    showSlide,
    nextSlide,
    prevSlide,
    handleKeydown,
    handleFullscreenChange,
    enterPresentation,
    exitPresentation,
    // expose state accessors for tests
    getCurrentIndex: () => currentIndex,
    getSlidesCount: () => slides.length,
    getSavedBodyOverflow: () => _savedBodyOverflow,
    resetState: () => { slides = []; currentIndex = 0; _savedBodyOverflow = ''; },
    SLIDE_SEPARATOR_TAG,
    PRESENTATION_CONTENT_SELECTOR,
    NO_SLIDE_CLASS,
    SLIDE_SPLIT_COMMENT,
  };
}
