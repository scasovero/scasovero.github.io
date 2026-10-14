(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menú');
    }));
  }
  const dots = document.querySelectorAll('.hero-dots i');
  if (dots.length) {
    let current = 0;
    window.setInterval(() => {
      current = (current + 1) % dots.length;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }, 7000);
  }
  if (new URLSearchParams(window.location.search).get('enviado') === '1') {
    const form = document.querySelector('.contact-form');
    if (form) {
      const notice = document.createElement('p');
      notice.className = 'form-notice';
      notice.setAttribute('role', 'status');
      notice.textContent = 'Gracias por escribirnos. Tu consulta fue enviada.';
      form.prepend(notice);
    }
  }
})();