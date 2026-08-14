(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isInPages   = window.location.pathname.includes('/pages/');
  const ctaHref     = isInPages ? 'contacto.html'  : 'pages/contacto.html';
  const homeHref    = isInPages ? '../index.html'   : 'index.html';
  const logoSrc     = isInPages ? '../logo.jpeg'    : 'logo.jpeg';

  const links = [
    { href: 'pages/audio.html',      label: 'Audio' },
    { href: 'pages/video.html',      label: 'Video' },
    { href: 'pages/iluminacion.html',label: 'Iluminación' },
    { href: 'pages/led.html',        label: 'Pantalla LED' },
    { href: 'pages/traduccion.html', label: 'Traducción' },
    { href: 'pages/contacto.html',   label: 'Contacto' },
  ];

  const navLinksHTML = links.map(link => {
    const href     = isInPages ? link.href.replace('pages/', '') : link.href;
    const isActive = currentPage === link.href.split('/').pop() ? ' class="active"' : '';
    return `<li><a href="${href}"${isActive}>${link.label}</a></li>`;
  }).join('\n');

  // Pulpo pixeleado — imagen real
  const pulpoSrc = isInPages ? '../img/pulpo-pixel.jpeg' : 'img/pulpo-pixel.jpeg';
  const pixelOctopus = `<img src="${pulpoSrc}" alt="pulpo" style="height:28px;width:auto;vertical-align:middle;opacity:0.55;filter:brightness(10);image-rendering:pixelated;" />`;

  const navHTML = `
    <nav class="nav">
      <a href="${homeHref}" class="logo-link">
        <img src="${logoSrc}" alt="Glitch" class="nav-logo-img" />
      </a>
      <ul class="nav-links">${navLinksHTML}</ul>
      <a href="${ctaHref}" class="nav-cta">Solicitar cotización</a>
    </nav>`;

  const footerHTML = `
    <footer class="footer">
      <div class="footer-logo-wrap">
        <img src="${logoSrc}" alt="Glitch" class="footer-logo-img" />
      </div>
      <p class="footer-copy">© 2025 Glitch · Ciudad de México</p>
      <div style="display:flex;align-items:center;gap:2rem;flex-wrap:wrap;">
        <div class="footer-links">
          <a href="#">Aviso de privacidad</a>
          <a href="#">Términos</a>
          <a href="${ctaHref}">Contacto</a>
        </div>
        <span class="footer-nerd">
          ${pixelOctopus}
          <span>Proudly nerd</span>
        </span>
      </div>
    </footer>`;

  // Inyectar nav solo si no existe ya uno
  if (!document.querySelector('nav.nav')) {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }
  document.body.insertAdjacentHTML('beforeend', footerHTML);
})();
