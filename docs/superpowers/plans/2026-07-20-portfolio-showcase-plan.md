# Portfolio Showcase (3D Hero, Transições, Cursor, Polimento) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar o portfólio Next.js em uma vitrine técnica: hero 3D com rede neural, transições de página, cursor customizado, micro-interações e tema dark unificado em todas as páginas.

**Architecture:** Camada de animação global (preloader, transições de rota, cursor) vive no `layout.tsx` root e é composta por client components isolados. O hero 3D é um componente client-only carregado via dynamic import (`ssr:false`) com fallback automático para os blobs CSS existentes em mobile/reduced-motion. Nenhuma mudança de dados, rotas ou copy.

**Tech Stack:** Next.js 14 (App Router), React 18, Tailwind CSS, Framer Motion (já instalado), Three.js + @react-three/fiber + @react-three/drei (novos, só no hero 3D).

## Global Constraints

- Toda animação nova deve respeitar `prefers-reduced-motion` (via `useReducedMotion` do Framer Motion) — spec seção "Performance e Acessibilidade".
- Hero 3D nunca monta em `(pointer: coarse)` (mobile/touch) nem com reduced-motion ativo — cai para os 3 blobs CSS já existentes, sem removê-los do código.
- Cursor customizado só monta em `(pointer: fine)` — nunca em touch.
- Nenhuma mudança de conteúdo/copy/dados em nenhuma página.
- Não adicionar GSAP, Lenis ou qualquer outra lib de animação — só Framer Motion (já presente) + Three.js/R3F/drei (novos, exclusivos do hero).
- Projeto não tem test runner configurado — verificação é `npx tsc --noEmit`, `npm run build` e checagem manual no browser (`npm run dev`), conforme definido na seção "Verificação" do spec.

---

## Task 1: Footer — migrar para tema dark

**Files:**
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Nenhuma (mudança apenas de classes CSS/JSX, sem novas props ou exports).

- [ ] **Step 1: Corrigir borda superior, ícones sociais e stripe final**

Em `src/components/Footer.tsx`, aplicar as seguintes trocas:

```tsx
// Antes:
<footer className="mt-24 pb-12 px-4 md:px-8 max-w-6xl mx-auto border-t border-beige-dark pt-12">

// Depois:
<footer className="mt-24 pb-12 px-4 md:px-8 max-w-6xl mx-auto border-t border-white/10 pt-12">
```

```tsx
// Antes (repetido 3x, um por ícone social):
className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-muted hover:bg-prime hover:text-white transition-all"

// Depois:
className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:bg-prime hover:border-prime hover:text-charcoal-dark transition-all"
```

```tsx
// Antes (stripe final, 4 divs):
<div className="h-full w-1/4 bg-prime" />
<div className="h-full w-1/4 bg-gold" />
<div className="h-full w-1/4 bg-beige-dark" />
<div className="h-full w-1/4 bg-muted" />

// Depois (bg-gold não existe no tailwind.config.ts — é uma classe inválida
// que hoje renderiza um trecho transparente na stripe; troca por purple-500,
// já usado como accent nos blobs do hero):
<div className="h-full w-1/4 bg-prime" />
<div className="h-full w-1/4 bg-purple-500" />
<div className="h-full w-1/4 bg-beige-dark" />
<div className="h-full w-1/4 bg-muted" />
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros novos relacionados a `Footer.tsx`.

- [ ] **Step 3: Verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:3000` e rolar até o rodapé.
Expected: nenhum círculo claro/branco nos ícones sociais, borda superior sutil (não cinza-claro), stripe final sem gap transparente.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "fix: migrate Footer to dark theme and remove invalid bg-gold class"
```

---

## Task 2: Resume — migrar para tema dark

**Files:**
- Modify: `src/app/resume/page.tsx`

**Interfaces:**
- Nenhuma (mudança apenas de classes CSS/JSX).

- [ ] **Step 1: Corrigir bloco "Objetivo Profissional"**

```tsx
// Antes:
<motion.div {...fadeUp} transition={{ delay: 0.2 }}
  className="bg-beige border border-beige-dark rounded-xl p-6 space-y-2">

