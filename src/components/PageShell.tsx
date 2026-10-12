import type { ReactNode } from "react";

/**
 * Main content column. Leaves room for the fixed legend on desktop,
 * and for the menu button on phones.
 */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pt-20 pb-24 md:pt-16 md:pr-8 md:pl-64">
      {children}
    </main>
  );
}
