import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { I18nService } from '../../../../core/i18n/i18n.service';
import { EXPERIENCE } from '../../../../data/experience';
import { YearMonthPipe } from '../../../../shared/pipes/year-month.pipe';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';

@Component({
  selector: 'app-experience',
  imports: [SectionHeading, YearMonthPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  readonly index = input.required<string>();
  readonly headingId = input.required<string>();

  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly loc = this.i18n.loc;
  protected readonly lang = this.i18n.lang;
  protected readonly jobs = EXPERIENCE;
}
