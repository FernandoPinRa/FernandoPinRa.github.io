import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Numbered editorial heading used by every home section: "01 — About". */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="index" aria-hidden="true">{{ index() }}</span>
    <h2 class="title" [id]="headingId()">{{ title() }}</h2>
  `,
  styleUrl: './section-heading.scss',
})
export class SectionHeading {
  readonly index = input.required<string>();
  readonly title = input.required<string>();
  /** Referenced by the section's aria-labelledby. */
  readonly headingId = input.required<string>();
}
