# Prato 10x — Landing Page

Versão de raiz plana preparada para GitHub, StackBlitz e Netlify.

## Importante
Todos os arquivos necessários estão na raiz de propósito. Não renomeie nem troque o conteúdo entre arquivos.

## StackBlitz
O projeto possui `stackblitz.startCommand` no `package.json` e inicia com:

    npm run dev

## Netlify
Build:

    npm run build

Publish directory:

    dist

O build também copia para `dist` os arquivos estáticos usados pela landing page.

## Arquivos principais
- `index.html` — documento HTML e Meta Pixel
- `main.tsx` — entrada React
- `App.tsx` — landing page
- `Quiz.tsx` — quiz e redirecionamento para checkout
- `config.ts` — configuração do produto/checkout
- `analytics.ts` — eventos e UTMs
- `styles.css` — estilos
