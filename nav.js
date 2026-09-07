(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isInPages   = window.location.pathname.includes('/pages/');
  const ctaHref     = isInPages ? 'contacto'  : 'pages/contacto';
  const homeHref    = isInPages ? '../'   : './';
  const logoSrc     = isInPages ? '../glitch-logo-produccion-audiovisual-cdmx.png' : 'glitch-logo-produccion-audiovisual-cdmx.png';
  const p           = isInPages ? '' : 'pages/';

  // Links originales — siempre visibles
  const mainLinks = [
    { href: p + 'audio',        label: 'Audio' },
    { href: p + 'video',        label: 'Video' },
    { href: p + 'iluminacion',  label: 'Iluminación' },
    { href: p + 'led',          label: 'Pantalla LED' },
    { href: p + 'traduccion',   label: 'Traducción' },
    { href: p + 'contacto',     label: 'Contacto', extraClass: 'nav-link-contact' },
  ];

  // Servicios nuevos — en dropdown "Otros servicios"
  // Nota: "Producción Integral" vive en /produccion-integral.html como landing exclusiva
  // para campañas de Google Ads y NO se enlaza aquí a propósito (sin navegación del sitio).
  const extraLinks = [
    { href: p + 'silent-party',        label: 'Silent Party / Audífonos LED',  icon: 'ti-headset' },
    { href: p + 'streaming',           label: 'Streaming e híbridos',           icon: 'ti-broadcast' },
    { href: p + 'podcast',             label: 'Equipo para Podcast',            icon: 'ti-microphone-2' },
    { href: p + 'articulos',           label: 'Artículos publicitarios',        icon: 'ti-gift' },
  ];

  const extraIsActive = extraLinks.some(l => currentPage === l.href.split('/').pop());

  const mainHTML = mainLinks.map(link => {
    const classes = [];
    if (currentPage === link.href.split('/').pop()) classes.push('active');
    if (link.extraClass) classes.push(link.extraClass);
    const classAttr = classes.length ? ` class="${classes.join(' ')}"` : '';
    return `<li><a href="${link.href}"${classAttr}>${link.label}</a></li>`;
  }).join('\n');

  const dropdownItemsHTML = extraLinks.map(l => `
    <li>
      <a href="${l.href}" class="${currentPage === l.href.split('/').pop() ? 'active' : ''}">
        <i class="ti ${l.icon}"></i>${l.label}
      </a>
    </li>`).join('');

  const waHref       = 'https://wa.me/message/NDOUJD4OSDRYI1';
  const pulpoSrc     = isInPages ? '../img/pulpo-pixelado-glitch.webp' : 'img/pulpo-pixelado-glitch.webp';
  // alt="" a propósito: es un adorno y el texto "Proudly nerdy" que va junto
  // ya dice lo mismo. Poner texto alternativo repetido en imágenes decorativas
  // penaliza en accesibilidad y no aporta nada en SEO.
  const pixelOctopus = `<img src="${pulpoSrc}" alt="" aria-hidden="true" style="height:56px;width:auto;vertical-align:middle;opacity:0.9;mix-blend-mode:screen;image-rendering:pixelated;" width="103" height="56" loading="lazy" decoding="async" />`;

  const navHTML = `
    <nav class="nav">
      <a href="${homeHref}" class="logo-link">
        <img src="${logoSrc}" alt="GLiTCH — producción audiovisual integral para eventos en CDMX" class="nav-logo-img" width="400" height="351" />
      </a>
      <ul class="nav-links" id="navLinks">
        ${mainHTML}
        <li class="nav-dropdown-wrap${extraIsActive ? ' active' : ''}">
          <a class="nav-dropdown-trigger${extraIsActive ? ' active' : ''}" href="#" onclick="return false;">
            Otros servicios <i class="ti ti-chevron-down" style="font-size:11px;vertical-align:middle;margin-left:2px;"></i>
          </a>
          <ul class="nav-dropdown">
            ${dropdownItemsHTML}
          </ul>
        </li>
        <li class="nav-links-mobile-cta"><a href="${ctaHref}" class="nav-cta" style="display:block;text-align:center;">Solicitar cotización</a></li>
      </ul>
      <div class="nav-actions">
        <a href="${waHref}" target="_blank" rel="noopener" class="nav-whatsapp" aria-label="Contactar por WhatsApp">
          <i class="ti ti-brand-whatsapp"></i>
        </a>
        <a href="${ctaHref}" class="nav-cta nav-cta-desktop"><span class="nav-cta-shine"></span><span class="nav-cta-label">Solicitar cotización</span></a>
        <button type="button" class="nav-hamburger" id="navHamburger" aria-label="Abrir menú" aria-expanded="false">
          <i class="ti ti-menu-2"></i>
        </button>
      </div>
    </nav>`;

  const footerHTML = `
    <footer class="footer">
      <a href="#" class="footer-logo-wrap footer-scroll-top" aria-label="Volver arriba">
        <img src="${logoSrc}" alt="" aria-hidden="true" class="footer-logo-img" width="400" height="351" loading="lazy" decoding="async" />
      </a>
      <p class="footer-copy"><span>${new Date().getFullYear()} | GLITCH | CDMX | <a href="tel:+525619939997" style="color:inherit;text-decoration:none;">56 1993 9997</a></span></p>
      <a href="${isInPages ? 'proposito' : 'pages/proposito'}" class="footer-nerd" style="text-decoration:none;">
        ${pixelOctopus}
        <span>Proudly nerdy</span>
      </a>
      <div style="display:flex;align-items:center;gap:2rem;flex-wrap:wrap;">
        <div class="footer-links">
          <a href="#">Aviso de privacidad</a>
          <a href="${isInPages ? 'proposito' : 'pages/proposito'}">About us</a>
          <a href="${ctaHref}">Contacto</a>
        </div>
      </div>
    </footer>`;

  if (!document.querySelector('nav.nav')) {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // ── Menú hamburguesa (mobile) ──
  document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.getElementById('navHamburger');
    var navLinks  = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    function closeMobileMenu() {
      navLinks.classList.remove('mobile-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelector('i').className = 'ti ti-menu-2';
    }
    function openMobileMenu() {
      navLinks.classList.add('mobile-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.querySelector('i').className = 'ti ti-x';
    }

    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (navLinks.classList.contains('mobile-open')) closeMobileMenu();
      else openMobileMenu();
    });

    // Cerrar el menú mobile al tocar un link normal (no el trigger del dropdown)
    navLinks.querySelectorAll('a').forEach(function (link) {
      if (link.classList.contains('nav-dropdown-trigger')) return;
      link.addEventListener('click', closeMobileMenu);
    });

    // Cerrar al tocar fuera del menú
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Si la pantalla vuelve a tamaño de escritorio, resetear el estado mobile
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) closeMobileMenu();
    });
  });

  // ── Dropdown: hover estable + click fija/desancla ──
  document.addEventListener('DOMContentLoaded', function () {
    var wrap = document.querySelector('.nav-dropdown-wrap');
    if (!wrap) return;

    var trigger = wrap.querySelector('.nav-dropdown-trigger');
    var dropdown = wrap.querySelector('.nav-dropdown');
    if (!trigger || !dropdown) return;

    var pinned = false;
    var leaveTimer = null;

    // Hover: abrir al entrar al wrap (trigger o menú)
    wrap.addEventListener('mouseenter', function () {
      clearTimeout(leaveTimer);
      wrap.classList.add('hovered');
    });

    // Hover: pequeño delay al salir para no cerrar accidentalmente
    wrap.addEventListener('mouseleave', function () {
      if (!pinned) {
        leaveTimer = setTimeout(function () {
          wrap.classList.remove('hovered');
        }, 120);
      }
    });

    // Click: alterna estado fijo (permanece abierto sin hover)
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      pinned = !pinned;
      wrap.classList.toggle('pinned', pinned);
      if (pinned) wrap.classList.add('hovered');
    });

    // Click fuera: cierra todo
    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) {
        pinned = false;
        wrap.classList.remove('pinned', 'hovered');
      }
    });

    // Click en link interno: cierra todo
    dropdown.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        pinned = false;
        wrap.classList.remove('pinned', 'hovered');
      });
    });
  });
})();
