"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const NeuralNetworkScene = dynamic(() => import("./NeuralNetworkScene"), {
  ssr: false,
});

export default function HeroCanvas() {
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const prefersReducedMotion = useReducedMotion();

  if (isCoarsePointer || prefersReducedMotion) {
    return null;
  }

  const nodeCount =
    typeof navigator !== "undefined" &&
    navigator.hardwareConcurrency &&
    navigator.hardwareConcurrency <= 4
      ? 35
      : 65;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <NeuralNetworkScene nodeCount={nodeCount} />
    </div>
  );
}