// Depois:
<motion.div {...fadeUp} transition={{ delay: 0.2 }}
  className="glass-card p-6 space-y-2">
```

- [ ] **Step 2: Corrigir círculo de ícone da timeline e a linha conectora**

```tsx
// Antes:
className="relative pl-10 md:pl-14 pb-10 border-l-2 border-beige-dark last:border-0 last:pb-0"
...
<div className="absolute left-[-17px] top-0 w-8 h-8 bg-white border-2 border-prime rounded-full flex items-center justify-center text-prime z-10 shadow-sm">

// Depois:
className="relative pl-10 md:pl-14 pb-10 border-l-2 border-white/10 last:border-0 last:pb-0"
...
<div className="absolute left-[-17px] top-0 w-8 h-8 bg-charcoal-dark border-2 border-prime rounded-full flex items-center justify-center text-prime z-10 shadow-[0_0_10px_rgba(0,229,255,0.3)]">
```

- [ ] **Step 3: Corrigir cards de eventos (o texto branco era ilegível no card claro)**

```tsx
// Antes:
<div key={i} className="bg-white border border-beige-dark rounded-xl p-4 space-y-1 hover:border-prime/30 transition-colors">

// Depois:
<div key={i} className="glass-card p-4 space-y-1 hover:border-prime/30 transition-colors">
```

- [ ] **Step 4: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros novos relacionados a `resume/page.tsx`.

- [ ] **Step 5: Verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:3000/resume`.
Expected: bloco "Objetivo Profissional" e os 3 cards de "Eventos & Participações" com fundo escuro translúcido (glass), texto legível, sem blocos brancos/beges residuais.

- [ ] **Step 6: Commit**

```bash
git add src/app/resume/page.tsx
git commit -m "fix: migrate Resume page cards to dark theme, fix white-on-white text bug"
```

---

## Task 3: Shelf — migrar para tema dark

**Files:**
- Modify: `src/app/shelf/page.tsx`

**Interfaces:**
- Nenhuma (mudança apenas de classes CSS/JSX).

- [ ] **Step 1: Corrigir card de call-to-action final e o input de e-mail**

```tsx
// Antes:
<motion.div 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mt-24 p-8 md:p-12 bg-beige border border-beige-dark rounded-[2rem] text-center space-y-6"
>

// Depois:
<motion.div 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mt-24 p-8 md:p-12 glass-card rounded-[2rem] text-center space-y-6"
>
```

```tsx
// Antes:
<input 
  type="email" 
  placeholder="Seu melhor e-mail" 
  className="flex-1 px-6 py-3 rounded-full bg-white border border-beige-dark focus:outline-none focus:border-prime text-sm"
/>

// Depois:
<input 
  type="email" 
  placeholder="Seu melhor e-mail" 
  className="flex-1 px-6 py-3 rounded-full bg-charcoal-light/50 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-prime text-sm"
/>
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros novos relacionados a `shelf/page.tsx`.

- [ ] **Step 3: Verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:3000/shelf`, rolar até o final.
Expected: card final com fundo escuro translúcido, título "Quer acompanhar meus estudos?" (texto branco) legível — hoje é texto branco sobre fundo claro/branco, praticamente invisível.

- [ ] **Step 4: Commit**

```bash
git add src/app/shelf/page.tsx
git commit -m "fix: migrate Shelf CTA card to dark theme, fix unreadable white-on-white heading"
```

---

## Task 4: Transições de página (PageTransition)

**Files:**
- Create: `src/components/PageTransition.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `export default function PageTransition({ children }: { children: React.ReactNode })` — componente client que envolve `{children}` do layout com `AnimatePresence`.
- Consumes: nada de tasks anteriores.

- [ ] **Step 1: Criar o componente de transição**

Create `src/components/PageTransition.tsx`:

```tsx
"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Conectar no layout root**

Em `src/app/layout.tsx`, adicionar o import e trocar `{children}` por `<PageTransition>{children}</PageTransition>`:

```tsx
// Adicionar ao topo, junto dos outros imports:
import PageTransition from "@/components/PageTransition";
```

```tsx
// Antes:
        <Navbar />
        {children}
        <Footer />

// Depois:
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
```

