"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, MessageSquare } from "lucide-react";
import { notFound } from "next/navigation";

const articles = {
  "malware-analysis": {
    title: "Desofuscação de Código com IA Local",
    description: "Uma exploração conceitual sobre o potencial uso de LLMs (Large Language Models) locais para auxiliar na engenharia reversa de scripts ofuscados.",
    content: [
      { type: "blockquote", text: "Nota: O conteúdo a seguir é uma proposta de pesquisa e exploração conceitual sobre um pipeline de desofuscação assistida por IA local, não descrevendo uma ferramenta atualmente implementada." },
      { type: "p", text: "No cenário atual de cibersegurança, a ofuscação de código tornou-se uma arte sombria. Códigos maliciosos modernos não apenas escondem strings, mas utilizam técnicas de 'Control Flow Flattening', 'Dead Code Injection' e 'Variable Renaming' massivo para tornar a análise estática quase impossível. Durante o desenvolvimento do CypherGuard AI, surgiu uma curiosidade técnica sobre uma fronteira pouco documentada: seria possível usar Modelos de Linguagem locais (como Llama 3 via Ollama) como motores de desofuscação semântica?" },
      { type: "h2", text: "O Problema da Heurística Tradicional" },
      { type: "p", text: "Ferramentas como descompactadores estáticos e analisadores baseados em regras (YARA) são excelentes para ameaças conhecidas, mas falham miseravelmente diante de ofuscadores polimórficos. O desafio é que o código ofuscado mantém sua validade sintática, mas perde sua legibilidade humana. Um loop simples pode ser transformado em uma máquina de estados complexa com centenas de 'switches' inúteis." },
      { type: "h2", text: "Uma Proposta de Metodologia" },
      { type: "p", text: "Uma abordagem teórica interessante focaria em um pipeline de desofuscação híbrido. O primeiro passo não seria a IA, mas a Normalização de Árvore de Sintaxe Abstrata (AST). Utilizando parsers robustos, seria possível reconstruir a estrutura do script, removendo o ruído visual básico antes de qualquer processamento neural." },
      { type: "h3", text: "Engenharia de Prompt para Reversão" },
      { type: "p", text: "Nesta proposta, o segredo não estaria apenas no modelo, mas no contexto fornecido. Uma abordagem possível seria desenvolver prompts que forcem a IA a agir como um compilador reverso. Em vez de pedir 'o que este código faz?', forneceríamos trechos normalizados e pediríamos para 'identificar a intenção funcional e renomear variáveis baseando-se no fluxo de dados'. Isso poderia, em teoria, transformar algo como '_0x4a2b' em um nome mais legível como 'decryptionKey' ou 'maliciousSocket'." },
      { type: "h3", text: "IA Local: Princípio de Segurança" },
      { type: "blockquote", text: "Analisar amostras de código suspeito em LLMs comerciais (como GPT-4) seria um erro crítico de segurança. O código enviado poderia ser incorporado em treinos futuros ou expor vulnerabilidades do ambiente de pesquisa. Por isso, qualquer arquitetura desse tipo deveria utilizar apenas modelos locais, garantindo um ambiente 'air-gapped' virtual." },
      { type: "h2", text: "Conclusão e Futuro" },
      { type: "p", text: "A desofuscação assistida por IA não tem o objetivo de substituir o analista, mas de potencialmente eliminar o trabalho braçal de 'limpeza'. Um próximo passo interessante para essa ideia seria explorar a integração teórica direta com descompiladores de binários (Ghidra/IDA Pro) para tentar estender essa capacidade para além de linguagens interpretadas." }
    ],
    date: "12 Abr, 2026",
    readTime: "10 min",
    category: "Security",
    tags: ["Engenharia Reversa", "IA Local", "Llama 3", "Malware Analysis"]
  },
  "clean-architecture": {
    title: "Arquitetura Limpa em APIs Node.js",
    description: "Um guia definitivo sobre como aplicar os princípios de Uncle Bob no ecossistema Node.js para criar sistemas resilientes e agnósticos a frameworks.",
    content: [
      { type: "p", text: "Manter um software escalável em Node.js é um desafio constante devido à volatilidade do seu ecossistema. Bibliotecas que hoje são padrão de mercado podem se tornar obsoletas em meses. A Arquitetura Limpa (Clean Architecture) oferece a solução para esse problema ao colocar a lógica de negócio no centro da aplicação, isolando-a de detalhes externos como bancos de dados, APIs de terceiros e frameworks web." },
      { type: "h2", text: "O Núcleo: Entidades e Casos de Uso" },
      { type: "p", text: "O coração de qualquer sistema deve ser composto por Entidades — objetos de negócio puros que não sabem da existência de Express, Fastify ou TypeORM. Acima delas, temos os Casos de Uso (Use Cases), que orquestram o fluxo de dados. Se a sua lógica de 'Criar Pedido' depende diretamente de uma função do Mongoose, você falhou na regra de dependência." },
      { type: "h2", text: "Inversão de Dependência na Prática" },
      { type: "p", text: "A peça chave aqui é o Princípio de Inversão de Dependência (DIP). Em vez do Caso de Uso instanciar um banco de dados, ele recebe uma 'Interface' (ou classe abstrata em TS). Isso permite que possamos injetar uma implementação real de PostgreSQL em produção, mas um simples objeto em memória para testes unitários." },
      { type: "h3", text: "O Desafio da Testabilidade" },
      { type: "p", text: "Com a Clean Architecture, atingir 100% de cobertura de testes na lógica central torna-se trivial. Como a aplicação não depende de IO externo, os testes rodam em milissegundos, sem a necessidade de subir containers Docker ou bancos reais para validar regras complexas de negócio." },
      { type: "blockquote", text: "Software que é difícil de testar é software que é difícil de mudar. E software que não muda, morre." },
      { type: "h2", text: "Um Benefício Prático" },
      { type: "p", text: "Um benefício prático da Clean Architecture: se um dia fosse necessário trocar de Express para Fastify por performance, a migração se limitaria à camada de adaptadores, sem tocar na lógica de negócio." },
      { type: "h2", text: "Veredito: Vale o Boilerplate?" },
      { type: "p", text: "Sim, Clean Architecture exige mais arquivos e interfaces iniciais. No entanto, para projetos que pretendem durar mais de seis meses ou que possuem regras de negócio complexas, o custo de não a utilizar será pago com juros altíssimos em forma de débito técnico e bugs de regressão." }
    ],
    date: "25 Mar, 2026",
    readTime: "15 min",
    category: "Engineering",
    tags: ["Node.js", "Clean Architecture", "TypeScript", "Software Design"]
  }
};

