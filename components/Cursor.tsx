"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  "a, button, input, textarea, label, .group, [data-cursor-interactive]";

/**
 * Original custom cursor: small filled circle, scales up on interactives.
 */
export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const isTouchOnly =
      window.matchMedia("(hover: none)").matches &&
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchOnly) {
      cursor.style.display = "none";
      return;
    }

    document.documentElement.classList.add("hide-cursor");
    cursor.style.display = "block";
    cursor.style.opacity = "1";

    mouse.current.x = window.innerWidth / 2;
    mouse.current.y = window.innerHeight / 2;
    pos.current.x = mouse.current.x;
    pos.current.y = mouse.current.y;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const over =
        e.target instanceof Element && Boolean(e.target.closest(INTERACTIVE));
      cursor.classList.toggle("active", over);
    };

    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.22;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.22;
      cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      raf.current = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      document.documentElement.classList.remove("hide-cursor");
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
