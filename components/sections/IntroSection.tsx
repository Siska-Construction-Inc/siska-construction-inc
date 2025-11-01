'use client';

import { useTranslation } from "react-i18next";

export function IntroSection() {
  const { t } = useTranslation("home");
  const bullets = t("intro.bullets", { returnObjects: true }) as string[];

  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:flex-row">
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-semibold text-stone-900 md:text-4xl">
            {t("intro.title")}
          </h2>
          <p className="text-base text-stone-600 md:text-lg">{t("intro.description")}</p>
        </div>
        <ul className="flex-1 space-y-4">
          {bullets.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50/70 p-5 text-sm text-stone-700 shadow-sm"
            >
              <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-stone-900" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
