import type { Lang } from '../../data/models';

/** A page of the site, independent of the language it is shown in. */
export type Page = { readonly kind: 'home' } | { readonly kind: 'project'; readonly slug: string };

const PROJECT_SEGMENT: Record<Lang, string> = { es: 'proyectos', en: 'projects' };
const LANG_PREFIX: Record<Lang, string> = { es: '', en: '/en' };

/** Builds the router path for a page in a given language. */
export function pathFor(page: Page, lang: Lang): string {
  const prefix = LANG_PREFIX[lang];
  return page.kind === 'home' ? prefix || '/' : `${prefix}/${PROJECT_SEGMENT[lang]}/${page.slug}`;
}

/** Recognises which page a URL points to. Returns `null` for unknown URLs. */
export function parsePage(url: string): Page | null {
  const path = url.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  if (path === '/' || path === '/en') {
    return { kind: 'home' };
  }
  const match = /^(?:\/proyectos|\/en\/projects)\/([^/]+)$/.exec(path);
  return match ? { kind: 'project', slug: decodeURIComponent(match[1]) } : null;
}

export function langFromUrl(url: string): Lang {
  return /^\/en(?:[/?#]|$)/.test(url) ? 'en' : 'es';
}
