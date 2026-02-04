import type { JSX } from "react";
import type { ShikiTransformer } from "shiki/core";
import type { BundledLanguage } from "shiki/langs";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import { createHighlightLinesTransformer } from "./transformers/highlight-lines";
import { createDiffTransformer } from "./transformers/diff";
import { createFocusTransformer } from "./transformers/focus";

// Global highlighter promise (per Shiki Next.js docs pattern)
// Define without await as a global variable to reference from components
// https://shiki.style/packages/next
const highlighter = createHighlighterCore({
  themes: [
    import("shiki/themes/github-light.mjs"),
    import("shiki/themes/github-dark.mjs"),
  ],
  langs: [], // Load languages on-demand for optimal performance
  engine: createJavaScriptRegexEngine(), // Smaller bundle, faster startup than WASM
});

// Track loaded languages to avoid redundant imports
const loadedLanguages = new Set<string>();

const BASE_TRANSFORMERS: ShikiTransformer[] = [
  {
    name: "remove-background",
    pre(node) {
      delete node.properties.style;
    },
    code(node) {
      delete node.properties.style;
    },
  },
  {
    name: "fix-empty-lines",
    line(node) {
      // Ensure empty lines have a space to maintain height
      // Shiki creates empty .line spans for blank lines which collapse
      if (!node.children || node.children.length === 0) {
        node.children = [{ type: "text", value: " " }];
      }
    },
  },
];

export interface HighlightOptions {
  highlightLines?: number[] | string;
  showDiff?: boolean;
  focusLines?: number[] | string;
}

async function highlightWithLang(
  code: string,
  lang: BundledLanguage,
  options?: HighlightOptions,
) {
  // Await the global highlighter promise (per Shiki Next.js docs)
  const instance = await highlighter;

  // Load language dynamically if not already loaded (cached Set for performance)
  if (!loadedLanguages.has(lang)) {
    // Dynamically import only the specific language module needed
    const langModule = await import(`shiki/langs/${lang}.mjs`);
    await instance.loadLanguage(langModule.default);
    loadedLanguages.add(lang);
  }

  // Build transformers array based on options
  const transformers: ShikiTransformer[] = [...BASE_TRANSFORMERS];

  if (options?.highlightLines) {
    transformers.push(createHighlightLinesTransformer(options.highlightLines));
  }

  if (options?.showDiff) {
    transformers.push(createDiffTransformer());
  }

  if (options?.focusLines) {
    transformers.push(createFocusTransformer(options.focusLines));
  }

  const out = instance.codeToHast(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: "light-dark()",
    transformers,
  });

  return toJsxRuntime(out, { Fragment, jsx, jsxs }) as JSX.Element;
}

export async function highlight(
  code: string,
  lang: BundledLanguage,
  options?: HighlightOptions,
) {
  try {
    return await highlightWithLang(code, lang, options);
  } catch {
    // If language isn't supported, try with javascript as fallback
    try {
      return await highlightWithLang(code, "javascript", options);
    } catch {
      // Final fallback to plain text
      return jsx("pre", { children: code }) as JSX.Element;
    }
  }
}
