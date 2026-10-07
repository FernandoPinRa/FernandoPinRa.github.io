import { inject } from '@angular/core';
import { RedirectCommand, type ResolveFn, Router } from '@angular/router';

import type { Project } from '../../data/models';
import { findProject } from '../../data/projects';
import { I18nService } from '../../core/i18n/i18n.service';

/** Resolves the project from the URL slug, or shows the 404 page keeping the URL. */
export const projectResolver: ResolveFn<Project> = (route) => {
  const project = findProject(route.paramMap.get('slug') ?? '');
  if (project) {
    return project;
  }
  const notFound = inject(I18nService).lang() === 'en' ? '/en/404' : '/404';
  return new RedirectCommand(inject(Router).parseUrl(notFound), { skipLocationChange: true });
};
