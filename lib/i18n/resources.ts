import type { Resource } from "i18next";

import aboutCs from "@/locales/cs/about.json";
import commonCs from "@/locales/cs/common.json";
import homeCs from "@/locales/cs/home.json";
import projectsCs from "@/locales/cs/projects.json";
import commonEn from "@/locales/en/common.json";
import homeEn from "@/locales/en/home.json";
import projectsEn from "@/locales/en/projects.json";
import aboutEn from "@/locales/en/about.json";

export const resources = {
  cs: {
    common: commonCs,
    home: homeCs,
    about: aboutCs,
    projects: projectsCs,
  },
  en: {
    common: commonEn,
    home: homeEn,
    about: aboutEn,
    projects: projectsEn,
  },
} satisfies Resource;

export type AppResources = typeof resources;

export default resources;
