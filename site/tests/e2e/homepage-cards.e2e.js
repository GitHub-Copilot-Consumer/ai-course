/**
 * E2E tests for Homepage Course Cards feature.
 *
 * Requires Hugo dev server running at http://localhost:1313
 * Start with: hugo server --source site
 */
const { test, expect } = require('@playwright/test');

const HOMEPAGE_URL = '/';

test.describe('Homepage Course Cards - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HOMEPAGE_URL);
  });

  test('SDD 課程卡片標題可見', async ({ page }) => {
    await expect(
      page.locator('#content').getByText('從 AI 輔助到規格驅動 (SDD) 實戰攻略')
    ).toBeVisible();
  });

  test('Agent 課程卡片標題可見', async ({ page }) => {
    await expect(
      page.locator('#content').getByText('Agent 整合與自訂擴展')
    ).toBeVisible();
  });

  test('SDD 課程卡片連結指向 /sdd/', async ({ page }) => {
    const card = page.locator('#content a.hextra-feature-card[href$="/sdd/"]');
    await expect(card).toBeVisible();
    await expect(card).toContainText('從 AI 輔助到規格驅動 (SDD) 實戰攻略');
  });

  test('Agent 課程卡片連結指向 /agent/', async ({ page }) => {
    const card = page.locator('#content a.hextra-feature-card[href$="/agent/"]');
    await expect(card).toBeVisible();
    await expect(card).toContainText('Agent 整合與自訂擴展');
  });

  test('首頁不含個別章節路徑連結', async ({ page }) => {
    const chapterLinks = [
      '/sdd/ch0-warmup/',
      '/sdd/ch1-vibe-coding/',
      '/sdd/ch2-mvp-to-spec/',
      '/sdd/ch3-openspec/',
      '/sdd/ch4-coding-agent/',
      '/sdd/ch5-verify-observe/',
      '/sdd/ch6-team/',
      '/agent/ch1-model-fundamentals/',
      '/agent/ch2-agent-architecture/',
    ];
    for (const href of chapterLinks) {
      await expect(page.locator('#content').locator(`a[href="${href}"]`)).not.toBeAttached();
    }
  });

  test('參考資料中可見 /appendix/setup/ 連結', async ({ page }) => {
    const link = page.locator('#content a[href*="/appendix/setup/"]');
    await expect(link).toBeVisible();
  });

  test('參考資料中可見 /resources/ 連結', async ({ page }) => {
    const link = page.locator('#content a[href*="/resources/"]');
    await expect(link).toBeVisible();
  });
});
