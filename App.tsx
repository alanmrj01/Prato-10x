import { useEffect, useRef, useState } from 'react'
import { Brand } from './Brand'
import {
  ArrowRightIcon,
  BagIcon,
  BookIcon,
  BowlIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  CloseIcon,
  GridIcon,
  LeafIcon,
  LockIcon,
  MenuIcon,
  QuestionIcon,
  ShieldIcon,
  TargetIcon,
} from './Icons'
import { Quiz } from './Quiz'
import { trackEvent } from './analytics'
import { useReveal } from './useReveal'
import './styles.css'

const methodSteps = [
  {
    number: '1',
    title: 'Priorize',
    copy: 'Saiba o que merece espaço primeiro quando a refeição precisa ser menor.',
    icon: TargetIcon,
  },
  {
    number: '2',
    title: 'Combine',
    copy: 'Monte refeições possíveis usando uma referência visual simples, sem depender de um cardápio rígido.',
    icon: BowlIcon,
  },
  {
    number: '3',
    title: 'Prepare',
    copy: 'Deixe opções práticas disponíveis antes que a falta de fome decida por você.',
    icon: GridIcon,
  },
]

const productItems = [
  {
    title: 'Guia visual Prato 10x',
    copy: 'Explicações simples para organizar melhor suas escolhas nos dias em que você está comendo menos.',
    icon: BookIcon,
    art: 'book',
  },
  {
    title: 'Matriz de refeições menores',
    copy: 'Referência visual para entender o que priorizar e como combinar possibilidades.',
    icon: GridIcon,
    art: 'matrix',
  },
  {
    title: 'Mapa de opções práticas',
    copy: 'Alternativas para reduzir decisões de última hora e manter opções versáteis disponíveis.',
    icon: BagIcon,
    art: 'map',
  },
  {
    title: 'Plano de aplicação por 30 dias',
    copy: 'Um caminho simples para transformar conhecimento em rotina possível.',
    icon: CalendarIcon,
    art: 'calendar',
  },
]

const faqs = [
  {
    question: 'O Prato 10x é uma dieta?',
    answer: 'Não. É um método educacional de organização alimentar. Ele não prescreve quantidades, calorias ou um plano alimentar individualizado.',
  },
  {
    question: 'Receberei receitas?',
    answer: 'O foco principal não é entregar um livro de receitas. O método ensina uma lógica visual para organizar combinações e opções possíveis no dia a dia.',
  },
  {
    question: 'O produto substitui o nutricionista?',
    answer: 'Não. O conteúdo complementa a organização do dia a dia, mas não substitui avaliação, prescrição ou acompanhamento profissional.',
  },
  {
    question: 'O material funciona no celular?',
    answer: 'Sim. Toda a experiência é pensada para leitura e utilização em dispositivos móveis.',
  },
  {
    question: 'O produto ensina como usar medicamentos?',
    answer: 'Não. O conteúdo não orienta escolha, dose, aplicação, combinação ou interrupção de medicamentos.',
  },
]

