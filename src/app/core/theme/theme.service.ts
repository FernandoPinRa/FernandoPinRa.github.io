import {
  DOCUMENT,
  DestroyRef,
  Injectable,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { StorageService } from '../storage/storage.service';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark';
}

/**
 * Follows the OS colour scheme until the user picks one explicitly.
 * The inline script in index.html applies a stored choice before first paint,
 * so this service only has to keep `data-theme` in sync afterwards.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storage = inject(StorageService);

  private readonly preference = signal<Theme | null>(null);
  private readonly system = signal<Theme>('light');

  readonly theme = computed(() => this.preference() ?? this.system());

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }
    const stored = this.storage.get(THEME_STORAGE_KEY);
    this.preference.set(isTheme(stored) ? stored : null);

    const media = this.document.defaultView?.matchMedia?.(DARK_QUERY);
    if (media) {
      const sync = (): void => this.system.set(media.matches ? 'dark' : 'light');
      sync();
      media.addEventListener('change', sync);
      inject(DestroyRef).onDestroy(() => media.removeEventListener('change', sync));
    }
  }

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.preference.set(next);
    this.document.documentElement.dataset['theme'] = next;
    this.storage.set(THEME_STORAGE_KEY, next);
  }
}
