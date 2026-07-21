"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 pb-12 px-4 md:px-8 max-w-6xl mx-auto border-t border-white/10 pt-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Ana Beatriz logo" className="w-10 h-10 rounded-lg object-cover" />
            <span className="font-display font-black text-xl tracking-tighter uppercase leading-tight">Ana Beatriz<br/><span className="text-prime text-xs font-bold tracking-[0.2em] normal-case">Software Engineer</span></span>
          </div>
          <p className="text-beige-dark text-sm max-w-sm leading-relaxed">
            Desenvolvedora Full-Stack e pesquisadora em IA e Cibersegurança. Apaixonada por resolver quebra-cabeças complexos com TypeScript, Java e Node.js.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/vrsebeatriz" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:bg-prime hover:border-prime hover:text-charcoal-dark transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/beatriz-araújo-381b2b249" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:bg-prime hover:border-prime hover:text-charcoal-dark transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=anabaraujo009@gmail.com&su=Contato via Portfolio" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:bg-prime hover:border-prime hover:text-charcoal-dark transition-all">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-display font-bold uppercase text-xs tracking-widest text-muted">Explorar</h4>
          <ul className="space-y-4">
            <li><Link href="/" className="text-sm font-bold hover:text-prime transition-colors">Home</Link></li>
            <li><Link href="/portfolio" className="text-sm font-bold hover:text-prime transition-colors">Projetos</Link></li>
            <li><Link href="/resume" className="text-sm font-bold hover:text-prime transition-colors">Currículo</Link></li>
            <li><Link href="/shelf" className="text-sm font-bold hover:text-prime transition-colors">Estante</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-display font-bold uppercase text-xs tracking-widest text-muted">Contato</h4>
          <div className="space-y-2">
            <p className="text-sm font-bold">Mossoró, RN - Brasil</p>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=anabaraujo009@gmail.com&su=Contato via Portfolio" target="_blank" className="text-sm font-bold text-prime block">anabaraujo009@gmail.com</a>
          </div>
        </div>
      </div>

      <div className="mt-24 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] uppercase font-bold tracking-widest text-muted">
          © {new Date().getFullYear()} ANA BEATRIZ ARAÚJO SILVA. TODOS OS DIREITOS RESERVADOS.
        </p>
        <div className="flex h-1 w-full md:w-48">
          <div className="h-full w-1/4 bg-prime" />
          <div className="h-full w-1/4 bg-purple-500" />
          <div className="h-full w-1/4 bg-beige-dark" />
          <div className="h-full w-1/4 bg-muted" />
        </div>
      </div>
    </footer>
  );
}
