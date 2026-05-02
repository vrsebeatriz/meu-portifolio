"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

const codeLines = [
  { indent: 0, content: "const beatriz = {", color: "text-beige/90" },
  { indent: 1, content: 'role: "Software Engineer",', color: "text-green-400" },
  { indent: 1, content: 'focus: ["IA", "Segurança", "Full-Stack"],', color: "text-blue-300" },
  { indent: 1, content: 'university: "UERN · CC",', color: "text-yellow-300" },
  { indent: 1, content: 'location: "Mossoró, RN 🇧🇷",', color: "text-purple-300" },
  { indent: 1, content: 'status: "Open to work 🟢",', color: "text-green-300" },
  { indent: 0, content: "}", color: "text-beige/90" },
];

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      {/* Hero */}
      <div className="min-h-[90vh] flex flex-col md:flex-row items-center gap-12 pt-24 md:pt-32">
        {/* Left — Text */}
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-charcoal text-beige px-4 py-2 rounded-full shadow-sm text-sm font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Disponível para oportunidades
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-display font-black leading-[0.95] text-charcoal"
          >
            Software <br />
            <span className="text-prime">Engineer</span> <br />
            Student.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted text-sm uppercase font-bold tracking-[0.2em]"
          >
            Ciência da Computação · UERN · Mossoró, RN
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-charcoal/75 text-base leading-relaxed max-w-md"
          >
            Desenvolvedora focada em unir arquiteturas de software seguras a interfaces modernas e escaláveis. Transformo problemas complexos em soluções elegantes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 items-center pt-2"
          >
            <Link href="/portfolio" className="btn-prime flex items-center gap-2 group">
              Ver Projetos
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/resume" className="flex items-center gap-2 text-sm font-bold text-charcoal hover:text-prime transition-colors border border-beige-dark px-5 py-3 rounded-full hover:border-prime">
              Currículo
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-5 pt-2"
          >
            <a href="https://github.com/vrsebeatriz" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-prime transition-colors transform hover:-translate-y-0.5">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/beatriz-araújo-381b2b249" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-prime transition-colors transform hover:-translate-y-0.5">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=anabaraujo009@gmail.com&su=Contato via Portfolio" target="_blank" className="text-muted hover:text-prime transition-colors transform hover:-translate-y-0.5">
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Right — Code Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex-1 mt-8 md:mt-0 w-full"
        >
          <div className="relative">
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-prime/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-muted/10 rounded-full blur-3xl pointer-events-none" />

            {/* Terminal window */}
            <div className="relative z-10 bg-charcoal rounded-2xl shadow-2xl overflow-hidden border border-white/10">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/20">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                <span className="ml-3 text-xs text-beige/30 font-mono">beatriz.ts</span>
              </div>
              {/* Code body */}
              <div className="p-6 font-mono text-sm leading-relaxed space-y-1">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.12 }}
                    className="flex"
                  >
                    <span className="text-beige/20 w-6 shrink-0 text-right mr-4 select-none">{i + 1}</span>
                    <span style={{ paddingLeft: `${line.indent * 16}px` }} className={line.color}>
                      {line.content}
                    </span>
                  </motion.div>
                ))}
                {/* Blinking cursor */}
                <motion.div
                  className="flex"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  <span className="text-beige/20 w-6 shrink-0 text-right mr-4 select-none">{codeLines.length + 1}</span>
                  <motion.span
                    className="inline-block w-2 h-4 bg-prime mt-0.5"
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* About Section */}
      <section className="mt-24 md:mt-32 space-y-12 pb-24">
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-black text-charcoal uppercase tracking-tighter"
          >
            Sobre <span className="text-prime">Mim</span>
          </motion.h2>
          <div className="liquid-border w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-charcoal/75 leading-relaxed text-base md:text-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <p>
              Sou estudante do último período de Ciência da Computação pela Universidade do Estado do Rio Grande do Norte (UERN) e construo softwares que equilibram design focado no usuário e engenharia de alta performance.
            </p>
            <p>
              Minha atuação transita entre a pesquisa acadêmica e o desenvolvimento de mercado. Sou pesquisadora ativa nas áreas de Inteligência Artificial e Cibersegurança, com foco em desofuscação de código, análise de malware e modelos preditivos.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <p>
              Essa base profundamente analítica me permite desenvolver aplicações não apenas visuais, mas arquiteturalmente seguras e otimizadas.
            </p>
            <p>
              Com base em Mossoró, RN, meu foco atual é a criação de aplicações de ponta a ponta — seja arquitetando o fluxo de dados de uma API robusta, desenvolvendo ferramentas de segurança ou entregando sites de alta conversão.
            </p>
          </motion.div>
        </div>

        {/* Skills tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 pt-4"
        >
          {["TypeScript", "React", "Next.js", "Node.js", "Java", "Python", "Deep Learning", "Cibersegurança"].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 bg-beige border border-beige-dark rounded-full text-xs font-bold uppercase tracking-wider text-charcoal/60 hover:border-prime hover:text-prime transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
