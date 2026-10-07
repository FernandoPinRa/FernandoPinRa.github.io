import { langFromUrl, parsePage, pathFor } from './localized-routes';

describe('localized routes', () => {
  it('builds paths per language', () => {
    expect(pathFor({ kind: 'home' }, 'es')).toBe('/');
    expect(pathFor({ kind: 'home' }, 'en')).toBe('/en');
    expect(pathFor({ kind: 'project', slug: 'demo' }, 'es')).toBe('/proyectos/demo');
    expect(pathFor({ kind: 'project', slug: 'demo' }, 'en')).toBe('/en/projects/demo');
  });

  it('recognises pages in both languages, ignoring query, fragment and trailing slash', () => {
    expect(parsePage('/')).toEqual({ kind: 'home' });
    expect(parsePage('/en/#projects')).toEqual({ kind: 'home' });
    expect(parsePage('/proyectos/demo?x=1')).toEqual({ kind: 'project', slug: 'demo' });
    expect(parsePage('/en/projects/demo/')).toEqual({ kind: 'project', slug: 'demo' });
  });

  it('returns null for unknown pages', () => {
    expect(parsePage('/blog')).toBeNull();
    expect(parsePage('/en/proyectos/demo')).toBeNull();
  });

  it('round-trips every page through both languages', () => {
    const page = { kind: 'project', slug: 'gojo-simulator' } as const;
    expect(parsePage(pathFor(page, 'en'))).toEqual(page);
    expect(parsePage(pathFor(page, 'es'))).toEqual(page);
  });

  it('detects the language from the URL', () => {
    expect(langFromUrl('/en')).toBe('en');
    expect(langFromUrl('/en/projects/x')).toBe('en');
    expect(langFromUrl('/en#about')).toBe('en');
    expect(langFromUrl('/')).toBe('es');
    expect(langFromUrl('/entrevistas')).toBe('es');
  });
});
