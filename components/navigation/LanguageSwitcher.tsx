'use client';

import {
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { useTranslation } from "react-i18next";

import { useAppLocale } from "@/lib/i18n/TranslationProvider";

const triggerClasses =
  "relative inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white/70 px-3 py-1.5 text-sm font-semibold text-stone-900 shadow-sm backdrop-blur transition hover:border-stone-400 hover:bg-white focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-500/30";

const listboxClasses =
  "absolute left-0 top-full z-20 mt-2 w-36 overflow-hidden rounded-lg border border-stone-200 bg-white/95 py-1 shadow-lg backdrop-blur";

const optionClasses =
  "flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-stone-800 transition hover:bg-stone-100 focus:bg-stone-100 focus:outline-none";

export function LanguageSwitcher() {
  const { locale, availableLocales, setLocale } = useAppLocale();
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    availableLocales.indexOf(locale),
  );
  const triggerId = useId();
  const listId = `${triggerId}-listbox`;
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const closeList = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (containerRef.current?.contains(event.target as Node)) {
        return;
      }
      setIsOpen(false);
    };

    const handleKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeList();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [closeList, isOpen]);

  useEffect(() => {
    optionRefs.current = optionRefs.current.slice(0, availableLocales.length);
  }, [availableLocales]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    optionRefs.current[activeIndex]?.focus();
  }, [activeIndex, isOpen]);

  const handleTriggerClick = () => {
    setIsOpen((previous) => !previous);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((previous) =>
        (previous + direction + availableLocales.length) %
        availableLocales.length,
      );
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((previous) => !previous);
    }
  };

  const handleOptionKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((previous) =>
        (previous + direction + availableLocales.length) %
        availableLocales.length,
      );
    }
    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(availableLocales.length - 1);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      closeList();
    }
  };

  const selectLocale = useCallback(
    (nextLocale: (typeof availableLocales)[number]) => {
      setLocale(nextLocale);
      closeList();
    },
    [closeList, setLocale],
  );

  const options = useMemo(
    () =>
      availableLocales.map((candidate, index) => {
        const isActive = index === activeIndex;
        const isSelected = candidate === locale;

        return {
          candidate,
          index,
          isActive,
          isSelected,
          label: t(`language.${candidate}` as const),
        };
      }),
    [activeIndex, availableLocales, locale, t],
  );

  const activeOptionId = useMemo(() => {
    if (!isOpen) {
      return undefined;
    }
    const next = options[activeIndex];
    if (!next) {
      return undefined;
    }
    return `${listId}-${next.candidate}`;
  }, [activeIndex, isOpen, listId, options]);

  const handleOptionClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const nextLocale = event.currentTarget.dataset.locale as
      | (typeof availableLocales)[number]
      | undefined;
    if (!nextLocale) {
      return;
    }
    selectLocale(nextLocale);
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center gap-2 text-sm font-medium text-stone-700"
    >
      <span className="sr-only" id={`${triggerId}-label`}>
        {t("language.label")}
      </span>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        className={triggerClasses}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-labelledby={`${triggerId}-label ${triggerId}`}
        aria-activedescendant={activeOptionId}
        role="combobox"
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
      >
        <span>{t(`language.${locale}` as const)}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="h-4 w-4 text-stone-500"
        >
          <path
            fillRule="evenodd"
            d="M5.47 7.97a.75.75 0 0 1 1.06 0L10 11.44l3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={`${triggerId}-label`}
          className={listboxClasses}
        >
          {options.map(({ candidate, index, isActive, isSelected, label }) => (
            <li key={candidate} role="none">
              <button
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                type="button"
                role="option"
                id={`${listId}-${candidate}`}
                data-locale={candidate}
                data-active={isActive}
                aria-selected={isSelected}
                className={`${optionClasses} ${
                  isActive
                    ? "bg-stone-100"
                    : isSelected
                    ? "bg-stone-50"
                    : "bg-transparent"
                }`}
                onClick={handleOptionClick}
                onKeyDown={handleOptionKeyDown}
              >
                <span>{label}</span>
                {isSelected ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4 text-stone-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 0 1 0 1.42l-7.25 7.25a1 1 0 0 1-1.42 0l-3.25-3.25a1 1 0 0 1 1.42-1.42l2.54 2.54 6.54-6.54a1 1 0 0 1 1.42 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
