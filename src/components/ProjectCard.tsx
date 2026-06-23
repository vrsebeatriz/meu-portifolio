"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  link?: string;
  image?: string;
  category: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  github,
  link,
  category,
  image,
}: ProjectCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    const rotateX = (y - centerY) / 14;
    const rotateY = (centerX - x) / 14;
    setRotate({ x: rotateX, y: rotateY });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className="group relative glass-card overflow-hidden hover:shadow-[0_8px_32px_0_rgba(0,229,255,0.15)] hover:border-prime/30 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image / Category banner */}
      <div className="aspect-video bg-charcoal-dark flex items-center justify-center overflow-hidden relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="text-muted font-display font-bold text-2xl group-hover:scale-110 transition-transform">
            {category}
          </div>
        )}
        {/* Category pill overlay */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-black/60 text-white border border-white/10 rounded-full backdrop-blur-md">
            {category}
          </span>
        </div>
        {/* Links overlay on hover */}
        <div className="absolute inset-0 bg-charcoal-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-prime hover:border-prime hover:text-charcoal-dark transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(0,229,255,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-prime hover:border-prime hover:text-charcoal-dark transition-all hover:scale-110 hover:shadow-[0_0_15px_rgba(0,229,255,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <div className="p-6 space-y-4 flex-1 flex flex-col relative z-10 bg-gradient-to-b from-transparent to-charcoal-dark/50">
        <h3 className="text-xl font-display font-bold text-white group-hover:text-prime transition-colors leading-tight drop-shadow-md">
          {title}
        </h3>

        <p className="text-beige-dark text-sm leading-relaxed flex-1">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-white/5 text-muted rounded-md border border-white/10 group-hover:border-white/20 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom link row */}
        {(github || link) && (
          <div className="flex gap-4 pt-4 border-t border-white/10 mt-auto">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-muted hover:text-prime transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-muted hover:text-prime transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Ver Site
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
