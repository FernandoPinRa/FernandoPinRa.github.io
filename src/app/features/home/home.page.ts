import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18nService } from '../../core/i18n/i18n.service';
import { SeoService } from '../../core/seo/seo.service';
import { About } from './sections/about/about';
import { Contact } from './sections/contact/contact';
import { Experience } from './sections/experience/experience';
import { Hero } from './sections/hero/hero';
import { Projects } from './sections/projects/projects';
import { Skills } from './sections/skills/skills';

/**
 * One-page home. Sections below the fold are `@defer` blocks with incremental
 * hydration: they are prerendered as HTML (so they are indexable and visible
 * without JS) but their code only downloads and hydrates when scrolled into view.
 * The <section> landmarks live outside the blocks so anchor links always resolve.
 */
@Component({
  selector: 'app-home-page',
  imports: [Hero, About, Experience, Projects, Skills, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  constructor() {
    const { t, lang } = inject(I18nService);
    inject(SeoService).update({
      title: t('seo.homeTitle'),
      description: t('seo.homeDescription'),
      lang: lang(),
      page: { kind: 'home' },
    });
  }
}
