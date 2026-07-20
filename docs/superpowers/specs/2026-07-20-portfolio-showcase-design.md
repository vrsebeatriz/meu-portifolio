# Portfolio "Obra de Arte" — Design de Animações e Polimento Visual

**Data:** 2026-07-20
**Status:** Aprovado

## Objetivo

Elevar o portfólio (Next.js 14 + Tailwind + Framer Motion) de "bem feito" para
"vitrine técnica" — adicionando um hero 3D, transições de página, cursor
customizado e micro-interações, além de corrigir a inconsistência visual das
páginas Resume/Shelf (ainda no tema claro) frente ao tema dark premium usado em
Home/Portfolio.

## Escopo

Dentro do escopo:
- Hero 3D (rede neural) na Home
- Preloader de entrada (primeiro load da sessão)
- Transições de página via `AnimatePresence`
- Cursor customizado (desktop/mouse apenas)
- Suporte a `prefers-reduced-motion` em todas as animações novas
- Polimento de ProjectCard e Navbar
- Migração de Resume e Shelf para o tema dark

Fora do escopo:
- Mudança de conteúdo/copy de qualquer página
- Novo sistema de rotas ou CMS
- GSAP, Lenis (smooth scroll) — não necessários para este escopo
- Testes automatizados de UI (verificação será manual via browser, conforme prática do projeto)

## Stack e Arquitetura

- **Novas dependências:** `three`, `@react-three/fiber`, `@react-three/drei` —
  usadas exclusivamente pelo componente do hero 3D.
- **Sem novas libs para o resto:** transições de página, cursor e
  micro-interações usam Framer Motion (já instalado) + CSS.
- O componente 3D é importado com `next/dynamic(() => import(...), { ssr: false })`
  para não impactar SSR/bundle de outras páginas.
- **Fallback automático:** em mobile (`matchMedia('(pointer: coarse)')`) ou com
  `prefers-reduced-motion: reduce` ativo, o hero 3D não é montado — os 3 blobs
  CSS que já existem hoje continuam sendo o fundo do hero. Zero regressão para
  quem não recebe o efeito 3D.
- Densidade de partículas da cena 3D é adaptativa: reduzida em telas menores ou
  quando `navigator.hardwareConcurrency` indica hardware mais fraco.

## Componentes

### 1. `NeuralNetworkScene.tsx` (novo, client-only)

Cena Three.js/R3F posicionada atrás do terminal de código no hero da Home,
numa camada mais profunda que os blobs existentes (não os substitui).

- Nós (pontos ciano `#00E5FF`, tamanhos levemente variados) flutuando em
  profundidade.
- Linhas finas semi-transparentes conectando nós que estão dentro de um
  threshold de distância, recalculado por frame — efeito "grafo vivo".
- Parallax de câmera sutil seguindo a posição do mouse (lerp suave via
  `useFrame`, não um tilt agressivo).
- Throttling de frameloop quando a aba perde foco, para não gastar
  CPU/GPU à toa.
- Renderizado condicionalmente conforme a regra de fallback acima.

### 2. `Preloader.tsx` (novo)

- Overlay full-screen com reveal animado do nome/logo (~1.2s), saindo com
  fade + scale.
- Aparece apenas no primeiro carregamento da sessão do navegador (flag em
  `sessionStorage`), nunca em navegações internas subsequentes.
- Desabilitado (pula direto) quando `prefers-reduced-motion: reduce`.

### 3. Transições de página

- Wrapper com `AnimatePresence` via `template.tsx` no App Router.
- Fade + leve deslocamento vertical na troca de rota, substituindo o corte
  seco atual do Next.js.
- Duração/curva reduzidas (ou desabilitadas) sob `prefers-reduced-motion`.

### 4. `CustomCursor.tsx` (novo)

- Só monta em dispositivos com `(pointer: fine)` — nunca em touch.
- Ponto + anel seguindo o cursor com leve delay via spring.
- Efeito magnético: aumenta/gruda ao passar sobre links, botões e
  `ProjectCard`s.
- Cursor nativo do navegador permanece escondido apenas quando o componente
  está ativo (evita "cursor duplo" em fallback).

### 5. Hook de reduced motion

- Uso do `useReducedMotion` nativo do Framer Motion como fonte única de
  verdade, consultado por: Preloader, transições de página, parallax do hero
  3D e qualquer nova micro-interação.

### 6. Polimento de `ProjectCard.tsx`

- Mantém o tilt 3D existente (`rotateX`/`rotateY` via mouse).
- Adiciona "shine sweep": brilho diagonal que atravessa o card no hover.
- Cursor customizado reage ao passar por cima (ex: anel encolhe / rótulo
  "Ver").

### 7. Polimento de `Navbar.tsx`

- Glow pulsante sutil na pílula do item ativo (`layoutId="bubble"` já
  existente).
- Barra fica mais compacta e com blur mais intenso ao rolar a página
  (scroll-aware), revertendo ao topo.

### 8. Migração de tema — `resume/page.tsx` e `shelf/page.tsx`

- Troca de todos os blocos com `bg-beige`, `bg-white`, `border-beige-dark`
  pelos equivalentes do design system dark já usados em Home/Portfolio:
  `glass-card` / `bg-charcoal-light/30`, `border-white/10`, texto em
  `beige`/`beige-dark`.
- Nenhuma mudança de estrutura, dados ou copy — só a pele visual.

## Performance e Acessibilidade

- `prefers-reduced-motion` respeitado em toda animação nova (ver hook acima).
- Hero 3D nunca carrega em mobile/reduced-motion — sem custo de bundle/CPU
  extra nesses casos (via dynamic import condicional).
- Cursor customizado nunca interfere em dispositivos touch.
- Verificação de performance: checagem manual no DevTools (throttling de CPU,
  emulação mobile) antes de considerar o hero 3D concluído.

## Verificação

Como o projeto não tem testes de UI automatizados, a verificação será manual:
1. `npm run dev` e navegação por todas as páginas no browser.
2. Testar hero 3D em desktop (mouse) e emulação mobile (deve cair no
   fallback CSS).
3. Ativar `prefers-reduced-motion` no SO/DevTools e confirmar que preloader,
   transições e parallax reduzem/desligam.
4. Confirmar que Resume e Shelf não têm mais nenhum bloco claro residual.
5. `npm run build` para garantir que o dynamic import do 3D não quebra o
   build de produção.

## Fasing sugerida (para o plano de implementação)

1. Migração de tema Resume/Shelf (isolado, baixo risco, rápido).
2. Camada global: reduced-motion hook, transições de página, preloader.
3. Cursor customizado + polimento ProjectCard/Navbar.
4. Hero 3D (maior escopo, nova dependência, feito por último para não
   bloquear o resto).
