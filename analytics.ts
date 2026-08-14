import { isCheckoutConfigured, siteConfig } from './config'

type AnalyticsValue = string | number | boolean | null | undefined
export type AnalyticsPayload = Record<string, AnalyticsValue>

type SectionState = {
  name: string
  enteredAt: number | null
  viewed: boolean
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    fbq?: (...args: unknown[]) => void
  }
}

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

const ATTRIBUTION_STORAGE_KEY = 'prato10x_attribution'

function readStoredAttribution(): Record<string, string> {
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (!raw) return {}

    const parsed = JSON.parse(raw) as Record<string, unknown>
    return Object.fromEntries(
      UTM_KEYS.map((key) => [
        key,
        typeof parsed[key] === 'string' ? String(parsed[key]) : '',
      ]),
    )
  } catch {
    return {}
  }
}

function persistAttribution(values: Record<string, string>): void {
  try {
    window.sessionStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(values),
    )
  } catch {
    // O rastreamento nunca deve bloquear a experiência da landing page.
  }
}

export function getUtmParameters(): Record<string, string> {
  const params = new URLSearchParams(window.location.search)
  const stored = readStoredAttribution()

  const values = Object.fromEntries(
    UTM_KEYS.map((key) => {
      const currentValue = params.get(key)?.trim() ?? ''
      return [key, currentValue || stored[key] || '']
    }),
  )

  if (Object.values(values).some(Boolean)) persistAttribution(values)
  return values
}

export function trackEvent(
  event: string,
  payload: AnalyticsPayload = {},
): void {
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({
    event,
    page_version: siteConfig.pageVersion,
    page_path: window.location.pathname,
    ...getUtmParameters(),
    ...payload,
  })
}


export function openCheckout(buttonLocation: string): void {
  trackEvent('checkout_clicked', {
    button_location: buttonLocation,
  })

  trackEvent('checkout_click', {
    button_location: buttonLocation,
    checkout_provider: 'kiwify',
  })

  try {
    window.fbq?.('track', 'InitiateCheckout', {
      content_name: siteConfig.productName,
      value: siteConfig.priceValue,
      currency: 'BRL',
    })
  } catch {
    // Pixel nunca deve bloquear a navegação para o checkout.
  }

  if (!isCheckoutConfigured()) {
    console.warn('Configure o link definitivo do checkout em config.ts.')
    alert('O checkout ainda não está configurado para esta publicação.')
    return
  }

  const checkoutUrl = new URL(siteConfig.checkoutUrl)
  const attribution = getUtmParameters()

  for (const [key, value] of Object.entries(attribution)) {
    if (value && !checkoutUrl.searchParams.has(key)) {
      checkoutUrl.searchParams.set(key, value)
    }
  }

  window.location.href = checkoutUrl.toString()
}

function secondsSince(startedAt: number): number {
  return Math.max(0, Math.round((performance.now() - startedAt) / 100) / 10)
}

export function initializeBehaviorTracking(): () => void {
  getUtmParameters()

  if (!('IntersectionObserver' in window)) return () => undefined

  const sectionStates = new Map<HTMLElement, SectionState>()
  const sectionElements = Array.from(
    document.querySelectorAll<HTMLElement>('[data-track-section]'),
  )

  for (const element of sectionElements) {
    sectionStates.set(element, {
      name: element.dataset.trackSection || element.id || 'section',
      enteredAt: null,
      viewed: false,
    })
  }

  function closeSection(element: HTMLElement): void {
    const state = sectionStates.get(element)
    if (!state?.enteredAt) return

    const durationSeconds = secondsSince(state.enteredAt)
    state.enteredAt = null

    if (durationSeconds >= 1) {
      trackEvent('section_time', {
        section_name: state.name,
        duration_seconds: durationSeconds,
      })
    }
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement
        const state = sectionStates.get(element)
        if (!state) continue

        if (entry.isIntersecting) {
          if (!state.viewed) {
            state.viewed = true
            trackEvent('section_view', { section_name: state.name })
          }

          if (state.enteredAt === null && document.visibilityState === 'visible') {
            state.enteredAt = performance.now()
          }
        } else {
          closeSection(element)
        }
      }
    },
    { threshold: [0, 0.05, 0.15] },
  )

  sectionElements.forEach((element) => sectionObserver.observe(element))

  const oneShotElements = Array.from(
    document.querySelectorAll<HTMLElement>('[data-track-once]'),
  )
  const firedOneShotEvents = new Set<string>()

  const oneShotObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue

        const element = entry.target as HTMLElement
        const eventName = element.dataset.trackOnce?.trim()
        if (!eventName || firedOneShotEvents.has(eventName)) continue

        firedOneShotEvents.add(eventName)
        trackEvent(eventName)
        oneShotObserver.unobserve(element)
      }
    },
    { threshold: [0.35] },
  )

  oneShotElements.forEach((element) => oneShotObserver.observe(element))

  function handleVisibilityChange(): void {
    if (document.visibilityState === 'hidden') {
      sectionElements.forEach(closeSection)
      return
    }

    for (const [element, state] of sectionStates) {
      const bounds = element.getBoundingClientRect()
      const visible = bounds.bottom > 0 && bounds.top < window.innerHeight
      if (visible && state.enteredAt === null) state.enteredAt = performance.now()
    }
  }

  function flushTracking(): void {
    sectionElements.forEach(closeSection)
  }

  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.addEventListener('pagehide', flushTracking)

  return () => {
    flushTracking()
    sectionObserver.disconnect()
    oneShotObserver.disconnect()
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    window.removeEventListener('pagehide', flushTracking)
  }
}
