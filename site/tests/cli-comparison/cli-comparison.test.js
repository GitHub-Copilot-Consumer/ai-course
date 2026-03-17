/**
 * Tests for CLI comparison section in ch-intro-ai.md.
 *
 * Covers spec scenarios from:
 * - cli-comparison: CLI 比較節標題、disclaimer、比較表、ASCII 光譜圖、課程選擇說明
 * - intro-ai-chapter (MODIFIED): CLI 比較節位置正確
 */

const fs = require('fs');
const path = require('path');

const FILE_PATH = path.resolve(__dirname, '../../content/lessons/ch-intro-ai.md');

let content;

beforeAll(() => {
  content = fs.readFileSync(FILE_PATH, 'utf-8');
});

// ─── cli-comparison: CLI 比較節存在於導言章節 ───────────────────────────────

describe('cli-comparison: CLI 比較節標題存在', () => {
  test('ch-intro-ai.md 包含「主流 Coding Agent CLI 比較」H2 標題', () => {
    expect(content).toContain('主流 Coding Agent CLI 比較');
  });
});

// ─── cli-comparison: 版本 Disclaimer 存在 ────────────────────────────────────

describe('cli-comparison: 版本 Disclaimer 存在', () => {
  test('CLI 比較節包含「2026 年初」disclaimer 文字', () => {
    expect(content).toContain('2026 年初');
  });
});

// ─── cli-comparison: 五個工具的比較表 ────────────────────────────────────────

describe('cli-comparison: 比較表包含所有五個工具', () => {
  test('包含 Claude Code', () => {
    expect(content).toContain('Claude Code');
  });

  test('包含 Codex CLI', () => {
    expect(content).toContain('Codex CLI');
  });

  test('包含 Gemini CLI', () => {
    expect(content).toContain('Gemini CLI');
  });

  test('包含 GitHub Copilot', () => {
    expect(content).toContain('GitHub Copilot');
  });

  test('包含 OpenCode', () => {
    expect(content).toContain('OpenCode');
  });
});

describe('cli-comparison: 多模型支援維度正確', () => {
  test('包含「多模型」欄位', () => {
    expect(content).toContain('多模型');
  });

  test('OpenCode 多模型支援標示為「是」（75+ 供應商）', () => {
    // 在包含 OpenCode 的表格列中，應出現「是」或「75+」
    const lines = content.split('\n');
    const opencodeLine = lines.find(
      (l) => l.includes('OpenCode') && l.includes('|')
    );
    expect(opencodeLine).toBeDefined();
    expect(opencodeLine).toMatch(/是|75\+/);
  });

  test('Claude Code 多模型支援標示為「否」', () => {
    const lines = content.split('\n');
    const claudeLine = lines.find(
      (l) => l.includes('Claude Code') && l.includes('|')
    );
    expect(claudeLine).toBeDefined();
    expect(claudeLine).toContain('否');
  });

  test('Codex CLI 多模型支援標示為「否」', () => {
    const lines = content.split('\n');
    const codexLine = lines.find(
      (l) => l.includes('Codex CLI') && l.includes('|')
    );
    expect(codexLine).toBeDefined();
    expect(codexLine).toContain('否');
  });

  test('Gemini CLI 多模型支援標示為「否」', () => {
    const lines = content.split('\n');
    const geminiLine = lines.find(
      (l) => l.includes('Gemini CLI') && l.includes('|')
    );
    expect(geminiLine).toBeDefined();
    expect(geminiLine).toContain('否');
  });
});

describe('cli-comparison: 廠商鎖定風險欄位正確', () => {
  test('包含廠商鎖定相關欄位', () => {
    expect(content).toContain('廠商鎖定');
  });

  test('OpenCode 廠商鎖定風險標示為「低」', () => {
    const lines = content.split('\n');
    const opencodeLine = lines.find(
      (l) => l.includes('OpenCode') && l.includes('|')
    );
    expect(opencodeLine).toBeDefined();
    expect(opencodeLine).toContain('低');
  });

  test('Claude Code 廠商鎖定風險標示為「高」', () => {
    const lines = content.split('\n');
    const claudeLine = lines.find(
      (l) => l.includes('Claude Code') && l.includes('|')
    );
    expect(claudeLine).toBeDefined();
    expect(claudeLine).toContain('高');
  });

  test('Codex CLI 廠商鎖定風險標示為「高」', () => {
    const lines = content.split('\n');
    const codexLine = lines.find(
      (l) => l.includes('Codex CLI') && l.includes('|')
    );
    expect(codexLine).toBeDefined();
    expect(codexLine).toContain('高');
  });
});

// ─── cli-comparison: 模型支援光譜 ASCII 圖 ───────────────────────────────────

describe('cli-comparison: 模型支援光譜 ASCII 圖存在', () => {
  test('包含「單一廠商」文字', () => {
    expect(content).toContain('單一廠商');
  });

  test('包含「模型無關」文字', () => {
    expect(content).toContain('模型無關');
  });
});

// ─── cli-comparison: 本課程工具選擇說明 ──────────────────────────────────────

describe('cli-comparison: 本課程工具選擇說明存在', () => {
  test('包含「本課程」字串', () => {
    expect(content).toContain('本課程');
  });

  test('本課程選擇段落提及 OpenCode', () => {
    // 找「本課程的選擇」段落（CLI 比較節中的專屬段落）
    const sectionTitle = '本課程的選擇';
    const idx = content.indexOf(sectionTitle);
    expect(idx).toBeGreaterThan(-1);
    const surrounding = content.slice(idx, idx + 500);
    expect(surrounding).toContain('OpenCode');
  });
});

// ─── intro-ai-chapter (MODIFIED): CLI 比較節位置正確 ─────────────────────────

describe('intro-ai-chapter: CLI 比較節位置正確', () => {
  test('「主流 Coding Agent CLI 比較」出現在「什麼是 Coding Agent」之後', () => {
    const codingAgentIdx = content.indexOf('什麼是 Coding Agent');
    const cliCompareIdx = content.indexOf('主流 Coding Agent CLI 比較');
    expect(codingAgentIdx).toBeGreaterThan(-1);
    expect(cliCompareIdx).toBeGreaterThan(-1);
    expect(cliCompareIdx).toBeGreaterThan(codingAgentIdx);
  });

  test('「主流 Coding Agent CLI 比較」出現在「小結」之前', () => {
    const cliCompareIdx = content.indexOf('主流 Coding Agent CLI 比較');
    const summaryIdx = content.indexOf('## 小結');
    expect(cliCompareIdx).toBeGreaterThan(-1);
    expect(summaryIdx).toBeGreaterThan(-1);
    expect(cliCompareIdx).toBeLessThan(summaryIdx);
  });
});
