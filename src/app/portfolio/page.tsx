"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "RoboNorte",
    description: "Plataforma de e-commerce completa com Loja Virtual, Painel Administrativo e API Backend.",
    tags: ["Express 5", "TypeScript", "Supabase", "Mercado Pago", "JWT", "E-commerce"],
    category: "Full-Stack E-commerce",
    link: "https://www.robonorte.com.br/",
    image: "/images/robonorte.png",
  },
  {
    title: "CypherGuard AI",
    description: "Plataforma SAST de nível empresarial projetada para precisão cirúrgica e remediação autônoma usando LLMs locais.",
    tags: ["Inteligência Artificial", "Deep Learning", "Cibersegurança", "Análise de Malware", "Desofuscação"],
    category: "Security & AI",
    github: "https://github.com/vrsebeatriz/CypherGuard-IA",
    image: "/images/cypherguard.jpg",
  },
  {
    title: "Jarlyne Martins | Studio",
    description: "Identidade digital editorial para maquiadora especialista em pele negra. Foco em autoridade de marca, vitrine de luxo e conversão estratégica.",
    tags: ["React", "TypeScript", "UI/UX Design", "Front-end", "Mobile-First"],
    category: "Digital Identity",
    link: "https://jarlynemartins.space/",
    image: "/images/jarlyne.png",
  },
  {
    title: "TaskFlow Pro API",
    description: "Arquitetura robusta de backend para gerenciamento de tarefas complexas, escalabilidade e performance.",
    tags: ["Node.js", "Java", "TypeScript", "REST API", "Arquitetura Back-end"],
    category: "Backend Engineering",
    github: "https://github.com/vrsebeatriz/TaskFlow",
    image: "/images/taskflow.jpg",
  }
];

export default function Portfolio() {
  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 md:pt-32 max-w-6xl mx-auto space-y-12 relative">
      {/* Ambient Effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-prime/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none" />

      <header className="space-y-4 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display font-black text-white"
        >
          Meus <span className="text-prime drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]">Trabalhos</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted text-lg uppercase font-bold tracking-widest"
        >
          Projetos selecionados de engenharia e produto
        </motion.p>
        <div className="liquid-border w-32" />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
