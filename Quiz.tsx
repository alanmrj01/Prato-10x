import { useMemo, useRef, useState } from 'react'
import {
  getJourneyId,
  getUtmParameters,
  isInternalTestMode,
  openCheckout,
  trackEvent,
} from './analytics'
import { siteConfig } from './config'
import { ArrowRightIcon, CheckIcon, LockIcon } from './Icons'

type QuizAnswer = 'yes' | 'no'
type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

type QuizQuestion = {
  id: `q${number}`
  question: string
  yesLabel: string
  noLabel: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Quando você come menos, fica em dúvida sobre o que merece espaço no prato?',
    yesLabel: 'Sim, isso acontece comigo',
    noLabel: 'Não, isso já é claro para mim',
  },
  {
    id: 'q2',
    question: 'Nos dias corridos, acaba escolhendo só o que está mais fácil?',
    yesLabel: 'Sim, acontece bastante',
    noLabel: 'Não, costumo me organizar',
  },
  {
    id: 'q3',
    question: 'Quando cabe menos, escolher o que entra primeiro vira uma dúvida?',
    yesLabel: 'Sim, essa dúvida aparece',
    noLabel: 'Não, sei o que priorizar',
  },
  {
    id: 'q4',
    question: 'Uma referência visual no celular facilitaria essas escolhas?',
    yesLabel: 'Sim, eu consultaria',
    noLabel: 'Não faria diferença',
  },
  {
    id: 'q5',
    question: 'Combinações já organizadas ajudariam a reduzir o improviso?',
    yesLabel: 'Sim, ajudariam muito',
    noLabel: 'Não, prefiro decidir na hora',
  },
  {
    id: 'q6',
    question: 'Um plano de 15 dias ajudaria você a organizar melhor essa rotina?',
    yesLabel: 'Sim, gosto de ter um caminho',
    noLabel: 'Não preciso de um plano',
  },
  {
    id: 'q7',
    question: 'Você usaria essa referência sempre que a dúvida aparecesse?',
    yesLabel: 'Sim, eu usaria',
    noLabel: 'Não seria útil para mim',
  },
]

function resultCopy(score: number) {
  if (score >= 5) {
    return {
      title: 'Você se identificou com a situação que o Prato 10x foi criado para organizar.',
      text: 'Sua resposta mostra que a dúvida, o improviso ou a falta de uma referência aparecem em vários momentos da rotina. O Prato 10x foi estruturado justamente para tornar essas decisões mais visuais e fáceis de consultar.',
    }
  }

  if (score >= 3) {
    return {
      title: 'Algumas dessas situações já aparecem na sua rotina.',
      text: 'Você não precisa ter dificuldade em todas as refeições para se beneficiar de uma referência prática. A proposta do Prato 10x é estar disponível justamente nos momentos em que a dúvida aparece.',
    }
  }

  return {
    title: 'Sua rotina parece ter menos improviso hoje.',
    text: 'Mesmo assim, você pode conhecer a referência visual antes de decidir se ela faria sentido para os momentos em que surgir alguma dúvida. O quiz é apenas uma ferramenta de identificação, não um diagnóstico.',
  }
}

