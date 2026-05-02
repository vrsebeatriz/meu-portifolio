"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";

const articles = [
  {
    title: "Desofuscação de Código com IA Local",
    excerpt: "Uma investigação profunda sobre o uso de pipelines de AST e Modelos de Linguagem locais (Llama 3) para reverter técnicas de ofuscação polimórfica em malwares modernos.",
    date: "12 Abr, 2026",
    readTime: "18 min",
    category: "Security",
    slug: "malware-analysis",
    tags: ["Engenharia Reversa", "IA"]
  },
  {
    title: "Arquitetura Limpa em APIs Node.js",
    excerpt: "Como aplicar rigorosamente os princípios de Clean Architecture e SOLID no ecossistema Node.js para criar backends resilientes, testáveis e independentes de frameworks.",
    date: "25 Mar, 2026",
    readTime: "15 min",
    category: "Engineering",
    slug: "clean-architecture",
    tags: ["Backend", "Arquitetura"]
  }
];

export default function Shelf() {
  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 md:pt-32 max-w-4xl mx-auto space-y-16 pb-24">
      <header className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-7xl font-display font-black text-charcoal leading-none tracking-tighter">
            Minha <span className="text-prime">Estante</span>
          </h1>
          <p className="text-muted text-sm uppercase font-bold tracking-[0.3em] mt-4">
            Artigos técnicos e notas de estudo
          </p>
          <div className="liquid-border w-32 mt-6" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-charcoal/60 text-lg max-w-2xl leading-relaxed"
        >
          Um espaço onde documento minhas pesquisas em Engenharia de Software, 
          IA e Cibersegurança. O objetivo é transformar aprendizado em conhecimento compartilhado de alto nível.
        </motion.p>
      </header>

      <div className="grid gap-12">
        {articles.map((article, index) => (
          <motion.article
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="hidden md:block w-32 pt-2 space-y-2 shrink-0">
                <div className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> {article.date}
                </div>
                <div className="text-[10px] font-bold text-prime uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3 h-3" /> {article.readTime}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                   <span className="px-2 py-0.5 bg-beige-dark/30 text-charcoal/60 text-[10px] font-bold uppercase tracking-wider rounded">
                     {article.category}
                   </span>
                   <div className="flex gap-2">
                     {article.tags.map(t => (
                       <span key={t} className="text-prime text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                         #{t}
                       </span>
                     ))}
                   </div>
                </div>

                <h2 className="text-2xl md:text-4xl font-display font-black text-charcoal group-hover:text-prime transition-all duration-300 tracking-tight leading-tight">
                  <Link href={`/shelf/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="text-charcoal/70 text-base md:text-lg leading-relaxed max-w-3xl">
                  {article.excerpt}
                </p>

                <div className="pt-2">
                  <Link 
                    href={`/shelf/${article.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-charcoal border-b-2 border-charcoal/10 pb-1 group-hover:border-prime group-hover:text-prime transition-all"
                  >
                    Ler Artigo Completo <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-24 p-8 md:p-12 bg-beige border border-beige-dark rounded-[2rem] text-center space-y-6"
      >
        <div className="w-16 h-16 bg-prime rounded-2xl mx-auto flex items-center justify-center text-beige">
          <BookOpen className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-display font-black text-charcoal uppercase tracking-tighter">Quer acompanhar meus estudos?</h3>
          <p className="text-charcoal/60 max-w-md mx-auto">Sempre posto novos artigos sobre IA, segurança e backend conforme avanço em meus projetos.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            className="flex-1 px-6 py-3 rounded-full bg-white border border-beige-dark focus:outline-none focus:border-prime text-sm"
          />
          <button className="btn-prime whitespace-nowrap">
            Me avisar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
