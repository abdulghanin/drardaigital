import { readFile, readdir, stat } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";
import ts from "typescript";

const root = process.cwd();
const outDir = resolve(root, "out");
const localeDirectory = resolve(root, "app/[locale]");

async function collectPageRoutes(directory, segments = []) {
  const entries = await readdir(directory, { withFileTypes: true });
  const routes = entries.some((entry) => entry.isFile() && entry.name === "page.tsx") ? [segments] : [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      routes.push(...(await collectPageRoutes(join(directory, entry.name), [...segments, entry.name])));
    }
  }

  return routes;
}

function collectStringProperties(sourceText, fileName, propertyName) {
  const sourceFile = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true);
  const values = [];

  function visit(node) {
    if (
      ts.isPropertyAssignment(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === propertyName &&
      ts.isStringLiteral(node.initializer)
    ) {
      values.push(node.initializer.text);
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return values;
}

function collectStringArray(sourceText, fileName, propertyName) {
  const sourceFile = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true);
  const values = [];

  function visit(node) {
    if (
      ts.isPropertyAssignment(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === propertyName &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      for (const element of node.initializer.elements) {
        if (ts.isStringLiteral(element)) values.push(element.text);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return values;
}

function expandRoute(segments, slugs) {
  const dynamicIndex = segments.findIndex((segment) => /^\[.+\]$/.test(segment));
  if (dynamicIndex < 0) return [segments];

  const parameter = segments[dynamicIndex].slice(1, -1);
  if (parameter !== "slug") {
    throw new Error(`Unsupported dynamic route parameter: [${parameter}]`);
  }

  return slugs.map((slug) => [
    ...segments.slice(0, dynamicIndex),
    slug,
    ...segments.slice(dynamicIndex + 1),
  ]);
}

async function exists(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

function exportedTarget(pathname) {
  const decoded = decodeURIComponent(pathname);
  const relativePath = decoded.replace(/^\/+/, "");
  const exactPath = join(outDir, relativePath);
  return decoded.endsWith("/") ? join(exactPath, "index.html") : exactPath;
}

const localeSource = await readFile(join(root, "src/lib/i18n-config.ts"), "utf8");
const locales = collectStringArray(localeSource, "i18n-config.ts", "locales");
const productsSource = await readFile(join(root, "src/data/products.ts"), "utf8");
const slugs = [...new Set(collectStringProperties(productsSource, "products.ts", "slug"))];
const routes = await collectPageRoutes(localeDirectory);
const requiredFiles = new Set();
const requiredPaths = new Set();

for (const locale of locales) {
  for (const route of routes) {
    for (const expanded of expandRoute(route, slugs)) {
      const routePath = `/${[locale, ...expanded].join("/")}${expanded.length ? "/" : "/"}`;
      requiredPaths.add(routePath);
      requiredFiles.add(join(outDir, locale, ...expanded, "index.html"));
    }
  }
}

requiredFiles.add(join(outDir, "index.html"));
requiredPaths.add("/");

const missingRoutes = [];
for (const filePath of requiredFiles) {
  if (!(await exists(filePath))) missingRoutes.push(relative(root, filePath).split(sep).join("/"));
}

const brokenLinks = [];
const duplicatedLocalePaths = [];
async function inspectHtml(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const filePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      await inspectHtml(filePath);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;

    const html = await readFile(filePath, "utf8");
    const sourceFile = relative(outDir, filePath).split(sep).join("/");
    if (/\/(?:ar|en)\/(?:ar|en)(?:\/|[?#"']|$)/.test(html)) {
      duplicatedLocalePaths.push(sourceFile);
    }

    for (const [, href] of html.matchAll(/\bhref="([^"]+)"/g)) {
      if (!href.startsWith("/")) continue;
      const url = new URL(href, "https://static-export.invalid");
      const target = exportedTarget(url.pathname);
      if (!(await exists(target))) brokenLinks.push(`${sourceFile}: ${href}`);
    }
  }
}

await inspectHtml(outDir);

if (missingRoutes.length || brokenLinks.length || duplicatedLocalePaths.length) {
  if (missingRoutes.length) console.error("Missing route files:\n" + missingRoutes.join("\n"));
  if (brokenLinks.length) console.error("Broken internal HTML links:\n" + brokenLinks.join("\n"));
  if (duplicatedLocalePaths.length) console.error("Duplicate locale prefixes:\n" + duplicatedLocalePaths.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Verified ${requiredPaths.size} static routes and all internal HTML links.`);
  console.log(`Included ${slugs.length} gift-card detail routes for ${locales.join(" and ")}.`);
}