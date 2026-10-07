import type { Route, Routes } from '@angular/router';

import type { Lang } from './data/models';
import { langResolver } from './core/i18n/lang.resolver';
import { HomePage } from './features/home/home.page';
import { NotFoundPage } from './features/not-found/not-found.page';
import { projectResolver } from './features/project-detail/project.resolver';

function localizedRoutes(lang: Lang, projectsSegment: string): Route {
  return {
    path: lang === 'es' ? '' : lang,
    data: { lang },
    resolve: { lang: langResolver },
    children: [
      { path: '', pathMatch: 'full', component: HomePage },
      {
        path: `${projectsSegment}/:slug`,
        loadComponent: () => import('./features/project-detail/project-detail.page'),
        resolve: { project: projectResolver },
      },
      { path: '404', component: NotFoundPage },
      { path: '**', component: NotFoundPage },
    ],
  };
}

/** Spanish lives at the root, English under /en. Both are prerendered from one build. */
export const routes: Routes = [
  localizedRoutes('en', 'projects'),
  localizedRoutes('es', 'proyectos'),
];
