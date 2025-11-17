# Contributing to Sona UI 🤝

First off, thank you for considering contributing to Sona UI! It's people like you that make Sona UI such a great component library. We welcome contributions from the community and are grateful for every pull request, issue report, or suggestion.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Component Development Guidelines](#component-development-guidelines)
- [Documentation Guidelines](#documentation-guidelines)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Component Registry](#component-registry)
- [Questions and Support](#questions-and-support)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. We expect all contributors to:

- Be respectful and considerate in communications
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.9.0 or higher)
- **Bun**, **npm**, or **yarn** package manager
- **Git** for version control
- A code editor (we recommend VS Code)

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug Reports**: Help us identify and fix issues
- 💡 **Feature Requests**: Suggest new components or features
- 📝 **Documentation**: Improve or add documentation
- 🎨 **New Components**: Create new UI components
- ⚡ **Performance Improvements**: Optimize existing code
- ✅ **Tests**: Add or improve test coverage
- 🔧 **Bug Fixes**: Fix reported issues

## Development Setup

### 1. Fork and Clone the Repository

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/sona-ui.git
cd sona-ui

# Add the upstream repository
git remote add upstream https://github.com/Dinil-Thilakarathne/sona-ui.git
```

### 2. Install Dependencies

We use **Yarn** as the package manager (as specified in `package.json`):

```bash
yarn install
# or
npm install
# or
bun install
```

### 3. Run the Development Server

```bash
yarn dev
# or
npm run dev
# or
bun dev
```

The development server will start at `http://localhost:3000` with Turbopack enabled for fast refresh.

### 4. Build the Project

```bash
yarn build
# or
npm run build
# or
bun run build
```

Note: Both `dev` and `build` commands automatically run the `copy-sources.js` script via `predev` and `prebuild` hooks to copy component source files.

## Project Structure

Understanding the project structure will help you navigate the codebase:

```
sona-ui/
├── .github/
│   ├── workflows/           # GitHub Actions workflows
│   │   ├── release.yml      # Semantic release automation
│   │   └── sync-components-json.yml  # Syncs components.json to CLI repo
│   └── FUNDING.yml
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js 15 App Router
│   │   ├── docs/           # Documentation pages
│   │   ├── api/            # API routes
│   │   └── playground/     # Component playground
│   ├── assets/             # Images, icons, SVGs
│   ├── components/         # Shared components
│   │   ├── Common/         # Common UI components
│   │   ├── Header/         # Header component
│   │   ├── Hero/           # Hero section
│   │   └── ComponentsSidebar/ # Documentation sidebar
│   ├── content/            # MDX documentation files
│   ├── registry/           # Component registry
│   │   ├── sonaui/        # Main component library
│   │   │   ├── accordion/
│   │   │   ├── bubbleUpButton/
│   │   │   ├── expandableTabs/
│   │   │   ├── linkPreview/
│   │   │   ├── magnetic/
│   │   │   ├── marquee/
│   │   │   ├── rippleButton/
│   │   │   ├── spinningText/
│   │   │   ├── staggerText/
│   │   │   └── verticalTab/
│   │   └── example/       # Component examples
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── config/             # Configuration files
├── components.json         # Component registry metadata
├── content-collections.ts  # MDX content configuration
├── copy-sources.js         # Script to copy source files
├── manifest.json           # PWA manifest
├── release.config.cjs      # Semantic release configuration
├── package.json
├── tsconfig.json
└── README.md
```

## How to Contribute

### Creating a New Branch

Always create a new branch for your work:

```bash
# Sync with upstream
git fetch upstream
git checkout master
git merge upstream/master

# Create a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - for new features or components
- `fix/` - for bug fixes
- `docs/` - for documentation updates
- `refactor/` - for code refactoring
- `perf/` - for performance improvements

## Component Development Guidelines

### Creating a New Component

When creating a new component, follow these steps:

#### 1. Create Component Directory

```bash
# Navigate to the registry
cd src/registry/sonaui/
mkdir your-component-name
cd your-component-name
```

#### 2. Create Component Files

Create your component file (e.g., `YourComponent.tsx`):

```typescript
"use client";

import React from "react";
import { motion } from "motion/react";

export interface YourComponentProps {
  children?: React.ReactNode;
  className?: string;
  // Add your props here
}

export default function YourComponent({
  children,
  className,
}: YourComponentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
```

#### 3. Component Best Practices

- **Use TypeScript**: All components must be written in TypeScript with proper type definitions
- **Use "use client"**: Add the `"use client"` directive for components using hooks or browser APIs
- **Export Props Interface**: Always export the props interface for documentation
- **Tailwind CSS**: Use Tailwind CSS for styling (v4.1.11)
- **Motion/Framer Motion**: Use the `motion` library for animations
- **Accessibility**: Ensure components are accessible (ARIA labels, keyboard navigation)
- **Responsive Design**: Components should work on all screen sizes
- **Dark Mode**: Support theme switching with `next-themes`

#### 4. Create Example Component

Create an example file in `src/registry/example/`:

```typescript
"use client";

import YourComponent from "@/registry/sonaui/your-component-name/YourComponent";

export default function YourComponent_ex() {
  return (
    <YourComponent>
      Example usage
    </YourComponent>
  );
}
```

#### 5. Add to Component Registry

Update `components.json` with your new component metadata:

```json
{
  "name": "YourComponentName",
  "type": "sonaui",
  "files": [
    {
      "path": "registry/sonaui/your-component-name/YourComponent.tsx",
      "type": "component"
    }
  ],
  "dependencies": [],
  "devDependencies": [],
  "category": "ui"
}
```

#### 6. Update Navigation

Add your component to `src/config/data.ts` in the `componentNavigationLinks` array:

```typescript
{
  name: "Your Component",
  slug: "your-component-name",
  tag: "new", // or "updated", remove after some time
  type: "ui" // or "text" or "effect"
}
```

## Documentation Guidelines

### Creating Component Documentation

Create an MDX file in `src/content/docs/` (e.g., `your-component-name.mdx`):

```mdx
---
title: Your Component
description: A brief description of your component
---

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

Install the component using the Sona UI CLI:

\`\`\`bash
npx @sonacode/sonaui-cli add YourComponentName
\`\`\`

## Usage

\`\`\`tsx
import YourComponent from "@/registry/sonaui/your-component-name/YourComponent";

export default function Example() {
  return (
    <YourComponent>
      Your content here
    </YourComponent>
  );
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | The content to display |
| className | string | - | Additional CSS classes |

## Dependencies

- motion (Framer Motion)
- clsx
- tailwind-merge

## Accessibility

- Describe accessibility features
- Keyboard navigation support
- ARIA attributes used
```

### Documentation Best Practices

- **Clear and Concise**: Write clear, easy-to-understand documentation
- **Code Examples**: Provide practical, copy-paste ready examples
- **Props Table**: Document all props with types and descriptions
- **Dependencies**: List all required dependencies
- **Accessibility**: Document accessibility features
- **Live Preview**: Use the component preview system when possible

## Code Style Guidelines

### TypeScript

- Use TypeScript for all code
- Define proper interfaces for component props
- Avoid using `any` type
- Use type inference where possible

### React

- Use functional components with hooks
- Follow React best practices and hooks rules
- Use `"use client"` directive for client components
- Prefer named exports for components

### Styling

- Use **Tailwind CSS** utility classes
- Follow the existing color scheme and design patterns
- Use CSS variables defined in `globals.css` for theming
- Ensure dark mode support with `dark:` variant
- Keep styles consistent with existing components

### Code Formatting

We use **Prettier** with Tailwind CSS plugin:

```bash
# Format your code (if you have prettier installed globally)
npx prettier --write .
```

Prettier configuration (`.prettierrc`):
```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Linting

We use **ESLint** with Next.js configuration:

```bash
yarn lint
# or
npm run lint
```

## Testing Guidelines

### Manual Testing

Before submitting your changes:

1. **Visual Testing**: Test your component in the development server
2. **Responsive Testing**: Check behavior on different screen sizes
3. **Dark Mode**: Test both light and dark themes
4. **Browser Testing**: Test in major browsers (Chrome, Firefox, Safari)
5. **Accessibility**: Test with screen readers and keyboard navigation
6. **Edge Cases**: Test with various props and edge cases

### Testing Checklist

- [ ] Component renders correctly
- [ ] Props work as expected
- [ ] Responsive on mobile, tablet, and desktop
- [ ] Dark mode works correctly
- [ ] Animations are smooth and performant
- [ ] Accessible with keyboard navigation
- [ ] No console errors or warnings
- [ ] TypeScript compiles without errors

## Pull Request Process

### Before Submitting

1. **Sync with Upstream**: Ensure your fork is up to date
   ```bash
   git fetch upstream
   git merge upstream/master
   ```

2. **Test Your Changes**: Run the development server and test thoroughly

3. **Lint Your Code**: Ensure no linting errors
   ```bash
   yarn lint
   ```

4. **Build the Project**: Verify the build succeeds
   ```bash
   yarn build
   ```

5. **Self-Review**: Review your own changes before submitting

### Creating a Pull Request

1. **Push Your Branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request**: Go to GitHub and create a PR from your fork to the main repository

3. **Fill Out the Template**: Provide a clear description of your changes

4. **Link Issues**: Reference any related issues (e.g., "Closes #123")

### PR Title Format

Use conventional commit format for PR titles:

- `feat: add new Carousel component`
- `fix: resolve accordion animation issue`
- `docs: update contribution guidelines`
- `style: improve button hover effects`
- `refactor: optimize marquee component`
- `perf: improve animation performance`

### PR Description Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots (if applicable)
Add screenshots showing before/after

## Checklist
- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console warnings or errors
- [ ] Tested on multiple browsers
- [ ] Responsive design verified
- [ ] Dark mode tested
- [ ] Accessibility checked
```

### Review Process

- Maintainers will review your PR and may request changes
- Address feedback by pushing new commits to your branch
- Once approved, your PR will be merged
- Your contribution will be included in the next release

## Commit Message Guidelines

We use **Conventional Commits** and **Semantic Release** for automated versioning and changelog generation.

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature (triggers minor version bump)
- **fix**: A bug fix (triggers patch version bump)
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without functionality changes
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependencies updates
- **ci**: CI/CD changes

### Examples

```bash
# New feature
git commit -m "feat: add Carousel component with auto-play support"

# Bug fix
git commit -m "fix: resolve accordion animation glitch on mobile"

# Documentation
git commit -m "docs: add usage examples for Marquee component"

# Breaking change (triggers major version bump)
git commit -m "feat!: redesign Button API with new prop structure

BREAKING CHANGE: The 'variant' prop has been renamed to 'style'"
```

### Commit Best Practices

- Write clear, descriptive commit messages
- Keep commits focused on a single change
- Reference issue numbers when applicable
- Use present tense ("add" not "added")
- Keep subject line under 72 characters

## Component Registry

The `components.json` file is the source of truth for the component registry and is automatically synced to the [sonaui-cli](https://github.com/Dinil-Thilakarathne/sonaui-cli) repository.

### Registry Structure

```json
{
  "name": "ComponentName",
  "type": "sonaui",
  "files": [
    {
      "path": "registry/sonaui/component-name/Component.tsx",
      "type": "component"
    }
  ],
  "dependencies": ["motion", "clsx"],
  "devDependencies": [],
  "category": "ui"
}
```

### Categories

- **ui**: UI Components (Accordion, Button, Tabs, etc.)
- **text**: Text Components (SpinningText, StaggerText)
- **effect**: Effect Components (MagneticButton, Marquee)

### Auto-Sync to CLI

When you update `components.json`, GitHub Actions automatically syncs it to the CLI repository, making components available via:

```bash
npx @sonacode/sonaui-cli add ComponentName
```

## Questions and Support

### Getting Help

- 📖 **Documentation**: Check the [documentation site](https://sona-ui.vercel.app/docs/home)
- 🐛 **Issues**: Search [existing issues](https://github.com/Dinil-Thilakarathne/sona-ui/issues)
- 💬 **Discussions**: Start a discussion for questions
- 🐦 **Twitter**: Follow [@codebydinil](https://twitter.com/codebydinil)

### Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce the bug
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Environment**:
   - OS (Windows, macOS, Linux)
   - Browser and version
   - Node.js version
   - Package manager and version
6. **Screenshots**: If applicable
7. **Code Sample**: Minimal reproduction code

### Requesting Features

When requesting features:

1. **Use Case**: Describe the use case for the feature
2. **Proposed Solution**: Suggest how it could work
3. **Alternatives**: Describe alternatives you've considered
4. **Examples**: Provide examples from other libraries if applicable

## Release Process

Sona UI uses **Semantic Release** for automated releases:

1. Commits are analyzed using conventional commit format
2. Version is automatically determined based on commit types
3. Changelog is generated from commit messages
4. GitHub release is created with release notes
5. Tags are created automatically

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **Major** (x.0.0): Breaking changes
- **Minor** (0.x.0): New features (backward compatible)
- **Patch** (0.0.x): Bug fixes

## Recognition

All contributors will be:

- Listed in the project's contributors on GitHub
- Mentioned in release notes if applicable
- Appreciated in the community

## License

By contributing to Sona UI, you agree that your contributions will be licensed under the MIT License.

## Thank You! 🙏

Thank you for taking the time to contribute to Sona UI! Every contribution, no matter how small, helps make this project better for everyone.

---

<div align="center">

**[⬆ Back to Top](#contributing-to-sona-ui-)**

Made with ❤️ by the Sona UI community

</div>
