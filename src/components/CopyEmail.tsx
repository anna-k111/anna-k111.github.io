"use client";

import { useState } from "react";

/** Shows the email address as text with a button that copies it. */
export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-mono text-sm text-ink select-all">{email}</span>
      <button
        type="button"
        onClick={copy}
        className="rounded-md border border-line px-3 py-1 font-mono text-xs text-navy hover:border-navy"
      >
        {status === "copied" ? "Copied" : status === "failed" ? "Select and copy" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {status === "copied" ? "Email address copied" : ""}
      </span>
    </div>
  );
}
