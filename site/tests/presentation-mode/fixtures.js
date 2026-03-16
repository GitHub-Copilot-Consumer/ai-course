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
  cleanupFixture,
};
