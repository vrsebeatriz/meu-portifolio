"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "portfolio-preloader-shown";

export default function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  const [shouldRender, setShouldRender] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || sessionStorage.getItem(STORAGE_KEY)) {
      setIsFirstVisit(false);
      setShouldRender(false);
      return;
    }

    setIsFirstVisit(true);
    sessionStorage.setItem(STORAGE_KEY, "true");
    const timer = setTimeout(() => setShouldRender(false), 1200);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  if (isFirstVisit === false) return null;

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal-dark"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-black text-3xl md:text-4xl tracking-tighter text-white"
          >
            Ana <span className="text-prime">Beatriz</span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
