import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Team } from "@/components/Team";
import { getFeaturedProjects, getLatestProject } from "@/data/projects";
import { headers } from "next/headers";
import { resolveLocale } from "@/lib/i18n/localeUtils";
import { initTranslations } from "@/lib/i18n/initTranslations";
import { defaultLocale, type Locale } from "@/lib/i18n/settings";
import { ProjectsHeader } from "@/components/ProjectsHeader";

export default async function HomePage() {
  const featuredProjects = getFeaturedProjects(4);
  const latestProject = getLatestProject();

  const requestHeaders = await headers();
  const acceptLanguage = requestHeaders.get("accept-language");
  const locale = (resolveLocale(acceptLanguage) as Locale) ?? defaultLocale;

  const translation = latestProject
    ? latestProject.translations[locale] ?? latestProject.translations[defaultLocale]
    : undefined;

  const { t } = await initTranslations(locale, ["home"]);

  return (
    <>
      <Hero latestProject={latestProject} translation={translation} />
      <Team />

      <section id="projects" className="bg-neutral-100 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <ProjectsHeader />
          {featuredProjects.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-neutral-300 bg-white p-10 text-center text-sm text-neutral-500">
              {t("projects.empty")}
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`${index === 3 ? "hidden md:block xl:hidden" : ""}`}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactForm />
    </>
  );
}
