// ─── LOADING SCREEN ───
function initLoading() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;
  setTimeout(() => { screen.classList.add('hidden'); }, 2800);
}

// ─── FLOATING HEARTS ───
function initHearts() {
  const layer = document.querySelector('.hearts-layer');
  if (!layer) return;
  const emojis = ['❤️','🌹','💕','💗','🌸','💝','✨','💖'];
  function spawnHeart() {
    const el = document.createElement('div');
    el.className = 'heart-particle';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
    el.style.animationDuration = (8 + Math.random() * 10) + 's';
    el.style.animationDelay = (Math.random() * 3) + 's';
    layer.appendChild(el);
    setTimeout(() => el.remove(), 20000);
  }
  for (let i = 0; i < 12; i++) setTimeout(spawnHeart, i * 400);
  setInterval(spawnHeart, 1200);
}

// ─── FLOATING PETALS (HOME) ───
function initPetals() {
  const hero = document.querySelector('.hero-bg');
  if (!hero) return;
  const petals = ['🌸','🌺','🌷','🍀','✨'];
  for (let i = 0; i < 15; i++) {
    const el = document.createElement('div');
    el.className = 'petal';
    el.textContent = petals[Math.floor(Math.random() * petals.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.top = Math.random() * 100 + '%';
    el.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
    el.style.animationDuration = (10 + Math.random() * 15) + 's';
    el.style.animationDelay = (Math.random() * 10) + 's';
    hero.appendChild(el);
  }
}

// ─── MUSIC TOGGLE ───
function initMusic() {
  const btn = document.getElementById('music-btn');
  const audio = document.getElementById('bg-audio');
  if (!btn || !audio) return;

  let playing = false;
  audio.volume = 0.35;

  // Try autoplay
  audio.play().then(() => {
    playing = true;
    btn.textContent = '🎵';
  }).catch(() => {
    playing = false;
    btn.textContent = '🔇';
  });

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      btn.textContent = '🔇';
    } else {
      audio.play();
      btn.textContent = '🎵';
    }
    playing = !playing;
  });
}

// ─── PAGE TRANSITIONS ───
function initPageTransitions() {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;inset:0;z-index:9998;
        background:linear-gradient(135deg,#c0395a,#3d0a1e);
        transform:scaleX(0);transform-origin:left;
        transition:transform 0.5s cubic-bezier(0.76,0,0.24,1);
      `;
      document.body.appendChild(overlay);
      requestAnimationFrame(() => {
        overlay.style.transform = 'scaleX(1)';
        setTimeout(() => { window.location.href = href; }, 520);
      });
    });
  });
}

// ─── SCROLL ANIMATIONS ───
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .zoom-in, .timeline-item, .gallery-item');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

// ─── TYPEWRITER EFFECT ───
function typeWriter(el, text, speed = 45, cb) {
  el.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i++);
      setTimeout(type, speed + Math.random() * 20);
    } else if (cb) cb();
  }
  type();
}

function initTypewriters() {
  const els = document.querySelectorAll('[data-typewriter]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const text = e.target.dataset.typewriter;
        typeWriter(e.target, text, 40);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(el => obs.observe(el));
}

// ─── PARALLAX ───
function initParallax() {
  const bgs = document.querySelectorAll('.parallax-bg');
  if (!bgs.length) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    bgs.forEach(bg => {
      bg.style.transform = `translateY(${y * 0.3}px)`;
    });
  }, { passive: true });
}

// ─── NAV ACTIVE STATE ───
function initNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === 'index.html' && href === '#')) {
      a.classList.add('active');
    }
  });
}

// ─── POLAROID ROTATIONS ───
function initPolaroids() {
  document.querySelectorAll('.polaroid').forEach(p => {
    const angle = (Math.random() - 0.5) * 8;
    p.style.transform = `rotate(${angle}deg)`;
  });
}

// ─── INIT ALL ───
document.addEventListener('DOMContentLoaded', () => {
  initLoading();
  initHearts();
  initPetals();
  initMusic();
  initPageTransitions();
  initScrollAnimations();
  initTypewriters();
  initParallax();
  initNav();
  initPolaroids();
});