export default function Article({ params }: { params: { slug: string } }) {
  const article = articles[params.slug as keyof typeof articles];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen selection:bg-prime/10 selection:text-prime">
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        className="fixed top-0 left-0 right-0 h-1 bg-prime origin-left z-[100]"
      />

      <div className="p-4 md:p-8 pt-24 md:pt-32 max-w-3xl mx-auto space-y-12">
        <div className="flex justify-between items-center">
          <Link href="/shelf" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-prime transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Voltar para a Estante
          </Link>
          <div className="flex gap-4">
             <button className="text-muted hover:text-prime transition-colors"><Share2 className="w-4 h-4" /></button>
             <button className="text-muted hover:text-prime transition-colors"><MessageSquare className="w-4 h-4" /></button>
          </div>
        </div>

        <header className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-prime">
              <span className="bg-prime/10 px-2 py-1 rounded">{article.category}</span>
              <span className="w-1 h-1 bg-beige-dark rounded-full" />
              <div className="flex items-center gap-1 text-muted">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </div>
              <div className="flex items-center gap-1 text-muted">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </div>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-black text-white leading-[1.1] tracking-tighter"
            >
              {article.title}
            </motion.h1>
            
            <p className="text-xl text-beige-dark leading-relaxed font-medium">
              {article.description}
            </p>
          </div>
          
          <div className="liquid-border w-48" />
        </header>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-charcoal max-w-none"
        >
          {article.content.map((block: any, i) => {
            if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
            if (block.type === "h3") return <h3 key={i}>{block.text}</h3>;
            if (block.type === "p") return <p key={i}>{block.text}</p>;
            if (block.type === "blockquote") return <blockquote key={i}>{block.text}</blockquote>;
            if (block.type === "ul") return (
              <ul key={i}>
                {block.items?.map((item: string, j: number) => <li key={j}>{item}</li>)}
              </ul>
            );
            return null;
          })}
        </motion.div>

        <footer className="pt-16 border-t border-beige-dark pb-12">
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white border border-beige-dark rounded-full text-[10px] font-bold uppercase tracking-wider text-muted">
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="mt-12 p-8 bg-charcoal border border-transparent rounded-3xl text-beige flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-white rounded-2xl shrink-0 flex items-center justify-center overflow-hidden border-2 border-prime/20 shadow-inner">
               <img src="/logo.png" alt="Logo" className="w-full h-full object-contain p-2" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <p className="font-display font-black text-xl uppercase tracking-tighter">Gostou da leitura?</p>
              <p className="text-beige/60 text-sm">Acompanhe meu trabalho no GitHub ou conecte-se comigo no LinkedIn para trocarmos uma ideia sobre tecnologia.</p>
              <div className="flex gap-4 pt-2 justify-center md:justify-start">
                <Link href="https://github.com/vrsebeatriz" target="_blank" className="text-prime font-bold text-xs uppercase tracking-widest hover:underline">GitHub</Link>
                <Link href="https://www.linkedin.com/in/beatriz-araújo-381b2b249" target="_blank" className="text-prime font-bold text-xs uppercase tracking-widest hover:underline">LinkedIn</Link>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=anabaraujo009@gmail.com&su=Contato via Portfolio" target="_blank" className="text-prime font-bold text-xs uppercase tracking-widest hover:underline">E-mail</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
