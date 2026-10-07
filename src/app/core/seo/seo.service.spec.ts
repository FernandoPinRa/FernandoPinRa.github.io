import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let head: HTMLHeadElement;

  const content = (selector: string): string | null | undefined =>
    head.querySelector(selector)?.getAttribute('content');

  beforeEach(() => {
    service = TestBed.inject(SeoService);
    head = TestBed.inject(DOCUMENT).head;
  });

  it('sets title, description and Open Graph tags', () => {
    service.update({ title: 'Title', description: 'Desc', lang: 'en', page: { kind: 'home' } });

    expect(TestBed.inject(Title).getTitle()).toBe('Title');
    expect(content('meta[name="description"]')).toBe('Desc');
    expect(content('meta[property="og:title"]')).toBe('Title');
    expect(content('meta[property="og:locale"]')).toBe('en_US');
    expect(content('meta[property="og:url"]')).toBe('https://fernandopinra.github.io/en/');
  });

  it('adds canonical and hreflang alternates for the page', () => {
    service.update({
      title: 'T',
      description: 'D',
      lang: 'es',
      page: { kind: 'project', slug: 'demo' },
    });

    expect(head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://fernandopinra.github.io/proyectos/demo/',
    );
    const alternates = [...head.querySelectorAll('link[hreflang]')].map((link) => [
      link.getAttribute('hreflang'),
      link.getAttribute('href'),
    ]);
    expect(alternates).toEqual([
      ['es', 'https://fernandopinra.github.io/proyectos/demo/'],
      ['en', 'https://fernandopinra.github.io/en/projects/demo/'],
      ['x-default', 'https://fernandopinra.github.io/proyectos/demo/'],
    ]);
  });

  it('marks error pages as noindex and drops canonical links', () => {
    service.update({ title: 'T', description: 'D', lang: 'es', page: { kind: 'home' } });
    service.update({ title: '404', description: 'D', lang: 'es', page: null });

    expect(content('meta[name="robots"]')).toBe('noindex');
    expect(head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(head.querySelectorAll('link[hreflang]').length).toBe(0);
  });
});
