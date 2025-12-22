'use client';

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project, ProjectCategory } from "@/components/types";

const filterButtonClasses =
  "rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-neutral-900/20";

type FilterValue = "all" | ProjectCategory;

type ProjectsGalleryProps = {
  projects: Project[];
};

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const { t } = useTranslation("projects");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const categories = useMemo(() => {
    const set = new Set<ProjectCategory>();
    projects.forEach((project) => {
      project.categories.forEach((category) => set.add(category));
    });
    return Array.from(set);
  }, [projects]);

  const filters = useMemo(
    () => [
      { value: "all" as FilterValue, label: t("filters.all") },
      ...categories.map((category) => ({
        value: category as FilterValue,
        label: t(`filters.${category}` as const),
      })),
    ],
    [categories, t],
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter((project) => project.categories.includes(activeFilter));
  }, [activeFilter, projects]);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500">
            {t("meta.listTitle")}
          </p>
          <h1 className="text-4xl font-semibold text-neutral-900">
            {t("meta.listHeading")}
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={`${filterButtonClasses} ${
                  isActive
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 hover:text-neutral-900"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
        {filteredProjects.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center text-sm text-neutral-500">
            {t("empty")}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
