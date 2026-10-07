export const LANGS = ['es', 'en'] as const;
export type Lang = (typeof LANGS)[number];

/** A value that exists in every supported language. */
export type Localized<T = string> = Readonly<Record<Lang, T>>;

/** Plain text when it reads the same in every language (e.g. technology names). */
export type Text = string | Localized;

/** Year and month, e.g. `2023-08`. */
export type YearMonth = `${number}-${number}`;

export interface Link {
  readonly label: string;
  readonly url: string;
}

export interface Image {
  readonly src: string;
  readonly alt: Localized;
  readonly width: number;
  readonly height: number;
}

export interface SpokenLanguage {
  readonly name: Localized;
  readonly level: Localized;
}

export interface Education {
  readonly title: Localized;
  readonly school: string;
  readonly start: number;
  readonly end: number;
}

export interface Profile {
  readonly name: string;
  readonly role: Localized;
  readonly location: string;
  readonly availability: Localized;
  readonly tagline: Localized;
  readonly summary: Localized<readonly string[]>;
  readonly email: string;
  readonly github: Link;
  readonly linkedin: Link;
  readonly cv: Localized;
  readonly photo: Image;
  readonly languages: readonly SpokenLanguage[];
  readonly education: readonly Education[];
}

export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly role: Localized;
  readonly location: Localized;
  readonly start: YearMonth;
  /** `null` means the position is current. */
  readonly end: YearMonth | null;
  readonly highlights: Localized<readonly string[]>;
  readonly stack: readonly string[];
}

export type ProjectStatus = 'published' | 'coming-soon';

export interface Project {
  /** Used in the URL: /proyectos/:slug and /en/projects/:slug. */
  readonly slug: string;
  readonly title: string;
  readonly status: ProjectStatus;
  readonly year: number;
  readonly summary: Localized;
  readonly description: Localized<readonly string[]>;
  readonly highlights: Localized<readonly string[]>;
  readonly stack: readonly string[];
  readonly image: Image;
  readonly repoUrl?: string;
  readonly demoUrl?: string;
}

export interface SkillGroup {
  readonly id: string;
  readonly label: Localized;
  readonly items: readonly Text[];
}