- [ ] **Step 3: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`, navegar entre Home → Works → Resume → Shelf pelos links da navbar.
Expected: cada troca de rota tem um fade + leve deslocamento vertical, sem corte seco. Navbar e Footer permanecem fixos (não re-animam).

- [ ] **Step 5: Commit**

```bash
git add src/components/PageTransition.tsx src/app/layout.tsx
git commit -m "feat: add animated page transitions between routes"
```

---

## Task 5: Preloader de entrada

**Files:**
- Create: `src/components/Preloader.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `export default function Preloader()` — sem props.
- Consumes: nada de tasks anteriores.

- [ ] **Step 1: Criar o Preloader**

Create `src/components/Preloader.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "portfolio-preloader-shown";

export default function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion || sessionStorage.getItem(STORAGE_KEY)) {
      setIsVisible(false);
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, "true");
    const timer = setTimeout(() => setIsVisible(false), 1200);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal-dark"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-black text-3xl md:text-4xl tracking-tighter text-white"
          >
            Ana <span className="text-prime">Beatriz</span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Conectar no layout root**

Em `src/app/layout.tsx`:

```tsx
// Adicionar ao topo, junto dos outros imports:
import Preloader from "@/components/Preloader";
```

```tsx
// Antes:
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-prime selection:text-white`}>
        {/* Sidebar Socials */}

// Depois:
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-prime selection:text-white`}>
        <Preloader />
        {/* Sidebar Socials */}
```

- [ ] **Step 3: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 4: Verificar comportamento**

Run: `npm run dev`, abrir `http://localhost:3000` em aba anônima/nova.
Expected: overlay com "Ana Beatriz" aparece por ~1.2s e some com fade. Recarregar a página (F5) na mesma aba: overlay NÃO aparece de novo (sessionStorage já setado). Navegar internamente entre páginas: overlay não reaparece.

- [ ] **Step 5: Verificar reduced motion**

No DevTools do Chrome: `Cmd/Ctrl+Shift+P` → "Show Rendering" → "Emulate CSS media feature prefers-reduced-motion: reduce". Recarregar em nova aba anônima.
Expected: overlay não aparece (pula direto para a Home).

- [ ] **Step 6: Commit**

```bash
git add src/components/Preloader.tsx src/app/layout.tsx
git commit -m "feat: add entry preloader shown once per browser session"
```

---

## Task 6: Cursor customizado

**Files:**
- Create: `src/hooks/useMediaQuery.ts`
- Create: `src/components/CustomCursor.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `export function useMediaQuery(query: string): boolean` — hook SSR-safe (retorna `false` até montar no client).
- Produces: `export default function CustomCursor()` — sem props. Lê atributos `data-cursor-hover` e `data-cursor-text` de qualquer elemento sob o mouse (usados por tasks futuras).
- Consumes: nada de tasks anteriores.

- [ ] **Step 1: Criar o hook `useMediaQuery`**

Create `src/hooks/useMediaQuery.ts`:

```ts
"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
```

- [ ] **Step 2: Adicionar a regra CSS que esconde o cursor nativo**

Em `src/app/globals.css`, adicionar ao final do arquivo:

```css
.cursor-none-active,
.cursor-none-active * {
  cursor: none !important;
}
```

- [ ] **Step 3: Criar o `CustomCursor`**

Create `src/components/CustomCursor.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CustomCursor() {
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const prefersReducedMotion = useReducedMotion();
  const isActive = isFinePointer && !prefersReducedMotion;

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300 });

  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive) return;

    document.documentElement.classList.add("cursor-none-active");

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const hoverTarget = el?.closest("a, button, [data-cursor-hover]");
      setIsHovering(!!hoverTarget);
      setHoverText(hoverTarget?.getAttribute("data-cursor-text") ?? null);
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.classList.remove("cursor-none-active");
    };
  }, [isActive, cursorX, cursorY]);

  if (!isActive) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center rounded-full border border-prime text-[10px] font-bold uppercase tracking-wider text-prime backdrop-blur-sm"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: isHovering ? 64 : 16,
        height: isHovering ? 64 : 16,
        backgroundColor: isHovering ? "rgba(0,229,255,0.15)" : "rgba(0,229,255,0.4)",
      }}
      transition={{ duration: 0.2 }}
    >
      {isHovering && hoverText ? hoverText : null}
    </motion.div>
  );
}
```

- [ ] **Step 4: Conectar no layout root**

Em `src/app/layout.tsx`:

```tsx
// Adicionar ao topo, junto dos outros imports:
import CustomCursor from "@/components/CustomCursor";
```

```tsx
// Antes:
        <Preloader />
        {/* Sidebar Socials */}

