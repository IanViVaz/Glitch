/* ═══════════════════════════════════════════
   GLITCH PAGE TRANSITION
   Se activa en cualquier link de navegación
═══════════════════════════════════════════ */
(function(){

  // Crear el overlay de glitch
  const overlay = document.createElement('div');
  overlay.id = 'glitch-overlay';
  overlay.innerHTML = `
    <div class="go-inner">
      <div class="go-bar b1"></div>
      <div class="go-bar b2"></div>
      <div class="go-bar b3"></div>
      <div class="go-logo">
        <img src="${document.querySelector('.nav-logo-img') ? document.querySelector('.nav-logo-img').src : 'logo.jpeg'}" alt="Glitch"/>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const style = document.createElement('style');
  style.textContent = `
    #glitch-overlay {
      position: fixed; inset: 0; z-index: 9999;
      background: #0a0a0f;
      display: flex; align-items: center; justify-content: center;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.05s;
    }
    #glitch-overlay.active { opacity: 1; pointer-events: all; }

    .go-inner { position: relative; width: 100%; height: 100%; overflow: hidden; }

    /* Barras de glitch */
    .go-bar {
      position: absolute; left: 0; right: 0;
      background: #2DD4BF;
      transform: scaleX(0);
      transform-origin: left;
    }
    .go-bar.b1 { top: 0; height: 33.4%; }
    .go-bar.b2 { top: 33.3%; height: 33.4%; background: #0a0a0f; border-top: 1px solid #2DD4BF; }
    .go-bar.b3 { top: 66.6%; height: 33.4%; }

    /* Glitch logo centrado */
    .go-logo {
      position: absolute; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      z-index: 2;
    }
    .go-logo img { height: 60px; width: auto; filter: brightness(10); }

    /* Líneas de scanline */
    #glitch-overlay::before {
      content: '';
      position: absolute; inset: 0;
      background: repeating-linear-gradient(
        0deg, transparent, transparent 3px,
        rgba(45,212,191,0.04) 3px, rgba(45,212,191,0.04) 4px
      );
      z-index: 3; pointer-events: none;
      opacity: 0; transition: opacity 0.1s;
    }
    #glitch-overlay.active::before { opacity: 1; }
  `;
  document.head.appendChild(style);

  function runGlitch(href) {
    overlay.classList.add('active');
    const b1 = overlay.querySelector('.b1');
    const b2 = overlay.querySelector('.b2');
    const b3 = overlay.querySelector('.b3');
    const logo = overlay.querySelector('.go-logo');

    // Secuencia de animación
    let t = 0;

    // Paso 1: barras entran desde izquierda (staggered)
    setTimeout(() => {
      b1.style.transition = 'transform 0.12s cubic-bezier(.4,0,.2,1)';
      b1.style.transform = 'scaleX(1)';
    }, t); t += 60;

    setTimeout(() => {
      b3.style.transition = 'transform 0.12s cubic-bezier(.4,0,.2,1)';
      b3.style.transform = 'scaleX(1)';
    }, t); t += 60;

    setTimeout(() => {
      b2.style.transition = 'transform 0.10s cubic-bezier(.4,0,.2,1)';
      b2.style.transform = 'scaleX(1)';
    }, t); t += 80;

    // Paso 2: glitch - barras se desplazan brevemente
    setTimeout(() => {
      b1.style.transition = 'transform 0.04s';
      b1.style.transform = 'scaleX(1) translateX(-8px)';
      b3.style.transition = 'transform 0.04s';
      b3.style.transform = 'scaleX(1) translateX(8px)';
      logo.style.transition = 'opacity 0.1s';
      logo.style.opacity = '1';
    }, t); t += 60;

    setTimeout(() => {
      b1.style.transform = 'scaleX(1) translateX(5px)';
      b3.style.transform = 'scaleX(1) translateX(-5px)';
    }, t); t += 40;

    setTimeout(() => {
      b1.style.transform = 'scaleX(1) translateX(0)';
      b3.style.transform = 'scaleX(1) translateX(0)';
    }, t); t += 80;

    // Paso 3: navegar
    setTimeout(() => {
      window.location.href = href;
    }, t);
  }

  // Interceptar todos los links de nav
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    // Solo links internos (no externos, no #anchors)
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    // Solo links de navegación (no el logo)
    e.preventDefault();
    runGlitch(href);
  });

  // Al volver con el botón atrás, limpiar el overlay
  window.addEventListener('pageshow', function(e) {
    overlay.classList.remove('active');
    const bars = overlay.querySelectorAll('.go-bar');
    bars.forEach(b => { b.style.transition = 'none'; b.style.transform = 'scaleX(0)'; });
    overlay.querySelector('.go-logo').style.opacity = '0';
  });

})();
