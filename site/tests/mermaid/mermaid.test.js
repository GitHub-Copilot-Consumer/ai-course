/**
 * Tests for Mermaid diagram support.
 *
 * Covers spec scenarios from:
 * - mermaid-diagrams: mermaid blocks in lesson pages, no plantuml blocks remain,
 *   plantuml layout files removed
 * - course-roadmap-mermaid: roadmap uses mermaid graph LR with subgraphs
 */

const fs = require('fs');
const path = require('path');

const SITE_ROOT = path.resolve(__dirname, '../..');
const LESSONS_DIR = path.resolve(SITE_ROOT, 'content/sdd');

// Explicit file list — do NOT use pattern matching
const MERMAID_CONTENT_FILES = [
  path.resolve(LESSONS_DIR, 'ch0-warmup.md'),
  path.resolve(LESSONS_DIR, 'ch2-mvp-to-spec.md'),
  path.resolve(LESSONS_DIR, 'ch3-openspec.md'),
];

const PLANTUML_LAYOUT_FILES = [
  path.resolve(SITE_ROOT, 'layouts/_default/_markup/render-codeblock-plantuml.html'),
  path.resolve(SITE_ROOT, 'layouts/shortcodes/plantuml.html'),
];

// All content files to check for plantuml absence
const ALL_CONTENT_FILES = fs
  .readdirSync(LESSONS_DIR)
  .filter((f) => f.endsWith('.md'))
  .map((f) => path.resolve(LESSONS_DIR, f));

// -----------------------------------------------------------------------
// Section 1: Mermaid blocks exist in course content files
// -----------------------------------------------------------------------
describe('mermaid-diagrams: course pages contain mermaid fenced code blocks', () => {
  test.each(MERMAID_CONTENT_FILES)(
    '%s contains at least one ```mermaid block',
    (filePath) => {
      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).toContain('```mermaid');
    }
  );
});

// -----------------------------------------------------------------------
// Section 2: No plantuml blocks remain in any content file
// -----------------------------------------------------------------------
describe('mermaid-diagrams: no plantuml fenced code blocks remain in content', () => {
  test.each(ALL_CONTENT_FILES)(
    '%s does not contain ```plantuml block',
    (filePath) => {
      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).not.toContain('```plantuml');
    }
  );
});

// -----------------------------------------------------------------------
// Section 3: PlantUML layout files have been deleted
// -----------------------------------------------------------------------
describe('mermaid-diagrams: plantuml layout files do not exist', () => {
  test.each(PLANTUML_LAYOUT_FILES)(
    '%s does not exist',
    (filePath) => {
      expect(fs.existsSync(filePath)).toBe(false);
    }
  );
});

// -----------------------------------------------------------------------
// Section 4: course-roadmap-mermaid — ch0-warmup.md roadmap structure
// -----------------------------------------------------------------------
describe('course-roadmap-mermaid: ch0-warmup.md roadmap uses mermaid graph LR + subgraph', () => {
  const CH0_PATH = path.resolve(LESSONS_DIR, 'ch0-warmup.md');
  let ch0Content;
  let mermaidBlock;

  beforeAll(() => {
    ch0Content = fs.readFileSync(CH0_PATH, 'utf-8');
    // Extract the mermaid fenced code block content
    const match = ch0Content.match(/```mermaid\n([\s\S]*?)```/);
    mermaidBlock = match ? match[1] : '';
  });

  test('ch0-warmup.md 存在 mermaid fenced code block', () => {
    expect(ch0Content).toContain('```mermaid');
  });

  test('mermaid block 包含 graph LR 指令', () => {
    expect(mermaidBlock).toMatch(/graph\s+LR/);
  });

  test('mermaid block 包含 subgraph 關鍵字', () => {
    expect(mermaidBlock).toContain('subgraph');
  });

  test('mermaid block 包含 Greenfield 階段 subgraph', () => {
    expect(mermaidBlock).toContain('Greenfield 階段');
  });

  test('mermaid block 包含 Brownfield 階段 subgraph', () => {
    expect(mermaidBlock).toContain('Brownfield 階段');
  });

  test('mermaid block 包含 8 個步驟節點文字', () => {
    expect(mermaidBlock).toContain('導言');
    expect(mermaidBlock).toContain('Ch0');
    expect(mermaidBlock).toContain('Ch1');
    expect(mermaidBlock).toContain('Ch2');
    expect(mermaidBlock).toContain('Ch3');
    expect(mermaidBlock).toContain('Ch4');
    expect(mermaidBlock).toContain('Ch5');
    expect(mermaidBlock).toContain('Ch6');
  });

  test('mermaid block 包含 MVP 誕生，轉折點 邊標籤', () => {
    expect(mermaidBlock).toContain('MVP 誕生，轉折點');
  });

  test('mermaid block 包含 classDef 節點色彩定義', () => {
    expect(mermaidBlock).toContain('classDef');
    expect(mermaidBlock).toContain('#F7B7B7');
  });

  test('ch0-warmup.md 路線圖下方有附錄 blockquote', () => {
    expect(ch0Content).toMatch(/>\s*附錄：工具安裝/);
  });

  test('ch0-warmup.md 不含 plantuml block', () => {
    expect(ch0Content).not.toContain('```plantuml');
  });
});
