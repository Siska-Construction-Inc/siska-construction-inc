import { ContactSection } from "@/components/sections/ContactSection";
import { Hero } from "@/components/sections/Hero";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { TeamSection } from "@/components/sections/TeamSection";
import { getFeaturedProjects } from "@/data/projects";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects(3);

  return (
    <>
      <Hero />
      <TeamSection />
      <ProjectsShowcase projects={featuredProjects} id="projects" accent="muted" />
      <ContactSection />
    </>
  );
}
