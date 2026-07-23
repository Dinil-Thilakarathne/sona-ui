import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const skillPath = path.join(root, "src/registry/sonaui/agent-skill/SKILL.md");
const requiredFiles = [
  "tests/agent-integrations/clients/codex.md",
  "tests/agent-integrations/clients/claude-code.md",
  "tests/agent-integrations/clients/cursor.md",
  "tests/agent-integrations/scenarios/discover-tabs.md",
  "tests/agent-integrations/scenarios/install-component.md",
  "tests/agent-integrations/scenarios/reduced-motion.md",
  "tests/agent-integrations/scenarios/troubleshoot-alias.md",
];
const requiredSkillTerms = [
  "@sona-ui",
  "agent catalog",
  "prefers-reduced-motion",
  "Inspect the consumer",
  "Install the smallest useful set",
];
const errors: string[] = [];

if (!fs.existsSync(skillPath)) {
  errors.push("missing canonical agent skill");
} else {
  const skill = fs.readFileSync(skillPath, "utf8");
  for (const term of requiredSkillTerms) {
    if (!skill.includes(term))
      errors.push(`skill is missing required guidance: ${term}`);
  }
}

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    errors.push(`missing compatibility fixture: ${relativePath}`);
  }
}

if (errors.length > 0) {
  console.error("Agent skill validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Agent skill validation passed.");
