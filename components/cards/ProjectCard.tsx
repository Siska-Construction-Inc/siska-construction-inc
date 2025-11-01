'use client';

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import type { Project } from "@/data/projects";
import { useAppLocale } from "@/lib/i18n/TranslationProvider";
import { defaultLocale } from "@/lib/i18n/settings";

const cardClasses =
  "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-lg shadow-stone-900/5 transition hover:-translate-y-1 hover:shadow-xl";

const imageWrapperClasses = "relative h-60 w-full overflow-hidden";

const gradientOverlay =
  "pointer-events-none absolute inset-0 bg-linear-to-t from-stone-900/80 via-transparent";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { locale } = useAppLocale();

  const translation = useMemo(() => {
    return project.translations[locale] ?? project.translations[defaultLocale];
  }, [locale, project]);

  return (
    <Link href={`/projects/${project.id}`} className={cardClasses}>
      <div className={imageWrapperClasses}>
        <Image
          src={project.coverImage}
          alt={translation.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={gradientOverlay} />
        <div className="absolute bottom-6 left-6 right-6 space-y-2 text-stone-50">
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
            {project.location}
          </span>
          <h3 className="text-2xl font-semibold leading-tight">
            {translation.name}
          </h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-6 pb-6 pt-5 text-sm text-stone-600">
        <p>{translation.summary}</p>
        <div className="mt-auto flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">
          <span>{project.year}</span>
          <span aria-hidden="true">•</span>
          <span>{project.area} m²</span>
        </div>
      </div>
    </Link>
  );
}
