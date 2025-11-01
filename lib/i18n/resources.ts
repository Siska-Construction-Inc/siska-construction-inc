import type { Resource } from "i18next";

import commonCs from "@/locales/cs/common.json";
import homeCs from "@/locales/cs/home.json";
import projectsCs from "@/locales/cs/projects.json";
import commonEn from "@/locales/en/common.json";
import homeEn from "@/locales/en/home.json";
import projectsEn from "@/locales/en/projects.json";

export const resources = {
  cs: {
    common: commonCs,
    home: homeCs,
    projects: projectsCs,
  },
  en: {
    common: commonEn,
    home: homeEn,
    projects: projectsEn,
  },
} satisfies Resource;

export type AppResources = typeof resources;

export default resources;
