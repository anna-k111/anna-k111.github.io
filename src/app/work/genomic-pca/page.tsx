import type { Metadata } from "next";
import Legend from "@/components/Legend";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { CONTACT, WORK } from "@/content/nav";

export const metadata: Metadata = { title: "Genomic PCA" };

const REPO_URL = "https://github.com/anna-k111/genomic-pca";

const sections = [
  { label: "Description", href: "#description" },
  { label: "Plots", href: "#plots" },
  { label: "GitHub Repo", href: "#github-repo" },
];

export default function GenomicPcaPage() {
  return (
    <>
      <Legend sections={sections} pages={[WORK, CONTACT]} />
      <PageShell>
        <h1 className="font-display text-4xl tracking-[0.06em] text-navy">Genomic PCA</h1>

        <section id="description" className="scroll-mt-24 pt-12">
          <h2 className="font-display text-2xl tracking-[0.12em] text-navy uppercase">Description</h2>
          <Placeholder label="Project description" className="mt-4 min-h-40" />
        </section>

        <section id="plots" className="scroll-mt-24 pt-16">
          <h2 className="font-display text-2xl tracking-[0.12em] text-navy uppercase">Plots</h2>
          <Placeholder label="Interactive PCA plots (3D cloud, PC1 vs PC2, PC3 by sex)" className="mt-4 aspect-[16/10]" />
        </section>

        <section id="github-repo" className="scroll-mt-24 pt-16">
          <h2 className="font-display text-2xl tracking-[0.12em] text-navy uppercase">GitHub Repo</h2>
          <p className="mt-4 text-muted">
            Code, notebook and how to run it:{" "}
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="text-navy underline underline-offset-4">
              github.com/anna-k111/genomic-pca
            </a>
          </p>
        </section>
      </PageShell>
    </>
  );
}
