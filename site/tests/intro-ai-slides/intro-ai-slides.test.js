/**
 * Tests for slide split structure in ch-intro-ai.md.
 *
 * Covers spec scenarios from:
 * - intro-ai-chapter (ADDED): 導言章節投影片切分結構
 *   - 文章（不含 front matter）中 `---` 分隔符恰好出現 11 次
 *   - 文章文字內容不變（移除所有 `---` 行後內容相同）
 */

const fs = require('fs');
const path = require('path');

const FILE_PATH = path.resolve(__dirname, '../../content/lessons/ch-intro-ai.md');

// Number of expected slide separators (front matter excluded)
const EXPECTED_SEPARATOR_COUNT = 11;

let rawContent;
let bodyContent; // content after stripping front matter

beforeAll(() => {
  rawContent = fs.readFileSync(FILE_PATH, 'utf-8');
  // Strip front matter: remove the opening and closing --- delimiters and everything between them
  // Front matter is the block between the first two `---` lines at the very top of the file
  const frontMatterRegex = /^---\n[\s\S]*?\n---\n/;
  bodyContent = rawContent.replace(frontMatterRegex, '');
});

// ─── Slide separator count ────────────────────────────────────────────────────

describe('intro-ai-chapter: 投影片切分結構', () => {
  test(`文章正文（不含 front matter）中獨立行的 --- 分隔符恰好出現 ${EXPECTED_SEPARATOR_COUNT} 次`, () => {
    // Count lines that are exactly `---` (standalone separator lines)
    const separatorLines = bodyContent
      .split('\n')
      .filter(line => line.trim() === '---');
    expect(separatorLines).toHaveLength(EXPECTED_SEPARATOR_COUNT);
  });

  test('文章正文包含至少 1 個 --- 分隔符（基本可用性檢查）', () => {
    const separatorLines = bodyContent
      .split('\n')
      .filter(line => line.trim() === '---');
    expect(separatorLines.length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Content integrity ────────────────────────────────────────────────────────

describe('intro-ai-chapter: 文章文字內容完整性', () => {
  test('文章包含「Token 與 Context Window」段落', () => {
    expect(bodyContent).toContain('Token 與 Context Window');
  });

  test('文章包含「機率生成機制」段落', () => {
    expect(bodyContent).toContain('機率生成機制');
  });

  test('文章包含「溫度參數（Temperature）」段落', () => {
    expect(bodyContent).toContain('溫度參數（Temperature）');
  });

  test('文章包含「Agent = Model + Tools + Loop」', () => {
    expect(bodyContent).toContain('Agent = Model + Tools + Loop');
  });

  test('文章包含「ReAct 模式」段落', () => {
    expect(bodyContent).toContain('ReAct 模式');
  });

  test('文章包含「Memory 類型」段落', () => {
    expect(bodyContent).toContain('Memory 類型');
  });

  test('文章包含「什麼是 Coding Agent」段落', () => {
    expect(bodyContent).toContain('什麼是 Coding Agent');
  });

  test('文章包含「主流 Coding Agent CLI 比較」段落', () => {
    expect(bodyContent).toContain('主流 Coding Agent CLI 比較');
  });

  test('文章包含「小結」段落', () => {
    expect(bodyContent).toContain('小結');
  });
});
