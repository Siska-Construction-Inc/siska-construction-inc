'use client';

import Image from "next/image";
import { useTranslation } from "react-i18next";

export function TeamSection() {
  const { t } = useTranslation("home");
  const highlights = t("team.highlights", { returnObjects: true }) as string[];

  return (
    <section id="about" className="bg-neutral-50 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
        <div className="relative overflow-hidden rounded-4xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-900/10">
          <Image
            src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=1600&q=80"
            alt="Portrait of Robert Šiška"
            width={640}
            height={720}
            className="h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-white/20 bg-neutral-900/90 px-6 py-4 text-neutral-100 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-300">
              {t("team.member.role")}
            </p>
            <p className="mt-1 text-lg font-semibold">Robert Šiška</p>
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
