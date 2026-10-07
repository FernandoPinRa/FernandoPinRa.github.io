import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';

import type { Lang } from '../../data/models';
import { I18nService } from './i18n.service';

/** Activates the language declared in the route data before the page renders. */
export const langResolver: ResolveFn<Lang> = async (route) => {
  const lang = route.data['lang'] as Lang;
  await inject(I18nService).use(lang);
  return lang;
};
