// scratch.js — Scratch card logic using canvas

document.addEventListener('DOMContentLoaded', initScratchCards);

function initScratchCards() {
  document.querySelectorAll('.scratch-canvas').forEach(canvas => {
    setupScratchCard(canvas);
  });
}

function setupScratchCard(canvas) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.offsetWidth || 240;
  const h = canvas.height = canvas.offsetHeight || 240;

  // Gradient cover
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#e8637a');
  grad.addColorStop(0.5, '#c0395a');
  grad.addColorStop(1, '#8b1a3a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Text on cover
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = `bold 1.2rem 'Dancing Script', cursive`;
  ctx.textAlign = 'center';
  ctx.fillText('✨ Scratch Me ✨', w / 2, h / 2 - 10);
  ctx.font = `0.75rem Lato, sans-serif`;
  ctx.fillText('A surprise awaits...', w / 2, h / 2 + 20);

  let scratching = false;
  let scratchedPercent = 0;

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function scratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    checkScratched();
  }

  function checkScratched() {
    const pixels = ctx.getImageData(0, 0, w, h).data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++;
    }
    scratchedPercent = (transparent / (pixels.length / 4)) * 100;
    if (scratchedPercent > 55) {
      ctx.clearRect(0, 0, w, h);
      canvas.style.pointerEvents = 'none';
      canvas.style.opacity = '0';
      canvas.style.transition = 'opacity 0.5s ease';
      const hint = canvas.parentElement.nextElementSibling;
      if (hint) hint.textContent = '💕 Found with love!';
    }
  }

  canvas.addEventListener('mousedown', e => { scratching = true; const p = getPos(e); scratch(p.x, p.y); });
  canvas.addEventListener('mousemove', e => { if (!scratching) return; const p = getPos(e); scratch(p.x, p.y); });
  canvas.addEventListener('mouseup', () => { scratching = false; });
  canvas.addEventListener('mouseleave', () => { scratching = false; });
  canvas.addEventListener('touchstart', e => { e.preventDefault(); scratching = true; const p = getPos(e); scratch(p.x, p.y); }, { passive: false });
  canvas.addEventListener('touchmove', e => { e.preventDefault(); if (!scratching) return; const p = getPos(e); scratch(p.x, p.y); }, { passive: false });
  canvas.addEventListener('touchend', () => { scratching = false; });
}
