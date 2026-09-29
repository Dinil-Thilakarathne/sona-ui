<div align="center">

# Sona UI

**Animated React components you copy into your project, not a dependency.**

Beautifully animated, accessible, and fully typed components built on React 19, Tailwind CSS 4, and Motion. Install what you need with a single command and own the code.

<p>
<a href="https://vercel.com/open-source-program">
  <img alt="Vercel Open Source Program" src="https://vercel.com/oss/program-badge-2026.svg" height="48" />
</a>
</p>

<p>
<a href="LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-green.svg" /></a>
<a href="CONTRIBUTING.md"><img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" /></a>
</p>

<p>
<a href="https://sonaui.com">Website</a> · <a href="https://sonaui.com/docs/home">Documentation</a> · <a href="https://sonaui.com/components">Components</a> · <a href="https://sonaui.com/tools/motion-lab">Motion Lab</a>
</p>

</div>

---

## Quick Start

Add any component to your project with the [shadcn](https://ui.shadcn.com/docs/cli) CLI. Components are copied into your project along with the dependencies they need.

If your project does not already have a `components.json` file, initialize shadcn first:

```bash
npx shadcn@latest init
```

Then add the Sona UI registry to `components.json`:

```json
{
  "registries": {
    "@sona-ui": {
      "url": "https://sonaui.com/r/{name}.json"
    }
  }
}
```

Install the component you need:

```bash
npx shadcn@latest add @sona-ui/accordion
```

Browse the full catalog, source, API, and live previews in the [documentation](https://sonaui.com/docs/home), where each component page has its own install command.

## Why Sona UI

- **You own the code:** Components are copied into your codebase, so you can read, edit, and extend them freely.
- **Purposeful motion:** Thoughtful easing and spring physics with `prefers-reduced-motion` support.
- **Accessible by default:** Semantic interactive elements, keyboard navigation, screen reader support, and ARIA wiring.
- **Fully typed:** Every component ships with complete TypeScript definitions.
- **Themed and responsive:** Tailwind CSS 4 tokens with built-in light and dark mode support.

## Components

Sona UI includes 40+ source-owned components across actions, inputs, navigation, disclosure, text, motion, and shaders. Explore the catalog in the [component gallery](https://sonaui.com/components), then open a component's documentation for its source, API, and live demo.

## AI Agents

Sona UI includes resources for coding agents to discover, select, install, and validate components with the same accessibility and motion expectations as the documentation. Start with the [agent catalog](https://sonaui.com/agent/catalog.json) or the [LLM index](https://sonaui.com/llms.txt).

## Motion Lab

[Motion Lab](https://sonaui.com/tools/motion-lab) lets you tune the Animated Dialog visually, compare motion presets, and copy the resulting code.

## Tech Stack

[Next.js 16](https://nextjs.org/) · [React 19](https://react.dev/) · [TypeScript](https://www.typescriptlang.org/) · [Tailwind CSS 4](https://tailwindcss.com/) · [Motion](https://motion.dev/) · [Base UI](https://base-ui.com/) · [next-themes](https://github.com/pacocoursey/next-themes)

## Local Development

Requires [Bun](https://bun.sh/).

```bash
git clone https://github.com/Dinil-Thilakarathne/sona-ui.git
cd sona-ui
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

`bun dev` synchronizes the generated changelog from GitHub before starting the development server. Set `GITHUB_TOKEN` from [`.env.example`](.env.example) to avoid GitHub API rate limits. When working offline, use the following command to start Next.js without synchronizing releases:

```bash
bunx next dev --turbopack
```

## Contributing

Contributions are welcome: new components, bug fixes, and docs improvements. Fork the repository, create a feature branch, and open a pull request. Keep components accessible, typed, keyboard navigable, screen reader friendly, and respectful of reduced-motion preferences. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

Before opening a pull request, run the checks relevant to your change:

```bash
bun run typecheck
bun run check:registry
bun run check:agent-resources
bun run check:a11y
```

For registry components, also regenerate the registry and agent resources before committing:

```bash
bun run build:registry
bun run build:agent-resources
```

## License

[MIT](LICENSE) © [Dinil Thilakarathne](https://github.com/Dinil-Thilakarathne)

<div align="center">

If Sona UI is useful to you, consider giving it a ⭐

</div>
