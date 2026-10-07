import { RenderMode, type ServerRoute } from '@angular/ssr';

import { PUBLISHED_PROJECTS } from './data/projects';

const projectParams = async (): Promise<Record<string, string>[]> =>
  PUBLISHED_PROJECTS.map(({ slug }) => ({ slug }));

/** Everything is prerendered to static HTML for GitHub Pages. */
export const serverRoutes: ServerRoute[] = [
  { path: 'proyectos/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: projectParams },
  {
    path: 'en/projects/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: projectParams,
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
