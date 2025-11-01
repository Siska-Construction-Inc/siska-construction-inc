import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { ProjectDetailContent } from "@/components/sections/ProjectDetailContent";
import { getProjectById, projects } from "@/data/projects";
import { initTranslations } from "@/lib/i18n/initTranslations";
import { resolveLocale } from "@/lib/i18n/localeUtils";
import { defaultLocale, type Locale } from "@/lib/i18n/settings";

import type { Metadata } from "next";

type ProjectDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return { title: "Project not found" };
  }

  const requestHeaders = await headers();
  const locale = (resolveLocale(requestHeaders.get("accept-language")) as Locale) ?? defaultLocale;
  const { t } = await initTranslations(locale, ["projects"]);

  return {
    title: t("projects:meta.detailTitle", { project: project.translations[locale]?.name ?? project.translations[defaultLocale].name }),
    description: project.translations[locale]?.summary ?? project.translations[defaultLocale].summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent project={project} />;
}
