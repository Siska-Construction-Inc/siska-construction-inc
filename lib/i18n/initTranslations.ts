import type { Resource, TFunction } from "i18next";
import { createInstance } from "i18next";

import resources from "./resources";
import { defaultLocale, defaultNamespace, type Locale } from "./settings";

export type InitTranslationsResult = {
  t: TFunction;
  resources: Resource;
};

export async function initTranslations(
  locale: Locale,
  namespaces: string[] = [defaultNamespace],
): Promise<InitTranslationsResult> {
  const instance = createInstance();

  await instance.init({
    lng: locale,
    fallbackLng: defaultLocale,
    resources,
    ns: namespaces,
    defaultNS: defaultNamespace,
    interpolation: { escapeValue: false },
    returnObjects: true,
  });

  return {
    t: instance.getFixedT(locale, namespaces),
    resources: instance.store.data as Resource,
  };
}
