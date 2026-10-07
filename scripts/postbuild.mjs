// Runs after `ng build`: prepares the static output for GitHub Pages.
//  - 404.html: GitHub Pages serves it for unknown URLs; it is the prerendered /404 route.
//  - sitemap.xml: generated from the prerendered pages, so it never goes stale.
import { copyFile, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const SITE_URL = 'https://fernandopinra.github.io';
const OUT_DIR = 'dist/portfolio/browser';
await rm(join(OUT_DIR, 'index.csr.html'), { force: true });
const EXCLUDED = /^(?:en\/)?404\//;

async function findPages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const pages = await Promise.all(
    entries.map(async (entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return findPages(path);
      return entry.name === 'index.html' ? [path] : [];
    }),
  );
  return pages.flat();
}

function urlFor(file) {
  const route = relative(OUT_DIR, file)
    .split(sep)
    .join('/')
    .replace(/index\.html$/, '');
  return `${SITE_URL}/${route}`;
}

async function main() {
  await copyFile(join(OUT_DIR, '404', 'index.html'), join(OUT_DIR, '404.html'));

  const files = (await findPages(OUT_DIR)).filter(
    (file) => !EXCLUDED.test(relative(OUT_DIR, file).split(sep).join('/')),
  );
  const urls = await Promise.all(
    files.map(async (file) => {
      const html = await readFile(file, 'utf8');
      if (html.includes('content="noindex"')) return null;
      const { mtime } = await stat(file);
      return { loc: urlFor(file), lastmod: mtime.toISOString().slice(0, 10) };
    }),
  );
  const entries = urls
    .filter(Boolean)
    .sort((a, b) => a.loc.localeCompare(b.loc))
    .map(({ loc, lastmod }) => `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`);

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');
  await writeFile(join(OUT_DIR, 'sitemap.xml'), sitemap);
  console.log(`postbuild: 404.html + sitemap.xml (${entries.length} URLs)`);
}

await main();
