// story.js — Story page specific logic

document.addEventListener('DOMContentLoaded', () => {
  initTimelineObserver();
  initQuoteRotation();
  initRandomStickyRotations();
});

function initTimelineObserver() {
  const items = document.querySelectorAll('.timeline-item');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 120);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(el => obs.observe(el));
}

function initQuoteRotation() {
  const quotes = [
    "Every love story is beautiful, but ours is my favorite.",
    "In all the world, there is no heart for me like yours.",
    "I love you not only for what you are, but for what I am when I am with you.",
    "You are my today and all of my tomorrows.",
    "To love and be loved is to feel the sun from both sides."
  ];
  const el = document.getElementById('rotating-quote');
  if (!el) return;
  let idx = 0;
  function showQuote() {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    setTimeout(() => {
      el.textContent = quotes[idx++ % quotes.length];
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 600);
  }
  showQuote();
  setInterval(showQuote, 5000);
}

function initRandomStickyRotations() {
  document.querySelectorAll('.sticky-note').forEach(el => {
    const angle = (Math.random() - 0.5) * 6;
    el.style.transform = `rotate(${angle}deg)`;
  });
}
