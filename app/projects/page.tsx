import { ProjectsGallery } from "@/components/sections/ProjectsGallery";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

export default function ProjectsPage() {
  return <ProjectsGallery projects={projects} />;
}
