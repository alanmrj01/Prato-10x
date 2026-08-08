type AnalyticsValue = string | number | boolean | null | undefined
export type AnalyticsPayload = Record<string, AnalyticsValue>

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}): void {
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...payload })
}

export function getUtmParameters(): Record<string, string> {
  const params = new URLSearchParams(window.location.search)
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
  return Object.fromEntries(keys.map((key) => [key, params.get(key)?.trim() ?? '']))
}
