/* =========================================================
   HERO — MOVIMIENTO POR MOUSE Y MÓVIL (KEN + PARALLAX)
========================================================= */
const heroBg = document.querySelector('.hero-bg-inner');
const heroPortrait = document.querySelector('.hero-portrait-inner');

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

// Mouse
document.addEventListener('mousemove', (e) => {
  targetX = (e.clientX / window.innerWidth - 0.5);
  targetY = (e.clientY / window.innerHeight - 0.5);
});

// Reset cuando sale el mouse
document.addEventListener('mouseleave', () => {
  targetX = 0;
  targetY = 0;
});

// Móvil
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', (e) => {
    if (e.gamma !== null && e.beta !== null) {
      targetX = Math.max(Math.min(e.gamma / 30, 1), -1);
      targetY = Math.max(Math.min(e.beta / 30, 1), -1);
    }
  }, { passive: true });
}

function animateHero() {
  currentX += (targetX - currentX) * 0.06;
  currentY += (targetY - currentY) * 0.06;

  if (heroBg) {
    heroBg.style.transform =
      `translate(${currentX * 14}px, ${currentY * 14}px) scale(1.12)`;
  }

  if (heroPortrait) {
    heroPortrait.style.transform =
      `translate(${currentX * 18}px, ${currentY * 18}px)`;
  }

  requestAnimationFrame(animateHero);
}
animateHero();

/* =========================================================
   SECCIONES PARALLAX
========================================================= */
function initSectionParallax(
  sectionSelector,
  bgSelector,
  scrollFactor = 620,
  mouseFactor = 20,
  tiltFactor = 0.6
) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  const bg = section.querySelector(bgSelector);
  if (!bg) return;

  let mouseX = 0, mouseY = 0;
  let tiltX = 0, tiltY = 0;
  let scrollOffset = 0;

  const isMobile = window.matchMedia('(max-width: 992px)').matches;

  function updateScroll() {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    if (rect.bottom < 0 || rect.top > vh) return;

    const progress = 1 - (rect.bottom / (vh + rect.height));
    scrollOffset = (progress - 0.5) * scrollFactor;
  }

  window.addEventListener('scroll', updateScroll, { passive: true });

  if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * mouseFactor;
      mouseY = (e.clientY / window.innerHeight - 0.5) * mouseFactor;
    });
  } else if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma !== null && e.beta !== null) {
        tiltX = e.gamma * tiltFactor;
        tiltY = e.beta * tiltFactor;
      }
    }, { passive: true });
  }

  function render() {
    const x = isMobile ? tiltX : mouseX;
    const y = isMobile ? tiltY : mouseY;
    bg.style.transform =
      `translate3d(${x}px, ${scrollOffset + y}px, 0)`;
    requestAnimationFrame(render);
  }

  updateScroll();
  render();
}

initSectionParallax('.section-itinerary', '.parallax-bg');

/* TARJETA REGALOS — CIERRE GARANTIZADO */
(() => {
  const btn = document.querySelector('.btn-gifts-toggle');
  const card = document.querySelector('.gifts-card');
  const section = card?.closest('.section');

  if (!btn || !card || !section) return;

  let open = false;

  const openCard = () => {
    open = true;
    card.classList.add('active');
    document.body.classList.add('gifts-open');
  };

  const closeCard = () => {
    open = false;
    card.classList.remove('active');
    document.body.classList.remove('gifts-open');
  };

  btn.addEventListener('click', e => {
    e.stopPropagation();
    open ? closeCard() : openCard();
  });

  // CIERRE REAL: salir de sección
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && open) closeCard();
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(section);
})();


  // Parallax tarjeta en móvil
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (!isOpen) return;
      const max = 15;
      const x = Math.max(Math.min(e.gamma || 0, max), -max);
      const y = Math.max(Math.min(e.beta || 0, max), -max);
      giftsCard.style.transform =
        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`;
    }, { passive: true });
  }

