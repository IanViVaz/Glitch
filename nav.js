(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isInPages   = window.location.pathname.includes('/pages/');
  const ctaHref     = isInPages ? 'contacto.html'  : 'pages/contacto.html';
  const homeHref    = isInPages ? '../index.html'   : 'index.html';
  const logoSrc     = isInPages ? '../glitch-logo-white.png' : 'glitch-logo-white.png';
  const p           = isInPages ? '' : 'pages/';

  // Links originales — siempre visibles
  const mainLinks = [
    { href: p + 'audio.html',        label: 'Audio' },
    { href: p + 'video.html',        label: 'Video' },
    { href: p + 'iluminacion.html',  label: 'Iluminación' },
    { href: p + 'led.html',          label: 'Pantalla LED' },
    { href: p + 'traduccion.html',   label: 'Traducción' },
    { href: p + 'contacto.html',     label: 'Contacto', extraClass: 'nav-link-contact' },
  ];

  // Servicios nuevos — en dropdown "Otros servicios"
  const extraLinks = [
    { href: p + 'produccion-integral.html', label: 'Producción Integral',           icon: 'ti-star' },
    { href: p + 'silent-party.html',        label: 'Silent Party / Audífonos LED',  icon: 'ti-headset' },
    { href: p + 'streaming.html',           label: 'Streaming e híbridos',           icon: 'ti-broadcast' },
    { href: p + 'podcast.html',             label: 'Equipo para Podcast',            icon: 'ti-microphone-2' },
    { href: p + 'articulos.html',           label: 'Artículos publicitarios',        icon: 'ti-gift' },
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
  const pulpoSrc     = isInPages ? '../img/pulpo-pixel.jpeg' : 'img/pulpo-pixel.jpeg';
  const pixelOctopus = `<img src="${pulpoSrc}" alt="pulpo" style="height:56px;width:auto;vertical-align:middle;opacity:0.9;mix-blend-mode:screen;image-rendering:pixelated;" />`;

  const navHTML = `
    <nav class="nav">
      <a href="${homeHref}" class="logo-link">
        <img src="${logoSrc}" alt="Glitch" class="nav-logo-img" />
      </a>
      <ul class="nav-links">
        ${mainHTML}
        <li class="nav-dropdown-wrap${extraIsActive ? ' active' : ''}">
          <a class="nav-dropdown-trigger${extraIsActive ? ' active' : ''}" href="#" onclick="return false;">
            Otros servicios <i class="ti ti-chevron-down" style="font-size:11px;vertical-align:middle;margin-left:2px;"></i>
          </a>
          <ul class="nav-dropdown">
            ${dropdownItemsHTML}
          </ul>
        </li>
      </ul>
      <div class="nav-actions">
        <a href="${waHref}" target="_blank" rel="noopener" class="nav-whatsapp" aria-label="WhatsApp">
          <i class="ti ti-brand-whatsapp"></i>
        </a>
        <a href="${ctaHref}" class="nav-cta"><span class="nav-cta-shine"></span><span class="nav-cta-label">Solicitar cotización</span></a>
      </div>
    </nav>`;

  const footerHTML = `
    <footer class="footer">
      <a href="#" class="footer-logo-wrap footer-scroll-top" aria-label="Volver arriba">
        <img src="${logoSrc}" alt="Glitch" class="footer-logo-img" />
      </a>
      <p class="footer-copy"><span>2026 | GLITCH | CDMX | <a href="tel:+525512345678" style="color:inherit;text-decoration:none;">+52 55 1234 5678</a></span></p>
      <a href="${isInPages ? 'proposito.html' : 'pages/proposito.html'}" class="footer-nerd" style="text-decoration:none;">
        ${pixelOctopus}
        <span>Proudly nerdy</span>
      </a>
      <div style="display:flex;align-items:center;gap:2rem;flex-wrap:wrap;">
        <div class="footer-links">
          <a href="#">Aviso de privacidad</a>
          <a href="${isInPages ? 'proposito.html' : 'pages/proposito.html'}">About us</a>
          <a href="${ctaHref}">Contacto</a>
        </div>
      </div>
    </footer>`;

  if (!document.querySelector('nav.nav')) {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }
  document.body.insertAdjacentHTML('beforeend', footerHTML);
})();
