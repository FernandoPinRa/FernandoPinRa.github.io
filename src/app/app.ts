import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
  type ElementRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { I18nService } from './core/i18n/i18n.service';
import { Footer } from './core/layout/footer/footer';
import { Header } from './core/layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly t = inject(I18nService).t;
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  /** The <base href> would turn "#main" into a different URL, so move focus by hand. */
  protected skipToContent(event: Event): void {
    event.preventDefault();
    const main = this.main().nativeElement;
    main.focus({ preventScroll: true });
    main.scrollIntoView();
  }
}
