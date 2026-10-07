import { EXPERIENCE } from './experience';
import { LANGS, type Localized } from './models';
import { PROFILE } from './profile';
import { PROJECTS } from './projects';
import { SKILL_GROUPS } from './skills';

/** Guards the content files: a missing translation or a duplicated slug fails the build. */
describe('content data', () => {
  const isFilled = (value: Localized<string | readonly string[]>): boolean =>
    LANGS.every((lang) => value[lang].length > 0);

  it('has unique, URL-safe project slugs', () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/));
  });

  it('translates every published project completely', () => {
    for (const project of PROJECTS.filter((p) => p.status === 'published')) {
      expect(isFilled(project.summary), project.slug).toBe(true);
      expect(isFilled(project.description), project.slug).toBe(true);
      expect(isFilled(project.image.alt), project.slug).toBe(true);
      expect(project.repoUrl ?? project.demoUrl, project.slug).toBeTruthy();
    }
  });

  it('gives every project a summary in all languages', () => {
    PROJECTS.forEach((project) => expect(isFilled(project.summary), project.slug).toBe(true));
  });

  it('keeps the same number of highlights per language in each job', () => {
    for (const job of EXPERIENCE) {
      expect(job.highlights.en.length, job.id).toBe(job.highlights.es.length);
      expect(job.end === null || job.end >= job.start, job.id).toBe(true);
    }
  });

  it('translates the profile', () => {
    expect(isFilled(PROFILE.role)).toBe(true);
    expect(isFilled(PROFILE.summary)).toBe(true);
    expect(PROFILE.summary.en.length).toBe(PROFILE.summary.es.length);
  });

  it('has unique skill group ids', () => {
    const ids = SKILL_GROUPS.map((group) => group.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
