'use client';

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect, useCallback } from "react";
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

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const closeGallery = useCallback(() => setIsOpen(false), []);

  const next = useCallback(() => {
    setCurrentIndex((i) => (project.gallery.length ? (i + 1) % project.gallery.length : i));
  }, [project.gallery.length]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (project.gallery.length ? (i - 1 + project.gallery.length) % project.gallery.length : i));
  }, [project.gallery.length]);

  useEffect(() => {
    if (!isOpen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") closeGallery();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, next, prev, closeGallery]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [isOpen]);

  const locationLabel = project.location || null;
  const yearLabel = project.year ?? null;
  const areaLabel =
    locale === "en"
      ? project.area_sqft
        ? `${project.area_sqft} sq ft`
        : project.area_m2
        ? `${project.area_m2} m²`
        : null
      : project.area_m2
      ? `${project.area_m2} m²`
      : project.area_sqft
      ? `${project.area_sqft} sq ft`
      : null;

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
            {translation.scope && translation.scope.length > 0 && (
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
            )}
          </div>
          <aside className="self-start rounded-4xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm shadow-neutral-900/10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
              {t("projects:detail.metrics")}
            </p>
            <dl className="mt-6 space-y-4 text-sm text-neutral-700">
              {locationLabel && (
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-neutral-500">{t("projects:detail.location")}</dt>
                  <dd className="text-right font-semibold text-neutral-900">{locationLabel}</dd>
                </div>
              )}

              {yearLabel && (
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-neutral-500">{t("projects:detail.year")}</dt>
                  <dd className="text-right font-semibold text-neutral-900">{yearLabel}</dd>
                </div>
              )}

              {areaLabel && (
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-neutral-500">{t("projects:detail.area")}</dt>
                  <dd className="text-right font-semibold text-neutral-900">{areaLabel}</dd>
                </div>
              )}
            </dl>
          </aside>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-neutral-900">
              {t("projects:detail.gallery")}
            </h2>
            <span className="text-sm text-neutral-500">{project.gallery.length} {t("projects:detail.imagesCount")}</span>
          </div>
          <div className="space-y-4">
            {(() => {
              const rows: string[][] = [];
              for (let i = 0; i < project.gallery.length; i += 2) {
                rows.push(project.gallery.slice(i, i + 2));
              }

              return rows.map((row, rowIndex) => (
                <div key={rowIndex} className={`flex gap-4 ${row.length === 1 ? "justify-center" : ""}`}>
                  {row.map((image, idx) => {
                    const globalIndex = rowIndex * 2 + idx;
                    return (
                      <button
                        key={image}
                        type="button"
                        onClick={() => openGallery(globalIndex)}
                        className="relative h-72 overflow-hidden rounded-3xl bg-neutral-100 flex-1 min-w-0"
                        aria-label={`Open image ${globalIndex + 1} of ${project.gallery.length}`}
                      >
                        <Image
                          src={image}
                          alt={`${translation.name} photo ${globalIndex + 1}`}
                          fill
                          className="object-cover transition duration-500 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </button>
                    );
                  })}
                </div>
              ));
            })()}
          </div>
        </section>
      </div>

      {/** Gallery lightbox modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div
            className="absolute inset-0 pointer-events-auto"
            aria-hidden
          />

          <div className="relative z-10 mx-4 w-[80vw] h-[80vh] max-w-[95vw] max-h-[95vh]">
            <div className="relative flex items-center justify-center rounded-2xl bg-white/94  p-4 shadow-2xl h-full">
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white"
                aria-label="Previous image"
              >
                ‹
              </button>

              <div className="mx-6 w-full h-full overflow-hidden rounded">
                <Image
                  src={project.gallery[currentIndex]}
                  alt={`${translation.name} photo ${currentIndex + 1}`}
                  width={1600}
                  height={1200}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>

              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white"
                aria-label="Next image"
              >
                ›
              </button>

              <button
                type="button"
                onClick={closeGallery}
                className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white"
                aria-label="Close gallery"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
