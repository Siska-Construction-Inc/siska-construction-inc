import { ProjectsGallery } from "@/components/ProjectsGallery";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

export default function ProjectsPage() {
  return <ProjectsGallery projects={projects} />;
}
