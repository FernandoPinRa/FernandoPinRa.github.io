import type { Profile } from './models';

export const PROFILE: Profile = {
  name: 'Fernando Pintado Ramos',
  role: {
    es: 'Desarrollador Front-End Angular · Full Stack con Django',
    en: 'Angular Front-End Developer · Full Stack with Django',
  },
  location: 'Puerto Real, España',
  availability: {
    es: 'Disponible para trabajo en remoto',
    en: 'Open to remote work',
  },
  tagline: {
    es: 'Construyo interfaces modulares, mantenibles y fáciles de usar, bien conectadas con el backend que las sostiene.',
    en: 'I build modular, maintainable and easy-to-use interfaces, tightly integrated with the backend behind them.',
  },
  summary: {
    es: [
      'Soy desarrollador Front-End especializado en Angular y TypeScript, con más de 4 años de experiencia profesional y un perfil full stack con base sólida en Python y Django para APIs REST.',
      'Me centro en interfaces modulares, mantenibles y fáciles de usar, bien integradas con el backend. He migrado varias aplicaciones desde Angular 8 hasta las versiones actuales y disfruto refactorizando código heredado hasta dejarlo limpio y testeado.',
    ],
    en: [
      "I'm a Front-End developer specialised in Angular and TypeScript, with more than 4 years of professional experience and a full stack background built on Python and Django for REST APIs.",
      'I focus on modular, maintainable and easy-to-use interfaces that integrate cleanly with the backend. I have migrated several applications from Angular 8 to current versions, and I enjoy refactoring legacy code until it is clean and well tested.',
    ],
  },
  email: 'fpintadoramos@gmail.com',
  github: { label: 'github.com/FernandoPinRa', url: 'https://github.com/FernandoPinRa' },
  linkedin: {
    label: 'linkedin.com/in/fernando-pintado-ramos',
    url: 'https://www.linkedin.com/in/fernando-pintado-ramos-93a419206',
  },
  cv: {
    es: '/cv/fernando-pintado-ramos-cv.pdf',
    en: '/cv/fernando-pintado-ramos-cv.pdf',
  },
  photo: {
    src: '/img/profile.svg',
    alt: { es: 'Retrato de Fernando Pintado Ramos', en: 'Portrait of Fernando Pintado Ramos' },
    width: 480,
    height: 600,
  },
  languages: [
    { name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' } },
    { name: { es: 'Inglés', en: 'English' }, level: { es: 'B2', en: 'B2' } },
    { name: { es: 'Francés', en: 'French' }, level: { es: 'B2', en: 'B2' } },
  ],
  education: [
    {
      title: {
        es: 'CFGS Desarrollo de Aplicaciones Multiplataforma (DAM)',
        en: 'Higher Vocational Diploma in Multiplatform Application Development',
      },
      school: 'IES Rafael Alberti',
      start: 2020,
      end: 2022,
    },
  ],
};
