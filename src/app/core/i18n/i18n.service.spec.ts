import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import es from './translations/es.json';
import en from './translations/en.json';
import { I18nService, LANG_STORAGE_KEY } from './i18n.service';

/** Every dot path in a translation object. */
function keysOf(node: object, prefix = ''): string[] {
  return Object.entries(node).flatMap(([key, value]) =>
    typeof value === 'string' ? [`${prefix}${key}`] : keysOf(value as object, `${prefix}${key}.`),
  );
}

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    localStorage.clear();
    service = TestBed.inject(I18nService);
  });

  it('starts in Spanish', () => {
    expect(service.lang()).toBe('es');
    expect(service.t('nav.about')).toBe('Sobre mí');
  });

  it('loads English on demand and updates <html lang>', async () => {
    await service.use('en');
    expect(service.lang()).toBe('en');
    expect(service.t('nav.about')).toBe('About');
    expect(TestBed.inject(DOCUMENT).documentElement.lang).toBe('en');
  });

  it('interpolates parameters', () => {
    expect(service.t('projects.countOther', { count: 3 })).toBe('3 proyectos');
  });

  it('picks localized content and passes plain strings through', async () => {
    const value = { es: 'Hola', en: 'Hello' };
    expect(service.loc(value)).toBe('Hola');
    expect(service.loc('Angular')).toBe('Angular');
    await service.use('en');
    expect(service.loc(value)).toBe('Hello');
  });

  it('remembers an explicit choice', () => {
    service.remember('en');
    expect(localStorage.getItem(LANG_STORAGE_KEY)).toBe('en');
  });

  it('has the same keys in every translation file', () => {
    expect(keysOf(en).sort()).toEqual(keysOf(es).sort());
  });
});
