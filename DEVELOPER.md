# Developer Guide

This guide covers all procedures for making changes, committing, and publishing the `multi-selectbox-js` package to npm.

## Quick Start

### 1. Make Changes & Publish (Same Branch)
```bash
# 1. Make your changes to source files
# 2. Build the package
npm run build

# 3. Add and commit changes
git add .
git commit -m "feat: Your feature description"

# 4. Bump version and publish
npm version patch  # or minor/major
npm publish

# 5. Push to GitHub
git push origin staging
```

## Detailed Procedures

### Option A: Direct Changes (Same Branch)

**Use this for:**
- Small bug fixes
- Documentation updates
- Minor feature additions

**Steps:**
```bash
# 1. Ensure you're on staging branch
git checkout staging
git pull origin staging

# 2. Make your changes to source files
# - Edit src/js/multi-selectbox-js.js
# - Edit src/css/multi-selectbox-js.css
# - Update README.md if needed
# - Update demo.html if needed

# 3. Build the package
npm run build

# 4. Test your changes
# - Open demo.html in browser
# - Test functionality

# 5. Add and commit changes
git add .
git commit -m "feat: Add new feature description"
# or
git commit -m "fix: Fix bug description"
# or
git commit -m "docs: Update documentation"

# 6. Bump version
npm version patch    # for bug fixes (1.1.0 -> 1.1.1)
npm version minor    # for new features (1.1.0 -> 1.2.0)
npm version major    # for breaking changes (1.1.0 -> 2.0.0)

# 7. Publish to npm
npm publish

# 8. Push to GitHub
git push origin staging
```

### Option B: Feature Branch Workflow

**Use this for:**
- Major features
- Complex changes
- Multiple developers
- Code review process

**Steps:**
```bash
# 1. Create and switch to new feature branch
git checkout staging
git pull origin staging
git checkout -b feature/your-feature-name

# 2. Make your changes
# - Edit source files
# - Update documentation
# - Test thoroughly

# 3. Build and test
npm run build
# Test in browser

# 4. Commit changes
git add .
git commit -m "feat: Add your feature description"

# 5. Push feature branch
git push origin feature/your-feature-name

# 6. Create Pull Request (on GitHub)
# - Go to GitHub repository
# - Click "Compare & pull request"
# - Set base: staging, compare: feature/your-feature-name
# - Add description and review

# 7. Merge to staging (after review)
git checkout staging
git pull origin staging
git merge feature/your-feature-name

# 8. Bump version and publish
npm version minor  # or appropriate version bump
npm publish

# 9. Push to GitHub
git push origin staging

# 10. Clean up (optional)
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

## Version Bumping Guidelines

### `npm version patch` (1.1.0 → 1.1.1)
- Bug fixes
- Documentation updates
- Minor CSS adjustments
- Performance improvements

### `npm version minor` (1.1.0 → 1.2.0)
- New features
- New configuration options
- Backward-compatible API changes
- New demo examples

### `npm version major` (1.1.0 → 2.0.0)
- Breaking changes
- API changes that break existing code
- Major refactoring
- Complete redesign

## Commit Message Format

Use conventional commit format:
```bash
git commit -m "type: description"

# Types:
# feat:     New feature
# fix:      Bug fix
# docs:     Documentation changes
# style:    Code style changes (formatting, etc.)
# refactor: Code refactoring
# test:     Adding tests
# chore:    Maintenance tasks
```

**Examples:**
```bash
git commit -m "feat: Add color customization feature"
git commit -m "fix: Resolve dropdown positioning issue"
git commit -m "docs: Update README with new examples"
git commit -m "style: Improve code formatting"
```

## File Structure

```
multi-selectbox-js/
├── src/
│   ├── js/
│   │   └── multi-selectbox-js.js    # Main JavaScript file
│   └── css/
│       └── multi-selectbox-js.css   # Main CSS file
├── dist/                            # Built files (auto-generated)
│   ├── multi-selectbox-js.js
│   └── multi-selectbox-js.css
├── demo.html                        # Demo file
├── package.json                     # Package configuration
├── README.md                        # Documentation
└── DEVELOPER.md                     # This file
```

## Important Notes

### Before Publishing:
1. **Always build first**: `npm run build`
2. **Test thoroughly**: Open demo.html in browser
3. **Check package.json**: Ensure version and description are correct
4. **Update README**: If adding new features or options

### After Publishing:
1. **Verify on npm**: Check https://www.npmjs.com/package/multi-selectbox-js
2. **Test CDN**: Verify https://unpkg.com/multi-selectbox-js@latest/dist/multi-selectbox-js.js
3. **Update documentation**: If needed

### Common Commands Reference:

```bash
# Build package
npm run build

# Check current version
npm version

# Check git status
git status

# Check current branch
git branch

# View commit history
git log --oneline -10

# Check npm package info
npm info multi-selectbox-js

# Install dependencies (if any added)
npm install

# Run tests (if configured)
npm test
```

## Troubleshooting

### If publish fails:
```bash
# Check if logged in to npm
npm whoami

# Login to npm
npm login

# Check package.json for errors
npm run build
```

### If git push fails:
```bash
# Pull latest changes first
git pull origin staging

# Resolve conflicts if any
# Then push again
git push origin staging
```

### If version bump fails:
```bash
# Check if working directory is clean
git status

# Commit any pending changes first
git add .
git commit -m "fix: Resolve pending changes"
```

## Quick Reference

| Action | Command |
|--------|---------|
| Build | `npm run build` |
| Commit | `git add . && git commit -m "type: message"` |
| Version bump | `npm version patch/minor/major` |
| Publish | `npm publish` |
| Push | `git push origin staging` |
| Create branch | `git checkout -b feature/name` |
| Switch branch | `git checkout branch-name` |
| Merge branch | `git merge feature/name` |

---

**Remember**: Always test your changes before publishing, and use meaningful commit messages! 