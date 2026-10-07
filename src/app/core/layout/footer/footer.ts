import { ChangeDetectionStrategy, Component, DOCUMENT, inject } from '@angular/core';

import { PROFILE } from '../../../data/profile';
import { Icon } from '../../../shared/ui/icon/icon';
import { I18nService } from '../../i18n/i18n.service';

const SOURCE_URL = 'https://github.com/FernandoPinRa/FernandoPinRa.github.io';

@Component({
  selector: 'app-footer',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly document = inject(DOCUMENT);
  protected readonly t = inject(I18nService).t;
  protected readonly name = PROFILE.name;
  protected readonly sourceUrl = SOURCE_URL;
  protected readonly year = new Date().getFullYear();

  protected backToTop(event: Event): void {
    event.preventDefault();
    this.document.defaultView?.scrollTo({ top: 0 });
    this.document.querySelector<HTMLElement>('.skip-link')?.focus({ preventScroll: true });
  }
}
