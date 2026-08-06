# Prato 10x — Landing Page

Landing page React + TypeScript, mobile-first, preparada para Netlify Forms.

## Executar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Configurar o checkout

Edite `src/config.ts` e substitua:

```ts
checkoutUrl: 'https://pay.hotmart.com/COLE_AQUI_O_LINK_DO_CHECKOUT'
```

Todos os CTAs anteriores ao quiz levam para `#quiz`. O link de checkout só aparece após o resultado.

## Netlify Forms

O formulário estático `prato-10x-quiz` fica em `index.html`. Após publicar na Netlify, as respostas aparecerão em **Forms → prato-10x-quiz**.

## Campos registrados

- `answer`
- `answer_label`
- UTMs
- `page_version`
- `timestamp`

O quiz não coleta nome, e-mail, peso, medicamento, diagnóstico ou sintomas.

## Arquivos principais

- `src/App.tsx`: seções e copys
- `src/components/Quiz.tsx`: quiz, resultado e checkout
- `src/config.ts`: preço, link do checkout e dados centrais
- `src/styles.css`: identidade visual, responsividade e animações
