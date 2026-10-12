import type { Metadata } from "next";
import CopyEmail from "@/components/CopyEmail";
import Legend from "@/components/Legend";
import PageShell from "@/components/PageShell";
import Placeholder from "@/components/Placeholder";
import { site } from "@/content/site";
import { WORK } from "@/content/nav";

export const metadata: Metadata = { title: "Contact" };

const buttonClass =
  "inline-flex items-center rounded-md border px-5 py-2 font-mono text-xs tracking-[0.12em] uppercase";

export default function ContactPage() {
  return (
    <>
      <Legend pages={[WORK]} />
      <PageShell>
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl tracking-[0.04em] text-navy">{site.name}</h1>

          {/* TODO: replace with resume content */}
          <Placeholder label="Resume content" className="mt-10 min-h-96" />

          <section aria-label="Contact details" className="mt-12 flex flex-col gap-5 border-t border-line pt-8">
            <CopyEmail email={site.email} />

            <ul className="flex flex-wrap gap-6 font-mono text-sm">
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-navy underline underline-offset-4">
                  GitHub
                </a>
              </li>
              <li>
                {site.linkedin ? (
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-navy underline underline-offset-4">
                    LinkedIn
                  </a>
                ) : (
                  <span className="text-muted" title="LinkedIn URL not added yet">
                    LinkedIn (link coming soon)
                  </span>
                )}
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              {site.resumePdf ? (
                <a href={site.resumePdf} download className={`${buttonClass} border-navy text-navy hover:bg-navy hover:text-page`}>
                  Download Resume
                </a>
              ) : (
                <button type="button" disabled className={`${buttonClass} cursor-not-allowed border-line text-muted`}>
                  Download Resume (coming soon)
                </button>
              )}
              <a href={`mailto:${site.email}`} className={`${buttonClass} border-navy text-navy hover:bg-navy hover:text-page`}>
                Email
              </a>
            </div>
          </section>
        </div>
      </PageShell>
    </>
  );
}
