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

// ── MODAL DATA ────────────────────────────────────────────────────────────────
const MODALS = {
  mouse: {
    num: "P·01 — Dec 2025 – present",
    title: "Ergonomic adjustable mouse",
    imgs: [
      "img/mouse/mouse_kicad.jpg",
    ],
    desc: `Full hardware project from scratch — schematic design, custom PCB layout in KiCad,
           Arduino-based C++ firmware, sensor debugging, and 3D-printed enclosure assembly.`,
    detail: `Integrated ADNS-3080 optical sensor. Hit signal instability early — traced to noise
             on the SPI lines, fixed with hardware filtering and firmware-level debounce.
             Currently transitioning from working breadboard prototype to a manufacturable board revision.`,
    tags: ["C++","Arduino","KiCad","PCB Design","Soldering","3D Print","SPI"],
    links: []
  },
  boat: {
    num: "P·03 — ENGG 200 · Jan–Mar 2026",
    title: "Waterborne rescue vessel",
    imgs: [
      "img/boat/boat.jpg",
      "img/boat/paper_boat.jpg",
      "img/boat/boat_carry.jpg"
    ],
    desc: `Bluetooth-controlled rescue boat built as part of ENGG 200.
           Two Raspberry Pi Picos, dual differential-thrust motors,
           3D-printed planing hull, 200g payload capacity.`,
    detail: `Team of 4. Handled circuit assembly, wiring, and presentation.
             Design went through multiple iterations — initial prototype was
             unstable without ballast, had waterproofing failures from capillary
             action through the PLA hull. Fixed with 260g metal ballast,
             silicone coating, and an Apple mouse container repurposed as a
             waterproof electronics enclosure. Graded A.`,
    tags: ["Python","Raspberry Pi","Bluetooth","Circuit Assembly","Dual Motor","3D Print"],
    links: []
  }
};

// ── MODAL LOGIC ───────────────────────────────────────────────────────────────
const backdrop   = document.getElementById('modalBackdrop');
const modal      = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');

function openModal(key) {
  const d = MODALS[key];
  if (!d) return;
  document.getElementById('modalNum').textContent   = d.num;
  document.getElementById('modalTitle').textContent = d.title;
  const imgs = document.getElementById('modalImgs');
  imgs.innerHTML = '';
  if (d.imgs && d.imgs.length > 0) {
    d.imgs.forEach(src => {
      const div = document.createElement('div');
      div.className = 'modal-img';
      div.innerHTML = `<img src="${src}" alt="">`;
      imgs.appendChild(div);
    });
  } else {
    const div = document.createElement('div');
    div.className = 'modal-img';
    div.textContent = 'photos coming soon';
    imgs.appendChild(div);
  }
  document.getElementById('modalContent').innerHTML = `
    <div class="modal-desc">${d.desc}</div>
    <div class="modal-detail">${d.detail}</div>
    <div class="modal-tags">${d.tags.map(t=>`<span class="rtag">${t}</span>`).join('')}</div>
    ${d.links && d.links.length > 0
      ? `<div class="modal-links">${d.links.map(l=>`<a class="modal-link" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join('')}</div>`
      : ''}
  `;
  backdrop.classList.add('open');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  backdrop.classList.remove('open');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.bc.clickable').forEach(el => {
  el.addEventListener('click', () => openModal(el.dataset.modal));
});
backdrop.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);

// ── BIKE MAP ──────────────────────────────────────────────────────────────────
const bikeBackdrop = document.getElementById('bikeBackdrop');
const bikeModal    = document.getElementById('bikeModal');
const bikeClose    = document.getElementById('bikeClose');
let bikeMap = null;

function openBikeModal() {
  bikeBackdrop.classList.add('open');
  bikeModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (!bikeMap) {
    bikeMap = L.map('bikeMap', { zoomControl: true, scrollWheelZoom: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap', maxZoom: 13,
    }).addTo(bikeMap);
    const route = [
      [47.558,7.588],[47.997,7.842],[48.508,7.735],[49.015,8.404],
      [49.488,8.466],[49.984,8.273],[50.110,8.682],[50.363,7.598],
      [50.938,6.960],[51.221,6.777],[51.663,6.158],[51.842,5.853],[51.923,4.468],
    ];
    const polyline = L.polyline(route, { color:'#1A6FD4', weight:3, opacity:0.85 }).addTo(bikeMap);
    L.circleMarker(route[0], { radius:7, fillColor:'#1A6FD4', color:'#fff', weight:2, fillOpacity:1 })
      .bindPopup('Basel, Switzerland — Start').addTo(bikeMap);
    L.circleMarker(route[route.length-1], { radius:7, fillColor:'#161817', color:'#fff', weight:2, fillOpacity:1 })
      .bindPopup('Rotterdam, Netherlands — End').addTo(bikeMap);
    bikeMap.fitBounds(polyline.getBounds(), { padding:[30,30] });
  } else {
    bikeMap.invalidateSize();
  }
}

function closeBikeModal() {
  bikeBackdrop.classList.remove('open');
  bikeModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('bikeCard').addEventListener('click', openBikeModal);
bikeBackdrop.addEventListener('click', closeBikeModal);
bikeClose.addEventListener('click', closeBikeModal);

// ── ESC to close all ──────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeBikeModal(); }
});