// Depois:
        <Preloader />
        <CustomCursor />
        {/* Sidebar Socials */}
```

- [ ] **Step 5: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 6: Verificar visualmente (desktop)**

Run: `npm run dev`, abrir no Chrome desktop com mouse.
Expected: cursor nativo escondido, um anel ciano segue o mouse com leve atraso, aumenta ao passar sobre qualquer link/botão (ex: itens da navbar, "Ver Projetos").

- [ ] **Step 7: Verificar fallback mobile**

No DevTools, ativar "Toggle device toolbar" (emulação mobile, ex: iPhone 14).
Expected: cursor customizado não aparece; cursor nativo do sistema não é escondido.

- [ ] **Step 8: Commit**

```bash
git add src/hooks/useMediaQuery.ts src/components/CustomCursor.tsx src/app/globals.css src/app/layout.tsx
git commit -m "feat: add custom magnetic cursor for fine-pointer devices"
```

---

## Task 7: ProjectCard — shine sweep + integração com cursor

**Files:**
- Modify: `src/components/ProjectCard.tsx`

**Interfaces:**
- Consumes: seletor `[data-cursor-hover]` e atributo `data-cursor-text` lidos por `CustomCursor` (Task 6).

- [ ] **Step 1: Marcar o card como alvo do cursor customizado**

```tsx
// Antes:
    <motion.div
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className="group relative glass-card overflow-hidden hover:shadow-[0_8px_32px_0_rgba(0,229,255,0.15)] hover:border-prime/30 transition-all duration-500 flex flex-col h-full"
    >

// Depois:
    <motion.div
      data-cursor-hover
      data-cursor-text="Ver"
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className="group relative glass-card overflow-hidden hover:shadow-[0_8px_32px_0_rgba(0,229,255,0.15)] hover:border-prime/30 transition-all duration-500 flex flex-col h-full"
    >
