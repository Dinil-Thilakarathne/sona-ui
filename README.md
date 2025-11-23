# Sona UI - Modern React Component Library 🚀

Sona UI is a modern, open-source React component library designed to help developers build beautiful, accessible, and responsive web applications faster. Built with **React 19**, **TypeScript**, **Tailwind CSS 4**, and **Motion (Framer Motion)** for smooth animations.

[![npm version](https://img.shields.io/badge/version-2.6.0-blue.svg)](https://github.com/Dinil-Thilakarathne/sona-ui)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

🌐 **[Live Demo](https://sona-ui.vercel.app)** | 📚 **[Documentation](https://sona-ui.vercel.app/docs/home)**

## 📖 Table of Contents

- [Features](#-features)
- [Components](#-components)
- [Getting Started](#-getting-started)
- [Installation via CLI](#-installation-via-cli)
- [Documentation](#-documentation)
- [Tech Stack](#-tech-stack)
- [Contributing](#-contributing)
- [Support](#-support)
- [License](#-license)

## ✨ Features

- **🎨 Beautiful Components**: A growing collection of 10+ production-ready components with smooth animations
- **⚡ Performance First**: Built with React 19 and optimized for performance
- **🎭 Animation Ready**: Powered by Motion (Framer Motion) for fluid, stunning animations
- **📱 Fully Responsive**: Components work seamlessly across all devices and screen sizes
- **♿ Accessible**: Built with accessibility (a11y) best practices in mind
- **🎨 Highly Customizable**: Easily customize components with Tailwind CSS utility classes
- **📦 Easy Installation**: Install components via CLI with a single command
- **🔧 TypeScript Support**: Fully typed components for better developer experience
- **🎯 Tree-shakeable**: Import only what you need to keep your bundle size small
- **🌙 Dark Mode Support**: Built-in theme support with next-themes
- **📖 Comprehensive Docs**: Detailed documentation with code examples and live previews
- **🚀 Open Source**: Free to use, modify, and contribute

## 📦 Components

Sona UI currently includes **10 high-quality components** across 3 categories:

### 🧩 UI Components
- **[Accordion](https://sona-ui.vercel.app/docs/accordion)** - Expandable/collapsible sections with 3 variants (default, bordered, splitted)
- **[Ripple Button](https://sona-ui.vercel.app/docs/rippleButton)** - Interactive button with ripple effect animation on hover
- **[Vertical Tabs](https://sona-ui.vercel.app/docs/verticalTab)** - Vertical tab navigation component
- **[Expandable Tabs](https://sona-ui.vercel.app/docs/expandableTabs)** - Tabs with smooth expand/collapse animations
- **[Link Preview](https://sona-ui.vercel.app/docs/linkPreview)** - Links with beautiful hover preview popups
- **[Bubble Up Button](https://sona-ui.vercel.app/docs/bubbleUpButton)** - Button with bubble up hover animation effects

### ✍️ Text Components
- **[Spinning Text](https://sona-ui.vercel.app/docs/spinningText)** - Animated text with character rotation effects
- **[Stagger Text](https://sona-ui.vercel.app/docs/staggerText)** - Text with staggered animation on reveal

### ✨ Effect Components
- **[Magnetic Button](https://sona-ui.vercel.app/docs/magneticButton)** - Button with magnetic hover effect that follows cursor
- **[Marquee](https://sona-ui.vercel.app/docs/marquee)** - Infinite scrolling marquee with scroll and hover controls

## 🚀 Getting Started

### For Development (Contributors)

Follow these steps to set up Sona UI for development:

#### 1. Clone the Repository

```bash
git clone https://github.com/Dinil-Thilakarathne/sona-ui.git
cd sona-ui
```

#### 2. Install Dependencies

Install the required dependencies using Bun, npm, or yarn:

```bash
yarn install
# or
npm install
# or
bun install
```

#### 3. Run the Development Server

Start the development server:

```bash
yarn dev
# or
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the project in action.

## 🔧 Installation via CLI

The easiest way to use Sona UI components in your project is via the CLI:

### Install the CLI

```bash
npx @sonacode/sonaui-cli@latest init
```

### Add Individual Components

Add components to your project with a single command:

```bash
# Add Accordion component
npx @sonacode/sonaui-cli add Accordion

# Add Ripple Button
npx @sonacode/sonaui-cli add RippleButton

# Add Marquee
npx @sonacode/sonaui-cli add Marquee
```

The CLI will automatically copy the component files to your project along with required dependencies.

## 📚 Documentation

Comprehensive documentation is available for each component with:
- **Live Preview**: Interactive component demonstrations
- **Usage Examples**: Copy-paste ready code snippets
- **Props Table**: Complete API reference
- **Source Code**: Full component implementation
- **CLI Commands**: Easy installation instructions

Visit our [documentation site](https://sona-ui.vercel.app/docs/home) to explore all components.

### Quick Links
- 🏠 [Home](https://sona-ui.vercel.app)
- 📖 [Documentation](https://sona-ui.vercel.app/docs/home)
- 🧩 [Component Library](https://sona-ui.vercel.app/docs/accordion)
- 💬 [Feedback](https://github.com/Dinil-Thilakarathne/sona-ui/issues)

## 🛠️ Tech Stack

Sona UI is built with modern, cutting-edge technologies:

- **[React 19](https://react.dev/)** - Latest React with improved performance and features
- **[TypeScript 5.8](https://www.typescriptlang.org/)** - Type-safe development
- **[Next.js 15.3](https://nextjs.org/)** - React framework with App Router
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Motion (Framer Motion) 12.20](https://motion.dev/)** - Production-ready animation library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Perfect dark mode support
- **[Lenis](https://lenis.studiofreight.com/)** - Smooth scrolling library

## 🤝 Contributing

We welcome and appreciate contributions from the community! Here's how you can contribute:

### Ways to Contribute
- 🐛 Report bugs and issues
- 💡 Suggest new components or features
- 📝 Improve documentation
- 🎨 Submit new components
- ⚡ Optimize existing code
- ✅ Write tests

### Contribution Steps

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/sona-ui.git
   ```
3. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** and commit them with clear, descriptive messages:
   ```bash
   git commit -m "feat: add new component XYZ"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Submit a pull request** to the main repository

### Development Guidelines
- Follow the existing code style and conventions
- Write clear, self-documenting code
- Add TypeScript types for all props and functions
- Test your components thoroughly
- Update documentation for new features
- Use Tailwind CSS for styling
- Ensure components are accessible (a11y)

Please read our [contribution guidelines](CONTRIBUTING.md) for more details.

## 💬 Feedback

We'd love to hear your feedback! Feel free to:
- 🐛 [Report issues](https://github.com/Dinil-Thilakarathne/sona-ui/issues)
- 💡 [Request features](https://github.com/Dinil-Thilakarathne/sona-ui/issues/new)
- ⭐ Star this repository if you find it useful
- 🐦 Follow [@codebydinil](https://twitter.com/codebydinil) for updates

## 🛡️ Support

If you encounter any issues or have questions:
- 📖 Check the [documentation](https://sona-ui.vercel.app/docs/home)
- 🔍 Search [existing issues](https://github.com/Dinil-Thilakarathne/sona-ui/issues)
- 🆕 [Open a new issue](https://github.com/Dinil-Thilakarathne/sona-ui/issues/new)

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all [contributors](https://github.com/Dinil-Thilakarathne/sona-ui/graphs/contributors) who have helped build Sona UI
- Inspired by the amazing work of the React and web development community
- Built with ❤️ by [Dinil Thilakarathne](https://github.com/Dinil-Thilakarathne)

## 📊 Project Stats

- **Version**: 2.6.0
- **Components**: 10+
- **License**: MIT
- **React Version**: 19.0.0
- **TypeScript**: ✅
- **Tailwind CSS**: 4.1.11

---

<div align="center">

**[⬆ back to top](#sona-ui---modern-react-component-library-)**

Made with ❤️ by [Dinil Thilakarathne](https://github.com/Dinil-Thilakarathne)

Give it a ⭐ if you like this project!

</div>
