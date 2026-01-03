import type { Locale } from "@/lib/i18n/settings";

export type ProjectCategory =
  | "apartments"
  | "houses";

export type ProjectTranslation = {
  name: string;
  summary: string;
  description: string;
  scope: string[];
};

export type Project = {
  id: string;
  coverImage: string;
  gallery: string[];
  location: string;
  year?: number;
  area_m2?: number;
  area_sqft?: number;
  categories: ProjectCategory[];
  featured?: boolean;
  translations: Record<Locale, ProjectTranslation>;
};
