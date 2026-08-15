export const siteConfig = {
  productName: 'Prato 10x',
  productTagline: 'Refeições menores. Escolhas mais inteligentes.',
  price: 'R$ 47',
  priceValue: 47,
  quizFormName: 'prato-10x-quiz',
  pageVersion: 'prato-10x-v2-2-lightcopy-15dias',

  /**
   * Substitua este endereço pelo link definitivo do checkout.
   * Todos os CTAs de acesso usam esta configuração; o quiz é opcional.
   */
  checkoutUrl: 'https://pay.kiwify.com.br/qpiXBDM',

  contactEmail: 'contato@seudominio.com.br',
  instagramUrl: '#',
  facebookUrl: '#',
} as const

export function isCheckoutConfigured(): boolean {
  return !siteConfig.checkoutUrl.includes('COLE_AQUI')
}
