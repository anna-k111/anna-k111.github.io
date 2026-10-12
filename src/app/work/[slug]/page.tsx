import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Legend from "@/components/Legend";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { getProject, projects } from "@/content/projects";
import { CONTACT, WORK } from "@/content/nav";

// Placeholder pages for every project that doesn't have its own folder yet.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.filter((p) => !p.customPage).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: getProject(slug)?.title ?? "Project" };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Legend pages={[WORK, CONTACT]} />
      <PageShell>
        <h1 className="font-display text-4xl tracking-[0.06em] text-navy">{project.title}</h1>
        <Placeholder label={`${project.title} content`} className="mt-8 min-h-80" />
      </PageShell>
    </>
  );
}
