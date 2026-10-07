import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';

import { I18nService } from '../../../../core/i18n/i18n.service';
import { PROJECTS } from '../../../../data/projects';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';
import { ProjectCard } from './project-card/project-card';
import { filterByTech, technologiesOf } from './project-filter';

@Component({
  selector: 'app-projects',
  imports: [SectionHeading, ProjectCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  readonly index = input.required<string>();
  readonly headingId = input.required<string>();

  protected readonly t = inject(I18nService).t;
  protected readonly technologies = technologiesOf(PROJECTS);

  /** Selected technology, `null` shows every project. */
  readonly selectedTech = signal<string | null>(null);
  readonly visibleProjects = computed(() => filterByTech(PROJECTS, this.selectedTech()));

  protected readonly countLabel = computed(() => {
    const count = this.visibleProjects().length;
    return this.t(count === 1 ? 'projects.countOne' : 'projects.countOther', { count });
  });

  /** Selecting the active technology again clears the filter. */
  select(tech: string | null): void {
    this.selectedTech.update((current) => (current === tech ? null : tech));
  }
}
