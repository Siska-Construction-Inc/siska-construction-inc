'use client';

import { useTranslation } from "react-i18next";

type ServiceItem = {
  title: string;
  description: string;
};

export function ServicesSection() {
  const { t } = useTranslation("home");
  const items = t("services.items", { returnObjects: true }) as ServiceItem[];

  return (
    <section id="services" className="bg-stone-950 py-20 text-stone-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 space-y-4 text-center md:mb-16">
          <h2 className="text-3xl font-semibold md:text-4xl">{t("services.title")}</h2>
          <p className="mx-auto max-w-2xl text-base text-stone-300">
            {t("intro.description")}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-lg shadow-black/10"
            >
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-stone-200">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
