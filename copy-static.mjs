import { copyFile, mkdir } from 'node:fs/promises'

const files = [
  'favicon.svg',
  'og-prato10x.jpg',
  'prato10x-hero-mockup.webp',
  'privacidade.html',
  'termos.html',
]

await mkdir('dist', { recursive: true })

for (const file of files) {
  await copyFile(file, `dist/${file}`)
}

console.log('[build] Arquivos estáticos copiados para dist.')