function scrollToQuiz(source: string) {
  trackEvent('cta_quiz_clicked', { button_location: source })
  document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function HeroVisual() {
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const visual = visualRef.current
    const finePointer = window.matchMedia('(pointer: fine)')

    if (!visual || !finePointer.matches) return

    let animationFrame = 0

    function applyPointerPosition(event: PointerEvent) {
      const bounds = visual!.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5

      cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(() => {
        visual!.classList.add('is-interacting')
        visual!.style.setProperty('--parallax-x', `${x * 12}px`)
        visual!.style.setProperty('--parallax-y', `${y * 10}px`)
        visual!.style.setProperty('--depth-x', `${x * -7}px`)
        visual!.style.setProperty('--depth-y', `${y * -6}px`)
        visual!.style.setProperty('--tilt-x', `${y * -1.6}deg`)
        visual!.style.setProperty('--tilt-y', `${x * 2.1}deg`)
        visual!.style.setProperty('--glow-x', `${50 + x * 24}%`)
        visual!.style.setProperty('--glow-y', `${46 + y * 20}%`)
      })
    }

    function reset() {
      cancelAnimationFrame(animationFrame)
      visual!.classList.remove('is-interacting')
      visual!.style.setProperty('--parallax-x', '0px')
      visual!.style.setProperty('--parallax-y', '0px')
      visual!.style.setProperty('--depth-x', '0px')
      visual!.style.setProperty('--depth-y', '0px')
      visual!.style.setProperty('--tilt-x', '0deg')
      visual!.style.setProperty('--tilt-y', '0deg')
      visual!.style.setProperty('--glow-x', '50%')
      visual!.style.setProperty('--glow-y', '46%')
    }

    visual.addEventListener('pointermove', applyPointerPosition)
    visual.addEventListener('pointerleave', reset)

    return () => {
      cancelAnimationFrame(animationFrame)
      visual.removeEventListener('pointermove', applyPointerPosition)
      visual.removeEventListener('pointerleave', reset)
    }
  }, [])

  return (
    <div ref={visualRef} className="hero-visual" aria-label="Prévia visual do Prato 10x">
      <span className="leaf leaf--one" aria-hidden="true"><LeafIcon /></span>
      <span className="leaf leaf--two" aria-hidden="true"><LeafIcon /></span>
      <div className="hero-visual__halo" />
      <img src="/prato10x-hero-mockup.webp" alt="Livro Prato 10x, celular com matriz de refeições e uma tigela de comida" width="901" height="685" fetchPriority="high" />
      <span className="hero-visual__badge hero-visual__badge--one">Priorize</span>
      <span className="hero-visual__badge hero-visual__badge--two">Combine</span>
      <span className="hero-visual__badge hero-visual__badge--three">Prepare</span>
    </div>
  )
}

