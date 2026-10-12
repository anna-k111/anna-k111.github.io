import Link from "next/link";
import type { Project } from "@/content/projects";
import Placeholder from "./Placeholder";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}/`} className="group block">
      {/* TODO: replace with a thumbnail image for this project */}
      <Placeholder
        label={`${project.title} thumbnail`}
        className="aspect-[4/3] transition-colors group-hover:border-navy/60"
      />
      <h2 className="mt-4 text-xl text-ink group-hover:text-navy">{project.title}</h2>
      <p className="mt-1 text-muted">{project.blurb}</p>
    </Link>
  );
}
