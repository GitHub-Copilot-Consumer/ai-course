/**
 * Tests for PlantUML rendering support.
 *
 * Covers spec scenarios from:
 * - plantuml-rendering: render hook, shortcode, goldmark config, lesson examples
 */

const fs = require('fs');
const path = require('path');

const SITE_ROOT = path.resolve(__dirname, '../..');

const CONFIG_PATH = path.resolve(SITE_ROOT, 'config.yaml');
const RENDER_HOOK_PATH = path.resolve(
  SITE_ROOT,
  'layouts/_default/_markup/render-codeblock-plantuml.html'
);
const SHORTCODE_PATH = path.resolve(SITE_ROOT, 'layouts/shortcodes/plantuml.html');
const LESSONS_DIR = path.resolve(SITE_ROOT, 'content/lessons');

// -----------------------------------------------------------------------
// Section 1: Hugo Goldmark config
// -----------------------------------------------------------------------
describe('plantuml-rendering: Hugo Goldmark unsafe rendering', () => {
  let configContent;

  beforeAll(() => {
    configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
  });

  test('config.yaml contains markup.goldmark.renderer section', () => {
    expect(configContent).toContain('goldmark');
  });

  test('markup.goldmark.renderer.unsafe is set to true', () => {
    expect(configContent).toMatch(/unsafe:\s*true/);
  });
});

// -----------------------------------------------------------------------
// Section 2: PlantUML render hook
// -----------------------------------------------------------------------
describe('plantuml-rendering: render-codeblock-plantuml.html render hook', () => {
  test('render hook file exists at correct path', () => {
    expect(fs.existsSync(RENDER_HOOK_PATH)).toBe(true);
  });

  test('render hook calls Kroki plantuml/svg endpoint', () => {
    const content = fs.readFileSync(RENDER_HOOK_PATH, 'utf-8');
    expect(content).toContain('kroki.io/plantuml/svg');
  });

  test('render hook uses resources.GetRemote', () => {
    const content = fs.readFileSync(RENDER_HOOK_PATH, 'utf-8');
    expect(content).toContain('resources.GetRemote');
  });

  test('render hook outputs SVG with safeHTML', () => {
    const content = fs.readFileSync(RENDER_HOOK_PATH, 'utf-8');
    expect(content).toContain('safeHTML');
  });

  test('render hook has fallback pre/code block on error', () => {
    const content = fs.readFileSync(RENDER_HOOK_PATH, 'utf-8');
    expect(content).toContain('<pre>');
    expect(content).toContain('<code>');
  });

  test('render hook uses warnf for error logging', () => {
    const content = fs.readFileSync(RENDER_HOOK_PATH, 'utf-8');
    expect(content).toContain('warnf');
  });
});

// -----------------------------------------------------------------------
// Section 3: PlantUML shortcode
// -----------------------------------------------------------------------
describe('plantuml-rendering: plantuml shortcode', () => {
  test('shortcode file exists at correct path', () => {
    expect(fs.existsSync(SHORTCODE_PATH)).toBe(true);
  });

  test('shortcode calls Kroki plantuml/svg endpoint', () => {
    const content = fs.readFileSync(SHORTCODE_PATH, 'utf-8');
    expect(content).toContain('kroki.io/plantuml/svg');
  });

  test('shortcode uses resources.GetRemote', () => {
    const content = fs.readFileSync(SHORTCODE_PATH, 'utf-8');
    expect(content).toContain('resources.GetRemote');
  });

  test('shortcode outputs SVG with safeHTML', () => {
    const content = fs.readFileSync(SHORTCODE_PATH, 'utf-8');
    expect(content).toContain('safeHTML');
  });
});

// -----------------------------------------------------------------------
// Section 4: Lesson pages contain PlantUML examples
// -----------------------------------------------------------------------
describe('plantuml-rendering: lesson pages contain plantuml diagrams', () => {
  test('at least one lesson page contains a plantuml fenced code block', () => {
    const files = fs.readdirSync(LESSONS_DIR).filter((f) => f.endsWith('.md'));
    const hasPlantuml = files.some((file) => {
      const content = fs.readFileSync(path.join(LESSONS_DIR, file), 'utf-8');
      return content.includes('```plantuml');
    });
    expect(hasPlantuml).toBe(true);
  });
});
