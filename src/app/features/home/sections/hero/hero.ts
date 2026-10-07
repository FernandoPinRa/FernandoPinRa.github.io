import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { I18nService } from '../../../../core/i18n/i18n.service';
import { pathFor } from '../../../../core/i18n/localized-routes';
import { PROFILE } from '../../../../data/profile';
import { Icon } from '../../../../shared/ui/icon/icon';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly loc = this.i18n.loc;
  protected readonly profile = PROFILE;
  protected readonly homePath = computed(() => pathFor({ kind: 'home' }, this.i18n.lang()));
  /** Splits the name so the surname can be set on its own line in italics. */
  protected readonly nameParts = computed(() => {
    const [first, ...rest] = PROFILE.name.split(' ');
    return { first, rest: rest.join(' ') };
  });
}
