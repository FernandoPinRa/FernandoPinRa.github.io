import type { Project } from './models';

const COMING_SOON_IMAGE = {
  src: '/img/projects/coming-soon.svg',
  alt: { es: 'Ilustración: proyecto en preparación', en: 'Illustration: project in progress' },
  width: 1200,
  height: 750,
} as const;

/**
 * Every project shown on the site. To add one, append an entry: the card,
 * the filter, the detail page, its prerendered route and the sitemap are
 * all derived from this list.
 */
export const PROJECTS: readonly Project[] = [
  {
    slug: 'gojo-simulator',
    title: 'Gojo Simulator',
    status: 'published',
    year: 2025,
    summary: {
      es: 'Visión por computador en tiempo real: detecta gestos de la mano con la webcam y lanza las técnicas de Gojo Satoru de Jujutsu Kaisen.',
      en: 'Real-time computer vision: it detects hand gestures through the webcam and triggers Gojo Satoru’s techniques from Jujutsu Kaisen.',
    },
    description: {
      es: [
        'Aplicación de escritorio en Python inspirada en el anime Jujutsu Kaisen. Usa el modelo Hand Landmarker de MediaPipe para localizar los 21 puntos de cada mano en cada fotograma de la webcam y reconoce gestos concretos a partir de sus posiciones.',
        'Cada gesto activa una animación superpuesta sobre el vídeo con OpenCV: Unlimited Void (無量空処) con los dedos índice y corazón cruzados, Hollow Purple (虚式「紫」) juntando pulgar, índice y corazón, y el puño cerrado detiene la técnica activa. Los textos en japonés se dibujan con Pillow y una fuente Noto Sans CJK.',
      ],
      en: [
        'A Python desktop app inspired by the anime Jujutsu Kaisen. It uses MediaPipe’s Hand Landmarker model to locate the 21 landmarks of each hand on every webcam frame and recognises specific gestures from their positions.',
        'Each gesture triggers an animation composited over the video with OpenCV: Unlimited Void (無量空処) with crossed index and middle fingers, Hollow Purple (虚式「紫」) by joining thumb, index and middle fingers, and a closed fist stops the active technique. Japanese text is drawn with Pillow and a Noto Sans CJK font.',
      ],
    },
    highlights: {
      es: [
        'Detección de manos en tiempo real con MediaPipe.',
        'Reconocimiento de gestos basado en la geometría de los landmarks.',
        'Animaciones compuestas fotograma a fotograma con OpenCV y NumPy.',
      ],
      en: [
        'Real-time hand tracking with MediaPipe.',
        'Gesture recognition based on landmark geometry.',
        'Frame-by-frame animations composited with OpenCV and NumPy.',
      ],
    },
    stack: ['Python', 'OpenCV', 'MediaPipe', 'NumPy', 'Pillow'],
    image: {
      src: '/img/projects/gojo-simulator.svg',
      alt: {
        es: 'Ilustración de Gojo Simulator: una mano y un círculo violeta',
        en: 'Gojo Simulator illustration: a hand and a purple circle',
      },
      width: 1200,
      height: 750,
    },
    repoUrl: 'https://github.com/FernandoPinRa/gojo-simulator',
  },
  {
    slug: 'gestor-ausencias',
    title: 'Gestor de ausencias',
    status: 'coming-soon',
    year: 2026,
    summary: {
      es: 'Aplicación para solicitar y aprobar vacaciones y ausencias, con calendario de equipo. Front en Angular y API con Django REST Framework.',
      en: 'An app to request and approve holidays and absences, with a team calendar. Angular front-end and a Django REST Framework API.',
    },
    description: { es: [], en: [] },
    highlights: { es: [], en: [] },
    stack: ['Angular', 'TypeScript', 'Django', 'Django REST Framework'],
    image: COMING_SOON_IMAGE,
  },
  {
    slug: 'angular-migration',
    title: 'Angular 8 → 22, paso a paso',
    status: 'coming-soon',
    year: 2026,
    summary: {
      es: 'Repositorio que documenta la migración de una app real de Angular 8 a la última versión: cada salto de versión en su propia rama, con los problemas y cómo se resolvieron.',
      en: 'A repository documenting the migration of a real app from Angular 8 to the latest version: each version jump in its own branch, with the issues found and how they were solved.',
    },
    description: { es: [], en: [] },
    highlights: { es: [], en: [] },
    stack: ['Angular', 'TypeScript', 'RxJS'],
    image: COMING_SOON_IMAGE,
  },
  {
    slug: 'drf-client',
    title: 'drf-client',
    status: 'coming-soon',
    year: 2026,
    summary: {
      es: 'Librería npm para consumir APIs de Django REST Framework desde Angular con tipos, paginación y filtros listos para usar.',
      en: 'An npm library to consume Django REST Framework APIs from Angular, with typings, pagination and filters out of the box.',
    },
    description: { es: [], en: [] },
    highlights: { es: [], en: [] },
    stack: ['TypeScript', 'Angular', 'Django REST Framework'],
    image: COMING_SOON_IMAGE,
  },
];

export const PUBLISHED_PROJECTS = PROJECTS.filter((p) => p.status === 'published');

export function findProject(slug: string): Project | undefined {
  return PUBLISHED_PROJECTS.find((p) => p.slug === slug);
}
