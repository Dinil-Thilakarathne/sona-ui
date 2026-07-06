import fs from "fs";
import path from "path";
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
  const tags = ts.getJSDocTags(node);
  let def: string | undefined;
  for (const tag of tags) {
    if (tag.tagName.text === "default") {
      def =
        typeof tag.comment === "string"
          ? tag.comment.trim()
          : ts.getTextOfJSDocComment(tag.comment)?.trim();
    }
  }
  // The description is the JSDoc comment text attached to the node.
  const jsDocNodes = (node as unknown as { jsDoc?: ts.JSDoc[] }).jsDoc ?? [];
  const description = jsDocNodes
    .map((d) => ts.getTextOfJSDocComment(d.comment) ?? "")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return { description, default: def };
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

    // Primary props interface is the one matching the component's main file,
    // e.g. ripple-button/ripple-button.tsx -> RippleButtonProps. We prefer a
    // `*Props` type/interface whose name (kebab-cased, minus "props") equals
    // the component name.
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
            // e.g. `ComponentPropsWithoutRef<T> & { text: string; ... }` —
            // gather the explicitly-declared members from the literal part(s).
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
        // Skip sub-component prop types (e.g. *ItemProps, *SegmentProps) when
        // falling back, so we never emit a child part's props as the component's.
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
