import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PROJECTS } from '../../../../data/projects';
import { Projects } from './projects';

describe('Projects', () => {
  let fixture: ComponentFixture<Projects>;
  let element: HTMLElement;

  const filterButton = (label: string): HTMLButtonElement =>
    [...element.querySelectorAll<HTMLButtonElement>('.filters button')].find(
      (button) => button.textContent?.trim() === label,
    )!;
  const cardTitles = (): string[] =>
    [...element.querySelectorAll('app-project-card h3')].map((h) => h.textContent!.trim());

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(Projects);
    fixture.componentRef.setInput('index', '03');
    fixture.componentRef.setInput('headingId', 'projects-title');
    element = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('shows every project and a count', () => {
    expect(cardTitles().length).toBe(PROJECTS.length);
    expect(element.querySelector('.count')?.textContent).toContain(`${PROJECTS.length}`);
  });

  it('filters by the selected technology and marks the button as pressed', async () => {
    filterButton('Python').click();
    await fixture.whenStable();

    const expected = PROJECTS.filter((p) => p.stack.includes('Python')).map((p) => p.title);
    expect(cardTitles()).toEqual(expected);
    expect(filterButton('Python').getAttribute('aria-pressed')).toBe('true');
  });

  it('clears the filter when the active technology is selected again', async () => {
    filterButton('Python').click();
    await fixture.whenStable();
    filterButton('Python').click();
    await fixture.whenStable();

    expect(cardTitles().length).toBe(PROJECTS.length);
    expect(filterButton('Todos').getAttribute('aria-pressed')).toBe('true');
  });

  it('filters when a tag inside a card is clicked', async () => {
    element.querySelector<HTMLButtonElement>('app-project-card .tag')!.click();
    await fixture.whenStable();

    expect(fixture.componentInstance.selectedTech()).toBe(PROJECTS[0].stack[0]);
  });
});
