import { useMemo, useRef, useState } from 'react'
import { isCheckoutConfigured, siteConfig } from './config'
import { getUtmParameters, trackEvent } from './analytics'
import {
  ArrowRightIcon,
  BagIcon,
  BowlIcon,
  CheckIcon,
  ClockIcon,
  LockIcon,
  QuestionIcon,
} from './Icons'

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

type CheckoutButtonLocation = 'quiz-submit' | 'quiz-result'

type QuizOption = {
  id: string
  label: string
  icon: typeof ClockIcon
  resultTitle: string
  resultText: string
}

const quizOptions: QuizOption[] = [
  {
    id: 'Pulo Refeições',
    label: 'Acabo pulando refeições sem planejar.',
    icon: ClockIcon,
    resultTitle: 'Sua rotina está ficando sem uma referência clara.',
    resultText:
      'Quando você está comendo menos, deixar cada decisão para a última hora aumenta o improviso. O Prato 10x ajuda a definir opções antecipadamente para dar mais direção à rotina.',
  },
  {
    id: 'Escolho o Mais Fácil',
    label: 'Como pouco e escolho apenas o que estiver mais fácil.',
    icon: BowlIcon,
    resultTitle: 'O mais fácil está decidindo por você.',
    resultText:
      'Quando você está comendo menos, a praticidade pesa ainda mais nas escolhas. O Prato 10x ajuda a manter opções simples e mais bem planejadas disponíveis para esses momentos.',
  },
  {
    id: 'Não sei Priorizar',
    label: 'Não sei o que priorizar em refeições menores.',
    icon: QuestionIcon,
    resultTitle: 'Sua maior dificuldade está em saber o que merece espaço.',
    resultText:
      'Quando cabe menos comida, cada escolha ganha mais importância. O Prato 10x apresenta uma referência visual para organizar refeições menores com mais intenção.',
  },
  {
    id: 'Faltam Opções Práticas',
    label: 'Faltam opções práticas para os dias corridos.',
    icon: BagIcon,
    resultTitle: 'Sua rotina precisa de opções que funcionem nos dias reais.',
    resultText:
      'Não basta saber o que seria ideal. É necessário ter alternativas possíveis para os dias corridos. O Prato 10x ajuda a organizar compras e opções práticas antes que a rotina fique apertada.',
  },
]

