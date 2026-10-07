import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Safe access to localStorage: a no-op while prerendering and when the
 * browser blocks storage (private mode, disabled cookies...).
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  get(key: string): string | null {
    if (!this.isBrowser) {
      return null;
    }
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  set(key: string, value: string): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      localStorage.setItem(key, value);
    } catch {
      // Storage unavailable: the preference simply isn't remembered.
    }
  }
}
