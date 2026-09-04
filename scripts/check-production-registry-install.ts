import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const fixtureRoot = fs.mkdtempSync(
  path.join(os.tmpdir(), "sona-ui-production-consumer-"),
);

const components = {
  $schema: "https://ui.shadcn.com/schema.json",
  style: "new-york",
  rsc: false,
  tsx: true,
  tailwind: {
    config: "",
    css: "src/index.css",
    baseColor: "neutral",
    cssVariables: true,
  },
  aliases: {
    components: "@/components",
    utils: "@/lib/utils",
    ui: "@/components/ui",
    lib: "@/lib",
    hooks: "@/hooks",
  },
  registries: {
    "@sona-ui": "https://sonaui.com/r/{name}.json",
  },
};

try {
  fs.mkdirSync(path.join(fixtureRoot, "src"), { recursive: true });
  fs.writeFileSync(
    path.join(fixtureRoot, "package.json"),
    `${JSON.stringify({ name: "sona-ui-production-consumer", private: true }, null, 2)}\n`,
  );
  fs.writeFileSync(
    path.join(fixtureRoot, "components.json"),
    `${JSON.stringify(components, null, 2)}\n`,
  );
  fs.writeFileSync(
    path.join(fixtureRoot, "tsconfig.json"),
    `${JSON.stringify(
      {
        compilerOptions: {
          baseUrl: ".",
          paths: { "@/*": ["./src/*"] },
        },
      },
      null,
      2,
    )}\n`,
  );
  fs.writeFileSync(
    path.join(fixtureRoot, "src/index.css"),
    '@import "tailwindcss";\n',
  );

  execFileSync(
    "npx",
    ["--yes", "shadcn@latest", "add", "@sona-ui/button", "--yes"],
    { cwd: fixtureRoot, stdio: "inherit" },
  );

  const expectedFiles = [
    "src/components/ui/button.tsx",
    "src/lib/sona-utils.ts",
    "src/lib/sona-motion.ts",
  ];
  for (const relativePath of expectedFiles) {
    if (!fs.existsSync(path.join(fixtureRoot, relativePath))) {
      throw new Error(`production install did not create ${relativePath}`);
    }
  }

  const packageJson = JSON.parse(
    fs.readFileSync(path.join(fixtureRoot, "package.json"), "utf8"),
  ) as { dependencies?: Record<string, string> };
  if (!packageJson.dependencies?.motion) {
    throw new Error("production install did not add the motion dependency");
  }

  execFileSync(
    "npx",
    ["--yes", "shadcn@latest", "add", "@sona-ui/agent-skill", "--yes"],
    { cwd: fixtureRoot, stdio: "inherit" },
  );

  const expectedSkillFiles = [
    ".agents/skills/sona-ui/SKILL.md",
    ".agents/skills/sona-ui/references/component-selection.md",
    ".agents/skills/sona-ui/references/consumer-validation.md",
    ".agents/skills/sona-ui/references/design-principles.md",
    ".agents/skills/sona-ui/references/provider-setup.md",
  ];
  for (const relativePath of expectedSkillFiles) {
    if (!fs.existsSync(path.join(fixtureRoot, relativePath))) {
      throw new Error(
        `production skill install did not create ${relativePath}`,
      );
    }
  }

  console.log(
    "Production registry smoke test passed for @sona-ui/button and @sona-ui/agent-skill.",
  );
} finally {
  fs.rmSync(fixtureRoot, { recursive: true, force: true });
}
