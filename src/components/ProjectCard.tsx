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
      className="group relative bg-white border border-beige-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-prime/20 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image / Category banner */}
      <div className="aspect-video bg-beige flex items-center justify-center overflow-hidden relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="text-beige-dark font-display font-bold text-2xl group-hover:scale-110 transition-transform">
            {category}
          </div>
        )}
        {/* Category pill overlay */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-charcoal/80 text-beige rounded-full backdrop-blur-sm">
            {category}
          </span>
        </div>
        {/* Links overlay on hover */}
        <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-charcoal hover:bg-prime hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-charcoal hover:bg-prime hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="p-5 space-y-3 flex-1 flex flex-col">
        <h3 className="text-xl font-display font-bold text-charcoal group-hover:text-prime transition-colors leading-tight">
          {title}
        </h3>

        <p className="text-charcoal/65 text-sm leading-relaxed flex-1">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-beige text-charcoal/60 rounded-md border border-beige-dark"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom link row */}
        {(github || link) && (
          <div className="flex gap-3 pt-2 border-t border-beige-dark mt-auto">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-muted hover:text-prime transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
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
                <ExternalLink className="w-3.5 h-3.5" />
                Ver Site
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
