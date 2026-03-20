/**
 * E2E tests for Presentation Mode feature.
 *
 * Requires Hugo dev server running at http://localhost:1313
 * Start with: hugo server --source site
 */
const { test, expect } = require('@playwright/test');

const LESSON_URL = '/sdd/ch0-warmup/';

test.describe('Presentation Mode - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(LESSON_URL);
  });

  test('presentation mode button is visible on lesson page', async ({ page }) => {
    const btn = page.locator('#btn-enter-presentation');
    await expect(btn).toBeVisible();
    await expect(btn).toContainText('簡報模式');
  });

  test('presentation mode button is NOT present on assignments page', async ({ page }) => {
    await page.goto('/assignments/');
    const btn = page.locator('#btn-enter-presentation');
    await expect(btn).not.toBeAttached();
  });

  test('clicking button shows presentation overlay', async ({ page }) => {
    const btn = page.locator('#btn-enter-presentation');
    await btn.click();
    const overlay = page.locator('#presentation-overlay');
    await expect(overlay).toBeVisible();
  });

  test('overlay contains navigation buttons and progress indicator', async ({ page }) => {
    await page.locator('#btn-enter-presentation').click();
    await expect(page.locator('#btn-prev-slide')).toBeVisible();
    await expect(page.locator('#btn-next-slide')).toBeVisible();
    await expect(page.locator('#slide-progress')).toBeVisible();
    await expect(page.locator('#btn-exit-presentation')).toBeVisible();
  });

  test('progress indicator shows "1 / N" format on first slide', async ({ page }) => {
    await page.locator('#btn-enter-presentation').click();
    const progress = page.locator('#slide-progress');
    const text = await progress.textContent();
    expect(text).toMatch(/^1 \/ \d+$/);
  });

  test('next slide button advances slide and updates progress', async ({ page }) => {
    await page.locator('#btn-enter-presentation').click();
    const progressBefore = await page.locator('#slide-progress').textContent();
    const totalMatch = progressBefore.match(/\/ (\d+)$/);
    const total = totalMatch ? parseInt(totalMatch[1]) : 0;

    // Only test navigation if there are multiple slides
    if (total > 1) {
      await page.locator('#btn-next-slide').click();
      const progressAfter = await page.locator('#slide-progress').textContent();
      expect(progressAfter).toBe(`2 / ${total}`);
    }
  });

  test('previous slide button goes back and updates progress', async ({ page }) => {
    await page.locator('#btn-enter-presentation').click();
    const progressText = await page.locator('#slide-progress').textContent();
    const totalMatch = progressText.match(/\/ (\d+)$/);
    const total = totalMatch ? parseInt(totalMatch[1]) : 0;

    if (total > 1) {
      await page.locator('#btn-next-slide').click();
      await page.locator('#btn-prev-slide').click();
      const progress = await page.locator('#slide-progress').textContent();
      expect(progress).toBe(`1 / ${total}`);
    }
  });

  test('keyboard ArrowRight advances slide', async ({ page }) => {
    await page.locator('#btn-enter-presentation').click();
    const progressText = await page.locator('#slide-progress').textContent();
    const totalMatch = progressText.match(/\/ (\d+)$/);
    const total = totalMatch ? parseInt(totalMatch[1]) : 0;

    if (total > 1) {
      await page.keyboard.press('ArrowRight');
      const progress = await page.locator('#slide-progress').textContent();
      expect(progress).toBe(`2 / ${total}`);
    }
  });

  test('keyboard ArrowLeft goes to previous slide', async ({ page }) => {
    await page.locator('#btn-enter-presentation').click();
    const progressText = await page.locator('#slide-progress').textContent();
    const totalMatch = progressText.match(/\/ (\d+)$/);
    const total = totalMatch ? parseInt(totalMatch[1]) : 0;

    if (total > 1) {
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowLeft');
      const progress = await page.locator('#slide-progress').textContent();
      expect(progress).toBe(`1 / ${total}`);
    }
  });

  test('exit button removes overlay', async ({ page }) => {
    await page.locator('#btn-enter-presentation').click();
    await expect(page.locator('#presentation-overlay')).toBeVisible();
    await page.locator('#btn-exit-presentation').click();
    await expect(page.locator('#presentation-overlay')).not.toBeAttached();
  });

  test('slide content area contains a presentation-slide div', async ({ page }) => {
    await page.locator('#btn-enter-presentation').click();
    const slide = page.locator('#presentation-slide-area .presentation-slide');
    await expect(slide).toBeVisible();
  });
});
