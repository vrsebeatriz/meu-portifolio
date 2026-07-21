"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "RoboNorte",
    description: "Plataforma de e-commerce implementando loja virtual e painel administrativo, com autenticação JWT e integração nativa com a API de pagamentos do Mercado Pago.",
    tags: ["Express 5", "TypeScript", "Supabase", "Mercado Pago", "JWT", "E-commerce"],
    category: "Full-Stack E-commerce",
    link: "https://www.robonorte.com.br/",
    image: "/images/robonorte.png",
  },
  {
    title: "CypherGuard AI",
    description: "Ferramenta SAST que normaliza árvores de sintaxe abstrata (AST) e utiliza modelos Llama 3 locais via Ollama para identificar e sugerir desofuscação semântica em scripts maliciosos polimórficos.",
    tags: ["Inteligência Artificial", "Deep Learning", "Cibersegurança", "Análise de Malware", "Desofuscação"],
    category: "Security & AI",
    github: "https://github.com/vrsebeatriz/CypherGuard-IA",
    image: "/images/cypherguard.jpg",
  },
  {
    title: "Jarlyne Martins | Studio",
    description: "Aplicação institucional desenvolvida com foco em Mobile-First usando React e Tailwind CSS, incluindo integração direta com API do WhatsApp para orçamentos e agendamentos.",
    tags: ["React", "TypeScript", "UI/UX Design", "Front-end", "Mobile-First"],
    category: "Digital Identity",
    link: "https://jarlynemartins.space/",
    image: "/images/jarlyne.png",
  },
  {
    title: "TaskFlow Pro API",
    description: "API RESTful desenvolvida em Node.js aplicando Clean Architecture e princípios SOLID. Utiliza injeção de dependência para desacoplar a lógica de negócio dos adaptadores de banco de dados e rotas web.",
    tags: ["Node.js", "Java", "TypeScript", "PostgreSQL", "Docker", "Arquitetura Monorepo", "REST API"],
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
