"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, User, Book, Home } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/portfolio", label: "Works", icon: Briefcase },
  { href: "/resume", label: "Resume", icon: User },
  { href: "/shelf", label: "Shelf", icon: Book },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4 flex justify-center">
      <div
        className={cn(
          "flex items-center gap-1 px-3 py-2 bg-charcoal/90 backdrop-blur-lg border border-white/10 rounded-full shadow-2xl transition-all duration-300",
          scrolled && "px-2.5 py-1.5 backdrop-blur-2xl bg-charcoal/95 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        )}
      >
        {/* Logo mark */}
        <Link href="/" className="mr-2 flex items-center">
          <img
            src="/logo.png"
            alt="Ana Beatriz logo"
            className="w-7 h-7 rounded-md object-cover"
          />
        </Link>

        {/* Divider */}
        <div className="w-px h-4 bg-white/10 mr-2" />

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "nav-link relative flex items-center gap-2 text-beige/60 hover:text-prime",
                isActive && "text-prime"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-white/5 rounded-full shadow-[0_0_12px_rgba(0,229,255,0.4)] animate-pulse-slow"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className="w-4 h-4" />
              <span className="hidden md:inline relative z-20">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
