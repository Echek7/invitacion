/* ======================================================
   HERO — KEN BURNS + MOUSE + MÓVIL (CSS VARS ONLY)
====================================================== */
(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  let tx = 0, ty = 0, cx = 0, cy = 0;

  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - 0.5) * 40;
    ty = ((e.clientY - r.top) / r.height - 0.5) * 40;
  });

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', e => {
      if (e.gamma == null || e.beta == null) return;
      tx = e.gamma * 2;
      ty = e.beta * 2;
    });
  }

  function animate() {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;

    hero.style.setProperty('--mx', `${cx}px`);
    hero.style.setProperty('--my', `${cy}px`);

    requestAnimationFrame(animate);
  }

  animate();
})();

/* ======================================================
   PARALLAX SECCIONES — SCROLL + MOUSE + MÓVIL
====================================================== */
(() => {
  const sections = document.querySelectorAll('.section.parallax');
  if (!sections.length) return;

  let mx = 0, my = 0;
  let tx = 0, ty = 0;
  let scrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  document.addEventListener('mousemove', e => {
    tx = (e.clientX / window.innerWidth - 0.5) * 40;
    ty = (e.clientY / window.innerHeight - 0.5) * 40;
  }, { passive: true });

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', e => {
      if (e.gamma == null || e.beta == null) return;
      tx = e.gamma * 2;
      ty = e.beta * 2;
    }, { passive: true });
  }

  function animate() {
    mx += (tx - mx) * 0.04;
    my += (ty - my) * 0.04;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const progress =
        (window.innerHeight - rect.top) /
        (window.innerHeight + rect.height);

      const eased = Math.min(Math.max(progress, 0), 1);

      const py = (eased - 0.5) * 700;
      const pyClamped = Math.max(Math.min(py, 320), -320);

      section.style.setProperty('--px', `${mx}px`);
      section.style.setProperty('--py', `${pyClamped + my}px`);
    });

    requestAnimationFrame(animate);
  }

  animate();
})();


/* ======================================================
   REVEAL — ENTRADA SUAVE Y PRONUNCIADA (MÓVIL FIRST)
====================================================== */
(() => {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15
  });

  items.forEach(el => io.observe(el));
})();

/* ======================================================
   TARJETA REGALOS — CIERRE REAL
====================================================== */
(() => {
  const btn = document.querySelector('.btn-gifts-toggle');
  const card = document.querySelector('.gifts-card');
  const section = document.querySelector('.section-gifts');

  if (!btn || !card || !section) return;

  let open = false;

  const openCard = () => {
    open = true;
    card.hidden = false;
    card.classList.add('active');
  };

  const closeCard = () => {
    open = false;
    card.classList.remove('active');
    setTimeout(() => card.hidden = true, 300);
  };

  btn.addEventListener('click', e => {
    e.stopPropagation();
    open ? closeCard() : openCard();
  });

  document.addEventListener('click', e => {
    if (open && !card.contains(e.target) && e.target !== btn) {
      closeCard();
    }
  });

  document.addEventListener('scroll', () => {
    const r = section.getBoundingClientRect();
    if (open && (r.bottom < 0 || r.top > window.innerHeight)) {
      closeCard();
    }
  });
})();

/*-- smooth blocks --*/
(() => {
  const sections = document.querySelectorAll('.section');

  const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.2
});


  sections.forEach(sec => {
    sec.classList.add('enter');
    io.observe(sec);
  });
})();

/*=============================
Form
==================*/
(() => {
  const toggle = document.querySelector('.btn-form-toggle');
  const form = document.querySelector('.rsvp-form');

  if (!toggle || !form) return;

  toggle.addEventListener('click', () => {
    form.classList.toggle('active');
  });
})();

/*====Musica===*/
const music = document.getElementById('bg-music');
const toggle = document.getElementById('music-toggle');

toggle.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    toggle.textContent = '⏸';
  } else {
    music.pause();
    toggle.textContent = '▶';
  }
});
