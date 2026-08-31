(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isInPages   = window.location.pathname.includes('/pages/');
  const ctaHref     = isInPages ? 'contacto.html'  : 'pages/contacto.html';
  const homeHref    = isInPages ? '../index.html'   : 'index.html';
  const logoSrc     = isInPages ? '../glitch-logo-white.png' : 'glitch-logo-white.png';

  const links = [
    { href: 'pages/audio.html',      label: 'Audio' },
    { href: 'pages/video.html',      label: 'Video' },
    { href: 'pages/iluminacion.html',label: 'Iluminación' },
    { href: 'pages/led.html',        label: 'Pantalla LED' },
    { href: 'pages/traduccion.html', label: 'Traducción simultánea' },
    { href: 'pages/contacto.html',   label: 'Contacto', extraClass: 'nav-link-contact' },
  ];

  const navLinksHTML = links.map(link => {
    const href     = isInPages ? link.href.replace('pages/', '') : link.href;
    const classes  = [];
    if (currentPage === link.href.split('/').pop()) classes.push('active');
    if (link.extraClass) classes.push(link.extraClass);
    const classAttr = classes.length ? ` class="${classes.join(' ')}"` : '';
    return `<li><a href="${href}"${classAttr}>${link.label}</a></li>`;
  }).join('\n');

  const waHref = 'https://wa.me/message/NDOUJD4OSDRYI1';

  // Pulpo pixeleado — imagen real
  const pulpoSrc = isInPages ? '../img/pulpo-pixel.jpeg' : 'img/pulpo-pixel.jpeg';
  const pixelOctopus = `<img src="${pulpoSrc}" alt="pulpo" style="height:44px;width:auto;vertical-align:middle;opacity:0.85;mix-blend-mode:screen;image-rendering:pixelated;" />`;

  const navHTML = `
    <nav class="nav">
      <a href="${homeHref}" class="logo-link">
        <img src="${logoSrc}" alt="Glitch" class="nav-logo-img" />
      </a>
      <ul class="nav-links">${navLinksHTML}</ul>
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
      <p class="footer-copy">
        <span>2026 | GLITCH | CDMX |</span>
        <span class="footer-nerd">${pixelOctopus}<span>Proudly nerdy</span></span>
      </p>
      <div style="display:flex;align-items:center;gap:2rem;flex-wrap:wrap;">
        <div class="footer-links">
          <a href="#">Aviso de privacidad</a>
          <a href="${isInPages ? 'proposito.html' : 'pages/proposito.html'}">About us</a>
          <a href="${ctaHref}">Contacto</a>
        </div>
      </div>
    </footer>`;

  // Inyectar nav solo si no existe ya uno
  if (!document.querySelector('nav.nav')) {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }
  document.body.insertAdjacentHTML('beforeend', footerHTML);
})();
