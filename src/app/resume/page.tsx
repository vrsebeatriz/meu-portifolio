"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Briefcase, Code, MapPin, Mail, Github, Linkedin, Star, Calendar, Users } from "lucide-react";

const timeline = [
  // Experience
  {
    section: "experience",
    year: "Set 2025 – Presente",
    title: "Pesquisadora de Iniciação Científica (PIBIC)",
    company: "Universidade do Estado do Rio Grande do Norte (UERN)",
    location: "Mossoró, RN",
    bullets: [
      "Desenvolvimento de chatbot inteligente com IA para auxílio ao diagnóstico de autismo em crianças.",
      "Integração de ontologias complexas (OWL) para estruturar a base de conhecimento do sistema.",
      "Aplicação de NLP (Processamento de Linguagem Natural) e Deep Learning.",
    ],
    icon: Award,
  },
  {
    section: "experience",
    year: "Mar 2026 – Abr 2026",
    title: "Desenvolvedora Front-end Freelancer",
    company: "Projeto Autônomo / Cliente Real",
    location: "Areia Branca, RN",
    bullets: [
      "Levantamento de requisitos e desenvolvimento de aplicação web do zero para portfólio de profissional de estética.",
      "Interface construída com React e Tailwind CSS, Mobile First e alta performance.",
      "Integração direta com WhatsApp para agendamentos, otimizando a captação de clientes.",
    ],
    icon: Briefcase,
  },
  // Education
  {
    section: "education",
    year: "Mar 2023 – Em andamento",
    title: "Bacharelado em Ciência da Computação",
    company: "Universidade do Estado do Rio Grande do Norte (UERN)",
    location: "Mossoró, RN",
    bullets: [
      "Bolsista de Iniciação Científica (PIBIC) – Pesquisa em IA e Informática em Saúde.",
    ],
    icon: GraduationCap,
  },
  {
    section: "education",
    year: "2019 – 2022",
    title: "Ensino Médio Técnico em Eletrotécnica",
    company: "Instituto Federal do Rio Grande do Norte (IFRN)",
    location: "Mossoró, RN",
    bullets: [
      "Idealizou e executou o 'Projeto de Iluminação com Fonte Alternativa de Energia no IFRN – Campus Mossoró'.",
    ],
    icon: Code,
  },
];

const skills = [
  { area: "Front-end & Mobile", items: "React, React Native, Next.js, TypeScript, Tailwind CSS, Ruby, PHP" },
  { area: "Back-end & Arquitetura", items: "Node.js, Java, Python — APIs RESTful, PostgreSQL, Redis" },
  { area: "IA & Pesquisa", items: "Deep Learning, NLP, Ontologias (OWL)" },
  { area: "Cibersegurança", items: "Análise de Malware, Desofuscação de Código" },
  { area: "Ferramentas", items: "Git, GitHub, VS Code, IntelliJ IDEA, Linux" },
];

const languages = [
  { lang: "Português", level: "Nativo" },
  { lang: "Inglês", level: "Avançado" },
  { lang: "Francês", level: "Iniciante" },
];

