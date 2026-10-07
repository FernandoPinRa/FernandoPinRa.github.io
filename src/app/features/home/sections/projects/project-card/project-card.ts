import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

import { I18nService } from '../../../../../core/i18n/i18n.service';
import { pathFor } from '../../../../../core/i18n/localized-routes';
import type { Project } from '../../../../../data/models';
import { Icon } from '../../../../../shared/ui/icon/icon';

@Component({
  selector: 'app-project-card',
  imports: [NgOptimizedImage, RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  readonly project = input.required<Project>();
  /** Technology currently used as filter, highlighted among the card's tags. */
  readonly activeTech = input<string | null>(null);
  readonly techSelected = output<string>();

  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly loc = this.i18n.loc;

  protected readonly comingSoon = computed(() => this.project().status === 'coming-soon');
  protected readonly detailPath = computed(() =>
    pathFor({ kind: 'project', slug: this.project().slug }, this.i18n.lang()),
  );
}