function ProductArt({ type }: { type: string }) {
  if (type === 'book') {
    return (
      <div className="product-art product-art--book" aria-hidden="true">
        <b>PRATO</b><strong>10X</strong><small>Guia visual</small>
      </div>
    )
  }

  if (type === 'matrix') {
    return (
      <div className="product-art product-art--matrix" aria-hidden="true">
        <svg viewBox="0 0 112 92" role="presentation">
          <rect x="5" y="7" width="102" height="78" rx="9" className="product-art__paper" />
          <path d="M14 25h84M14 43h84M14 61h84M35 16v60M57 16v60M79 16v60" className="product-art__grid" />
          <circle cx="24" cy="34" r="6" className="product-art__food product-art__food--green" />
          <circle cx="46" cy="52" r="6" className="product-art__food product-art__food--peach" />
          <circle cx="68" cy="34" r="6" className="product-art__food product-art__food--gold" />
          <circle cx="90" cy="70" r="6" className="product-art__food product-art__food--green" />
          <path d="m21 34 2 2 4-5M43 52l2 2 4-5M65 34l2 2 4-5M87 70l2 2 4-5" className="product-art__check" />
        </svg>
      </div>
    )
  }

  if (type === 'map') {
    return (
      <div className="product-art product-art--map" aria-hidden="true">
        <svg viewBox="0 0 112 92" role="presentation">
          <rect x="5" y="7" width="102" height="78" rx="9" className="product-art__paper" />
          <path d="M16 23h80" className="product-art__grid" />
          <rect x="15" y="30" width="24" height="18" rx="6" className="product-art__tile" />
          <rect x="44" y="30" width="24" height="18" rx="6" className="product-art__tile" />
          <rect x="73" y="30" width="24" height="18" rx="6" className="product-art__tile" />
          <rect x="15" y="55" width="24" height="18" rx="6" className="product-art__tile" />
          <rect x="44" y="55" width="24" height="18" rx="6" className="product-art__tile" />
          <rect x="73" y="55" width="24" height="18" rx="6" className="product-art__tile" />
          <circle cx="27" cy="39" r="5" className="product-art__food product-art__food--green" />
          <circle cx="56" cy="39" r="5" className="product-art__food product-art__food--gold" />
          <circle cx="85" cy="39" r="5" className="product-art__food product-art__food--peach" />
          <circle cx="27" cy="64" r="5" className="product-art__food product-art__food--gold" />
          <circle cx="56" cy="64" r="5" className="product-art__food product-art__food--green" />
          <circle cx="85" cy="64" r="5" className="product-art__food product-art__food--peach" />
        </svg>
      </div>
    )
  }

  return (
    <div className="product-art product-art--calendar" aria-hidden="true">
      <strong>30</strong><span>dias</span>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  useReveal()

  useEffect(() => {
    function updateHeaderState() {
      setScrolled(window.scrollY > 18)
    }

    updateHeaderState()
    window.addEventListener('scroll', updateHeaderState, { passive: true })
    return () => window.removeEventListener('scroll', updateHeaderState)
  }, [])

  useEffect(() => {
    const sectionIds = ['top', 'problema', 'metodo', 'produto', 'quiz']
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: [0, 0.15, 0.35, 0.6] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    function closeMenuOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeMenuOnEscape)
    return () => window.removeEventListener('keydown', closeMenuOnEscape)
  }, [])

  function navigateTo(id: string) {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="site-shell">
      <header className={`topbar${scrolled ? ' topbar--scrolled' : ''}`}>
        <div className="container topbar__inner">
          <a href="#top" className="brand-link" aria-label="Prato 10x — início"><Brand /></a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <button className={activeSection === 'problema' ? 'is-active' : undefined} aria-current={activeSection === 'problema' ? 'location' : undefined} type="button" onClick={() => navigateTo('problema')}>O problema</button>
            <button className={activeSection === 'metodo' ? 'is-active' : undefined} aria-current={activeSection === 'metodo' ? 'location' : undefined} type="button" onClick={() => navigateTo('metodo')}>Como funciona</button>
            <button className={activeSection === 'produto' ? 'is-active' : undefined} aria-current={activeSection === 'produto' ? 'location' : undefined} type="button" onClick={() => navigateTo('produto')}>O que você recebe</button>
            <button className={activeSection === 'quiz' ? 'is-active' : undefined} aria-current={activeSection === 'quiz' ? 'location' : undefined} type="button" onClick={() => scrollToQuiz('header-nav')}>Quiz</button>
          </nav>
          <button className="header-quiz" type="button" onClick={() => scrollToQuiz('header')}>Ver o que priorizar</button>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        <div id="mobile-navigation" className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}>
          <button type="button" onClick={() => navigateTo('problema')}>O problema</button>
          <button type="button" onClick={() => navigateTo('metodo')}>Como funciona</button>
          <button type="button" onClick={() => navigateTo('produto')}>O que você recebe</button>
          <button type="button" onClick={() => { setMenuOpen(false); scrollToQuiz('mobile-menu') }}>Quero saber o que priorizar</button>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero__shape hero__shape--sage" aria-hidden="true" />
          <div className="hero__shape hero__shape--peach" aria-hidden="true" />
          <div className="container hero__grid">
            <div className="hero__copy" data-reveal>
              <span className="hero__eyebrow">PARA QUEM ESTÁ COMENDO MENOS</span>
              <h1>
                <span>Se você está comendo menos para cuidar do peso,</span>
                <em>você precisa saber</em>
                <span>o que merece prioridade no seu prato.</span>
              </h1>
              <p className="hero__lead">O Prato 10x é um guia visual para mostrar o que priorizar em refeições menores, com mais equilíbrio, saciedade e direção — sem simplesmente cortar tudo.</p>
              <div className="hero__quickfacts" aria-label="O que você recebe com o Prato 10x">
                <span><CheckIcon /> Guia visual</span>
                <span><GridIcon /> Matriz de refeições</span>
                <span><BagIcon /> Lista prática</span>
                <span><ClockIcon /> Acesso imediato</span>
              </div>
              <button className="button button--primary hero__cta" type="button" onClick={() => scrollToQuiz('hero')}>
                Quero saber o que priorizar <ArrowRightIcon />
              </button>
              <p className="hero__micro"><LockIcon /> 1 pergunta • depois você segue para o acesso ao Prato 10x</p>
            </div>
            <HeroVisual />
          </div>
        </section>

        <section className="section pain-section" id="problema">
          <div className="container pain-layout" data-reveal>
            <div className="section-heading section-heading--center">
              <span className="eyebrow">O DESAFIO COMEÇA QUANDO VOCÊ PASSA A COMER MENOS</span>
              <h2>Quando a quantidade diminui, cada escolha precisa ter mais intenção.</h2>
            </div>
            <div className="pain-copy">
              <p>Quando você passa a comer menos para cuidar do peso, é fácil acreditar que basta reduzir o prato. Mas cortar por cortar pode deixar a refeição sem direção e tornar cada escolha uma nova dúvida.</p>
              <div className="pain-callout"><LeafIcon /><p><strong>O problema não é simplesmente comer menos.</strong> É não saber o que merece prioridade quando existe menos espaço no prato.</p></div>
            </div>
            <div className="pain-flow" aria-label="Fluxo do improviso alimentar">
              <article><span className="pain-flow__icon"><ClockIcon /></span><strong>Reduzo o prato sem uma referência.</strong></article>
              <span className="pain-flow__arrow">→</span>
              <article><span className="pain-flow__icon pain-flow__icon--peach"><BowlIcon /></span><strong>Corto ou improviso por tentativa e erro.</strong></article>
              <span className="pain-flow__arrow">→</span>
              <article><span className="pain-flow__icon"><QuestionIcon /></span><strong>Continuo sem saber se priorizei o que importava.</strong></article>
            </div>
          </div>
        </section>

        <section className="section method-section" id="metodo">
          <div className="container" data-reveal>
            <div className="section-heading section-heading--center">
              <span className="eyebrow">COMO O PRATO 10X AJUDA</span>
              <h2>Três passos para organizar refeições menores com <em>mais direção.</em></h2>
            </div>
            <div className="method-grid">
              {methodSteps.map((step) => {
                const Icon = step.icon
                return (
                  <article className="method-card" key={step.title}>
                    <div className="method-card__visual">
                      <span>{step.number}</span>
                      <Icon />
                    </div>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.copy}</p>
                    </div>
                  </article>
                )
              })}
            </div>
            <blockquote className="method-quote">Você não precisa transformar cada refeição em uma lista de regras. Precisa de uma referência clara para saber o que priorizar quando decide comer menos.</blockquote>
            <button className="button button--primary section-cta" type="button" onClick={() => scrollToQuiz('method')}>
              Quero saber o que priorizar <ArrowRightIcon />
            </button>
          </div>
        </section>

        <section className="section product-section" id="produto">
          <div className="container" data-reveal>
            <div className="section-heading">
              <span className="eyebrow">O QUE VOCÊ RECEBE</span>
              <h2>Um método claro.<br />Um produto prático.</h2>
              <p>O Prato 10x transforma uma dificuldade abstrata em decisões simples para o dia a dia.</p>
            </div>

            <div className="product-list">
              {productItems.map((item) => {
                const Icon = item.icon
                return (
                  <article className="product-item" key={item.title}>
                    <span className="product-item__icon"><Icon /></span>
                    <div className="product-item__copy"><h3>{item.title}</h3><p>{item.copy}</p></div>
                    <ProductArt type={item.art} />
                  </article>
                )
              })}
            </div>

            <div className="extras-card">
              <h3>Você também recebe:</h3>
              <div className="extras-grid">
                <span><BagIcon /> Lista de compras editável</span>
                <span><CalendarIcon /> Organizador semanal</span>
                <span><CheckIcon /> Plano para dias corridos</span>
                <span><BowlIcon /> Perguntas para levar ao nutricionista</span>
                <span><GridIcon /> Versão para celular</span>
                <span><BookIcon /> Versão em PDF</span>
              </div>
            </div>

            <div className="showcase-mockup" aria-label="Prévia dos materiais do Prato 10x">
              <div className="showcase-phone"><span>PRATO</span><strong>10X</strong><small>Matriz de refeições</small></div>
              <div className="showcase-book"><span>MAPA DE OPÇÕES PRÁTICAS</span><div className="mini-grid">{Array.from({ length: 12 }).map((_, index) => <i key={index} />)}</div></div>
              <div className="showcase-planner"><span>PLANO DE APLICAÇÃO</span><strong>30 DIAS</strong></div>
            </div>
          </div>
        </section>

        <section className="section transformation-section">
          <div className="container" data-reveal>
            <div className="section-heading section-heading--center">
              <span className="eyebrow">DA IMPROVISAÇÃO PARA A CLAREZA</span>
              <h2>Menos improviso.<br />Mais clareza em cada refeição.</h2>
            </div>
            <div className="transformation-grid">
              <article className="comparison comparison--before">
                <span className="comparison__label">ANTES</span>
                <ul>
                  <li>Reduzir o prato sem uma referência</li>
                  <li>Cortar alimentos por tentativa e erro</li>
                  <li>Improvisar quando surge a dúvida</li>
                  <li>Escolher apenas o mais fácil</li>
                  <li>Não saber o que priorizar</li>
                </ul>
                <div className="comparison__bowl comparison__bowl--plain" aria-hidden="true" />
              </article>
              <article className="comparison comparison--after">
                <span className="comparison__label">DEPOIS</span>
                <ul>
                  <li>Conhecer suas prioridades</li>
                  <li>Ter combinações como referência</li>
                  <li>Manter opções disponíveis</li>
                  <li>Tomar decisões com menos esforço</li>
                  <li>Adaptar as refeições à quantidade possível</li>
                </ul>
                <div className="comparison__bowl comparison__bowl--colorful" aria-hidden="true" />
              </article>
            </div>
            <p className="transformation-note">Não é sobre esvaziar o prato. É sobre saber o que merece espaço quando você decide comer menos.</p>
          </div>
        </section>

        <Quiz />

        <section className="section audience-section">
          <div className="container audience-layout" data-reveal>
            <article className="audience-card">
              <span className="eyebrow">PARA QUEM É</span>
              <h2>O Prato 10x pode fazer sentido quando...</h2>
              <ul>
                <li><CheckIcon /> Você está comendo menos e ainda não sabe como reorganizar o prato.</li>
                <li><CheckIcon /> Você quer cuidar do peso sem transformar a alimentação em uma lista de cortes.</li>
                <li><CheckIcon /> Suas escolhas ficaram repetitivas.</li>
                <li><CheckIcon /> Falta clareza sobre o que priorizar.</li>
                <li><CheckIcon /> Você depende do improviso.</li>
                <li><CheckIcon /> Você procura uma referência prática.</li>
              </ul>
            </article>
            <article className="audience-card audience-card--warning">
              <span className="eyebrow">PARA QUEM NÃO É</span>
              <h2>O Prato 10x não substitui acompanhamento profissional.</h2>
              <p>Não é indicado para quem procura prescrição alimentar, diagnóstico, tratamento de sintomas, indicação de medicamentos, orientação sobre dose ou plano alimentar individualizado.</p>
              <ShieldIcon />
            </article>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-layout" data-reveal>
            <div className="section-heading">
              <span className="eyebrow">DÚVIDAS FREQUENTES</span>
              <h2>Antes de fazer o quiz.</h2>
              <button className="text-link" type="button" onClick={() => scrollToQuiz('faq')}>Quero saber o que priorizar <ArrowRightIcon /></button>
            </div>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}<span>+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="disclaimer">
          <div className="container disclaimer__inner">
            <BookIcon />
            <div><strong>Material educativo</strong><p>O Prato 10x é um produto educacional de organização da rotina alimentar. Não substitui diagnóstico, consulta, prescrição ou acompanhamento médico e nutricional.</p></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <Brand />
          <nav aria-label="Links legais">
            <a href="/privacidade.html">Política de Privacidade</a>
            <a href="/termos.html">Termos de Uso</a>
            <a href="mailto:contato@seudominio.com.br">Contato</a>
          </nav>
          <span>© {new Date().getFullYear()} Prato 10x. Todos os direitos reservados.</span>
        </div>
      </footer>
    </div>
  )
}
