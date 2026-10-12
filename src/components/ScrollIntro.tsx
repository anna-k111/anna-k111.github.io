"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const DESTINATION = "/work/";
// How much scrolling (in pixels of wheel/touch movement) plays the whole intro.
const WHEEL_DISTANCE = 1200;
const TOUCH_DISTANCE = 600;
const KEY_STEP = 0.25;

/**
 * Landing intro, modelled on a scroll-scrubbed hero: the page itself doesn't scroll.
 * Wheel, touch and arrow keys drive a 0→1 progress value that plays the intro
 * forwards or backwards. At 1, the visitor is taken to /work/.
 *
 * The visuals here are placeholders (fade + slide, and a progress bar on the right).
 * Replace what's inside the <section> without touching the progress logic.
 */
export default function ScrollIntro() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const leaving = useRef(false);
  const touchY = useRef<number | null>(null);

  const advance = useCallback((delta: number) => {
    if (leaving.current) return;
    setProgress((p) => Math.min(1, Math.max(0, p + delta)));
  }, []);

  useEffect(() => {
    router.prefetch(DESTINATION);
  }, [router]);

  // Leave for /work/ once the intro has fully played.
  useEffect(() => {
    if (progress < 1 || leaving.current) return;
    leaving.current = true;
    const t = setTimeout(() => router.push(DESTINATION), 200);
    return () => clearTimeout(t);
  }, [progress, router]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = (delta: number) => (reduceMotion ? advance(delta > 0 ? 1 : 0) : advance(delta));

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const px = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
      step(px / WHEEL_DISTANCE);
    };
    const onTouchStart = (e: TouchEvent) => {
      touchY.current = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchY.current === null) return;
      e.preventDefault();
      const y = e.touches[0].clientY;
      step((touchY.current - y) / TOUCH_DISTANCE);
      touchY.current = y;
    };
    const onTouchEnd = () => {
      touchY.current = null;
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        step(KEY_STEP);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        step(-KEY_STEP);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [advance]);

  return (
    <main className="relative h-dvh overflow-hidden overscroll-none" data-progress={progress.toFixed(2)}>
      {/* Placeholder intro visuals */}
      <section
        className="flex h-full flex-col items-center justify-center px-4 text-center transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none"
        style={{
          opacity: 1 - progress,
          transform: `translateY(${-progress * 48}px)`,
        }}
      >
        <h1 className="font-display text-4xl tracking-[0.06em] text-navy sm:text-6xl">
          Hi! I&rsquo;m Anna Kotenko.
        </h1>
      </section>

      {/* Scroll prompt, also clickable for anyone who doesn't scroll */}
      <Link
        href={DESTINATION}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.3em] text-muted uppercase hover:text-navy"
        style={{ opacity: 1 - progress }}
      >
        Scroll
        <span aria-hidden="true" className="mt-2 block text-center motion-safe:animate-bounce">
          ↓
        </span>
      </Link>

      {/* Progress indicator on the right edge */}
      <div aria-hidden="true" className="absolute top-1/2 right-4 h-40 w-px -translate-y-1/2 bg-line">
        <div
          className="w-px bg-navy transition-[height] duration-150 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
    </main>
  );
}
