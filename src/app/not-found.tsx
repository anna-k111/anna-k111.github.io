import Link from "next/link";
import Legend from "@/components/Legend";
import PageShell from "@/components/PageShell";
import { CONTACT, WORK } from "@/content/nav";

export default function NotFound() {
  return (
    <>
      <Legend pages={[WORK, CONTACT]} />
      <PageShell>
        <h1 className="font-display text-4xl tracking-[0.06em] text-navy">Page not found</h1>
        <p className="mt-4 text-muted">
          This page doesn&rsquo;t exist.{" "}
          <Link href="/work/" className="text-navy underline underline-offset-4">
            See my work
          </Link>
          .
        </p>
      </PageShell>
    </>
  );
}
