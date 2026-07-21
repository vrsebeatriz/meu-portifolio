"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CustomCursor() {
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const prefersReducedMotion = useReducedMotion();
  const isActive = isFinePointer && !prefersReducedMotion;

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300 });

  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive) return;

    document.documentElement.classList.add("cursor-none-active");

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const hoverTarget = el?.closest("[data-cursor-hover]");
      setIsHovering(!!hoverTarget);
      setHoverText(hoverTarget?.getAttribute("data-cursor-text") ?? null);
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.classList.remove("cursor-none-active");
    };
  }, [isActive, cursorX, cursorY]);

  if (!isActive) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center rounded-full border border-prime text-[10px] font-bold uppercase tracking-wider text-prime backdrop-blur-sm"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: isHovering ? 64 : 16,
        height: isHovering ? 64 : 16,
        backgroundColor: isHovering ? "rgba(0,229,255,0.15)" : "rgba(0,229,255,0.4)",
      }}
      transition={{ duration: 0.2 }}
    >
      {isHovering && hoverText ? hoverText : null}
    </motion.div>
  );
}
