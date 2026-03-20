/**
 * E2E tests for Mermaid diagram rendering.
 *
 * Requires Hugo dev server running at http://localhost:1313
 * Start with: hugo server --source site
 *
 * Spec: mermaid-diagrams / "課程頁面圖表在瀏覽器中可見"
 */
const { test, expect } = require('@playwright/test');

test.describe('Mermaid Rendering - E2E', () => {
  test('ch0 lesson page renders mermaid diagram as SVG', async ({ page }) => {
    await page.goto('/sdd/ch0-warmup/');
    // Hextra renders mermaid as <svg> inside a <pre class="mermaid"> or similar
    const svgElements = page.locator('svg');
    await expect(svgElements.first()).toBeVisible();
  });

  test('ch2 lesson page renders mermaid diagram as SVG', async ({ page }) => {
    await page.goto('/sdd/ch2-mvp-to-spec/');
    const svgElements = page.locator('svg');
    await expect(svgElements.first()).toBeVisible();
  });

  test('ch3 lesson page renders mermaid diagram as SVG', async ({ page }) => {
    await page.goto('/sdd/ch3-openspec/');
    const svgElements = page.locator('svg');
    await expect(svgElements.first()).toBeVisible();
  });

  test('mermaid diagram SVG has non-zero dimensions', async ({ page }) => {
    await page.goto('/sdd/ch2-mvp-to-spec/');
    const svg = page.locator('svg').first();
    await expect(svg).toBeVisible();
    const box = await svg.boundingBox();
    expect(box).not.toBeNull();
    expect(box.width).toBeGreaterThan(0);
    expect(box.height).toBeGreaterThan(0);
  });

  test('mermaid diagram is not showing raw mermaid source as text', async ({ page }) => {
    await page.goto('/sdd/ch2-mvp-to-spec/');
    // If rendering failed, the page would show raw mermaid text like "graph TD"
    // We check that it's rendered as SVG and the raw block text is not visible
    const preElements = page.locator('pre.mermaid');
    // mermaid pre elements should not be visible (replaced by SVG)
    if (await preElements.count() > 0) {
      await expect(preElements.first()).not.toBeVisible();
    }
  });
});
