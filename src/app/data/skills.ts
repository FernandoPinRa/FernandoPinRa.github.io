import type { SkillGroup } from './models';

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    id: 'frontend',
    label: { es: 'Front-End', en: 'Front-End' },
    items: [
      'Angular',
      'TypeScript',
      'RxJS',
      'Angular Material',
      'HTML5',
      'CSS3 / SCSS',
      { es: 'Diseño responsive', en: 'Responsive design' },
    ],
  },
  {
    id: 'backend',
    label: { es: 'Back-End', en: 'Back-End' },
    items: ['Python', 'Django', 'Django REST Framework', 'Java', 'Spring Boot', 'Laravel'],
  },
  {
    id: 'testing',
    label: { es: 'Testing', en: 'Testing' },
    items: ['Jasmine', 'Karma', 'Cypress'],
  },
  {
    id: 'databases',
    label: { es: 'Bases de datos', en: 'Databases' },
    items: ['SQL', 'PL/SQL'],
  },
  {
    id: 'tools',
    label: { es: 'Herramientas', en: 'Tools' },
    items: [
      'Git',
      'GitHub',
      'GitLab',
      'Jira',
      { es: 'Metodologías ágiles', en: 'Agile methodologies' },
    ],
  },
];
