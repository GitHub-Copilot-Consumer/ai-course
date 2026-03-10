package configcheck

import "strings"

const (
	HugoBookTheme = "theme: \"hugo-book\""
)

func HasHugoBookTheme(contents string) bool {
	return strings.Contains(contents, HugoBookTheme)
}
