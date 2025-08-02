# Pre-commit Hook Setup

This repository is configured with automated code quality checks that run before every commit.

## What's Included

### 1. **Husky** - Git hooks management

- Automatically installs Git hooks
- Runs on `npm install` via the prepare script

### 2. **lint-staged** - Run linters on staged files

- Only checks files that are being committed
- Automatically fixes issues when possible
- Stages fixed files automatically

### 3. **ESLint** - JavaScript/TypeScript linting

- Checks for code quality issues
- Enforces coding standards
- Auto-fixes many issues

### 4. **Prettier** - Code formatting

- Ensures consistent code style
- Formats TypeScript, JavaScript, JSON, CSS, and Markdown files
- Works alongside ESLint

### 5. **commitlint** - Commit message linting

- Enforces conventional commit format
- Helps maintain a clean git history
- Required format: `type(scope): subject`

## How It Works

When you run `git commit`:

1. **Pre-commit hook** triggers
2. **lint-staged** runs on staged files:
   - ESLint checks and fixes TypeScript/JavaScript files
   - Prettier formats all supported files
3. Fixed files are automatically staged
4. **Commit-msg hook** triggers
5. **commitlint** validates your commit message
6. If all checks pass, the commit proceeds

## Configuration Files

- `.husky/` - Git hooks
- `.eslintrc.json` - ESLint rules
- `.prettierrc` - Prettier configuration
- `.eslintignore` - Files to ignore for ESLint
- `.prettierignore` - Files to ignore for Prettier
- `commitlint.config.js` - Commit message rules
- `package.json` - lint-staged configuration

## Manual Commands

```bash
# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint:fix

# Format with Prettier
npm run format

# Check formatting without changing files
npm run format:check
```

## Troubleshooting

### Hooks not running

```bash
npm run prepare
```

### Bypass hooks (emergency only)

```bash
git commit --no-verify -m "your message"
```

### Fix all files at once

```bash
npm run lint:fix && npm run format
```

## Benefits

1. **Consistent Code Style** - All code follows the same formatting
2. **Catch Errors Early** - Linting catches potential bugs
3. **Clean Git History** - Conventional commits make history readable
4. **Automated** - No need to remember to run checks
5. **Fast** - Only checks changed files
6. **Team Collaboration** - Everyone follows the same standards

## Example Workflow

```bash
# Make your changes
code src/components/NewComponent.tsx

# Stage changes
git add .

# Commit (hooks run automatically)
git commit -m "feat: add NewComponent with animations"

# If there are issues, they're fixed automatically
# If commit message is invalid, you'll be prompted to fix it
```
