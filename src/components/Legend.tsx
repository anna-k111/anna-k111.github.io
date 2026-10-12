"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

export type LegendItem = { label: string; href: string };

type LegendProps = {
  /** Links to sections of the current page, e.g. "#description". Shown first, numbered. */
  sections?: LegendItem[];
  /** Links to other pages (Work, Contact). Shown below a divider. */
  pages: LegendItem[];
};

/**
 * Floating legend fixed to the top-left corner.
 * On screens narrower than `md` it collapses behind a three-bar button.
 */
export default function Legend({ sections = [], pages }: LegendProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const pathname = usePathname();

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav aria-label="Legend" className="fixed top-4 left-4 z-50 md:top-6 md:left-6">
      {/* Three-bar toggle: phones only */}
      <button
        type="button"
        className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-lg border border-line bg-page/90 backdrop-blur md:hidden"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="block h-0.5 w-5 bg-navy" />
        <span className="block h-0.5 w-5 bg-navy" />
        <span className="block h-0.5 w-5 bg-navy" />
      </button>

      <div
        id={panelId}
        data-open={open}
        className="mt-2 hidden min-w-48 rounded-xl border border-line bg-page px-6 py-5 shadow-lg data-[open=true]:block md:mt-0 md:block md:bg-page/90 md:shadow-none md:backdrop-blur"
      >
        {sections.length > 0 && (
          <>
            <ol className="flex flex-col gap-3">
              {sections.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={close}
                    className="group flex items-baseline gap-2 font-display text-lg tracking-[0.12em] text-navy uppercase"
                  >
                    <span className="font-mono text-[10px] tracking-normal text-muted">
                      {String(i).padStart(2, "0")}
                    </span>
                    <span className="group-hover:underline underline-offset-4">{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
            <hr className="my-4 w-8 border-line" />
          </>
        )}

        <ul className="flex flex-col gap-3">
          {pages.map((item) => {
            const current = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={current ? "page" : undefined}
                  className="font-display text-base tracking-[0.14em] text-muted uppercase hover:text-navy aria-[current=page]:text-navy"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
