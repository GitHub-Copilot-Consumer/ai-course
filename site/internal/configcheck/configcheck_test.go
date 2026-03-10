package configcheck

import (
	"os"
	"path/filepath"
	"testing"
)

func TestConfigIncludesHugoBookTheme(t *testing.T) {
	contents := readConfig(t)
	if !HasHugoBookTheme(contents) {
		t.Fatalf("expected config to include hugo-book theme")
	}
}

func readConfig(t *testing.T) string {
	t.Helper()
	configPath := filepath.Join("..", "..", "config.yaml")
	contents, err := os.ReadFile(configPath)
	if err != nil {
		t.Fatalf("read config: %v", err)
	}
	return string(contents)
}
