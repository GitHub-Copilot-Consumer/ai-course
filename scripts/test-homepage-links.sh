#!/usr/bin/env bash
# test-homepage-links.sh
# Validates that site/content/_index.md contains all required course chapter links.

set -euo pipefail

INDEX_FILE="site/content/_index.md"
PASS=0
FAIL=0

check_link() {
  local path="$1"
  local label="$2"
  if grep -qF "$path" "$INDEX_FILE"; then
    echo "  PASS: $label ($path)"
    PASS=$((PASS + 1))
  else
    echo "  FAIL: $label ($path) — not found in $INDEX_FILE"
    FAIL=$((FAIL + 1))
  fi
}

echo "Checking homepage course chapter links in $INDEX_FILE..."
echo ""

check_link "/lessons/ch-intro-ai/"       "導言"
check_link "/lessons/ch0-warmup/"        "Ch0 課前暖身"
check_link "/lessons/ch1-vibe-coding/"   "Ch1 Vibe Coding"
check_link "/lessons/ch2-mvp-to-spec/"   "Ch2 MVP to Spec"
check_link "/lessons/ch3-openspec/"      "Ch3 OpenSpec"
check_link "/lessons/ch4-coding-agent/"  "Ch4 Coding Agent"
check_link "/lessons/ch5-verify-observe/" "Ch5 Verify & Observe"
check_link "/lessons/ch6-team/"          "Ch6 Team"
check_link "/lessons/appendix-setup/"    "附錄 Setup"

echo ""
echo "Results: $PASS passed, $FAIL failed"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
