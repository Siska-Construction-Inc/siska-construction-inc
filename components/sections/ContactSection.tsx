'use client';

import { useTranslation } from "react-i18next";

import { ContactInfo } from "@/components/widgets/ContactInfo";

export function ContactSection() {
  const { t } = useTranslation("home");

  return (
    <section id="contact" className="relative overflow-hidden bg-neutral-950 py-24 text-neutral-100">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 text-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-400">
            {t("contact.kicker")}
          </p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            {t("contact.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-neutral-300">
            {t("contact.subtitle")}
          </p>
        </div>
        <div className="w-full max-w-xl">
          <ContactInfo />
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
          {t("contact.note")}
        </p>
      </div>
    </section>
  );
}
