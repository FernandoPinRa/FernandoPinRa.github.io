import type { Experience } from './models';

/** Most recent first. */
export const EXPERIENCE: readonly Experience[] = [
  {
    id: 'akkodis',
    company: 'Akkodis',
    role: { es: 'Desarrollador Front-End (Angular)', en: 'Front-End Developer (Angular)' },
    location: { es: 'Remoto', en: 'Remote' },
    start: '2023-08',
    end: null,
    highlights: {
      es: [
        'Migración de varias aplicaciones de Angular 8 a las versiones actuales, reduciendo vulnerabilidades y mejorando el rendimiento.',
        'Desarrollo de SPAs con Angular, TypeScript y Angular Material consumiendo APIs REST.',
        'Tests unitarios con Jasmine/Karma y tests e2e con Cypress.',
        'Desarrollo de APIs REST con Django y Spring Boot.',
        'Refactorización de código front y back, incluido PL/SQL.',
        'Trabajo en equipos ágiles con Git y Jira.',
      ],
      en: [
        'Migrated several applications from Angular 8 to current versions, reducing vulnerabilities and improving performance.',
        'Built SPAs with Angular, TypeScript and Angular Material on top of REST APIs.',
        'Wrote unit tests with Jasmine/Karma and end-to-end tests with Cypress.',
        'Developed REST APIs with Django and Spring Boot.',
        'Refactored front-end and back-end code, including PL/SQL.',
        'Worked in agile teams using Git and Jira.',
      ],
    },
    stack: [
      'Angular',
      'TypeScript',
      'Angular Material',
      'Cypress',
      'Django',
      'Spring Boot',
      'PL/SQL',
    ],
  },
  {
    id: 'hk-nominas',
    company: 'HK Nóminas',
    role: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
    location: { es: 'Cádiz', en: 'Cádiz, Spain' },
    start: '2022-07',
    end: '2023-06',
    highlights: {
      es: [
        'Desarrollo de aplicaciones web con Laravel/PHP y SQL.',
        'Automatización de flujos de trabajo internos.',
        'Análisis de requisitos, despliegues y soporte a usuarios.',
      ],
      en: [
        'Developed web applications with Laravel/PHP and SQL.',
        'Automated internal workflows.',
        'Handled requirements analysis, deployments and user support.',
      ],
    },
    stack: ['Laravel', 'PHP', 'SQL'],
  },
];
