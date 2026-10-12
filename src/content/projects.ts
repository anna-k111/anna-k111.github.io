/**
 * One entry per project card on /work/.
 * The slug is the URL: /work/<slug>/.
 *
 * Projects with `customPage: true` have their own folder in src/app/work/<slug>/.
 * Every other project is rendered by src/app/work/[slug]/page.tsx, so renaming a
 * placeholder project is a one-line change to its slug and title here.
 */
export type Project = {
  slug: string;
  title: string;
  blurb: string;
  customPage?: boolean;
};

export const projects: Project[] = [
  {
    slug: "genomic-pca",
    title: "Genomic PCA",
    blurb: "Placeholder blurb: what PCA reveals in 995 genomes.",
    customPage: true,
  },
  {
    slug: "project-2",
    title: "Project 2",
    blurb: "Placeholder blurb.",
  },
  {
    slug: "project-3",
    title: "Project 3",
    blurb: "Placeholder blurb.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
