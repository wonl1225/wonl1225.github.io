// ── MOBILE NAV TOGGLE ──────────────────────────
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });
  // close on link tap
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── CURSOR (hover-capable devices only) ────────
const isHover = window.matchMedia('(hover: hover)').matches;
if (isHover) {
  const cur  = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * .1; ry += (my - ry) * .1;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a,.chip,.ctag,.r-card,.bc,.bcard,.clink,.album-card,.bc.clickable').forEach(el=>{
    el.addEventListener('mouseenter', () => {
      cur.style.width  = '12px'; cur.style.height  = '12px';
      ring.style.width = '40px'; ring.style.height = '40px';
      ring.style.borderColor = 'rgba(26,111,212,0.7)';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.width  = '7px'; cur.style.height  = '7px';
      ring.style.width = '26px'; ring.style.height = '26px';
      ring.style.borderColor = 'rgba(26,111,212,0.4)';
    });
  });
}

// ── SCROLL REVEAL ───────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── GPA BARS ────────────────────────────────────
const gObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.w + '%';
      gObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.gpa-fill').forEach(b => gObs.observe(b));