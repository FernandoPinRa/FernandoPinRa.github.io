import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Component } from '@angular/core';

import { I18nService, LANG_STORAGE_KEY } from '../../i18n/i18n.service';
import { Header } from './header';

@Component({ template: '' })
class Blank {}

describe('Header', () => {
  let fixture: ComponentFixture<Header>;
  let element: HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '**', component: Blank }])],
    });
    fixture = TestBed.createComponent(Header);
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  const langLink = (): HTMLAnchorElement => element.querySelector('a.lang')!;

  it('links each nav item to a section of the home page', () => {
    const hrefs = [...element.querySelectorAll('.menu a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['/#about', '/#experience', '/#projects', '/#skills', '/#contact']);
  });

  it('points the language switch to the same page in the other language', async () => {
    await TestBed.inject(Router).navigateByUrl('/proyectos/gojo-simulator');
    await fixture.whenStable();
    expect(langLink().getAttribute('href')).toBe('/en/projects/gojo-simulator');

    await TestBed.inject(I18nService).use('en');
    await fixture.whenStable();
    expect(langLink().textContent?.trim()).toMatch(/^ES/);
    expect(langLink().getAttribute('href')).toBe('/proyectos/gojo-simulator');
  });

  it('remembers the language chosen with the switch', () => {
    langLink().click();
    expect(localStorage.getItem(LANG_STORAGE_KEY)).toBe('en');
  });

  it('opens and closes the mobile menu', async () => {
    const toggle = element.querySelector<HTMLButtonElement>('.menu-toggle')!;
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    toggle.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(element.querySelector('.menu')?.classList).toContain('is-open');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });
});
