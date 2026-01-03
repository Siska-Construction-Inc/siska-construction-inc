import path from "path";
import type { Locale } from "@/lib/i18n/settings";
import type { Project, ProjectCategory } from "@/components/types";

const baseProjects: Project[] = [
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function loadProjectsFromPublic(): Project[] {
  if (typeof window !== "undefined") return [];
  try {
    const fs = require("fs");
    const publicProjectsDir = path.join(process.cwd(), "public", "projects");
    if (!fs.existsSync(publicProjectsDir)) return [];

    const dirents = fs.readdirSync(publicProjectsDir, { withFileTypes: true });
    const folders = dirents.filter((d: any) => d.isDirectory()).map((d: any) => d.name);

    const projectsBuilt: Project[] = folders
      .map((folder: string) => {
        const folderPath = path.join(publicProjectsDir, folder);
        const files = fs.readdirSync(folderPath).filter((name: string) => {
          const ext = path.extname(name).toLowerCase();
          return [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"].includes(ext);
        });

        if (files.length === 0) return null;

        const gallery = files.map((f: string) => `/projects/${folder}/${f}`);
        const defaultCover = gallery[0];
        const slug = slugify(folder);

        let meta: Partial<Project> | null = null;
        const metaPath = path.join(folderPath, "meta.json");
        if (fs.existsSync(metaPath)) {
          try {
            meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
          } catch (err) {
            meta = null;
          }
        }

        const sourceFromBase =
          baseProjects.find((p) => p.id === slug) ||
          baseProjects.find((p) => slugify(p.location) === slug) ||
          baseProjects.find((p) =>
            Object.values(p.translations).some((tr) => slugify(tr.name) === slug)
          );

        const coverImage = meta?.coverImage
          ? typeof meta.coverImage === "string" && meta.coverImage.startsWith("http")
            ? meta.coverImage
            : `/projects/${folder}/${meta.coverImage}`
          : defaultCover;

        const translations =
          (meta && (meta as any).translations) ||
          sourceFromBase?.translations || {
            cs: { name: folder, summary: "", description: "", scope: [] },
            en: { name: folder, summary: "", description: "", scope: [] },
          };

        return {
          id: slug,
          coverImage,
          gallery,
          location: folder,
          year: (meta && (meta as any).year) ?? sourceFromBase?.year ?? undefined,
          area_m2: (meta && (meta as any).area_m2) ?? (meta && (meta as any).area) ?? sourceFromBase?.area_m2 ?? undefined,
          area_sqft: (meta && (meta as any).area_sqft) ?? undefined,
          categories: (meta && (meta as any).categories) ?? sourceFromBase?.categories ?? [],
          featured: !!((meta && (meta as any).featured) ?? sourceFromBase?.featured),
          translations: translations as Record<any, any>,
        } as Project;
      })
      .filter(Boolean) as Project[];

    return projectsBuilt;
  } catch (err) {
    return [];
  }
}

export const projects: Project[] = loadProjectsFromPublic();

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}

export function getProjectsForLocale(locale: Locale) {
  return projects.map((project) => ({
    ...project,
    translation: project.translations[locale],
  }));
}

export function getFeaturedProjects(limit = 3) {
  const featuredProjects = projects.filter((project) => project.featured);

  const desiredOrder = [
    "desert-west-drive",
    "saint-charles",
    "n-oakley",
  ];

  const orderedFeatured = desiredOrder
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean) as Project[];

  const remainingFeatured = featuredProjects.filter((p) => !desiredOrder.includes(p.id));

  const combined = [...orderedFeatured, ...remainingFeatured];

  if (combined.length >= limit) return combined.slice(0, limit);

  const needed = limit - combined.length;
  const additional = [...projects]
    .filter((project) => !project.featured)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .slice(0, needed);

  return [...combined, ...additional].slice(0, limit);
}

export function getLatestProjects(limit = 3) {
  return [...projects]
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .slice(0, limit);
}

export function getLatestProject(): Project | undefined {
  if (!projects || projects.length === 0) return undefined;

  return projects.reduce((latest, current) =>
    (current.year ?? 0) > (latest.year ?? 0) ? current : latest
  );
}

export function getProjectCategories(): ProjectCategory[] {
  const categorySet = new Set<ProjectCategory>();

  projects.forEach((project) => {
    project.categories.forEach((category) => {
      categorySet.add(category);
    });
  });

  return Array.from(categorySet);
}
