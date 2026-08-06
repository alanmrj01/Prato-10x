:root {
  color-scheme: light;
  --cream: #f7f2e9;
  --paper: #fffdf8;
  --paper-soft: #fbf7ef;
  --ink: #0d2820;
  --deep: #174829;
  --green: #416d2f;
  --olive: #8ea257;
  --sage: #dfe5cf;
  --sage-strong: #c8d2aa;
  --peach: #f4c7a9;
  --peach-soft: #fbe7d8;
  --gold: #c7963a;
  --muted: #5f6a64;
  --line: rgba(28, 70, 42, .13);
  --shadow: 0 24px 60px rgba(34, 55, 41, .12);
  --shadow-soft: 0 14px 36px rgba(34, 55, 41, .08);
  --radius-xl: 32px;
  --radius-lg: 24px;
  --radius-md: 18px;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: var(--ink);
  background: var(--cream);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* { box-sizing: border-box; }

/*
 * Contenção horizontal global.
 * Evita que formas decorativas, sombras e elementos transformados criem
 * rolagem lateral em navegadores mobile, inclusive versões do Safari que
 * ainda não aplicam `overflow: clip` de forma consistente.
 */
html {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
  background: var(--cream);
}

body {
  width: 100%;
  max-width: 100%;
  min-width: 320px;
  margin: 0;
  overflow-x: hidden;
  background: var(--cream);
  color: var(--ink);
}

#root,
.site-shell {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow-x: hidden;
}

@supports (overflow: clip) {
  html,
  body,
  #root,
  .site-shell {
    overflow-x: clip;
  }
}

button, a, input { font: inherit; }
button { color: inherit; }
a { color: inherit; }
img { max-width: 100%; display: block; }
svg { display: block; }
.container { width: min(100% - 32px, 1160px); min-width: 0; margin-inline: auto; }

.hero__grid > *,
.method-card > *,
.product-item > *,
.quiz-choice > *,
.audience-layout > *,
.faq-layout > *,
.footer__inner > * {
  min-width: 0;
}
.section { position: relative; padding: 86px 0; }

[data-reveal] { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
[data-reveal].is-visible { opacity: 1; transform: translateY(0); }

.eyebrow { display: inline-block; color: var(--green); font-size: .72rem; font-weight: 850; letter-spacing: .18em; text-transform: uppercase; }
.section-heading { max-width: 760px; margin-bottom: 38px; }
.section-heading--center { text-align: center; margin-inline: auto; }
.section-heading h2 { margin: 16px 0 12px; font-family: Georgia, "Times New Roman", serif; font-weight: 500; font-size: clamp(2.65rem, 11vw, 4.7rem); line-height: .99; letter-spacing: -.045em; }
.section-heading h2 em { color: var(--green); font-weight: 500; }
.section-heading p { margin: 0; color: var(--muted); font-size: 1rem; line-height: 1.72; }

.button { min-height: 54px; border: 0; border-radius: 18px; padding: 15px 22px; display: inline-flex; align-items: center; justify-content: center; gap: 10px; text-decoration: none; font-weight: 800; cursor: pointer; transition: transform .25s ease, box-shadow .25s ease, background .25s ease, opacity .2s ease; }
.button svg { width: 20px; }
.button--primary { color: #fff; background: linear-gradient(135deg, #2f6a2a, #4f7d36); box-shadow: 0 16px 34px rgba(44, 91, 41, .24); }
.button--primary:hover { transform: translateY(-3px); box-shadow: 0 22px 42px rgba(44, 91, 41, .28); }
.button--primary:active { transform: translateY(0) scale(.985); }
.button:disabled { opacity: .48; cursor: not-allowed; box-shadow: none; transform: none; }

.brand-link { text-decoration: none; }
.brand { display: inline-flex; align-items: center; gap: 11px; }
.brand__symbol { width: 42px; height: 42px; border-radius: 50% 50% 46% 46%; display: grid; place-items: center; color: var(--deep); background: linear-gradient(145deg, var(--sage), #eef1df); }
.brand__symbol svg { width: 26px; }
.brand__copy { display: grid; gap: 2px; }
.brand__name { font-size: 1.45rem; font-weight: 900; letter-spacing: -.04em; }
.brand__name em { font-style: normal; color: var(--olive); }
.brand__copy small { font-size: .6rem; color: var(--muted); letter-spacing: .01em; }
.brand--compact .brand__copy small { display: none; }

.topbar { position: fixed; inset: 0 0 auto; z-index: 100; background: rgba(247, 242, 233, .9); border-bottom: 1px solid rgba(28,70,42,.07); backdrop-filter: blur(18px); }
.topbar__inner { min-height: 72px; display: flex; align-items: center; gap: 18px; }
.desktop-nav { display: none; margin-left: auto; gap: 26px; }
.desktop-nav button { border: 0; background: transparent; color: var(--ink); cursor: pointer; font-weight: 700; font-size: .82rem; }
.desktop-nav button:hover { color: var(--green); }
.header-quiz { display: none; border: 0; border-radius: 14px; padding: 11px 17px; background: var(--green); color: white; font-weight: 800; cursor: pointer; }
.menu-toggle { margin-left: auto; width: 44px; height: 44px; border: 0; border-radius: 15px; display: grid; place-items: center; background: transparent; color: var(--deep); cursor: pointer; }
.menu-toggle:hover { background: rgba(65,109,47,.08); }
.mobile-menu { display: grid; max-height: 0; overflow: hidden; padding: 0 16px; transition: max-height .3s ease, padding .3s ease; background: var(--paper); }
.mobile-menu--open { max-height: 300px; padding: 10px 16px 18px; border-top: 1px solid var(--line); }
.mobile-menu button { min-height: 46px; text-align: left; border: 0; background: transparent; border-bottom: 1px solid var(--line); font-weight: 750; cursor: pointer; }

.hero { position: relative; min-height: 100svh; padding: 118px 0 42px; overflow: hidden; background: linear-gradient(180deg, #fbf7f0 0%, #f7f2e9 100%); }
.hero__grid { position: relative; z-index: 2; display: grid; gap: 32px; }
.hero__copy { max-width: 650px; }
.hero h1 { margin: 18px 0 22px; font-family: Georgia, "Times New Roman", serif; font-weight: 500; font-size: clamp(3.9rem, 17.5vw, 6.8rem); line-height: .91; letter-spacing: -.065em; }
.hero h1 em { display: block; color: var(--green); font-weight: 500; }
.hero__lead { margin: 0; font-size: 1.12rem; line-height: 1.6; color: #263a31; }
.hero__format { margin: 22px 0; display: flex; align-items: center; gap: 10px; color: var(--deep); font-weight: 800; }
.hero__format svg { width: 22px; color: var(--green); }
.hero__cta { width: 100%; }
.hero__micro { margin: 12px 0 0; display: flex; align-items: center; justify-content: center; gap: 8px; color: var(--muted); font-size: .82rem; }
.hero__micro svg { width: 17px; color: var(--green); }
.hero__shape { position: absolute; border-radius: 48% 52% 0 0; pointer-events: none; }
.hero__shape--sage { width: 430px; height: 360px; right: -170px; bottom: -120px; background: rgba(142,162,87,.4); rotate: -12deg; }
.hero__shape--peach { width: 430px; height: 310px; left: -220px; bottom: -150px; background: rgba(244,199,169,.64); rotate: 14deg; }

.hero-visual { --tilt-x: 0deg; --tilt-y: 0deg; position: relative; min-height: 420px; display: grid; place-items: center; perspective: 1200px; transform-style: preserve-3d; }
.hero-visual__halo { position: absolute; width: min(88vw, 520px); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, rgba(199,210,171,.8) 0%, rgba(199,210,171,.32) 48%, transparent 70%); filter: blur(4px); }
.hero-visual img { position: relative; z-index: 2; display: block; width: min(112%, 620px); max-width: 100%; height: auto !important; aspect-ratio: 901 / 685; object-fit: contain; border-radius: 28px; box-shadow: 0 34px 70px rgba(42, 63, 47, .18); transform: rotateX(var(--tilt-x)) rotateY(var(--tilt-y)); transition: transform .18s ease-out; }
.hero-visual__badge { position: absolute; z-index: 3; padding: 10px 14px; border-radius: 999px; background: rgba(255,253,248,.9); border: 1px solid rgba(28,70,42,.11); box-shadow: var(--shadow-soft); color: var(--deep); font-size: .7rem; font-weight: 850; backdrop-filter: blur(8px); }
.hero-visual__badge--one { top: 18%; left: -4px; }
.hero-visual__badge--two { top: 8%; right: 0; }
.hero-visual__badge--three { bottom: 8%; left: 3%; }
.leaf { position: absolute; z-index: 1; color: rgba(65,109,47,.42); }
.leaf svg { width: 120px; height: 120px; stroke-width: .8; }
.leaf--one { top: 6%; right: -16px; rotate: -25deg; }
.leaf--two { bottom: 2%; left: -22px; rotate: 155deg; }

.pain-section { background: var(--paper); }
.pain-layout { display: grid; gap: 28px; }
.pain-copy { max-width: 760px; margin-inline: auto; display: grid; gap: 22px; }
.pain-copy > p { margin: 0; color: #273b32; line-height: 1.75; font-size: 1.04rem; text-align: center; }
.pain-callout { padding: 22px; border-radius: var(--radius-lg); display: grid; grid-template-columns: auto 1fr; gap: 16px; align-items: start; background: linear-gradient(135deg, #f7f1e5, #f1f0e3); border: 1px solid var(--line); }
.pain-callout > svg { width: 34px; color: var(--gold); }
.pain-callout p { margin: 0; line-height: 1.65; }
.pain-callout strong { display: block; color: var(--deep); margin-bottom: 4px; }
.pain-flow { display: grid; grid-template-columns: 1fr; gap: 14px; margin-top: 6px; }
.pain-flow article { min-height: 150px; display: grid; place-items: center; align-content: center; gap: 14px; padding: 22px; text-align: center; border-radius: 24px; background: #fffaf4; border: 1px solid var(--line); box-shadow: var(--shadow-soft); }
.pain-flow__icon { width: 76px; height: 76px; border-radius: 50%; display: grid; place-items: center; color: var(--green); background: var(--sage); }
.pain-flow__icon--peach { background: var(--peach-soft); }
.pain-flow__icon svg { width: 34px; }
.pain-flow__arrow { display: none; color: var(--gold); font-size: 2rem; }
.pain-flow strong { font-family: Georgia, serif; font-size: 1.16rem; font-weight: 500; line-height: 1.35; }

.method-section { background: linear-gradient(180deg, #f7f2e9 0%, #fdfaf4 100%); }
.method-grid { display: grid; gap: 16px; }
.method-card { padding: 24px; display: grid; grid-template-columns: 95px 1fr; gap: 22px; align-items: center; border-radius: var(--radius-lg); background: var(--paper); border: 1px solid var(--line); box-shadow: var(--shadow-soft); transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease; }
.method-card:hover { transform: translateY(-5px); box-shadow: var(--shadow); border-color: rgba(65,109,47,.3); }
.method-card__visual { position: relative; width: 88px; height: 88px; border-radius: 24px; display: grid; place-items: center; background: linear-gradient(145deg, #f8f3e9, #eeeadc); color: var(--green); }
.method-card__visual span { position: absolute; top: -10px; left: -10px; width: 36px; height: 36px; display: grid; place-items: center; border-radius: 50%; background: var(--green); color: white; font-weight: 900; }
.method-card__visual svg { width: 42px; height: 42px; color: var(--gold); }
.method-card h3 { margin: 0 0 8px; font-family: Georgia, serif; font-size: 2rem; font-weight: 500; }
.method-card p { margin: 0; color: var(--muted); line-height: 1.6; font-size: .95rem; }
.method-quote { margin: 26px auto; max-width: 850px; padding: 24px 25px 24px 48px; border: 1px solid rgba(199,150,58,.24); border-radius: var(--radius-lg); background: linear-gradient(135deg, #fbf3e6, #fffaf3); font-family: Georgia, serif; font-size: 1.35rem; line-height: 1.5; position: relative; }
.method-quote::before { content: '“'; position: absolute; left: 18px; top: 6px; color: var(--gold); font-size: 3rem; }
.section-cta { width: 100%; }

.product-section { background: #fffdfa; }
.product-list { display: grid; gap: 14px; }
.product-item { min-height: 148px; padding: 20px; display: grid; grid-template-columns: 58px 1fr 94px; gap: 16px; align-items: center; border: 1px solid var(--line); border-radius: 22px; background: linear-gradient(135deg, #fffdf9, #fbf7f0); transition: transform .25s ease, box-shadow .25s ease; }
.product-item:hover { transform: translateY(-4px); box-shadow: var(--shadow-soft); }
.product-item__icon { width: 56px; height: 56px; display: grid; place-items: center; border-radius: 18px; background: #efeee0; color: var(--green); }
.product-item__copy h3 { margin: 0 0 7px; font-family: Georgia, serif; font-size: 1.27rem; font-weight: 600; }
.product-item__copy p { margin: 0; color: var(--muted); line-height: 1.55; font-size: .84rem; }
.product-art { justify-self: end; width: 82px; min-height: 94px; border-radius: 10px; display: grid; place-items: center; align-content: center; gap: 2px; color: var(--deep); background: #f2eadc; box-shadow: 0 12px 24px rgba(41,61,46,.12); }
.product-art--book { transform: rotate(-3deg); }
.product-art--book b { font-size: .74rem; }
.product-art--book strong { color: var(--olive); font-size: 1.9rem; line-height: .9; }
.product-art--book small { font-size: .52rem; }
.product-art--matrix, .product-art--map { padding: 6px; background: #f4f1e4; overflow: hidden; }
.product-art--matrix svg, .product-art--map svg { width: 100%; height: auto; filter: drop-shadow(0 4px 8px rgba(41,61,46,.08)); }
.product-art__paper { fill: #fffdf8; stroke: rgba(28,70,42,.18); stroke-width: 1.4; }
.product-art__grid { fill: none; stroke: rgba(65,109,47,.35); stroke-width: 1.3; stroke-linecap: round; }
.product-art__tile { fill: #f8f3e9; stroke: rgba(65,109,47,.18); stroke-width: 1; }
.product-art__food--green { fill: #6e9a4e; }
.product-art__food--peach { fill: #e49b67; }
.product-art__food--gold { fill: #d4a64d; }
.product-art__check { fill: none; stroke: #fff; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.product-art--calendar strong { font-family: Georgia, serif; font-size: 2.2rem; color: var(--green); }
.product-art--calendar span { font-size: .7rem; font-weight: 800; }
.extras-card { margin-top: 18px; padding: 24px; border-radius: var(--radius-lg); background: #f7f3ea; border: 1px solid var(--line); }
.extras-card h3 { margin: 0 0 18px; font-family: Georgia, serif; font-size: 1.4rem; }
.extras-grid { display: grid; gap: 12px; }
.extras-grid span { min-height: 44px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--line); padding-bottom: 10px; font-size: .88rem; }
.extras-grid span:last-child { border-bottom: 0; }
.extras-grid svg { width: 21px; color: var(--green); }
.showcase-mockup { position: relative; min-height: 360px; margin-top: 30px; display: flex; align-items: end; justify-content: center; gap: 8px; padding: 38px 12px 0; border-radius: var(--radius-xl); background: linear-gradient(160deg, var(--peach-soft), var(--sage)); overflow: hidden; }
.showcase-mockup::before { content: ''; position: absolute; inset: auto -90px -120px auto; width: 300px; height: 300px; border-radius: 50%; background: rgba(255,255,255,.5); }
.showcase-phone { position: relative; z-index: 3; width: 105px; height: 245px; border: 6px solid #1d211f; border-radius: 25px; background: var(--paper); box-shadow: 0 18px 38px rgba(33,54,40,.22); display: grid; align-content: center; justify-items: center; transform: rotate(-5deg); }
.showcase-phone span { font-size: .9rem; font-weight: 900; }
.showcase-phone strong { color: var(--olive); font-size: 2.5rem; }
.showcase-phone small { margin-top: 24px; color: var(--muted); font-size: .55rem; }
.showcase-book { position: relative; z-index: 2; width: 175px; height: 240px; padding: 18px; border-radius: 8px 14px 14px 8px; background: var(--paper); box-shadow: 0 18px 38px rgba(33,54,40,.18); transform: rotate(2deg); }
.showcase-book > span { font-size: .62rem; font-weight: 900; color: var(--green); }
.mini-grid { margin-top: 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.mini-grid i { aspect-ratio: 1; border-radius: 50%; background: linear-gradient(135deg, #7d9b4d, #e9a46f); }
.showcase-planner { position: absolute; z-index: 1; right: 14px; top: 22px; width: 132px; height: 175px; padding: 18px; border-radius: 7px 12px 12px 7px; background: #f5e6d4; transform: rotate(9deg); box-shadow: 0 16px 34px rgba(33,54,40,.14); }
.showcase-planner span { font-size: .55rem; font-weight: 850; }
.showcase-planner strong { display: block; margin-top: 50px; color: var(--green); font-family: Georgia, serif; font-size: 1.55rem; }

.transformation-section { background: linear-gradient(180deg, #f9f5ee, #fffdfa); }
.transformation-grid { display: grid; gap: 16px; }
.comparison { min-height: 330px; position: relative; overflow: hidden; padding: 26px; border-radius: var(--radius-lg); border: 1px solid var(--line); }
.comparison--before { background: linear-gradient(135deg, #fbebe0, #fff8f2); }
.comparison--after { background: linear-gradient(135deg, #eff3e4, #fbfcf6); }
.comparison__label { display: inline-flex; padding: 7px 12px; border-radius: 999px; font-size: .72rem; font-weight: 900; letter-spacing: .08em; }
.comparison--before .comparison__label { background: #d7683d; color: white; }
.comparison--after .comparison__label { background: var(--green); color: white; }
.comparison ul { position: relative; z-index: 2; list-style: none; padding: 0; margin: 23px 0 0; display: grid; gap: 14px; max-width: 70%; }
.comparison li { position: relative; padding-left: 25px; line-height: 1.45; }
.comparison li::before { position: absolute; left: 0; font-weight: 900; }
.comparison--before li::before { content: '×'; color: #d7683d; }
.comparison--after li::before { content: '✓'; color: var(--green); }
.comparison__bowl { position: absolute; width: 190px; height: 190px; right: -58px; bottom: -45px; border-radius: 50%; background: #e9dfd2; box-shadow: inset 0 -20px 35px rgba(112,91,65,.2), 0 18px 34px rgba(56,61,50,.13); }
.comparison__bowl::before { content: ''; position: absolute; inset: 22px; border-radius: 50%; }
.comparison__bowl--plain::before { background: repeating-linear-gradient(12deg, #d8c49d 0 8px, #ead8b9 8px 14px); }
.comparison__bowl--colorful::before { background: conic-gradient(#6f9b45 0 24%, #d9813e 24% 47%, #dcc068 47% 69%, #7cad62 69% 100%); }
.transformation-note { margin: 22px auto 0; max-width: 740px; padding: 22px; border-radius: 20px; text-align: center; font-family: Georgia, serif; font-size: 1.3rem; line-height: 1.45; background: var(--paper); border: 1px solid var(--line); }

.quiz-section { background: #fffdfa; }
.quiz-panel { max-width: 860px; padding: 30px 20px; border-radius: var(--radius-xl); background: linear-gradient(145deg, #fffdf8, #fbf7ef); border: 1px solid var(--line); box-shadow: var(--shadow); }
.quiz-panel__heading { text-align: center; margin-bottom: 28px; }
.quiz-panel__heading h2 { margin: 14px auto 0; max-width: 740px; font-family: Georgia, serif; font-size: clamp(2.45rem, 10vw, 4.4rem); font-weight: 500; line-height: 1.02; letter-spacing: -.04em; }
.quiz-list { display: grid; gap: 12px; }
.quiz-choice { width: 100%; min-height: 88px; border: 1px solid var(--line); border-radius: 20px; padding: 17px; display: grid; grid-template-columns: 42px 1fr 44px; gap: 14px; align-items: center; text-align: left; background: var(--paper); cursor: pointer; transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease, background .22s ease; }
.quiz-choice:hover { transform: translateY(-3px); border-color: rgba(65,109,47,.35); box-shadow: var(--shadow-soft); }
.quiz-choice--active { background: #eff3e5; border-color: var(--green); }
.quiz-choice__radio { width: 34px; height: 34px; border: 2px solid #8c8a79; border-radius: 50%; display: grid; place-items: center; color: white; }
.quiz-choice--active .quiz-choice__radio { background: var(--green); border-color: var(--green); }
.quiz-choice__radio svg { width: 19px; }
.quiz-choice__label { font-family: Georgia, serif; font-size: 1.12rem; line-height: 1.35; }
.quiz-choice__icon { justify-self: end; width: 42px; height: 42px; border-radius: 50%; display: grid; place-items: center; color: var(--green); background: #eef1df; }
.quiz-submit { width: 100%; margin-top: 18px; }
.quiz-privacy { display: flex; align-items: center; justify-content: center; gap: 8px; color: var(--muted); font-size: .78rem; }
.quiz-privacy svg { width: 17px; color: var(--green); }
.quiz-error { margin-top: 14px; padding: 14px; border-radius: 14px; color: #8a392b; background: #fff0e9; font-size: .86rem; }
.quiz-result { margin-top: 30px; border-top: 1px solid var(--line); padding-top: 30px; display: grid; gap: 24px; }
.quiz-result__copy { text-align: center; }
.quiz-result__copy h3 { margin: 13px auto 14px; max-width: 700px; font-family: Georgia, serif; font-size: clamp(2.2rem, 9vw, 3.6rem); font-weight: 500; line-height: 1.05; }
.quiz-result__copy p { margin: 0 auto; max-width: 640px; color: var(--muted); line-height: 1.7; }
.plate-map { width: min(78vw, 330px); aspect-ratio: 1.3; margin-inline: auto; position: relative; border: 22px solid white; border-radius: 50%; background: conic-gradient(#7f9f3e 0 35%, #ed9a32 35% 65%, #d27842 65% 100%); box-shadow: 0 20px 44px rgba(54,70,52,.18), inset 0 0 0 2px #eee6d9; overflow: hidden; }
.plate-map__segment { position: absolute; color: white; font-size: .62rem; font-weight: 900; text-transform: uppercase; text-shadow: 0 1px 2px rgba(0,0,0,.15); }
.plate-map__segment--one { left: 17%; top: 42%; }
.plate-map__segment--two { right: 10%; top: 25%; }
.plate-map__segment--three { right: 5%; bottom: 22%; }
.offer-card { padding: 25px; border-radius: 25px; background: linear-gradient(150deg, #f7f2e8, #fffdf9); border: 1px solid var(--line); box-shadow: var(--shadow-soft); text-align: center; }
.offer-card h3 { margin: 12px 0; font-family: Georgia, serif; font-size: 2.1rem; line-height: 1.1; font-weight: 500; }
.offer-card__price { display: block; margin: 12px 0 18px; color: var(--deep); font-size: 3.7rem; line-height: 1; }
.offer-card ul { list-style: none; padding: 0; margin: 0 0 22px; display: grid; gap: 10px; text-align: left; }
.offer-card li { display: flex; gap: 9px; align-items: center; font-size: .9rem; }
.offer-card li svg { width: 18px; color: var(--green); }
.offer-card .button { width: 100%; }
.offer-card small { margin-top: 12px; display: flex; justify-content: center; align-items: center; gap: 7px; color: var(--muted); }
.offer-card small svg { width: 16px; color: var(--green); }

.audience-section { background: linear-gradient(180deg, #f7f2e9, #fffdf8); }
.audience-layout { display: grid; gap: 18px; }
.audience-card { padding: 26px; border-radius: var(--radius-lg); border: 1px solid var(--line); background: var(--paper); box-shadow: var(--shadow-soft); }
.audience-card h2 { margin: 13px 0 20px; font-family: Georgia, serif; font-size: 2rem; font-weight: 500; line-height: 1.1; }
.audience-card ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 13px; }
.audience-card li { display: flex; gap: 10px; line-height: 1.45; }
.audience-card li svg { width: 20px; color: var(--green); flex: 0 0 auto; }
.audience-card--warning { position: relative; background: #fff3ec; border-color: rgba(198,92,52,.18); }
.audience-card--warning .eyebrow, .audience-card--warning > svg { color: #b55435; }
.audience-card--warning p { color: #60473e; line-height: 1.7; }
.audience-card--warning > svg { position: absolute; right: 24px; bottom: 22px; width: 54px; height: 54px; opacity: .22; }

.faq-section { background: #fffdfa; }
.faq-layout { display: grid; gap: 30px; }
.faq-list { display: grid; gap: 10px; }
.faq-list details { border: 1px solid var(--line); border-radius: 17px; background: var(--paper); overflow: hidden; }
.faq-list summary { min-height: 62px; padding: 0 18px; display: flex; align-items: center; justify-content: space-between; gap: 16px; list-style: none; font-weight: 800; cursor: pointer; }
.faq-list summary::-webkit-details-marker { display: none; }
.faq-list summary span { font-family: Georgia, serif; font-size: 1.7rem; transition: rotate .2s ease; }
.faq-list details[open] summary span { rotate: 45deg; }
.faq-list details p { margin: 0; padding: 0 18px 19px; color: var(--muted); line-height: 1.65; font-size: .9rem; }
.text-link { display: inline-flex; align-items: center; gap: 7px; border: 0; padding: 0; background: transparent; color: var(--green); font-weight: 850; cursor: pointer; }
.text-link svg { width: 18px; }

.disclaimer { padding: 28px 0; background: #edf0e3; }
.disclaimer__inner { display: grid; grid-template-columns: auto 1fr; gap: 16px; align-items: start; }
.disclaimer__inner > svg { width: 34px; color: var(--green); }
.disclaimer strong { display: block; margin-bottom: 5px; text-transform: uppercase; letter-spacing: .13em; font-size: .74rem; color: var(--green); }
.disclaimer p { margin: 0; color: var(--muted); font-size: .82rem; line-height: 1.6; }

.footer { padding: 70px 0 32px; background: #f8f4ec; }
.footer__inner { display: grid; gap: 30px; justify-items: center; text-align: center; }
.footer nav { display: grid; gap: 15px; }
.footer nav a { text-decoration: none; color: var(--deep); }
.footer nav a:hover { color: var(--green); }
.footer__inner > span { color: #7d817e; font-size: .75rem; }

@media (max-width: 699px) {
  .hero-visual { min-height: 0; width: 100%; padding: 0; place-items: center; }
  .hero-visual img { width: 100%; max-width: 100%; height: auto !important; aspect-ratio: 901 / 685; object-fit: contain; object-position: center; }
  .hero-visual__halo { width: 92vw; max-width: 430px; }
}

@media (max-width: 390px) {
  .container { width: min(100% - 24px, 1160px); }
  .brand__name { font-size: 1.22rem; }
  .brand__copy small { font-size: .52rem; }
  .hero h1 { font-size: clamp(3.45rem, 17vw, 4.4rem); }
  .method-card { grid-template-columns: 78px 1fr; padding: 20px; gap: 16px; }
  .method-card__visual { width: 74px; height: 74px; }
  .method-card__visual svg { width: 34px; }
  .product-item { grid-template-columns: 52px 1fr; }
  .product-art { grid-column: 1 / -1; justify-self: center; width: 112px; min-height: 92px; }
}

@media (min-width: 700px) {
  .container { width: min(100% - 48px, 1160px); }
  .desktop-nav { display: flex; }
  .header-quiz { display: block; }
  .menu-toggle, .mobile-menu { display: none; }
  .hero { padding: 135px 0 80px; }
  .hero__grid { grid-template-columns: .93fr 1.07fr; align-items: center; gap: 34px; }
  .hero h1 { font-size: clamp(4.2rem, 7.5vw, 6.5rem); }
  .hero__cta { width: auto; }
  .hero__micro { justify-content: flex-start; }
  .hero-visual { min-height: 620px; }
  .hero-visual__badge--one { left: 4%; }
  .hero-visual__badge--two { right: 8%; }
  .pain-flow { grid-template-columns: 1fr auto 1fr auto 1fr; align-items: center; }
  .pain-flow__arrow { display: block; }
  .method-grid { grid-template-columns: repeat(3, 1fr); }
  .method-card { grid-template-columns: 1fr; align-content: start; min-height: 350px; }
  .method-card h3 { margin-top: 14px; }
  .section-cta { width: auto; display: flex; margin-inline: auto; }
  .product-list { grid-template-columns: repeat(2, 1fr); }
  .extras-grid { grid-template-columns: repeat(3, 1fr); }
  .extras-grid span { border-bottom: 0; border-right: 1px solid var(--line); padding: 8px 16px; }
  .extras-grid span:nth-child(3n) { border-right: 0; }
  .showcase-mockup { min-height: 500px; }
  .showcase-phone { width: 150px; height: 330px; }
  .showcase-book { width: 260px; height: 335px; }
  .showcase-planner { width: 185px; height: 230px; right: 8%; }
  .transformation-grid { grid-template-columns: repeat(2, 1fr); }
  .quiz-panel { padding: 48px; }
  .quiz-list { grid-template-columns: repeat(2, 1fr); }
  .quiz-result { grid-template-columns: 1fr 1fr; align-items: center; }
  .quiz-result__copy { grid-column: 1 / -1; }
  .audience-layout { grid-template-columns: 1.15fr .85fr; }
  .faq-layout { grid-template-columns: .75fr 1.25fr; align-items: start; }
  .footer__inner { grid-template-columns: auto 1fr auto; align-items: center; justify-items: initial; text-align: left; }
  .footer nav { grid-auto-flow: column; justify-self: center; }
}

@media (min-width: 1000px) {
  .section { padding: 112px 0; }
  .product-list { grid-template-columns: 1fr; max-width: 930px; margin-inline: auto; }
  .product-item { grid-template-columns: 74px 1fr 155px; min-height: 165px; padding: 24px 30px; }
  .product-art { width: 138px; min-height: 116px; }
  .product-item__copy h3 { font-size: 1.55rem; }
  .showcase-mockup { max-width: 940px; margin-inline: auto; }
}

@media (hover: hover) and (pointer: fine) {
  .quiz-choice:active, .method-card:active, .product-item:active { transform: translateY(-1px) scale(.995); }
}

@media (prefers-reduced-motion: no-preference) {
  .hero-visual img { animation: heroFloat 6s ease-in-out infinite; }
  .hero-visual__badge--one { animation: badgeFloatOne 4.8s ease-in-out infinite; }
  .hero-visual__badge--two { animation: badgeFloatTwo 5.2s ease-in-out infinite; }
  .hero-visual__badge--three { animation: badgeFloatThree 4.4s ease-in-out infinite; }
  .leaf--one { animation: leafSway 7s ease-in-out infinite alternate; transform-origin: bottom center; }
  .leaf--two { animation: leafSwayTwo 8s ease-in-out infinite alternate; transform-origin: bottom center; }
}

@keyframes heroFloat { 0%, 100% { translate: 0 0; } 50% { translate: 0 -11px; } }
@keyframes badgeFloatOne { 0%, 100% { translate: 0 0; } 50% { translate: 6px -7px; } }
@keyframes badgeFloatTwo { 0%, 100% { translate: 0 0; } 50% { translate: -4px 8px; } }
@keyframes badgeFloatThree { 0%, 100% { translate: 0 0; } 50% { translate: 8px 5px; } }
@keyframes leafSway { from { rotate: -29deg; } to { rotate: -18deg; } }
@keyframes leafSwayTwo { from { rotate: 150deg; } to { rotate: 162deg; } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
  [data-reveal] { opacity: 1; transform: none; }
}

/* --------------------------------------------------------------------------
   Refinamento visual editorial
   Mantém a identidade, as ilustrações e a estrutura do projeto original.
   -------------------------------------------------------------------------- */

:root {
  --font-sans: "Manrope", "Avenir Next", "Segoe UI", sans-serif;
  --font-display: "Source Serif 4", Georgia, "Times New Roman", serif;
  --ease-out: cubic-bezier(.22, 1, .36, 1);
  --ease-soft: cubic-bezier(.25, .8, .25, 1);
  --shadow: 0 28px 72px rgba(28, 51, 37, .12), 0 3px 12px rgba(28, 51, 37, .05);
  --shadow-soft: 0 16px 42px rgba(28, 51, 37, .075), 0 2px 8px rgba(28, 51, 37, .035);
}

body {
  font-family: var(--font-sans);
  font-optical-sizing: auto;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

button,
a,
input,
summary {
  font-family: var(--font-sans);
}

.hero[id],
.section[id] {
  scroll-margin-top: 92px;
}

::selection {
  color: #fff;
  background: var(--green);
}

:focus-visible {
  outline: 3px solid rgba(65, 109, 47, .28);
  outline-offset: 4px;
}

/* Entrada com ritmo mais natural e sem o efeito genérico de "subir e aparecer". */
[data-reveal] {
  opacity: 0;
  filter: blur(5px);
  transform: translate3d(0, 16px, 0) scale(.995);
  transition:
    opacity .72s var(--ease-out),
    transform .82s var(--ease-out),
    filter .72s var(--ease-out);
  will-change: opacity, transform, filter;
}

[data-reveal].is-visible {
  opacity: 1;
  filter: blur(0);
  transform: translate3d(0, 0, 0) scale(1);
}

[data-reveal] .pain-flow article,
[data-reveal] .method-card,
[data-reveal] .product-item,
[data-reveal] .comparison,
[data-reveal] .quiz-choice,
[data-reveal] .audience-card,
[data-reveal] .faq-list details {
  opacity: 0;
  transform: translate3d(0, 12px, 0);
  transition:
    opacity .58s var(--ease-out),
    transform .68s var(--ease-out),
    border-color .28s var(--ease-soft),
    box-shadow .32s var(--ease-soft),
    background-color .28s var(--ease-soft);
}

[data-reveal].is-visible .pain-flow article,
[data-reveal].is-visible .method-card,
[data-reveal].is-visible .product-item,
[data-reveal].is-visible .comparison,
[data-reveal].is-visible .quiz-choice,
[data-reveal].is-visible .audience-card,
[data-reveal].is-visible .faq-list details {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

[data-reveal].is-visible :is(.pain-flow article, .method-card, .product-item, .comparison, .quiz-choice, .audience-card, .faq-list details):nth-child(2) { transition-delay: 55ms; }
[data-reveal].is-visible :is(.pain-flow article, .method-card, .product-item, .comparison, .quiz-choice, .audience-card, .faq-list details):nth-child(3) { transition-delay: 105ms; }
[data-reveal].is-visible :is(.pain-flow article, .method-card, .product-item, .comparison, .quiz-choice, .audience-card, .faq-list details):nth-child(4) { transition-delay: 155ms; }
[data-reveal].is-visible :is(.pain-flow article, .method-card, .product-item, .comparison, .quiz-choice, .audience-card, .faq-list details):nth-child(5) { transition-delay: 205ms; }

.eyebrow {
  position: relative;
  padding-bottom: 9px;
  font-family: var(--font-sans);
  font-size: .69rem;
  font-weight: 750;
  letter-spacing: .17em;
}

.eyebrow::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 28px;
  height: 1px;
  background: currentColor;
  opacity: .45;
}

.section-heading--center .eyebrow::after,
.quiz-panel__heading .eyebrow::after {
  left: 50%;
  translate: -50% 0;
}

.section-heading h2,
.hero h1,
.method-card h3,
.method-quote,
.product-item__copy h3,
.extras-card h3,
.showcase-planner strong,
.transformation-note,
.quiz-panel__heading h2,
.quiz-choice__label,
.quiz-result__copy h3,
.offer-card h3,
.audience-card h2,
.pain-flow strong {
  font-family: var(--font-display);
}

/* Navegação com tipografia editorial, estado ativo e acabamento de produto. */
.topbar {
  background: rgba(247, 242, 233, .62);
  border-bottom-color: transparent;
  box-shadow: 0 0 0 rgba(28, 51, 37, 0);
  backdrop-filter: blur(16px) saturate(115%);
  transition:
    background-color .38s var(--ease-soft),
    border-color .38s var(--ease-soft),
    box-shadow .38s var(--ease-soft);
}

.topbar--scrolled {
  background: rgba(250, 247, 240, .92);
  border-bottom-color: rgba(28, 70, 42, .09);
  box-shadow: 0 8px 28px rgba(28, 51, 37, .055);
}

.topbar__inner {
  min-height: 76px;
  transition: min-height .38s var(--ease-soft);
}

.topbar--scrolled .topbar__inner {
  min-height: 68px;
}

.brand__name {
  font-family: var(--font-sans);
  font-weight: 800;
  letter-spacing: -.035em;
}

.brand__copy small {
  font-weight: 500;
  letter-spacing: .015em;
}

.brand__symbol {
  border: 1px solid rgba(65, 109, 47, .11);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .72);
  transition: transform .4s var(--ease-out), background-color .35s ease;
}

.brand-link:hover .brand__symbol {
  transform: rotate(-4deg) scale(1.025);
}

.desktop-nav {
  align-items: center;
  gap: 8px;
}

.desktop-nav button {
  position: relative;
  padding: 13px 12px 12px;
  color: rgba(13, 40, 32, .74);
  font-size: .76rem;
  font-weight: 650;
  letter-spacing: .025em;
  transition: color .24s ease;
}

.desktop-nav button::after {
  content: "";
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 6px;
  height: 1.5px;
  background: var(--green);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform .34s var(--ease-out);
}

.desktop-nav button:hover,
.desktop-nav button.is-active {
  color: var(--deep);
}

.desktop-nav button:hover::after,
.desktop-nav button.is-active::after {
  transform: scaleX(1);
  transform-origin: left;
}

.header-quiz {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(32, 82, 37, .18);
  border-radius: 13px;
  padding: 11px 18px;
  background: #356c31;
  box-shadow: 0 8px 22px rgba(44, 91, 41, .16), inset 0 1px 0 rgba(255,255,255,.18);
  font-size: .78rem;
  font-weight: 700;
  letter-spacing: .01em;
  transition: transform .24s var(--ease-out), box-shadow .3s ease, background-color .3s ease;
}

.header-quiz:hover {
  transform: translateY(-1px);
  background: #2e622b;
  box-shadow: 0 12px 28px rgba(44, 91, 41, .2), inset 0 1px 0 rgba(255,255,255,.18);
}

.menu-toggle {
  border: 1px solid rgba(28, 70, 42, .1);
  border-radius: 13px;
  background: rgba(255, 253, 248, .48);
  transition: background-color .24s ease, border-color .24s ease, transform .24s var(--ease-out);
}

.menu-toggle:hover {
  border-color: rgba(65, 109, 47, .24);
  background: rgba(255, 253, 248, .88);
  transform: translateY(-1px);
}

.mobile-menu {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  background: rgba(255, 253, 248, .97);
  box-shadow: 0 18px 32px rgba(28, 51, 37, .08);
  transition:
    max-height .42s var(--ease-out),
    padding .42s var(--ease-out),
    opacity .22s ease,
    transform .42s var(--ease-out),
    visibility 0s linear .42s;
}

.mobile-menu--open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition-delay: 0s;
}

.mobile-menu button {
  position: relative;
  padding-inline: 4px;
  border-bottom-color: rgba(28, 70, 42, .09);
  color: rgba(13, 40, 32, .82);
  font-size: .86rem;
  font-weight: 650;
  letter-spacing: .015em;
}

.mobile-menu button::after {
  content: "→";
  position: absolute;
  right: 4px;
  color: var(--green);
  opacity: 0;
  transform: translateX(-5px);
  transition: opacity .2s ease, transform .28s var(--ease-out);
}

.mobile-menu button:hover::after {
  opacity: 1;
  transform: translateX(0);
}

/* Botões menos genéricos: superfície sólida, brilho discreto e movimento curto. */
.button {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: 55px;
  border-radius: 15px;
  font-size: .92rem;
  font-weight: 720;
  letter-spacing: -.005em;
  transition:
    transform .24s var(--ease-out),
    box-shadow .32s var(--ease-soft),
    background-color .3s ease,
    opacity .2s ease;
}

.button::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0;
  background: linear-gradient(110deg, transparent 14%, rgba(255,255,255,.16) 48%, transparent 72%);
  transform: translateX(-120%);
  transition: transform .72s var(--ease-out);
}

.button--primary {
  background: linear-gradient(135deg, #2e642d 0%, #477838 100%);
  border: 1px solid rgba(28, 78, 31, .2);
  box-shadow: 0 14px 30px rgba(44, 91, 41, .2), inset 0 1px 0 rgba(255,255,255,.15);
}

.button--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 38px rgba(44, 91, 41, .24), inset 0 1px 0 rgba(255,255,255,.18);
}

.button:hover::before {
  transform: translateX(120%);
}

.button svg {
  transition: transform .32s var(--ease-out);
}

.button:hover svg,
.text-link:hover svg {
  transform: translateX(3px);
}

.button--primary:active {
  transform: translateY(0) scale(.992);
}

/* Hero: movimento por profundidade guiado pelo cursor, sem objetos flutuando ao acaso. */
.hero {
  background:
    radial-gradient(circle at 9% 19%, rgba(255,255,255,.74), transparent 30%),
    linear-gradient(180deg, #fbf8f1 0%, #f7f2e9 100%);
}

.hero h1 {
  font-weight: 550;
  letter-spacing: -.058em;
  text-wrap: balance;
}

.hero h1 em {
  font-weight: 550;
}

.hero__lead {
  max-width: 590px;
  color: rgba(27, 54, 42, .86);
  font-weight: 450;
}

.hero__format {
  font-size: .9rem;
  font-weight: 650;
}

.hero-visual {
  --parallax-x: 0px;
  --parallax-y: 0px;
  --depth-x: 0px;
  --depth-y: 0px;
  --glow-x: 50%;
  --glow-y: 46%;
  isolation: isolate;
}

.hero-visual::after {
  content: "";
  position: absolute;
  z-index: 4;
  inset: 10% 5%;
  border-radius: 36px;
  pointer-events: none;
  background: radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(255,255,255,.22), transparent 26%);
  opacity: .25;
  transition: opacity .35s ease;
}

.hero-visual.is-interacting::after {
  opacity: .66;
}

.hero-visual__halo {
  transform: translate3d(var(--depth-x), var(--depth-y), 0);
  filter: blur(8px);
  transition: transform .7s var(--ease-out);
}

.hero-visual img {
  animation: none !important;
  border: 1px solid rgba(255,255,255,.62);
  box-shadow: 0 36px 82px rgba(34, 55, 41, .16), 0 4px 18px rgba(34, 55, 41, .07);
  transform:
    translate3d(var(--parallax-x), var(--parallax-y), 0)
    rotateX(var(--tilt-x))
    rotateY(var(--tilt-y));
  transition: transform .68s var(--ease-out), box-shadow .45s ease;
  will-change: transform;
}

.hero-visual.is-interacting img {
  transition-duration: .13s;
  box-shadow: 0 42px 90px rgba(34, 55, 41, .19), 0 5px 20px rgba(34, 55, 41, .08);
}

.hero-visual__badge {
  animation: none !important;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 13px;
  border-radius: 12px;
  background: rgba(255, 253, 248, .82);
  box-shadow: 0 12px 30px rgba(34, 55, 41, .09);
  font-size: .66rem;
  font-weight: 750;
  letter-spacing: .025em;
  transform: translate3d(var(--depth-x), var(--depth-y), 0);
  transition: transform .74s var(--ease-out), background-color .3s ease;
}

.hero-visual__badge::before {
  content: "";
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--olive);
  box-shadow: 0 0 0 3px rgba(142, 162, 87, .16);
}

.leaf {
  animation: none !important;
  transform: translate3d(var(--depth-x), var(--depth-y), 0);
  transition: transform .85s var(--ease-out);
}

/* Cartões e componentes: interação por material, não por deslocamento exagerado. */
.pain-callout,
.method-card,
.product-item,
.extras-card,
.comparison,
.quiz-panel,
.quiz-choice,
.offer-card,
.audience-card,
.faq-list details {
  box-shadow: 0 1px 0 rgba(255,255,255,.72) inset, var(--shadow-soft);
}

.method-card,
.product-item,
.quiz-choice,
.faq-list details,
.audience-card {
  transition:
    transform .32s var(--ease-out),
    box-shadow .35s var(--ease-soft),
    border-color .3s ease,
    background-color .3s ease;
}

.method-card:hover,
.product-item:hover {
  transform: translateY(-2px);
  border-color: rgba(65, 109, 47, .25);
  box-shadow: 0 22px 50px rgba(28, 51, 37, .1), inset 0 1px 0 rgba(255,255,255,.76);
}

.method-card__visual,
.product-item__icon,
.quiz-choice__icon {
  border: 1px solid rgba(65, 109, 47, .08);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.72);
  transition: transform .4s var(--ease-out), background-color .3s ease, color .3s ease;
}

.method-card:hover .method-card__visual {
  transform: rotate(-2deg) scale(1.025);
}

.method-card__visual span {
  box-shadow: 0 7px 15px rgba(44, 91, 41, .18);
}

.product-item:hover .product-item__icon,
.quiz-choice:hover .quiz-choice__icon {
  transform: translateY(-2px) rotate(-2deg);
}

.product-art {
  transition: transform .45s var(--ease-out), box-shadow .35s ease;
}

.product-item:hover .product-art {
  transform: translateY(-3px) rotate(0deg) scale(1.018);
  box-shadow: 0 18px 32px rgba(41,61,46,.14);
}

.quiz-choice:hover {
  transform: translateY(-1px);
  border-color: rgba(65, 109, 47, .31);
  box-shadow: 0 12px 30px rgba(28, 51, 37, .065), inset 0 1px 0 rgba(255,255,255,.78);
}

.quiz-choice--active {
  background: linear-gradient(135deg, #edf2e2, #f5f6ed);
  box-shadow: 0 0 0 1px rgba(65, 109, 47, .12), 0 14px 30px rgba(28, 51, 37, .065);
}

.quiz-choice__radio {
  transition: transform .3s var(--ease-out), background-color .25s ease, border-color .25s ease;
}

.quiz-choice--active .quiz-choice__radio {
  transform: scale(1.04);
  box-shadow: 0 5px 12px rgba(44, 91, 41, .18);
}

.comparison {
  transition: border-color .3s ease, box-shadow .35s ease;
}

.comparison:hover {
  border-color: rgba(65, 109, 47, .2);
  box-shadow: 0 22px 50px rgba(28, 51, 37, .075), inset 0 1px 0 rgba(255,255,255,.72);
}

.faq-list details:hover {
  border-color: rgba(65, 109, 47, .24);
  box-shadow: 0 10px 28px rgba(28, 51, 37, .055);
}

.faq-list summary {
  font-size: .9rem;
  font-weight: 650;
  letter-spacing: -.005em;
}

.faq-list summary span {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border-radius: 50%;
  background: rgba(65, 109, 47, .07);
  color: var(--green);
  transition: rotate .32s var(--ease-out), background-color .25s ease;
}

.faq-list details[open] summary span {
  background: rgba(65, 109, 47, .12);
}

.text-link {
  position: relative;
  font-size: .86rem;
  font-weight: 700;
  text-decoration: none;
}

.text-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -5px;
  height: 1px;
  background: currentColor;
  transform: scaleX(.28);
  transform-origin: left;
  transition: transform .34s var(--ease-out);
}

.text-link:hover::after {
  transform: scaleX(1);
}

.footer nav a {
  position: relative;
  font-size: .82rem;
  font-weight: 550;
}

.footer nav a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 1px;
  background: var(--green);
  transform: scaleX(0);
  transition: transform .3s var(--ease-out);
}

.footer nav a:hover::after {
  transform: scaleX(1);
}

@media (max-width: 699px) {
  .topbar {
    backdrop-filter: blur(14px) saturate(110%);
  }

  .hero-visual::after {
    display: none;
  }

  .hero-visual img,
  .hero-visual__halo,
  .hero-visual__badge,
  .leaf {
    transform: none;
  }

  .hero-visual__badge {
    border-radius: 10px;
  }
}

@media (min-width: 700px) {
  .hero__grid {
    gap: clamp(30px, 4vw, 58px);
  }

  .hero__copy {
    padding-bottom: 24px;
  }
}

@media (hover: none) {
  .button::before {
    display: none;
  }

  .method-card:hover,
  .product-item:hover,
  .quiz-choice:hover,
  .comparison:hover,
  .header-quiz:hover,
  .menu-toggle:hover {
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation: none !important;
    transition-duration: .01ms !important;
    transition-delay: 0ms !important;
  }

  [data-reveal],
  [data-reveal] .pain-flow article,
  [data-reveal] .method-card,
  [data-reveal] .product-item,
  [data-reveal] .comparison,
  [data-reveal] .quiz-choice,
  [data-reveal] .audience-card,
  [data-reveal] .faq-list details {
    opacity: 1;
    filter: none;
    transform: none;
  }
}
