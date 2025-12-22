export const locales = ["cs", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "cs";

export const namespaces = ["common", "home", "projects"] as const;

export type Namespace = (typeof namespaces)[number];

export const defaultNamespace: Namespace = "common";
