import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

import { I18nService } from '../../core/i18n/i18n.service';
import { pathFor } from '../../core/i18n/localized-routes';
import { SeoService } from '../../core/seo/seo.service';
import type { Project } from '../../data/models';
import { PUBLISHED_PROJECTS } from '../../data/projects';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-project-detail-page',
  imports: [NgOptimizedImage, RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-detail.page.html',
  styleUrl: './project-detail.page.scss',
})
export default class ProjectDetailPage {
  /** Bound from the route resolver through withComponentInputBinding. */
  readonly project = input.required<Project>();

  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly loc = this.i18n.loc;

  protected readonly homePath = computed(() => pathFor({ kind: 'home' }, this.i18n.lang()));
  protected readonly otherProjects = computed(() =>
    PUBLISHED_PROJECTS.filter(({ slug }) => slug !== this.project().slug).map((project) => ({
      project,
      path: pathFor({ kind: 'project', slug: project.slug }, this.i18n.lang()),
    })),
  );

  constructor() {
    const seo = inject(SeoService);
    // The component is reused when navigating between projects, so react to input changes.
    effect(() => {
      const project = this.project();
      seo.update({
        title: this.t('seo.projectTitle', { project: project.title }),
        description: this.loc(project.summary),
        lang: this.i18n.lang(),
        page: { kind: 'project', slug: project.slug },
        type: 'article',
      });
    });
  }
}
