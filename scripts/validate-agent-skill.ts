import fs from "node:fs";
import os from "node:os";
import path from "node:path";

type RegistryFile = {
  path: string;
  target?: string;
};

type RegistryItem = {
  name: string;
  files: RegistryFile[];
};

const root = process.cwd();
const skillRoot = path.join(root, "src/registry/sonaui/agent-skill");
const skillPath = path.join(skillRoot, "SKILL.md");
const registryPath = path.join(root, "src/registry/registry.json");
const requiredFixtures = [
  "tests/agent-integrations/clients/codex.md",
  "tests/agent-integrations/clients/claude-code.md",
  "tests/agent-integrations/clients/cursor.md",
  "tests/agent-integrations/scenarios/discover-tabs.md",
  "tests/agent-integrations/scenarios/discover-exact-name-fallback.md",
  "tests/agent-integrations/scenarios/install-component.md",
  "tests/agent-integrations/scenarios/reduced-motion.md",
  "tests/agent-integrations/scenarios/troubleshoot-alias.md",
];
const allowedFrontmatterKeys = new Set([
  "name",
  "description",
  "license",
  "compatibility",
  "metadata",
  "allowed-tools",
]);
const errors: string[] = [];

function collectFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(entryPath) : [entryPath];
  });
}

function parseFrontmatter(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return null;

  const values = new Map<string, string>();
  for (const line of match[1].split(/\r?\n/)) {
    if (/^\s/.test(line) || line.trim() === "") continue;
    const field = line.match(/^([a-z][a-z0-9-]*):\s*(.*)$/);
    if (!field) {
      errors.push(`invalid top-level frontmatter line: ${line}`);
      continue;
    }
    values.set(field[1], field[2].trim().replace(/^['"]|['"]$/g, ""));
  }
  return values;
}

if (!fs.existsSync(skillPath)) {
  errors.push("missing canonical agent skill");
} else {
  const skill = fs.readFileSync(skillPath, "utf8");
  const frontmatter = parseFrontmatter(skill);

  if (!frontmatter) {
    errors.push("SKILL.md is missing valid YAML frontmatter");
  } else {
    for (const key of frontmatter.keys()) {
      if (!allowedFrontmatterKeys.has(key)) {
        errors.push(`unsupported frontmatter key: ${key}`);
      }
    }

    const name = frontmatter.get("name") ?? "";
    const description = frontmatter.get("description") ?? "";
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) || name.length > 64) {
      errors.push("skill name must be kebab-case and at most 64 characters");
    }
    if (!description || description.length > 1024) {
      errors.push("skill description must contain 1–1024 characters");
    }
    if (!description.includes("Use when")) {
      errors.push(
        "skill description must state when the skill should activate",
      );
    }
  }

  const referencePaths = [
    ...skill.matchAll(/`(references\/[a-z0-9-]+\.md)`/g),
  ].map((match) => match[1]);
  for (const referencePath of new Set(referencePaths)) {
    if (!fs.existsSync(path.join(skillRoot, referencePath))) {
      errors.push(`skill references a missing file: ${referencePath}`);
    }
  }

  if (!skill.includes("work is complete only when")) {
    errors.push("workflow is missing its exhaustive completion criterion");
  }

  if (
    !skill.includes("/r/{name}.json") ||
    !skill.includes("absent from the catalog")
  ) {
    errors.push("workflow is missing the exact-name registry fallback");
  }
}

for (const relativePath of requiredFixtures) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    errors.push(`missing compatibility fixture: ${relativePath}`);
  }
}

const registry = JSON.parse(
  fs.readFileSync(registryPath, "utf8"),
) as RegistryItem[];
const item = registry.find((candidate) => candidate.name === "agent-skill");
if (!item) {
  errors.push("registry is missing the agent-skill item");
} else {
  const sourceFiles = new Set(
    collectFiles(skillRoot).map((file) =>
      path
        .relative(path.join(root, "src/registry"), file)
        .split(path.sep)
        .join("/"),
    ),
  );
  const declaredFiles = new Set(
    item.files.map((file) => file.path.replace(/^registry\//, "")),
  );

  for (const sourceFile of sourceFiles) {
    if (!declaredFiles.has(sourceFile)) {
      errors.push(
        `skill source is not declared in the registry: ${sourceFile}`,
      );
    }
  }
  for (const declaredFile of declaredFiles) {
    if (!sourceFiles.has(declaredFile)) {
      errors.push(`registry declares a missing skill source: ${declaredFile}`);
    }
  }

  const fixtureRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), "sona-ui-agent-skill-"),
  );
  try {
    for (const file of item.files) {
      if (!file.target?.startsWith(".agents/skills/sona-ui/")) {
        errors.push(
          `agent skill has a non-portable target: ${file.target ?? "missing"}`,
        );
        continue;
      }
      const sourcePath = path.join(
        root,
        "src/registry",
        file.path.replace(/^registry\//, ""),
      );
      const outputPath = path.join(fixtureRoot, file.target);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.copyFileSync(sourcePath, outputPath);
    }

    const installedRoot = path.join(fixtureRoot, ".agents/skills/sona-ui");
    const installedSkillPath = path.join(installedRoot, "SKILL.md");
    if (!fs.existsSync(installedSkillPath)) {
      errors.push("clean fixture is missing .agents/skills/sona-ui/SKILL.md");
    } else {
      const installedSkill = fs.readFileSync(installedSkillPath, "utf8");
      const installedName = parseFrontmatter(installedSkill)?.get("name");
      if (installedName !== path.basename(installedRoot)) {
        errors.push("installed skill name does not match its parent directory");
      }
      for (const match of installedSkill.matchAll(
        /`(references\/[a-z0-9-]+\.md)`/g,
      )) {
        if (!fs.existsSync(path.join(installedRoot, match[1]))) {
          errors.push(`clean fixture is missing referenced file: ${match[1]}`);
        }
      }
    }
  } finally {
    fs.rmSync(fixtureRoot, { recursive: true, force: true });
  }
}

if (errors.length > 0) {
  console.error("Agent skill validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  "Agent skill schema, references, registry declaration, and clean fixture passed.",
);