const events = [
  { name: "GoRN 2025", type: "Congresso", desc: "Encontro da comunidade de tecnologia do Rio Grande do Norte." },
  { name: "CSBC 2025", type: "Congresso", desc: "Maior evento de computação do Brasil, Maceió/AL." },
  { name: "Elas São Tech", type: "Processo Seletivo", desc: "Participante ativa no processo seletivo do programa de aceleração de carreira para mulheres na tecnologia." },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Resume() {
  return (
    <div className="min-h-screen p-4 md:p-8 pt-24 md:pt-32 max-w-4xl mx-auto space-y-16 pb-24">

      {/* ── Header ─────────────────────────────────── */}
      <header className="space-y-6">
        <motion.div {...fadeUp}>
          <h1 className="text-4xl md:text-6xl font-display font-black text-charcoal leading-tight">
            Meu <span className="text-prime">Currículo</span>
          </h1>
          <p className="text-muted text-sm uppercase font-bold tracking-widest mt-2">
            Trajetória acadêmica e profissional
          </p>
          <div className="liquid-border w-32 mt-4" />
        </motion.div>

        {/* Objetivo */}
        <motion.div {...fadeUp} transition={{ delay: 0.2 }}
          className="bg-beige border border-beige-dark rounded-xl p-6 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-prime flex items-center gap-2">
            <Star className="w-3.5 h-3.5" /> Objetivo Profissional
          </h3>
          <p className="text-charcoal/80 text-sm leading-relaxed">
            Estudante finalista de Ciência da Computação com sólida base no desenvolvimento Full Stack e forte vertente analítica em Inteligência Artificial e Cibersegurança. Procuro a minha primeira oportunidade como Engenheira de Software Júnior ou Desenvolvedora Júnior, onde possa aplicar conhecimentos práticos de programação (React Native, Node.js, Java, Python, Ruby, PHP) e o rigor científico da pesquisa para construir sistemas seguros, escaláveis e de alto impacto.
          </p>
        </motion.div>
      </header>

      {/* ── Experience & Education Timeline ─────────── */}
      <section className="space-y-8">
        <motion.div {...fadeUp}>
          <h2 className="text-2xl md:text-3xl font-display font-black text-charcoal uppercase tracking-tighter">
            Experiência & <span className="text-prime">Formação</span>
          </h2>
          <div className="liquid-border w-28 mt-3" />
        </motion.div>

        <div className="space-y-0">
          {timeline.map((item, index) => (
            <motion.div
              key={item.title}
              {...fadeUp}
              transition={{ delay: index * 0.08 }}
              className="relative pl-10 md:pl-14 pb-10 border-l-2 border-beige-dark last:border-0 last:pb-0"
            >
              <div className="absolute left-[-17px] top-0 w-8 h-8 bg-white border-2 border-prime rounded-full flex items-center justify-center text-prime z-10 shadow-sm">
                <item.icon className="w-3.5 h-3.5" />
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold text-prime uppercase tracking-widest bg-prime/10 px-2 py-0.5 rounded-full">
                    {item.section === "experience" ? "Experiência" : "Formação"}
                  </span>
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wide flex items-center gap-1">
                    <Calendar className="w-3 h-3" />{item.year}
                  </span>
                </div>
                <h3 className="text-lg font-display font-bold text-charcoal leading-tight">{item.title}</h3>
                <p className="text-muted font-bold text-xs flex items-center gap-1.5">
                  {item.company}
                  <span className="text-beige-dark">·</span>
                  <MapPin className="w-3 h-3" />{item.location}
                </p>
                <ul className="space-y-1 mt-2">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="text-charcoal/70 text-sm leading-relaxed flex gap-2">
                      <span className="text-prime mt-1.5 shrink-0">›</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Events ──────────────────────────────────── */}
      <section className="space-y-8">
        <motion.div {...fadeUp}>
          <h2 className="text-2xl md:text-3xl font-display font-black text-charcoal uppercase tracking-tighter">
            Eventos & <span className="text-prime">Participações</span>
          </h2>
          <div className="liquid-border w-28 mt-3" />
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map((ev, i) => (
            <div key={i} className="bg-white border border-beige-dark rounded-xl p-4 space-y-1 hover:border-prime/30 transition-colors">
              <span className="text-[10px] font-bold text-prime uppercase tracking-widest flex items-center gap-1">
                <Users className="w-3 h-3" />{ev.type}
              </span>
              <p className="font-display font-bold text-charcoal text-sm">{ev.name}</p>
              <p className="text-charcoal/60 text-xs leading-relaxed">{ev.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Skills & Languages ─────────────────────── */}
      <section className="bg-charcoal text-beige p-8 md:p-10 rounded-2xl shadow-2xl space-y-10">
        <h2 className="text-2xl font-display font-black uppercase tracking-tighter">Ingredientes Técnicos</h2>

        <div className="space-y-5">
          {skills.map((s, i) => (
            <motion.div
              key={s.area}
              {...fadeUp}
              transition={{ delay: i * 0.06 }}
              className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0"
            >
              <span className="text-prime text-[10px] font-bold uppercase tracking-widest md:w-44 shrink-0">{s.area}</span>
              <span className="text-beige/75 text-sm">{s.items}</span>
            </motion.div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row gap-8 justify-between">
          <div className="space-y-3">
            <h3 className="text-prime font-bold uppercase text-[10px] tracking-widest">Idiomas</h3>
            <div className="flex flex-wrap gap-4">
              {languages.map((l) => (
                <div key={l.lang} className="flex items-center gap-2 text-sm">
                  <span className="font-bold">{l.lang}</span>
                  <span className="text-beige/40 text-xs uppercase tracking-wider">{l.level}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 items-end">
            <a href="https://github.com/vrsebeatriz" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-beige/50 hover:text-prime transition-colors">
              <Github className="w-4 h-4" /> github.com/vrsebeatriz
            </a>
            <a href="https://www.linkedin.com/in/beatriz-araújo-381b2b249" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-beige/50 hover:text-prime transition-colors">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
