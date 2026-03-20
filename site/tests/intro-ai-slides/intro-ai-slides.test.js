/**
 * Tests for slide split structure in agent/ch1-model-fundamentals.md.
 *
 * The content formerly in lessons/ch-intro-ai.md has been migrated to the
 * Agent course as ch1-model-fundamentals.md. This test file verifies the
 * file exists and has basic front matter; content-level tests will be added
 * once the Agent course chapter is fully authored.
 */

const fs = require('fs');
const path = require('path');

const FILE_PATH = path.resolve(__dirname, '../../content/agent/ch1-model-fundamentals.md');

let rawContent;

beforeAll(() => {
  rawContent = fs.readFileSync(FILE_PATH, 'utf-8');
});

describe('agent/ch1-model-fundamentals: 檔案存在且含 front matter', () => {
  test('檔案可讀取且非空', () => {
    expect(rawContent.length).toBeGreaterThan(0);
  });

  test('front matter 包含 title 欄位', () => {
    expect(rawContent).toContain('title:');
  });

  test('front matter 包含 weight 欄位', () => {
    expect(rawContent).toContain('weight:');
  });
});
