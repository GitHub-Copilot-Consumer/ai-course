/**
 * Tests for CLI comparison content in agent/ch1-model-fundamentals.md.
 *
 * The CLI comparison section formerly in lessons/ch-intro-ai.md has been
 * migrated to the Agent course. This test file verifies the file exists;
 * detailed CLI comparison assertions will be restored once ch1 is fully
 * authored.
 */

const fs = require('fs');
const path = require('path');

const FILE_PATH = path.resolve(__dirname, '../../content/agent/ch1-model-fundamentals.md');

let content;

beforeAll(() => {
  content = fs.readFileSync(FILE_PATH, 'utf-8');
});

describe('agent/ch1-model-fundamentals: 基本可用性', () => {
  test('檔案可讀取', () => {
    expect(content.length).toBeGreaterThan(0);
  });
});
