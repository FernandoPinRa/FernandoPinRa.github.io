import { Pipe, type PipeTransform } from '@angular/core';

import type { Lang, YearMonth } from '../../data/models';

/** Formats `2023-08` as "ago 2023" / "Aug 2023". The language is a parameter so the pipe stays pure. */
@Pipe({ name: 'yearMonth' })
export class YearMonthPipe implements PipeTransform {
  transform(value: YearMonth, lang: Lang): string {
    const [year, month] = value.split('-').map(Number);
    return new Intl.DateTimeFormat(lang, {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(Date.UTC(year, month - 1));
  }
}
