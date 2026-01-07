'use client';

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useAppLocale } from "@/lib/i18n/TranslationProvider";
import { CONTACT_PERSON_CS, CONTACT_PERSON_EN } from "@/components/constants";

export function Team() {
  const { t } = useTranslation("home");
  const { locale } = useAppLocale();
  const contactName = locale === "cs" ? CONTACT_PERSON_CS : CONTACT_PERSON_EN;
  const highlights = t("team.highlights", { returnObjects: true }) as string[];

  return (
    <section className="bg-neutral-50 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
        <div className="relative overflow-hidden rounded-4xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-900/10">
          <Image
            src="/team/robert.jpg"
            alt="Portrait of Robert Siska"
            width={640}
            height={720}
              className="h-80 w-full object-cover"
            priority
          />
          <div className="absolute left-6 right-6 bottom-6 rounded-3xl border border-white/20 bg-neutral-900/90 px-6 py-4 text-neutral-100 shadow-lg">
            <p className="text-sm text-neutral-100">{t("team.member.role")}</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
              {t("team.kicker")}
            </p>
            <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
              {t("team.title")}
            </h2>
            <p className="text-base text-neutral-600 md:text-lg">
              {t("team.subtitle")}
              <Link
                href="/about"
                className="ml-1 inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition-colors duration-150 hover:text-neutral-900 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                {t("team.cta")}
                <span aria-hidden>→</span>
              </Link>
            </p>
          </div>
          <p className="rounded-3xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600 shadow-sm shadow-neutral-900/5">
            {t("team.description")}
          </p>
          <ul className="grid gap-4 md:grid-cols-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white/80 px-5 py-4 text-sm text-neutral-600 shadow-sm shadow-neutral-900/5"
              >
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-neutral-900" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
