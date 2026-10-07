import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { LANGS, type Lang } from '../../data/models';
import { PROFILE } from '../../data/profile';
import { type Page, pathFor } from '../i18n/localized-routes';

export const SITE_URL = 'https://fernandopinra.github.io';
const DEFAULT_IMAGE = '/og-image.png';
const OG_LOCALE: Record<Lang, string> = { es: 'es_ES', en: 'en_US' };

export interface SeoData {
  readonly title: string;
  readonly description: string;
  readonly lang: Lang;
  /** The page shown, used for canonical and hreflang links. `null` for error pages. */
  readonly page: Page | null;
  readonly type?: 'website' | 'article';
}

/** GitHub Pages serves prerendered routes as folders, so canonical URLs end in a slash. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === '/' ? '/' : `${path}/`}`;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  update({ title, description, lang, page, type = 'website' }: SeoData): void {
    const url = page ? absoluteUrl(pathFor(page, lang)) : null;

    this.title.setTitle(title);
    this.setName('description', description);
    this.setName('robots', page ? 'index, follow' : 'noindex');

    this.setProperty('og:type', type);
    this.setProperty('og:site_name', PROFILE.name);
    this.setProperty('og:title', title);
    this.setProperty('og:description', description);
    this.setProperty('og:image', `${SITE_URL}${DEFAULT_IMAGE}`);
    this.setProperty('og:locale', OG_LOCALE[lang]);
    this.setProperty('og:locale:alternate', OG_LOCALE[lang === 'es' ? 'en' : 'es']);
    this.setName('twitter:card', 'summary_large_image');
    this.setName('twitter:title', title);
    this.setName('twitter:description', description);

    if (url) {
      this.setProperty('og:url', url);
    } else {
      this.meta.removeTag('property="og:url"');
    }
    this.setLinks(page, url);
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private setProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  private setLinks(page: Page | null, canonical: string | null): void {
    const head = this.document.head;
    head
      .querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]')
      .forEach((link) => link.remove());

    if (!page || !canonical) {
      return;
    }
    head.appendChild(this.createLink({ rel: 'canonical', href: canonical }));
    for (const lang of LANGS) {
      head.appendChild(
        this.createLink({
          rel: 'alternate',
          hreflang: lang,
          href: absoluteUrl(pathFor(page, lang)),
        }),
      );
    }
    head.appendChild(
      this.createLink({
        rel: 'alternate',
        hreflang: 'x-default',
        href: absoluteUrl(pathFor(page, 'es')),
      }),
    );
  }

  private createLink(attributes: Record<string, string>): HTMLLinkElement {
    const link = this.document.createElement('link');
    for (const [name, value] of Object.entries(attributes)) {
      link.setAttribute(name, value);
    }
    return link;
  }
}
