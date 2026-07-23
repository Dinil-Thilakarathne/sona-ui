import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

/**
 * Extracts prop metadata from the source `*Props` interfaces/types of every
 * component in `src/registry/sonaui/**` and writes a generated
 * `src/registry/prop-types.ts`. This makes the documented prop tables a
 * projection of the real source types — they cannot drift.
 *
 * Descriptions and defaults come from JSDoc on each member:
 *   - the JSDoc comment text becomes `description`
 *   - an `@default <value>` tag becomes `default`
 *   - a member without `?` is `required`
 *
 * Only members declared directly on the interface/type are emitted; inherited
 * DOM attribute members (e.g. from `React.ButtonHTMLAttributes`) are skipped.
 */

const REGISTRY_PATH = path.join(process.cwd(), "src/registry");
const COMPONENT_PATH = path.join(REGISTRY_PATH, "sonaui");
const OUTPUT_FILE = path.join(REGISTRY_PATH, "prop-types.ts");

type PropMeta = {
  name: string;
  type: string;
  default: string;
  description: string;
};

function toKebabCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function collectTsxFiles(dir: string): string[] {
  const out: string[] = [];
  for (const item of fs.readdirSync(dir)) {
    const p = path.join(dir, item);
    if (fs.statSync(p).isDirectory()) out.push(...collectTsxFiles(p));
    else if (p.endsWith(".tsx") || p.endsWith(".ts")) out.push(p);
  }
  return out;
}

/** Normalizes a written type to a compact single-line string. */
function normalizeType(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function getJsDoc(node: ts.Node): { description: string; default?: string } {
  // @ts-expect-error - jsDoc is internal on Node in TypeScript AST
  const jsDocNodes = (node as unknown as { jsDoc?: ts.JSDoc[] }).jsDoc ?? [];
  let def: string | undefined;
  let description = "";

  for (const doc of jsDocNodes) {
    if (doc.comment) {
      description += `${typeof doc.comment === "string" ? doc.comment : (ts.getTextOfJSDocComment(doc.comment) ?? "")} `;
    }
    if (doc.tags) {
      for (const tag of doc.tags) {
        if (tag.tagName.text === "default") {
          def =
            typeof tag.comment === "string"
              ? tag.comment.trim()
              : ts.getTextOfJSDocComment(tag.comment)?.trim();
        }
      }
    }
  }

  return {
    description: description.replace(/\s+/g, " ").trim(),
    default: def,
  };
}

function extractMembers(members: ts.NodeArray<ts.TypeElement>): PropMeta[] {
  const props: PropMeta[] = [];
  for (const member of members) {
    if (!ts.isPropertySignature(member) || !member.name) continue;
    const name = member.name.getText();
    const optional = !!member.questionToken;
    const type = member.type ? normalizeType(member.type.getText()) : "unknown";
    const { description, default: def } = getJsDoc(member);
    props.push({
      name,
      type,
      default: def ?? (optional ? "—" : "required"),
      description,
    });
  }
  return props;
}

function buildPropTypes() {
  if (!fs.existsSync(COMPONENT_PATH)) {
    console.error(`Component directory not found: ${COMPONENT_PATH}`);
    process.exit(1);
  }

  const componentProps: Record<string, PropMeta[]> = {};

  for (const startDir of fs.readdirSync(COMPONENT_PATH)) {
    const dirPath = path.join(COMPONENT_PATH, startDir);
    if (!fs.statSync(dirPath).isDirectory()) continue;
    const component = toKebabCase(startDir);

    const files = collectTsxFiles(dirPath);
    let chosen: PropMeta[] | null = null;
    let fallback: PropMeta[] | null = null;

    for (const file of files) {
      const source = ts.createSourceFile(
        file,
        fs.readFileSync(file, "utf-8"),
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
      );

      ts.forEachChild(source, (node) => {
        let name: string | undefined;
        let members: ts.NodeArray<ts.TypeElement> | undefined;

        if (ts.isInterfaceDeclaration(node)) {
          name = node.name.text;
          members = node.members;
        } else if (ts.isTypeAliasDeclaration(node)) {
          name = node.name.text;
          if (ts.isTypeLiteralNode(node.type)) {
            members = node.type.members;
          } else if (ts.isIntersectionTypeNode(node.type)) {
            const literalMembers = node.type.types
              .filter(ts.isTypeLiteralNode)
              .flatMap((lit) => Array.from(lit.members));
            if (literalMembers.length) {
              members = ts.factory.createNodeArray(literalMembers);
            }
          }
        }

        if (!name || !members || !name.endsWith("Props")) return;

        const meta = extractMembers(members);
        if (meta.length === 0) return;

        const kebab = toKebabCase(name.replace(/Props$/, ""));
        const isSubPart = /(Item|Segment|Cell|Indicator)Props$/.test(name);
        if (kebab === component) chosen = meta;
        else if (!fallback && !isSubPart) fallback = meta;
      });
    }

    const result = chosen ?? fallback;
    if (result) componentProps[component] = result;
  }

  const output = `// This file is auto-generated by scripts/build-prop-types.ts. Do not edit.

export type PropMeta = {
  name: string;
  type: string;
  default: string;
  description: string;
};

export const componentProps: Record<string, PropMeta[]> = ${JSON.stringify(
    componentProps,
    null,
    2,
  )};
`;

  fs.writeFileSync(OUTPUT_FILE, output);
  const count = Object.keys(componentProps).length;
  console.log(`Prop types generated at ${OUTPUT_FILE} (${count} components)`);
}

buildPropTypes();
