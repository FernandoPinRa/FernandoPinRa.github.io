import { ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  linkedSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

import type { Lang } from '../../../data/models';
import { Icon } from '../../../shared/ui/icon/icon';
import { type TranslationKey, I18nService } from '../../i18n/i18n.service';
import { parsePage, pathFor } from '../../i18n/localized-routes';
import { ThemeService } from '../../theme/theme.service';

interface NavItem {
  readonly fragment: string;
  readonly label: TranslationKey;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { fragment: 'about', label: 'nav.about' },
  { fragment: 'experience', label: 'nav.experience' },
  { fragment: 'projects', label: 'nav.projects' },
  { fragment: 'skills', label: 'nav.skills' },
  { fragment: 'contact', label: 'nav.contact' },
];

@Component({
  selector: 'app-header',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: { '(document:keydown.escape)': 'menuOpen.set(false)' },
})
export class Header {
  private readonly i18n = inject(I18nService);
  private readonly router = inject(Router);
  protected readonly theme = inject(ThemeService);
  protected readonly t = this.i18n.t;
  protected readonly navItems = NAV_ITEMS;

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  /** Open state of the mobile menu; closes itself on every navigation. */
  protected readonly menuOpen = linkedSignal({ source: this.url, computation: () => false });

  protected readonly homePath = computed(() => pathFor({ kind: 'home' }, this.i18n.lang()));
  protected readonly otherLang = computed<Lang>(() => (this.i18n.lang() === 'es' ? 'en' : 'es'));

  /** Same page in the other language, keeping the section the user is looking at. */
  protected readonly alternate = computed(() => {
    const [path, fragment] = this.url().split('#');
    const page = parsePage(path) ?? { kind: 'home' as const };
    return { path: pathFor(page, this.otherLang()), fragment };
  });

  constructor() {
    // The router scrolls to anchors with window.scrollTo, which ignores CSS
    // scroll-padding, so keep sections from hiding behind the sticky header.
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const scroller = inject(ViewportScroller);
    afterNextRender(() => scroller.setOffset(() => [0, host.offsetHeight + 16]));
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected switchLanguage(): void {
    this.i18n.remember(this.otherLang());
  }
}
