export const siteConfig = {
  productName: 'Prato 10x',
  productTagline: 'Refeições menores. Escolhas mais inteligentes.',
  price: 'R$ 47',
  quizFormName: 'prato-10x-quiz',
  pageVersion: 'prato-10x-v1',

  /**
   * Substitua este endereço pelo link definitivo do checkout.
   * Todos os botões exibidos após o quiz usam esta configuração.
   */
  checkoutUrl: 'https://pay.kiwify.com.br/qpiXBDM',

  contactEmail: 'contato@seudominio.com.br',
  instagramUrl: '#',
  facebookUrl: '#',
} as const

export function isCheckoutConfigured(): boolean {
  return !siteConfig.checkoutUrl.includes('COLE_AQUI')
}
