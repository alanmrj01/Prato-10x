import { useEffect, useState } from 'react'
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
import { initializeBehaviorTracking, openCheckout, trackEvent } from './analytics'
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
    title: 'Guia visual de refeições menores',
    copy: 'Uma referência visual para abrir no celular quando surgir a dúvida sobre o que priorizar no prato.',
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
    title: 'Plano de aplicação por 15 dias',
    copy: 'Um caminho simples para transformar conhecimento em rotina possível.',
    icon: CalendarIcon,
    art: 'calendar',
  },
]

const realLifeQuestions = [
  {
    title: 'O que deveria entrar primeiro?',
    copy: 'Quando a refeição precisa ser menor, a dúvida deixa de ser apenas quanto comer e passa a ser o que merece prioridade.',
    icon: QuestionIcon,
  },
  {
    title: 'Como montar algo simples sem escolher qualquer coisa?',
    copy: 'Nos dias corridos, uma referência pronta ajuda a reduzir decisões de última hora e o improviso.',
    icon: ClockIcon,
  },
  {
    title: 'Como saber se priorizei o que realmente importa?',
    copy: 'O Prato 10x organiza as escolhas em uma lógica visual que você pode consultar sempre que surgir essa dúvida.',
    icon: TargetIcon,
  },
]

const dailyUseSteps = [
  {
    number: '01',
    title: 'Abra a referência',
    copy: 'Consulte o guia quando surgir a dúvida sobre como organizar uma refeição menor.',
    icon: BookIcon,
  },
  {
    number: '02',
    title: 'Veja o que priorizar',
    copy: 'Use a matriz visual para orientar a escolha entre proteínas, vegetais e complementos.',
    icon: GridIcon,
  },
  {
    number: '03',
    title: 'Adapte ao que você tem',
    copy: 'Escolha combinações possíveis para a sua rotina, sem transformar cada refeição em um cálculo.',
    icon: BowlIcon,
  },
  {
    number: '04',
    title: 'Consulte novamente quando precisar',
    copy: 'A referência fica disponível no celular para reduzir o improviso nos próximos momentos.',
    icon: ClockIcon,
  },
]

const insideItems = [
  {
    kicker: 'MATRIZ',
    title: 'Matriz de refeições menores',
    copy: 'Uma visualização simples para consultar prioridades e combinações possíveis.',
    icon: GridIcon,
  },
  {
    kicker: 'MAPA',
    title: 'Mapa de opções práticas',
    copy: 'Alternativas organizadas para não depender de improviso quando estiver sem ideia.',
    icon: BagIcon,
  },
  {
    kicker: '15 DIAS',
    title: 'Plano de aplicação',
    copy: 'Um caminho curto para transformar a referência em uma rotina mais fácil de repetir.',
    icon: CalendarIcon,
  },
  {
    kicker: 'LISTA',
    title: 'Lista de compras editável',
    copy: 'Uma forma prática de deixar opções disponíveis antes que a correria decida por você.',
    icon: CheckIcon,
  },
]

