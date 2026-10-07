import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { I18nService } from '../../core/i18n/i18n.service';
import { pathFor } from '../../core/i18n/localized-routes';
import { SeoService } from '../../core/seo/seo.service';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.scss',
})
export class NotFoundPage {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly homePath = computed(() => pathFor({ kind: 'home' }, this.i18n.lang()));

  constructor() {
    inject(SeoService).update({
      title: this.t('seo.notFoundTitle'),
      description: this.t('notFound.text'),
      lang: this.i18n.lang(),
      page: null,
    });
  }
}
