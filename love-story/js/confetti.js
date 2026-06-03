// confetti.js — Canvas confetti effect

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  initConfetti(canvas);
});

function initConfetti(canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const colors = ['#e8637a','#c0395a','#f9d0d9','#d4a96a','#fff0f3','#8b1a3a','#fce4ec'];
  const shapes = ['❤️','🌹','✨','💕','🌸','💝','⭐','💗'];
  const particles = [];

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * canvas.width;
      this.y = init ? Math.random() * canvas.height - canvas.height : -20;
      this.size = 6 + Math.random() * 14;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.shape = shapes[Math.floor(Math.random() * shapes.length)];
      this.speedX = (Math.random() - 0.5) * 3;
      this.speedY = 1.5 + Math.random() * 3;
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = (Math.random() - 0.5) * 0.15;
      this.opacity = 0.7 + Math.random() * 0.3;
      this.useEmoji = Math.random() > 0.4;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.angle += this.angleSpeed;
      this.speedX += (Math.random() - 0.5) * 0.08;
      if (this.y > canvas.height + 30) this.reset();
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.opacity;
      if (this.useEmoji) {
        ctx.font = `${this.size}px serif`;
        ctx.fillText(this.shape, -this.size / 2, this.size / 2);
      } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  let running = true;
  function animate() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

  // Burst on click
  document.addEventListener('click', burst);
  function burst(e) {
    for (let i = 0; i < 20; i++) {
      const p = new Particle();
      p.x = e.clientX; p.y = e.clientY;
      p.speedX = (Math.random() - 0.5) * 10;
      p.speedY = (Math.random() - 0.8) * 8;
      particles.push(p);
    }
  }
}
