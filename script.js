const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.dot')];
let current = 0;
let timer;

function showSlide(index) {
  current = index;
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function startCarousel() {
  clearInterval(timer);
  timer = setInterval(() => {
    showSlide((current + 1) % slides.length);
  }, 5500);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);
    startCarousel();
  });
});

if (slides.length) {
  showSlide(0);
  startCarousel();
}

const counters = document.querySelectorAll('.counter');
let counted = false;

const numbersSection = document.querySelector('.numbers');

if (numbersSection) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting) && !counted) {
      counted = true;

      counters.forEach((el) => {
        const target = Number(el.dataset.target);
        const duration = 1300;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          el.textContent = Math.floor(target * eased);

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = target;
          }
        }

        requestAnimationFrame(tick);
      });
    }
  }, { threshold: 0.35 });

  observer.observe(numbersSection);
}

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('mobile-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
}
