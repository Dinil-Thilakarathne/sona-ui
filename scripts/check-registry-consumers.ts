import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

type RegistryPayload = {
  name: string;
  files: Array<{
    content: string;
    target: string;
  }>;
};

const projectRoot = process.cwd();
const payloadRoot = path.join(projectRoot, "public/r");
const nodeModules = path.join(projectRoot, "node_modules");

function resolveTarget(sourceRoot: string, target: string) {
  const aliases = [
    ["@ui/", "components/ui/"],
    ["@components/", "components/"],
    ["@lib/", "lib/"],
    ["@hooks/", "hooks/"],
  ] as const;

  const alias = aliases.find(([prefix]) => target.startsWith(prefix));
  if (!alias) return null;
  const [prefix, directory] = alias;
  return path.join(sourceRoot, directory, target.slice(prefix.length));
}

function materializeFixture(kind: "next" | "vite") {
  const fixtureRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), `sona-ui-${kind}-consumer-`),
  );
  const sourceRoot = path.join(fixtureRoot, "src");
  fs.mkdirSync(sourceRoot, { recursive: true });
  fs.writeFileSync(
    path.join(sourceRoot, "registry-modules.d.ts"),
    'declare module "*.module.css" { const classes: Record<string, string>; export default classes; }\n',
  );
  fs.symlinkSync(nodeModules, path.join(fixtureRoot, "node_modules"), "dir");

  const payloadFiles = fs
    .readdirSync(payloadRoot)
    .filter((file) => file.endsWith(".json") && file !== "registry.json");

  for (const payloadFile of payloadFiles) {
    const payload = JSON.parse(
      fs.readFileSync(path.join(payloadRoot, payloadFile), "utf8"),
    ) as RegistryPayload;

    for (const file of payload.files) {
      if (!file.content) {
        throw new Error(`${payload.name}: ${file.target} has no content`);
      }
      const outputPath = resolveTarget(sourceRoot, file.target);
      if (!outputPath) {
        throw new Error(`${payload.name}: unsupported target ${file.target}`);
      }
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, file.content);
    }
  }

  fs.writeFileSync(
    path.join(fixtureRoot, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          lib: ["DOM", "DOM.Iterable", "ES2022"],
          allowJs: false,
          skipLibCheck: true,
          strict: true,
          ignoreDeprecations: "6.0",
          noEmit: true,
          esModuleInterop: true,
          module: "ESNext",
          moduleResolution: "Bundler",
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: "react-jsx",
          baseUrl: ".",
          paths: { "@/*": ["./src/*"] },
        },
        include: ["src/**/*.ts", "src/**/*.tsx"],
      },
      null,
      2,
    ),
  );

  try {
    execFileSync(
      path.join(nodeModules, ".bin/tsc"),
      ["--project", path.join(fixtureRoot, "tsconfig.json")],
      { stdio: "inherit" },
    );
    console.log(`${kind}: generated registry payloads compile in isolation.`);
  } finally {
    fs.rmSync(fixtureRoot, { recursive: true, force: true });
  }
}

materializeFixture("next");
materializeFixture("vite");
