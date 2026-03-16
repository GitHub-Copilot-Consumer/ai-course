## 1. Update CI Workflow

- [x] 1.1 In `.github/workflows/deploy.yml`, change `hugo-version` from `0.120.4` to `0.147.0`
- [ ] 1.2 Commit the change with message: `fix(ci): upgrade Hugo to 0.147.0 for hextra v0.12.1 compatibility`

## 2. Verify

- [ ] 2.1 Push to `main` and confirm the GitHub Actions deploy job completes successfully with no build errors
- [ ] 2.2 Confirm the deployed GitHub Pages site renders correctly
