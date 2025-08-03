# CI/CD Documentation

## Overview

This project uses GitHub Actions for automated versioning and publishing to npm. When a PR is merged to the main branch, the version is automatically bumped and the package is published.

## Workflows

### 1. PR Checks (`pr-checks.yml`)

- Runs on all pull requests
- Validates code quality (lint, format, build)
- Enforces package size limit (< 1.5MB)
- Only fails on ESLint errors (warnings are allowed)

### 2. PR Labels (`pr-labels.yml`)

- Automatically labels PRs based on title
- Labels determine version bump type
- Use conventional commit format in PR titles

### 3. Auto Version & Publish (`publish.yml`)

- Triggers when PRs are merged to master/main
- Automatically determines version bump type
- Bumps version, creates git tag, and publishes to npm
- Creates GitHub release

## Version Bump Rules

The version bump type is determined by (in order of precedence):

1. **PR Labels** (if PR merge detected)
   - `major` label → Major version bump (1.0.0 → 2.0.0)
   - `minor` label → Minor version bump (1.0.0 → 1.1.0)
   - `patch` label → Patch version bump (1.0.0 → 1.0.1)

2. **Commit Message** (fallback)
   - Contains "BREAKING CHANGE" or "!" → Major bump
   - Starts with "feat:" → Minor bump
   - Everything else → Patch bump

## PR Title Conventions

Use these prefixes in your PR titles for automatic labeling:

- `feat:` - New features (triggers minor bump)
- `fix:` - Bug fixes (triggers patch bump)
- `docs:` - Documentation changes (triggers patch bump)
- `chore:` - Maintenance tasks (triggers patch bump)
- Add "BREAKING CHANGE" or "!" for major bumps

### Examples:

- `feat: add new Button component` → minor bump
- `fix: resolve input validation issue` → patch bump
- `feat!: redesign API interface` → major bump
- `chore: update dependencies` → patch bump

## Manual Version Bump

If you need to manually control the version:

1. Go to Actions → Version Bump workflow
2. Click "Run workflow"
3. Select version type (patch/minor/major/prerelease)
4. This creates a PR with the version change

## Setup Requirements

1. **NPM Token**: Add `NPM_TOKEN` secret in repository settings
   - Go to [npmjs.com](https://www.npmjs.com/) → Click your avatar → Access Tokens
   - Click "Generate New Token" → "Classic Token"
   - Select type: "Automation" (for CI/CD)
   - Copy the token (starts with `npm_`)
   - In GitHub: Settings → Secrets and variables → Actions → New repository secret
   - Name: `NPM_TOKEN`
   - Value: paste your npm token

2. **Branch Protection**: Recommended settings for main branch
   - Require PR reviews
   - Require status checks to pass
   - Include `quality-checks` workflow

## Troubleshooting

- **Publish fails**: Check NPM_TOKEN is valid and has publish permissions
- **Version not bumping**: Ensure PR title follows conventions
- **Tests failing**: Add tests or remove `continue-on-error` from test steps
- **Package too large**: Run build locally and check with `npm pack --dry-run`

## Skip CI

To skip the auto-version workflow (e.g., for documentation changes), include `[skip ci]` in your commit message when merging.
