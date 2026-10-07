import { DOCUMENT, Injectable, computed, inject, signal } from '@angular/core';

import type { Lang, Localized } from '../../data/models';
import { StorageService } from '../storage/storage.service';
import es from './translations/es.json';

export type Translations = typeof es;

/** Dot-separated paths to every string in the translations, e.g. `'hero.ctaCv'`. */
type LeafPaths<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends string
    ? `${Prefix}${K}`
    : LeafPaths<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

export type TranslationKey = LeafPaths<Translations>;
export type TranslationParams = Readonly<Record<string, string | number>>;

/** Spanish ships in the main bundle; other languages are fetched on demand. */
const LOADERS: Record<Lang, () => Promise<Translations>> = {
  es: () => Promise.resolve(es),
  en: () => import('./translations/en.json').then((m) => m.default),
};

export const LANG_STORAGE_KEY = 'lang';

interface Localize {
  (value: string | Localized): string;
  <T>(value: Localized<T>): T;
}

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly document = inject(DOCUMENT);
  private readonly storage = inject(StorageService);
  private readonly dictionaries = signal<Partial<Record<Lang, Translations>>>({ es });
  private readonly current = signal<Lang>('es');

  readonly lang = this.current.asReadonly();
  private readonly dictionary = computed(() => this.dictionaries()[this.lang()] ?? es);

  /** Loads the language if needed and makes it the active one. */
  async use(lang: Lang): Promise<void> {
    if (!this.dictionaries()[lang]) {
      const dictionary = await LOADERS[lang]();
      this.dictionaries.update((loaded) => ({ ...loaded, [lang]: dictionary }));
    }
    this.current.set(lang);
    this.document.documentElement.lang = lang;
  }

  /** Persists an explicit choice so the next visit opens in that language. */
  remember(lang: Lang): void {
    this.storage.set(LANG_STORAGE_KEY, lang);
  }

  /** Translates a UI string. Reads a signal, so templates update on language change. */
  readonly t = (key: TranslationKey, params?: TranslationParams): string => {
    const value = key
      .split('.')
      .reduce<unknown>(
        (node, part) => (node as Record<string, unknown> | undefined)?.[part],
        this.dictionary(),
      );
    if (typeof value !== 'string') {
      return key;
    }
    return params
      ? value.replace(/\{(\w+)\}/g, (match, name: string) => String(params[name] ?? match))
      : value;
  };

  /** Picks the active language from a content value. Plain strings are returned as is. */
  readonly loc: Localize = <T>(value: string | Localized<T>) =>
    typeof value === 'string' ? value : value[this.lang()];
}
