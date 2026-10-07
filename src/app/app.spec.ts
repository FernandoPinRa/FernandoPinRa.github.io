import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';

describe('App', () => {
  it('renders the shell: skip link, header, main and footer', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('.skip-link')?.textContent).toContain('Saltar al contenido');
    expect(element.querySelector('app-header')).toBeTruthy();
    expect(element.querySelector('main#main')).toBeTruthy();
    expect(element.querySelector('app-footer')).toBeTruthy();
  });
});
