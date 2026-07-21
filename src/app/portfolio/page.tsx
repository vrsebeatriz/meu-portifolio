"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "RoboNorte",
    description: "E-commerce completo em três camadas: loja com checkout multi-etapa (Mercado Pago Payment Brick — PIX, boleto, cartão em até 12x) e autopreenchimento de endereço via ViaCEP; painel admin com dashboard de KPIs ao vivo, CRUD de produtos e cálculo de LTV por cliente; API REST em Express 5 + TypeScript sobre Supabase (PostgreSQL + RLS).",
    tags: ["React", "Vite", "Supabase Auth", "Express 5", "TypeScript", "Supabase", "Mercado Pago", "JWT", "E-commerce"],
    category: "Full-Stack E-commerce",
    link: "https://www.robonorte.com.br/",
    image: "/images/robonorte.png",
  },
  {
    title: "CypherGuard AI",
    description: "Plataforma SAST + SCA local-first: combina Semgrep e análise de AST para detectar vulnerabilidades no código (injeção de comando, XSS, SQLi, deserialização insegura, entre outras), valida os achados com um LLM local (Llama 3 via Ollama) e audita dependências contra CVEs conhecidos via OSV.dev. Aplica patches de correção automaticamente via CLI.",
    tags: ["Inteligência Artificial", "SAST", "SCA", "Semgrep", "Auditoria de Dependências", "Cibersegurança", "LLM Local", "IA Generativa"],
    category: "Security & AI",
    github: "https://github.com/vrsebeatriz/CypherGuard-IA",
    image: "/images/cypherguard.jpg",
  },
  {
    title: "Jarlyne Martins | Studio",
    description: "Portfólio digital editorial em Next.js 15 (App Router) com sistema de design Noir & Gold autoral. Galeria dinâmica com metadata customizada, painel administrativo privado para upload/edição/exclusão de peças (Vercel Blob), e integração direta com WhatsApp para captação de cliente.",
    tags: ["Next.js 15", "Vercel Blob", "UI/UX Design", "Mobile-First"],
    category: "Full-Stack Digital Identity",
    link: "https://jarlynemartins.space/",
    image: "/images/jarlyne.png",
  },
  {
    title: "TaskFlow Pro",
    description: "TaskFlow Pro — Life OS Edition: ecossistema de produtividade que unifica tarefas, hábitos, treino, dieta e finanças em uma plataforma só, com análise financeira via Google Gemini AI. Monorepo com API REST em Node.js/Express, persistência em LowDB, frontend React + TypeScript com suporte PWA.",
    tags: ["React", "Express.js", "Google Gemini API", "LowDB", "PWA", "TypeScript", "Node.js", "Arquitetura Monorepo"],
    category: "Full-Stack · Life OS",
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