```

- [ ] **Step 2: Adicionar o shine sweep sobre a imagem/banner**

Dentro do container `aspect-video` (logo após a abertura da div, antes do bloco `{image ? (...) : (...)}`):

```tsx
// Antes:
      <div className="aspect-video bg-charcoal-dark flex items-center justify-center overflow-hidden relative">
        {image ? (

// Depois:
      <div className="aspect-video bg-charcoal-dark flex items-center justify-center overflow-hidden relative">
        <div className="pointer-events-none absolute inset-0 z-20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {image ? (
```

- [ ] **Step 3: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`, abrir `http://localhost:3000/portfolio`.
Expected: ao passar o mouse sobre um card, um brilho diagonal atravessa a imagem/banner, e o cursor customizado (Task 6) aumenta e mostra o texto "Ver".

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat: add shine sweep hover effect and cursor label to ProjectCard"
```

---

## Task 8: Navbar — scroll-aware + glow no item ativo

**Files:**
- Modify: `src/components/Navbar.tsx`

**Interfaces:**
- Nenhuma nova (usa o `cn` local já existente no arquivo).

- [ ] **Step 1: Adicionar estado de scroll**

```tsx
// Antes:
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [

// Depois:
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
```

```tsx
// Antes:
export default function Navbar() {
  const pathname = usePathname();

  return (

// Depois:
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
```

- [ ] **Step 2: Aplicar classes condicionais na pílula e glow no item ativo**

```tsx
// Antes:
      <div className="flex items-center gap-1 px-3 py-2 bg-charcoal/90 backdrop-blur-lg border border-white/10 rounded-full shadow-2xl">

// Depois:
      <div
        className={cn(
          "flex items-center gap-1 px-3 py-2 bg-charcoal/90 backdrop-blur-lg border border-white/10 rounded-full shadow-2xl transition-all duration-300",
          scrolled && "px-2.5 py-1.5 backdrop-blur-2xl bg-charcoal/95 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
        )}
      >
```

```tsx
// Antes:
              {isActive && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-white/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

// Depois:
              {isActive && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 z-10 bg-white/5 rounded-full shadow-[0_0_12px_rgba(0,229,255,0.4)] animate-pulse-slow"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
```

- [ ] **Step 3: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`, rolar a página mais de 40px.
Expected: a pílula da navbar fica ligeiramente mais compacta e com blur mais intenso. O indicador do item ativo tem um glow ciano com pulsação lenta.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add scroll-aware navbar and glow pulse to active nav indicator"
```

---

## Task 9: Hero 3D — Rede Neural (Three.js)

**Files:**
- Modify: `package.json`, `package-lock.json` (via `npm install`)
- Create: `src/components/NeuralNetworkScene.tsx`
- Create: `src/components/HeroCanvas.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces: `export default function NeuralNetworkScene({ nodeCount }: { nodeCount?: number })` — cena R3F completa (Canvas + partículas + linhas + parallax).
- Produces: `export default function HeroCanvas()` — wrapper client-only que decide (via `useMediaQuery` da Task 6 e `useReducedMotion`) se renderiza `NeuralNetworkScene` ou `null`.
- Consumes: `useMediaQuery` de `src/hooks/useMediaQuery.ts` (Task 6).

- [ ] **Step 1: Instalar as dependências**

Run:
```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```
Expected: `package.json` ganha as 4 entradas (`three`, `@react-three/fiber`, `@react-three/drei` em `dependencies`; `@types/three` em `devDependencies`), instalação sem erros.

- [ ] **Step 2: Criar a cena da rede neural**

Create `src/components/NeuralNetworkScene.tsx`:

```tsx
"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const CONNECT_DISTANCE = 2.4;

function generateNodePositions(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  return positions;
}

function buildConnections(positions: Float32Array, count: number) {
  const segments: [THREE.Vector3, THREE.Vector3][] = [];
  for (let i = 0; i < count; i++) {
    const a = new THREE.Vector3(
      positions[i * 3],
      positions[i * 3 + 1],
      positions[i * 3 + 2]
    );
    for (let j = i + 1; j < count; j++) {
      const b = new THREE.Vector3(
        positions[j * 3],
        positions[j * 3 + 1],
        positions[j * 3 + 2]
      );
      if (a.distanceTo(b) < CONNECT_DISTANCE) {
        segments.push([a, b]);
      }
    }
  }
  return segments;
}

function NodesAndLines({ count }: { count: number }) {
  const positions = useMemo(() => generateNodePositions(count), [count]);
  const lineSegments = useMemo(
    () => buildConnections(positions, count),
    [positions, count]
  );
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (document.hidden || !groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#00E5FF"
          size={0.06}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
        />
      </Points>
      {lineSegments.map(([a, b], i) => (
        <Line
          key={i}
          points={[a, b]}
          color="#00E5FF"
          lineWidth={0.5}
          transparent
          opacity={0.15}
        />
      ))}
    </group>
  );
}

function CameraParallax() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 1.2;
      target.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.8;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(() => {
    if (document.hidden) return;
    camera.position.x += (target.current.x - camera.position.x) * 0.02;
    camera.position.y += (target.current.y - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function NeuralNetworkScene({
  nodeCount = 60,
}: {
  nodeCount?: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.5} />
      <NodesAndLines count={nodeCount} />
      <CameraParallax />
    </Canvas>
  );
}
```

- [ ] **Step 3: Criar o wrapper com fallback**

Create `src/components/HeroCanvas.tsx`:

```tsx
"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const NeuralNetworkScene = dynamic(() => import("./NeuralNetworkScene"), {
  ssr: false,
});

export default function HeroCanvas() {
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const prefersReducedMotion = useReducedMotion();

  if (isCoarsePointer || prefersReducedMotion) {
    return null;
  }

  const nodeCount =
    typeof navigator !== "undefined" &&
    navigator.hardwareConcurrency &&
    navigator.hardwareConcurrency <= 4
      ? 35
      : 65;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <NeuralNetworkScene nodeCount={nodeCount} />
    </div>
  );
}
```

- [ ] **Step 4: Conectar no hero da Home**

Em `src/app/page.tsx`, adicionar o import e renderizar `HeroCanvas` junto aos blobs existentes (sem removê-los):

```tsx
// Antes:
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

// Depois:
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import HeroCanvas from "@/components/HeroCanvas";
```

```tsx
// Antes:
      {/* Ambient Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-prime/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 pointer-events-none" />

// Depois:
      {/* Ambient Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-prime/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 pointer-events-none" />
      <HeroCanvas />
```

- [ ] **Step 5: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros. Se houver erro de tipos em `@react-three/fiber` relacionado a JSX intrinsic elements (`<ambientLight>`, `<group>`), confirmar que `@types/three` foi instalado (Step 1) e que `tsconfig.json` inclui `**/*.tsx` (já inclui, ver `include` do tsconfig).

- [ ] **Step 6: Verificar visualmente (desktop)**

Run: `npm run dev`, abrir `http://localhost:3000` no Chrome desktop.
Expected: atrás do terminal de código, uma rede de pontos ciano conectados por linhas finas, com leve movimento seguindo o mouse. Os blobs CSS continuam visíveis também.

- [ ] **Step 7: Verificar fallback mobile**

DevTools → "Toggle device toolbar" (emulação mobile).
Expected: nenhuma cena 3D é montada (sem custo de CPU/GPU); apenas os blobs CSS aparecem, como antes desta task.

- [ ] **Step 8: Verificar fallback reduced-motion**

DevTools → "Show Rendering" → "Emulate CSS media feature prefers-reduced-motion: reduce", em viewport desktop.
Expected: cena 3D não monta; blobs CSS continuam aparecendo normalmente.

- [ ] **Step 9: Verificar build de produção**

Run: `npm run build`
Expected: build conclui sem erros (confirma que o dynamic import com `ssr:false` não quebra o build/SSR das outras páginas).

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json src/components/NeuralNetworkScene.tsx src/components/HeroCanvas.tsx src/app/page.tsx
git commit -m "feat: add interactive 3D neural network hero background with mobile/reduced-motion fallback"
```

---

## Task 10: Verificação final de todo o site

**Files:**
- Nenhum arquivo novo/modificado — apenas verificação end-to-end.

**Interfaces:**
- Nenhuma.

- [ ] **Step 1: Type-check completo**

Run: `npx tsc --noEmit`
Expected: sem erros em todo o projeto.

- [ ] **Step 2: Build de produção completo**

Run: `npm run build`
Expected: build passa sem erros ou warnings novos.

- [ ] **Step 3: Percorrer todas as páginas em desktop**

Run: `npm run build && npm run start` (ou `npm run dev`), visitar `/`, `/portfolio`, `/resume`, `/shelf` e `/shelf/malware-analysis`.
Expected: nenhum bloco com fundo claro/branco residual, transições de página funcionando entre todas as rotas, cursor customizado ativo, navbar scroll-aware, hero 3D visível na Home.

- [ ] **Step 4: Emulação mobile completa**

DevTools → "Toggle device toolbar" (ex: iPhone 14, Pixel 7), repetir a navegação por todas as páginas.
Expected: hero 3D e cursor customizado ausentes (fallback), preloader e transições ainda funcionam (não dependem de pointer), nenhuma quebra de layout.

- [ ] **Step 5: `prefers-reduced-motion` completo**

DevTools → emular `prefers-reduced-motion: reduce`, recarregar em aba anônima e navegar pelo site.
Expected: preloader não aparece, transições de página reduzidas/ausentes, hero 3D não monta, parallax de câmera não roda. Nenhum conteúdo fica inacessível ou quebrado nesse modo.

- [ ] **Step 6: Commit final (se houver ajustes desta verificação)**

Caso algum ajuste tenha sido necessário durante esta verificação, commitar separadamente com uma mensagem descrevendo o que foi corrigido. Caso nenhum ajuste seja necessário, esta task não gera commit.

---