export function Quiz() {
  const [selectedId, setSelectedId] = useState('')
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [failedAttempts, setFailedAttempts] = useState(0)
  const quizStartedRef = useRef(false)

  const selected = useMemo(
    () => quizOptions.find((option) => option.id === selectedId),
    [selectedId],
  )

  function choose(option: QuizOption) {
    setSelectedId(option.id)
    setStatus('idle')

    if (!quizStartedRef.current) {
      quizStartedRef.current = true
      trackEvent('quiz_start', { total_steps: 1 })
    }

    trackEvent('quiz_step', {
      step_number: 1,
      total_steps: 1,
    })

    // Mantido para compatibilidade com futuras regras do GTM, sem enviar a resposta escolhida.
    trackEvent('quiz_answered', { step_number: 1 })
  }

  function openCheckout(buttonLocation: CheckoutButtonLocation) {
    if (!selected) return

    trackEvent('checkout_clicked', {
      button_location: buttonLocation,
    })

    trackEvent('checkout_click', {
      button_location: buttonLocation,
      checkout_provider: 'kiwify',
    })

    if (!isCheckoutConfigured()) {
      console.warn(
        'Configure o link de checkout do Prato 10x em src/config.ts.',
      )

      alert(
        'O checkout será liberado em breve. Configure o link em src/config.ts antes de publicar.',
      )

      return
    }

    window.location.href = siteConfig.checkoutUrl
  }

  async function submitQuiz() {
    if (!selected || status === 'sending') return

    setStatus('sending')

    const payload = new URLSearchParams({
      'form-name': siteConfig.quizFormName,
      answer: selected.id,
      answer_label: selected.label,
      page_version: siteConfig.pageVersion,
      timestamp: new Date().toISOString(),
      ...getUtmParameters(),
    })

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
      })

      if (!response.ok) {
        throw new Error(`Netlify form returned ${response.status}`)
      }

      setStatus('success')

      trackEvent('quiz_submitted', {
        submit_status: 'success',
      })

      trackEvent('quiz_complete', {
        total_steps: 1,
      })

      /*
       * Depois que a Netlify confirma o registro da resposta,
       * o visitante é enviado diretamente ao checkout.
       */
      openCheckout('quiz-submit')
    } catch (error) {
      console.error(
        'Não foi possível registrar a resposta do quiz.',
        error,
      )

      setFailedAttempts((value) => value + 1)
      setStatus('error')

      trackEvent('quiz_submitted', {
        submit_status: 'error',
      })
    }
  }

  /*
   * O resultado abaixo funciona como contingência.
   * Se o envio falhar duas vezes, o visitante ainda poderá
   * acessar manualmente o checkout.
   */
  const canShowResult =
    status === 'error' && failedAttempts >= 2

  return (
    <section
      className="section quiz-section"
      id="quiz"
      data-track-section="quiz"
      data-reveal
    >
      <div className="container quiz-panel">
        <div className="quiz-panel__heading">
          <span className="eyebrow">
            QUIZ RÁPIDO — UMA PERGUNTA
          </span>

          <h2>
            O que mais dificulta suas refeições quando você está
            comendo menos?
          </h2>
        </div>

        <div
          className="quiz-list"
          role="radiogroup"
          aria-label="Dificuldade principal com a alimentação"
        >
          {quizOptions.map((option) => {
            const Icon = option.icon
            const active = selectedId === option.id

            return (
              <button
                type="button"
                className={`quiz-choice${
                  active ? ' quiz-choice--active' : ''
                }`}
                key={option.id}
                role="radio"
                aria-checked={active}
                onClick={() => choose(option)}
              >
                <span className="quiz-choice__radio">
                  {active ? <CheckIcon /> : null}
                </span>

                <span className="quiz-choice__label">
                  {option.label}
                </span>

                <span className="quiz-choice__icon">
                  <Icon />
                </span>
              </button>
            )
          })}
        </div>

        <div
          className="quiz-offer-summary"
          id="oferta"
          data-track-once="offer_view"
        >
          <div className="quiz-offer-summary__copy">
            <span>Acesso completo ao Prato 10x</span>
            <small>Guia visual + materiais práticos para consulta no celular</small>
          </div>
          <div
            className="quiz-offer-summary__price"
            id="preco"
            data-track-once="price_view"
          >
            <strong>{siteConfig.price}</strong>
            <small>Pagamento único</small>
          </div>
        </div>

        <button
          id="cta-checkout"
          className="button button--primary quiz-submit"
          type="button"
          onClick={() => void submitQuiz()}
          disabled={!selected || status === 'sending'}
        >
          {status === 'sending'
            ? 'Registrando resposta...'
            : 'Quero acessar o Prato 10x'}
        </button>

        <p className="quiz-privacy">
          <LockIcon /> Resposta anônima • checkout seguro
        </p>

        {status === 'error' && !canShowResult && (
          <div className="quiz-error" role="alert">
            Não foi possível registrar sua resposta agora. Tente
            novamente para continuar.
          </div>
        )}

        {selected && canShowResult && (
          <div
            className="quiz-result"
            id="quiz-result"
            aria-live="polite"
          >
            <div className="quiz-result__copy">
              <span className="eyebrow">SEU RESULTADO</span>
              <h3>{selected.resultTitle}</h3>
              <p>{selected.resultText}</p>
            </div>

            <div
              className="plate-map"
              aria-label="Ilustração visual de um prato dividido em prioridades"
            >
              <span className="plate-map__segment plate-map__segment--one">
                Vegetais
              </span>

              <span className="plate-map__segment plate-map__segment--two">
                Proteínas
              </span>

              <span className="plate-map__segment plate-map__segment--three">
                Complementos
              </span>
            </div>

            <div className="offer-card">
              <span className="eyebrow">
                ACESSO AO PRATO 10X
              </span>

              <h3>
                Transforme refeições menores em escolhas mais bem
                planejadas.
              </h3>

              <strong className="offer-card__price">
                {siteConfig.price}
              </strong>

              <ul>
                <li>
                  <CheckIcon /> Guia visual
                </li>

                <li>
                  <CheckIcon /> Matriz de refeições menores
                </li>

                <li>
                  <CheckIcon /> Mapa de opções práticas
                </li>

                <li>
                  <CheckIcon /> Plano de aplicação por 30 dias
                </li>

                <li>
                  <CheckIcon /> Lista de compras editável
                </li>

                <li>
                  <CheckIcon /> Versão para celular
                </li>
              </ul>

              <button
                id="cta-checkout-fallback"
                type="button"
                className="button button--primary"
                onClick={() => openCheckout('quiz-result')}
              >
                Quero acessar o Prato 10x <ArrowRightIcon />
              </button>

              <small>
                <LockIcon /> Pagamento único • acesso digital
              </small>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}