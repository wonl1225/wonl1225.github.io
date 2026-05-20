// OSCILLOSCOPE
const c = document.getElementById('scope');
if (c) {
  const ctx = c.getContext('2d');
  function resizeScope() { c.width = c.offsetWidth; c.height = c.offsetHeight; }
  resizeScope();
  window.addEventListener('resize', resizeScope);
  let phase = 0;
  function drawScope() {
    const W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);
    // grid
    const cols = 8, rows = 6;
    ctx.strokeStyle = 'rgba(208,215,209,0.9)'; ctx.lineWidth = 0.5;
    for (let i = 0; i <= cols; i++) { const x = W / cols * i; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let j = 0; j <= rows; j++) { const y = H / rows * j; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    // center ticks
    ctx.strokeStyle = 'rgba(138,144,139,0.35)'; ctx.lineWidth = 0.5;
    for (let i = 0; i <= cols * 4; i++) { const x = W / cols / 4 * i; ctx.beginPath(); ctx.moveTo(x, H / 2 - 4); ctx.lineTo(x, H / 2 + 4); ctx.stroke(); }
    // CH2 — muted
    ctx.beginPath(); ctx.strokeStyle = 'rgba(94,114,145,0.3)'; ctx.lineWidth = 1.5;
    for (let x = 0; x < W; x++) {
      const t = x / W;
      const y = H / 2 + Math.sin(t * Math.PI * 4 + phase * .6) * H * .11 + Math.sin(t * Math.PI * 8 + phase * .4) * H * .04;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    // CH1 — main blue
    ctx.beginPath(); ctx.strokeStyle = '#1A6FD4'; ctx.lineWidth = 2;
    for (let x = 0; x < W; x++) {
      const t = x / W;
      const y = H / 2 + Math.sin(t * Math.PI * 6 + phase) * H * .28
        + Math.sin(t * Math.PI * 13 + phase * 1.3) * H * .07
        + Math.sin(t * Math.PI * 2.5 + phase * .5) * H * .06;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    // trigger line
    ctx.strokeStyle = 'rgba(26,111,212,0.25)'; ctx.lineWidth = 0.5; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
    ctx.setLineDash([]);
    // trigger arrow
    ctx.fillStyle = '#1A6FD4';
    ctx.beginPath(); ctx.moveTo(8, H / 2 - 6); ctx.lineTo(16, H / 2); ctx.lineTo(8, H / 2 + 6); ctx.fill();
    phase += 0.022;
    requestAnimationFrame(drawScope);
  }
  drawScope();
}