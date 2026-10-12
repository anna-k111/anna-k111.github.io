import type { Metadata } from "next";
import Legend from "@/components/Legend";
import PageShell from "@/components/PageShell";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/content/projects";
import { CONTACT } from "@/content/nav";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <Legend pages={[CONTACT]} />
      <PageShell>
        <h1 className="sr-only">Work</h1>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </PageShell>
    </>
  );
}
