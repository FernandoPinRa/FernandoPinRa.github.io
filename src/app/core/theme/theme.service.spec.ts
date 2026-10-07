import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { THEME_STORAGE_KEY, ThemeService } from './theme.service';

function mockSystemTheme(dark: boolean): void {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: dark, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  );
}

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => vi.unstubAllGlobals());

  it('follows the system preference by default', () => {
    mockSystemTheme(true);
    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
  });

  it('prefers a stored choice over the system', () => {
    mockSystemTheme(true);
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    expect(TestBed.inject(ThemeService).theme()).toBe('light');
  });

  it('toggles, applies data-theme and persists the choice', () => {
    mockSystemTheme(false);
    const service = TestBed.inject(ThemeService);

    service.toggle();

    expect(service.theme()).toBe('dark');
    expect(TestBed.inject(DOCUMENT).documentElement.dataset['theme']).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');

    service.toggle();
    expect(service.theme()).toBe('light');
  });
});
