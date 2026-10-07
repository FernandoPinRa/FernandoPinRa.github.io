import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { I18nService } from '../../../../core/i18n/i18n.service';
import { SKILL_GROUPS } from '../../../../data/skills';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';

@Component({
  selector: 'app-skills',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  readonly index = input.required<string>();
  readonly headingId = input.required<string>();

  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly loc = this.i18n.loc;
  protected readonly groups = SKILL_GROUPS;
}
