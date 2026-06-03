// gallery.js — Gallery page logic

document.addEventListener('DOMContentLoaded', () => {
  initGalleryModal();
  initGalleryObserver();
  initGalleryTilt();
});

function initGalleryObserver() {
  const items = document.querySelectorAll('.gallery-item');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), (i % 4) * 100);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05 });
  items.forEach(el => obs.observe(el));
}

function initGalleryModal() {
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');
  if (!modal) return;

  document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.src;
      const label = item.dataset.label || '';
      modalImg.src = src;
      modalImg.alt = label;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Click emoji items (placeholders)
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      if (!item.dataset.src) return;
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function initGalleryTilt() {
  document.querySelectorAll('.gallery-item').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
