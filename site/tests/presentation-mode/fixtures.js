/**
 * Test fixtures and helpers for presentation-mode tests.
 * Provides utility functions to set up JSDOM environments
 * that mimic the hextra-rendered lesson page structure.
 */

/**
 * Creates a `.content` container with the given HTML inside it,
 * appended to document.body. Returns the container element.
 *
 * @param {string} innerHtml - HTML to place inside .content
 * @returns {HTMLElement} the .content element
 */
function createContentFixture(innerHtml) {
  document.body.innerHTML = '';
  const content = document.createElement('div');
  content.className = 'content';
  content.innerHTML = innerHtml;
  document.body.appendChild(content);
  return content;
}

/**
 * Creates a fixture with N horizontal rule separators between paragraphs.
 * Produces N+1 logical sections.
 *
 * @param {number} separatorCount - how many <hr> separators to include
 * @returns {HTMLElement} the .content element
 */
function createFixtureWithSeparators(separatorCount) {
  let html = '<p>Section 0 content</p>';
  for (let i = 1; i <= separatorCount; i++) {
    html += `<hr><p>Section ${i} content</p>`;
  }
  return createContentFixture(html);
}

/**
 * Creates a fixture with no horizontal rule separators.
 *
 * @returns {HTMLElement} the .content element
 */
function createFixtureNoSeparators() {
  return createContentFixture('<p>Only content</p><p>More content</p>');
}

/**
 * Creates a fixture where one slide section contains a <div class="no-slide"> element.
 * Structure: [p before no-slide] [div.no-slide with p inside] [p after no-slide]
 * All in a single section (no <hr>).
 *
 * @returns {HTMLElement} the .content element
 */
function createFixtureWithNoSlide() {
  return createContentFixture(
    '<p>Before content</p>' +
    '<div class="no-slide"><p>Hidden content</p></div>' +
    '<p>After content</p>'
  );
}

/**
 * Creates a fixture with N <hr> separators where the section at splitSectionIndex
 * contains a <!-- split --> comment node.
 * Uses innerHTML which does NOT preserve comment nodes - so we build manually.
 *
 * @param {number} separatorCount - how many <hr> separators
 * @param {number} splitSectionIndex - which section (0-based) gets a <!-- split --> inside
 * @param {number} [splitCount=1] - how many split comments to insert in that section
 * @returns {HTMLElement} the .content element
 */
function createFixtureWithSplitComment(separatorCount, splitSectionIndex, splitCount) {
  splitCount = splitCount || 1;
  document.body.innerHTML = '';
  const content = document.createElement('div');
  content.className = 'content';

  // Build sections: separatorCount+1 sections
  for (let i = 0; i <= separatorCount; i++) {
    if (i > 0) {
      content.appendChild(document.createElement('hr'));
    }
    if (i === splitSectionIndex) {
      // Insert paragraphs with split comments between them
      const p0 = document.createElement('p');
      p0.textContent = `Section ${i} part A`;
      content.appendChild(p0);
      for (let s = 0; s < splitCount; s++) {
        content.appendChild(document.createComment('split'));
        const p = document.createElement('p');
        p.textContent = `Section ${i} part ${String.fromCharCode(66 + s)}`; // B, C, ...
        content.appendChild(p);
      }
    } else {
      const p = document.createElement('p');
      p.textContent = `Section ${i} content`;
      content.appendChild(p);
    }
  }

  document.body.appendChild(content);
  return content;
}

/**
 * Creates a fixture with a single section that starts or ends with a <!-- split --> comment.
 * Used to test empty-group filtering.
 *
 * @param {'start'|'end'} position - where to place the split comment
 * @returns {HTMLElement} the .content element
 */
function createFixtureWithEdgeSplitComment(position) {
  document.body.innerHTML = '';
  const content = document.createElement('div');
  content.className = 'content';

  if (position === 'start') {
    content.appendChild(document.createComment('split'));
    const p = document.createElement('p');
    p.textContent = 'Only content';
    content.appendChild(p);
  } else {
    const p = document.createElement('p');
    p.textContent = 'Only content';
    content.appendChild(p);
    content.appendChild(document.createComment('split'));
  }

  document.body.appendChild(content);
  return content;
}

/**
 * Cleans up the DOM after each test.
 */
function cleanupFixture() {
  document.body.innerHTML = '';
  const overlay = document.getElementById('presentation-overlay');
  if (overlay) overlay.remove();
}

module.exports = {
  createContentFixture,
  createFixtureWithSeparators,
  createFixtureNoSeparators,
  createFixtureWithNoSlide,
  createFixtureWithSplitComment,
  createFixtureWithEdgeSplitComment,
  cleanupFixture,
};
