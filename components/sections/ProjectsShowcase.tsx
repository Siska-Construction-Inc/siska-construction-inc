'use client';

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { ProjectCard } from "@/components/cards/ProjectCard";
import type { Project } from "@/data/projects";

type ProjectsShowcaseProps = {
  projects: Project[];
  accent?: "light" | "muted";
  id?: string;
};

export function ProjectsShowcase({ projects, accent = "muted", id }: ProjectsShowcaseProps) {
  const { t } = useTranslation("home");

  const wrapperBackground =
    accent === "light" ? "bg-white" : "bg-neutral-100";

  return (
    <section id={id ?? "projects"} className={`${wrapperBackground} py-20`}> 
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
              {t("projects.title")}
            </h2>
            <p className="max-w-2xl text-base text-neutral-600">
              {t("projects.subtitle")}
            </p>
          </div>
          <Link
            href="/projects"
            className="text-sm font-semibold text-neutral-700 transition hover:text-neutral-900"
          >
            {t("projects.cta")}
          </Link>
        </div>
        {projects.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-neutral-300 bg-white p-10 text-center text-sm text-neutral-500">
            {t("projects.empty")}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
