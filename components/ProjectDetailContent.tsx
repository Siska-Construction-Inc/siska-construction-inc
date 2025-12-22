'use client';

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { Project } from "@/components/types";
import { useAppLocale } from "@/lib/i18n/TranslationProvider";
import { defaultLocale } from "@/lib/i18n/settings";

const metricLabelClasses = "text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500";

type ProjectDetailContentProps = {
  project: Project;
};

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const { locale } = useAppLocale();
  const { t } = useTranslation(["projects", "common"]);

  const translation = useMemo(() => {
    return project.translations[locale] ?? project.translations[defaultLocale];
  }, [locale, project]);

  return (
    <article className="bg-white">
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={project.coverImage}
          alt={translation.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-20 text-white">
          <div className="mb-6 text-sm text-white/80">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
            >
              ← {t("projects:detail.back")}
            </Link>
          </div>
          <h1 className="text-4xl font-semibold sm:text-5xl">{translation.name}</h1>
          <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
            {translation.summary}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-16 px-6 py-16">
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className={metricLabelClasses}>{t("projects:detail.about")}</p>
              <p className="text-base text-neutral-600 md:text-lg">{translation.description}</p>
            </div>
            <div>
              <p className={metricLabelClasses}>{t("projects:detail.scope")}</p>
              <ul className="mt-4 space-y-3">
                {translation.scope.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-sm text-neutral-600 shadow-sm shadow-neutral-900/5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="rounded-4xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm shadow-neutral-900/10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
              {t("projects:detail.metrics")}
            </p>
            <dl className="mt-6 space-y-4 text-sm text-neutral-700">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-neutral-500">{t("projects:detail.location")}</dt>
                <dd className="text-right font-semibold text-neutral-900">{project.location}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-neutral-500">{t("projects:detail.year")}</dt>
                <dd className="text-right font-semibold text-neutral-900">{project.year}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-neutral-500">{t("projects:detail.area")}</dt>
                <dd className="text-right font-semibold text-neutral-900">{project.area} m²</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-neutral-500">{t("projects:detail.investor")}</dt>
                <dd className="text-right font-semibold text-neutral-900">{project.investor}</dd>
              </div>
            </dl>
            <div className="mt-6 space-y-2 text-xs uppercase tracking-[0.3em] text-neutral-500">
              <p>{t("projects:detail.services")}</p>
              <p className="font-semibold text-neutral-900">
                {project.categories.map((category) => t(`filters.${category}` as const)).join(" · ")}
              </p>
            </div>
          </aside>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-neutral-900">
              {t("projects:detail.gallery")}
            </h2>
            <span className="text-sm text-neutral-500">{project.gallery.length} {t("projects:detail.imagesCount")}</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {project.gallery.map((image) => (
              <div key={image} className="relative h-72 overflow-hidden rounded-3xl bg-neutral-100">
                <Image
                  src={image}
                  alt={`${translation.name} photo`}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