export function Quiz() {
  const [answers, setAnswers] = useState<Record<string, QuizAnswer>>({})
  const [step, setStep] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const quizStartedRef = useRef(false)

  const score = useMemo(
    () => Object.values(answers).filter((answer) => answer === 'yes').length,
    [answers],
  )

  const result = useMemo(() => resultCopy(score), [score])
  const currentQuestion = quizQuestions[step]
  const progress = completed ? 100 : ((step + 1) / quizQuestions.length) * 100

  async function submitAnswers(nextAnswers: Record<string, QuizAnswer>) {
    setStatus('sending')

    const nextScore = Object.values(nextAnswers).filter(
      (answer) => answer === 'yes',
    ).length

    const internalTest = isInternalTestMode()
    const payload = new URLSearchParams({
      'form-name': siteConfig.quizFormName,
      page_version: siteConfig.pageVersion,
      timestamp: new Date().toISOString(),
      score: String(nextScore),
      internal_test: internalTest ? '1' : '0',
      journey_id: getJourneyId(),
      ...getUtmParameters(),
      ...nextAnswers,
    })

    if (internalTest) {
      setStatus('success')
      trackEvent('quiz_submitted', {
        submit_status: 'test_skipped',
        affirmative_answers: nextScore,
        total_steps: quizQuestions.length,
      })
      return
    }

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
        affirmative_answers: nextScore,
        total_steps: quizQuestions.length,
      })
    } catch (error) {
      console.error('Não foi possível registrar o quiz.', error)
      setStatus('error')
      trackEvent('quiz_submitted', {
        submit_status: 'error',
        affirmative_answers: nextScore,
        total_steps: quizQuestions.length,
      })
    }
  }

  function answerQuestion(value: QuizAnswer) {
    if (!currentQuestion || completed) return

    if (!quizStartedRef.current) {
      quizStartedRef.current = true
      trackEvent('quiz_start', { total_steps: quizQuestions.length })
    }

    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    }

    setAnswers(nextAnswers)

    trackEvent('quiz_step', {
      step_number: step + 1,
      total_steps: quizQuestions.length,
    })

    trackEvent('quiz_answered', {
      step_number: step + 1,
      total_steps: quizQuestions.length,
      answer_value: value,
    })

    if (step < quizQuestions.length - 1) {
      setStep((current) => current + 1)
      return
    }

    const nextScore = Object.values(nextAnswers).filter(
      (answer) => answer === 'yes',
    ).length

    setCompleted(true)
    trackEvent('quiz_complete', {
      total_steps: quizQuestions.length,
      affirmative_answers: nextScore,
    })
    void submitAnswers(nextAnswers)
  }

  function goBack() {
    if (completed) {
      setCompleted(false)
      setStep(quizQuestions.length - 1)
      setStatus('idle')
      return
    }

    if (step > 0) setStep((current) => current - 1)
  }

  function restart() {
    setAnswers({})
    setStep(0)
    setCompleted(false)
    setStatus('idle')
    quizStartedRef.current = false
    trackEvent('quiz_restarted')
  }

  return (
    <section
      className="section quiz-section"
      id="quiz"
      data-track-section="quiz"
      data-reveal
    >
      <div className="container quiz-panel">
        <div className="quiz-panel__heading">
          <span className="eyebrow">QUIZ DE IDENTIFICAÇÃO • 7 PERGUNTAS</span>
          <h2>Veja em 1 min se essa situação se parece com a sua</h2>
        </div>

        <div className="quiz-progress" aria-label={`Progresso do quiz: ${Math.round(progress)}%`}>
          <span style={{ width: `${progress}%` }} />
        </div>

        {!completed && currentQuestion ? (
          <div className="quiz-question" aria-live="polite">
            <span className="quiz-question__step">
              Pergunta {step + 1} de {quizQuestions.length}
            </span>
            <h3>{currentQuestion.question}</h3>

            <div className="quiz-binary" role="group" aria-label="Opções de resposta">
              <button
                type="button"
                className="quiz-binary__option quiz-binary__option--yes"
                onClick={() => answerQuestion('yes')}
              >
                <span className="quiz-binary__mark"><CheckIcon /></span>
                <span>{currentQuestion.yesLabel}</span>
              </button>
              <button
                type="button"
                className="quiz-binary__option"
                onClick={() => answerQuestion('no')}
              >
                <span className="quiz-binary__mark">×</span>
                <span>{currentQuestion.noLabel}</span>
              </button>
            </div>

            <div className="quiz-question__footer">
              {step > 0 ? (
                <button type="button" className="quiz-back" onClick={goBack}>
                  Voltar
                </button>
              ) : (
                <span />
              )}
              <span>Escolha uma opção para avançar</span>
            </div>
          </div>
        ) : (
          <div className="quiz-result quiz-result--compact" aria-live="polite">
            <span className="eyebrow">SEU RESULTADO</span>
            <h3>{result.title}</h3>
            <p>{result.text}</p>

            <div className="quiz-result__score">
              <strong>{score}</strong>
              <span>de 7 situações fizeram sentido para você</span>
            </div>

            <div className="quiz-result__actions">
              <button
                type="button"
                className="button button--primary"
                onClick={() => openCheckout('quiz-result')}
              >
                Quero usar essa referência — {siteConfig.price} <ArrowRightIcon />
              </button>
              <button type="button" className="quiz-restart" onClick={restart}>
                Refazer o quiz
              </button>
            </div>

            <small className={`quiz-save-status quiz-save-status--${status}`}>
              {status === 'sending' && 'Salvando sua resposta anônima…'}
              {status === 'success' && (isInternalTestMode() ? 'Modo teste: resposta não enviada ao formulário comercial.' : 'Resposta anônima registrada.')}
              {status === 'error' && 'Não foi possível registrar agora, mas isso não bloqueia seu acesso.'}
              {status === 'idle' && 'Resposta anônima.'}
            </small>
          </div>
        )}

        <div className="quiz-direct-access">
          <div>
            <strong>Já sabe que quer o material?</strong>
            <span>Você não precisa terminar o quiz para comprar.</span>
          </div>
          <button
            type="button"
            className="button button--secondary"
            onClick={() => openCheckout('quiz-direct')}
          >
            Prefiro ir direto ao Prato 10x <ArrowRightIcon />
          </button>
        </div>

        <p className="quiz-privacy">
          <LockIcon /> Respostas anônimas • não é diagnóstico • checkout seguro
        </p>
      </div>
    </section>
  )
}
