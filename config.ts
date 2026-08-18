export const siteConfig = {
  productName: 'Prato 10x',
  productTagline: 'Refeições menores. Escolhas mais inteligentes.',
  price: 'R$ 47',
  priceValue: 47,
  quizFormName: 'prato-10x-quiz',
  pageVersion: 'prato-10x-v2-3-tracking-safe',

  /** Checkout comercial usado por visitantes reais. */
  checkoutUrl: 'https://pay.kiwify.com.br/qpiXBDM',

  /**
   * Checkout exclusivo para QA/testes internos.
   * Nunca deve carregar Pixel/CAPI de produção na Kiwify.
   */
  testCheckoutUrl: 'https://pay.kiwify.com.br/4B5VArF',

  contactEmail: 'contato@seudominio.com.br',
  instagramUrl: '#',
  facebookUrl: '#',
} as const

export function isCheckoutConfigured(): boolean {
  return !siteConfig.checkoutUrl.includes('COLE_AQUI')
}

export function isTestCheckoutConfigured(): boolean {
  return !siteConfig.testCheckoutUrl.includes('COLE_AQUI')
}
