
'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { createInstance, type Resource } from "i18next";

import {
  defaultLocale,
  defaultNamespace,
  locales,
  type Locale,
} from "./settings";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  availableLocales: readonly Locale[];
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const STORAGE_KEY = "siska-construction-locale";

type TranslationProviderProps = {
  initialLocale: Locale;
  namespaces: string[];
  resources: Resource;
  children: ReactNode;
};

export function TranslationProvider({
  initialLocale,
  namespaces,
  resources,
  children,
}: TranslationProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return initialLocale;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored && locales.includes(stored as Locale)) {
      return stored as Locale;
    }

    const navigatorLanguage = window.navigator?.language?.split("-")[0];

    if (navigatorLanguage && locales.includes(navigatorLanguage as Locale)) {
      return navigatorLanguage as Locale;
    }

    return initialLocale;
  });

  const [i18nInstance] = useState(() => {
    const instance = createInstance();

    instance.use(initReactI18next).init({
      lng: initialLocale,
      fallbackLng: defaultLocale,
      resources,
      ns: namespaces,
      defaultNS: defaultNamespace,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });

    return instance;
  });

  useEffect(() => {
    void i18nInstance.changeLanguage(locale);
  }, [i18nInstance, locale]);

  useEffect(() => {
    Object.entries(resources).forEach(([lng, resource]) => {
      Object.entries(resource).forEach(([namespace, value]) => {
        i18nInstance.addResourceBundle(lng, namespace, value, true, true);
      });
    });
  }, [i18nInstance, resources]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    document.documentElement.lang = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const updateLocale = useCallback(
    (next: Locale) => {
      setLocaleState((current) => (current === next ? current : next));
    },
    [setLocaleState],
  );

  const contextValue = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: updateLocale,
      availableLocales: locales,
    }),
    [locale, updateLocale],
  );

  return (
    <LocaleContext.Provider value={contextValue}>
      <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
    </LocaleContext.Provider>
  );
}

export function useAppLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useAppLocale must be used within a TranslationProvider");
  }

  return context;
}
