# Contributing to UI Library

## Development Setup

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Storybook for development:
   ```bash
   npm run storybook
   ```

## Code Quality

This project uses automated tools to maintain code quality:

### Pre-commit Hooks

We use Husky and lint-staged to automatically run linting and formatting on staged files before each commit.

- **ESLint**: Checks for code quality issues
- **Prettier**: Formats code consistently

The pre-commit hook will:

1. Run ESLint with auto-fix on all TypeScript/JavaScript files
2. Run Prettier to format all supported files
3. Stage the fixed files automatically

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This is enforced by commitlint.

#### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `revert`: Reverts a previous commit

#### Examples

```bash
# Good
git commit -m "feat: add new Switch component"
git commit -m "fix: resolve onClick handler in Button component"
git commit -m "docs: update README with installation instructions"
git commit -m "style: format code with prettier"
git commit -m "refactor: simplify Accordion state management"

# Bad (will be rejected)
git commit -m "added switch"  # Missing type
git commit -m "Fix: button"    # Type should be lowercase
git commit -m "feat:"          # Missing subject
```

### Manual Commands

You can also run these commands manually:

```bash
# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint:fix

# Run Prettier
npm run format

# Check Prettier formatting
npm run format:check
```

## Creating Components

When creating new components:

1. Follow the existing component structure
2. Include comprehensive TypeScript types
3. Add Storybook stories with all variants
4. Use the established patterns (compound components, extensive props, etc.)
5. Ensure accessibility with proper ARIA attributes
6. Add documentation in the story file

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Add/update Storybook stories
4. Ensure your commits follow the convention
5. Request review from maintainers
