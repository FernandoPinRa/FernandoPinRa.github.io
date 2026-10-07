import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { I18nService } from '../../../../core/i18n/i18n.service';
import { PROFILE } from '../../../../data/profile';
import { Icon } from '../../../../shared/ui/icon/icon';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';

@Component({
  selector: 'app-contact',
  imports: [SectionHeading, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  readonly index = input.required<string>();
  readonly headingId = input.required<string>();

  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly loc = this.i18n.loc;
  protected readonly profile = PROFILE;
}