const faqs = [
  {
    question: 'O Prato 10x é uma dieta?',
    answer: 'Não. É um material educacional de organização alimentar. Ele não prescreve quantidades, calorias ou um plano alimentar individualizado.',
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
  return (
    <figure className="hero-visual hero-visual--photo" aria-label="Cena real do Prato 10x sendo consultado durante uma refeição menor">
      <picture>
        <source
          srcSet="/prato10x-hero-mobile-720.webp 720w, /prato10x-hero-mobile-1200.webp 1149w"
          sizes="(max-width: 699px) 100vw, 56vw"
        />
        <img
          src="/prato10x-hero-mobile-1200.webp"
          alt="Mulher à mesa com uma refeição menor, tablet exibindo o aplicativo visual do Prato 10x e o livro Refeições Específicas e Menores"
          width="1149"
          height="1536"
          fetchPriority="high"
        />
      </picture>
    </figure>
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
      <strong>15</strong><span>dias</span>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  useReveal()

  useEffect(() => initializeBehaviorTracking(), [])

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
          <button id="cta-header" className="header-quiz" type="button" onClick={() => openCheckout('header')}>Quero conhecer o Prato 10x</button>
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
          <button type="button" onClick={() => { setMenuOpen(false); openCheckout('mobile-menu') }}>Quero acessar por R$ 47</button>
        </div>
      </header>

      <main>
        <section className="hero" id="top" data-track-section="hero">
          <div className="hero__shape hero__shape--sage" aria-hidden="true" />
          <div className="hero__shape hero__shape--peach" aria-hidden="true" />
          <div className="container hero__grid hero__grid--image-led">
            <HeroVisual />
            <div className="hero__copy hero__copy--offer" data-reveal>
              <h1 className="sr-only">Se você está comendo menos, saber o que merece espaço no prato se tornou ainda mais importante.</h1>
              <span className="hero__eyebrow">PRATO 10X • GUIA VISUAL • ACESSO IMEDIATO</span>
              <p className="hero__lead hero__lead--primary">Use o Prato 10x para consultar combinações, organizar refeições menores e parar de decidir tudo no improviso.</p>

              <div className="hero__tangible" aria-label="O que você recebe com o Prato 10x">
                <span><BookIcon /> Refeições específicas e menores</span>
                <span><GridIcon /> Matriz visual de refeições</span>
                <span><CalendarIcon /> Plano de 15 dias</span>
              </div>

              <div className="hero__offer" id="oferta" data-track-once="offer_view">
                <div className="hero__price" id="preco" data-track-once="price_view">
                  <strong>R$ 47</strong>
                  <span>pagamento único</span>
                </div>
                <div className="hero__offer-copy">
                  <strong>Acesso digital imediato</strong>
                  <span>Material visual para consultar no celular ou tablet</span>
                </div>
              </div>

              <button id="cta-hero" className="button button--primary hero__cta" type="button" onClick={() => openCheckout('hero')}>
                Quero ter essa referência comigo <ArrowRightIcon />
              </button>
              <p className="hero__micro"><LockIcon /> Acesso imediato • produto digital • checkout seguro</p>
            </div>
          </div>
        </section>

        <Quiz />

        <section className="section pain-section" id="problema" data-track-section="problema">
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

            <div className="learning-slice" data-track-once="content_preview_priority">
              <span className="eyebrow">UM DETALHE QUE MUDA A DECISÃO</span>
              <h3>Diminuir o prato não é a mesma coisa que saber o que priorizar.</h3>
              <p>Quando a única lógica é “comer menos”, é fácil começar perguntando <strong>“o que eu tiro?”</strong>. No Prato 10x, a ordem muda: primeiro você enxerga o papel das escolhas; depois adapta a combinação ao espaço que existe no prato.</p>
              <div className="learning-slice__contrast">
                <article>
                  <span>NO IMPROVISO</span>
                  <strong>“O que eu corto?”</strong>
                  <small>A decisão começa pela retirada, sem uma referência do conjunto.</small>
                </article>
                <article className="learning-slice__right">
                  <span>COM UMA REFERÊNCIA</span>
                  <strong>“O que merece prioridade?”</strong>
                  <small>A Matriz das 4 Funções ajuda a olhar para Construção, Energia, Cor e variedade e Complemento.</small>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section method-section" id="metodo" data-track-section="metodo">
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
            <button id="cta-metodo" className="button button--primary section-cta" type="button" onClick={() => openCheckout('method')}>
              Quero parar de decidir no improviso <ArrowRightIcon />
            </button>
          </div>
        </section>

        <section className="section product-section" id="produto" data-track-section="produto">
          <div className="container" data-reveal>
            <div className="section-heading">
              <span className="eyebrow">O QUE VOCÊ RECEBE</span>
              <h2>Materiais que você abre,<br />consulta e usa.</h2>
              <p>Em vez de uma ideia abstrata, você recebe referências visuais para consultar nos momentos em que a dúvida aparece.</p>
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

            <div className="showcase-mockup" aria-label="Prévia mais clara dos materiais do Prato 10x">
              <article className="showcase-card showcase-card--guide">
                <span className="showcase-card__eyebrow">GUIA VISUAL</span>
                <strong>PRATO <em>10X</em></strong>
                <p>Um guia prático para priorizar melhor proteínas, vegetais e complementos.</p>
              </article>

              <article className="showcase-card showcase-card--plate">
                <span className="showcase-card__eyebrow">PRIORIDADES NO PRATO</span>
                <div className="showcase-plate" aria-hidden="true">
                  <span className="showcase-plate__segment showcase-plate__segment--protein" />
                  <span className="showcase-plate__segment showcase-plate__segment--vegetable" />
                  <span className="showcase-plate__segment showcase-plate__segment--complement" />
                  <i className="showcase-plate__detail showcase-plate__detail--one" />
                  <i className="showcase-plate__detail showcase-plate__detail--two" />
                  <i className="showcase-plate__detail showcase-plate__detail--three" />
                </div>
                <div className="showcase-chips">
                  <span>Proteínas</span>
                  <span>Vegetais</span>
                  <span>Complementos</span>
                </div>
              </article>

              <article className="showcase-card showcase-card--plan">
                <span className="showcase-card__eyebrow">PLANO DE APLICAÇÃO</span>
                <strong>15 dias</strong>
                <ul>
                  <li>Mais direção nas escolhas</li>
                  <li>Menos improviso na rotina</li>
                  <li>Consulta rápida pelo celular</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section transformation-section" id="transformacao" data-track-section="transformacao">
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

        <section className="section use-cases-section" id="duvidas-praticas" data-track-section="duvidas_praticas">
          <div className="container" data-reveal>
            <div className="section-heading section-heading--center">
              <span className="eyebrow">NA PRÁTICA</span>
              <h2>As dúvidas aparecem justamente na hora de montar a refeição.</h2>
              <p>O Prato 10x foi pensado para ser consultado nesses momentos — quando você quer comer menos, mas não quer decidir tudo no improviso.</p>
            </div>

            <div className="use-cases-grid">
              {realLifeQuestions.map((item) => {
                const Icon = item.icon
                return (
                  <article className="use-case-card" key={item.title}>
                    <span className="use-case-card__icon"><Icon /></span>
                    <div>
                      <span className="use-case-card__question">“</span>
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </div>
                  </article>
                )
              })}
            </div>

            <p className="use-cases-note">Em vez de decorar mais regras, você passa a ter uma referência para consultar quando a dúvida aparece.</p>
          </div>
        </section>

        <section className="section reference-section" id="referencia" data-track-section="referencia">
          <div className="container reference-layout" data-reveal>
            <div className="section-heading">
              <span className="eyebrow">UMA REFERÊNCIA, NÃO MAIS REGRAS</span>
              <h2>Você não recebe uma nova lista de proibições.</h2>
              <p>A proposta é deixar a decisão mais clara e palpável, sem transformar o Prato 10x em uma dieta rígida ou em um cardápio fechado.</p>
            </div>

            <div className="reference-comparison">
              <article className="reference-card reference-card--no">
                <span className="reference-card__label">NÃO É</span>
                <ul>
                  <li><CloseIcon /> Dieta rígida</li>
                  <li><CloseIcon /> Cardápio fechado</li>
                  <li><CloseIcon /> Contagem complicada</li>
                  <li><CloseIcon /> Lista interminável de proibições</li>
                  <li><CloseIcon /> Substituto de acompanhamento profissional</li>
                </ul>
              </article>

              <article className="reference-card reference-card--yes">
                <span className="reference-card__label">É UMA REFERÊNCIA PARA</span>
                <ul>
                  <li><CheckIcon /> Visualizar prioridades</li>
                  <li><CheckIcon /> Consultar combinações possíveis</li>
                  <li><CheckIcon /> Organizar opções para dias diferentes</li>
                  <li><CheckIcon /> Reduzir decisões de última hora</li>
                  <li><CheckIcon /> Usar no celular sempre que precisar</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section routine-section" id="rotina" data-track-section="rotina">
          <div className="container" data-reveal>
            <div className="section-heading section-heading--center">
              <span className="eyebrow">COMO USAR NO DIA A DIA</span>
              <h2>Uma consulta rápida quando você precisa decidir.</h2>
              <p>O material foi organizado para ser usado de forma prática, sem exigir semanas de estudo antes de começar.</p>
            </div>

            <div className="routine-steps">
              {dailyUseSteps.map((step) => {
                const Icon = step.icon
                return (
                  <article className="routine-step" key={step.number}>
                    <span className="routine-step__number">{step.number}</span>
                    <span className="routine-step__icon"><Icon /></span>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </article>
                )
              })}
            </div>

            <div className="content-preview" data-track-once="content_preview_222">
              <div>
                <span className="eyebrow">UM EXEMPLO DE DENTRO DO PRATO 10X</span>
                <h3>O Sistema 2 + 2 + 2 reduz decisões antes da dúvida aparecer.</h3>
                <p>Em vez de inventar todas as refeições na hora, você separa poucas opções que já fazem sentido para a sua rotina e deixa essas referências prontas para consultar.</p>
              </div>
              <div className="content-preview__chips" aria-label="Exemplo do sistema 2 mais 2 mais 2">
                <span><b>2</b> cafés da manhã</span>
                <span><b>2</b> refeições rápidas</span>
                <span><b>2</b> lanches</span>
              </div>
              <small>É uma referência de organização, não um cardápio rígido ou uma prescrição individual.</small>
            </div>

            <div className="routine-callout">
              <LeafIcon />
              <p><strong>Não é um conteúdo para estudar durante semanas.</strong> É uma referência para consultar quando surgir a dúvida.</p>
            </div>
          </div>
        </section>

        <section className="section inside-section" id="conteudo" data-track-section="conteudo">
          <div className="container" data-reveal>
            <div className="section-heading">
              <span className="eyebrow">VEJA O QUE EXISTE DENTRO</span>
              <h2>Ferramentas que você consegue abrir, consultar e usar.</h2>
              <p>O conteúdo foi dividido em materiais objetivos para que a informação não fique apenas na teoria.</p>
            </div>

            <div className="inside-grid">
              {insideItems.map((item) => {
                const Icon = item.icon
                return (
                  <article className="inside-card" key={item.title}>
                    <div className="inside-card__top">
                      <span className="inside-card__icon"><Icon /></span>
                      <span className="inside-card__kicker">{item.kicker}</span>
                    </div>
                    <div className="inside-card__preview" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </article>
                )
              })}
            </div>

            <div className="inside-mobile-note">
              <span><CheckIcon /> Pensado também para consulta pelo celular</span>
              <p>Abra a referência quando precisar, sem depender de uma experiência feita apenas para desktop.</p>
            </div>
          </div>
        </section>

        <section className="section conversion-bridge-section" id="proximo-passo" data-track-section="proximo_passo">
          <div className="container" data-reveal>
            <div className="conversion-bridge">
              <span className="eyebrow">ACESSO DIRETO</span>
              <h2>Quer ter essa referência disponível nas próximas refeições?</h2>
              <p>Você pode ir direto ao checkout. O quiz no início da página serve para identificação e não é obrigatório para comprar.</p>
              <button id="cta-proximo-passo" className="button button--primary conversion-bridge__cta" type="button" onClick={() => openCheckout('long-form-bridge')}>
                Quero o Prato 10x no meu celular <ArrowRightIcon />
              </button>
              <small><LockIcon /> Pagamento único • checkout seguro • acesso digital</small>
            </div>
          </div>
        </section>


        <section className="section audience-section" id="para-quem" data-track-section="para_quem">
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

        <section className="section faq-section" id="faq" data-track-section="faq">
          <div className="container faq-layout" data-reveal>
            <div className="section-heading">
              <span className="eyebrow">DÚVIDAS FREQUENTES</span>
              <h2>Dúvidas antes de acessar.</h2>
              <button className="text-link" type="button" onClick={() => openCheckout('faq')}>Quero consultar o Prato 10x <ArrowRightIcon /></button>
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

        <section className="disclaimer" id="aviso-educacional" data-track-section="aviso_educacional">
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
