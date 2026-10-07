import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import type { Project } from '../../../../../data/models';
import { PROJECTS } from '../../../../../data/projects';
import { ProjectCard } from './project-card';

describe('ProjectCard', () => {
  let fixture: ComponentFixture<ProjectCard>;
  let element: HTMLElement;

  async function render(project: Project, activeTech: string | null = null): Promise<void> {
    fixture.componentRef.setInput('project', project);
    fixture.componentRef.setInput('activeTech', activeTech);
    await fixture.whenStable();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(ProjectCard);
    element = fixture.nativeElement;
  });

  const published = PROJECTS.find((p) => p.status === 'published')!;
  const comingSoon = PROJECTS.find((p) => p.status === 'coming-soon')!;

  it('links a published project to its detail page and repository', async () => {
    await render(published);

    expect(element.querySelector('.title-link')?.getAttribute('href')).toBe(
      `/proyectos/${published.slug}`,
    );
    const repo = element.querySelector<HTMLAnchorElement>(`a[href="${published.repoUrl}"]`);
    expect(repo?.target).toBe('_blank');
    expect(repo?.rel).toContain('noopener');
  });

  it('shows a badge and no links for upcoming projects', async () => {
    await render(comingSoon);

    expect(element.querySelector('.badge')?.textContent).toContain('Próximamente');
    expect(element.querySelector('a')).toBeNull();
  });

  it('emits the technology when a tag is clicked and highlights the active one', async () => {
    await render(published, published.stack[1]);
    const emitted: string[] = [];
    fixture.componentInstance.techSelected.subscribe((tech) => emitted.push(tech));

    const tags = element.querySelectorAll<HTMLButtonElement>('.tag');
    tags[0].click();

    expect(emitted).toEqual([published.stack[0]]);
    expect(tags[1].getAttribute('aria-pressed')).toBe('true');
    expect(tags[0].getAttribute('aria-pressed')).toBe('false');
  });
});
