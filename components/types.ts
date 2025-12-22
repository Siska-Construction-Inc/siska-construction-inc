import type { Locale } from "@/lib/i18n/settings";

export type ProjectCategory =
  | "apartments"
  | "houses"
  | "lofts"
  | "commercial"
  | "reconstructions";

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
  year: number;
  area: number;
  investor: string;
  categories: ProjectCategory[];
  featured?: boolean;
  translations: Record<Locale, ProjectTranslation>;
};
