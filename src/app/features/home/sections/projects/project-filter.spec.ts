import type { Project } from '../../../../data/models';
import { filterByTech, technologiesOf } from './project-filter';

const project = (slug: string, stack: string[]): Project => ({ slug, stack }) as unknown as Project;

describe('project filter', () => {
  const projects = [
    project('a', ['Angular', 'TypeScript']),
    project('b', ['Python']),
    project('c', ['Angular', 'Django']),
  ];

  it('lists technologies by usage, then alphabetically', () => {
    expect(technologiesOf(projects)).toEqual(['Angular', 'Django', 'Python', 'TypeScript']);
  });

  it('filters by technology', () => {
    expect(filterByTech(projects, 'Angular').map((p) => p.slug)).toEqual(['a', 'c']);
  });

  it('returns every project without a filter', () => {
    expect(filterByTech(projects, null)).toBe(projects);
  });
});
