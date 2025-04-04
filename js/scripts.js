document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sporeCanvas');
  const ctx = canvas.getContext('2d');
  const spores = [];
  const maxDistance = 100;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createSpore(x, y) {
    return { x, y, radius: 3 };
  }

  function drawSpore(spore) {
    ctx.beginPath();
    ctx.arc(spore.x, spore.y, spore.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
    ctx.fill();
  }

  function connectSpores(spore1, spore2) {
    const dx = spore1.x - spore2.x;
    const dy = spore1.y - spore2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < maxDistance) {
      ctx.beginPath();
      ctx.moveTo(spore1.x, spore1.y);
      ctx.lineTo(spore2.x, spore2.y);
      ctx.strokeStyle = `rgba(255, 0, 0, ${1 - distance / maxDistance})`;
      ctx.stroke();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spores.forEach(spore => drawSpore(spore));
    for (let i = 0; i < spores.length; i++) {
      for (let j = i + 1; j < spores.length; j++) {
        connectSpores(spores[i], spores[j]);
      }
    }
  }

  canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    spores.push(createSpore(x, y));
    draw();
  });

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
});
