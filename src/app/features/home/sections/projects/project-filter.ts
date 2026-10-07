import type { Project } from '../../../../data/models';

/** Every technology used across the projects, most used first, then alphabetically. */
export function technologiesOf(projects: readonly Project[]): string[] {
  const counts = new Map<string, number>();
  for (const tech of projects.flatMap((project) => project.stack)) {
    counts.set(tech, (counts.get(tech) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort(([a, countA], [b, countB]) => countB - countA || a.localeCompare(b))
    .map(([tech]) => tech);
}

/** Projects that use `tech`, or all of them when no technology is selected. */
export function filterByTech(
  projects: readonly Project[],
  tech: string | null,
): readonly Project[] {
  return tech ? projects.filter((project) => project.stack.includes(tech)) : projects;
}
