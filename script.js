/* ============================
   SURAJ MEDICOS — script.js
   ============================ */

// 1. INITIALIZE ON LOAD
document.addEventListener('DOMContentLoaded', () => {
  console.log("Suraj Medicos Engine Started...");
  
  // Start the visual components
  renderProducts('all');
  buildTipsCarousel();
  
  // Set up observers
  setupScrollReveal();
  setupStatsCounter();
});

// ─── PRELOADER ───────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
  }, 1000); // Reduced delay for better feel
});

// ─── CUSTOM CURSOR ───────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  if (follower) {
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

// ─── NAVBAR & MENU ───────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ─── SCROLL TO TOP ────────────────────────────────
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (scrollBtn) scrollBtn.classList.toggle('show', window.scrollY > 400);
});
if (scrollBtn) scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── COUNTER ANIMATION ────────────────────────────
function animateCounters() {
  document.querySelectorAll('.num').forEach(el => {
    const target = +el.dataset.target;
    let count = 0;
    const step = target / 80;
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = Math.floor(count);
      if (count >= target) clearInterval(timer);
    }, 20);
  });
}

function setupStatsCounter() {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });
  
  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) statsObserver.observe(statsEl);
}

// ─── SCROLL REVEAL ────────────────────────────────
function setupScrollReveal() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .product-card, .testi-card, .why-item, .ahl').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}

// ─── PRODUCTS DATA ────────────────────────────────
const products = [
  { icon: '💊', name: 'Paracetamol 500mg', cat: 'otc', category: 'OTC Medicine', price: '₹28', original: '₹35' },
  { icon: '🩸', name: 'Glucometer Kit', cat: 'diagnostic', category: 'Diagnostic', price: '₹899', original: '₹1,200' },
  { icon: '💉', name: 'Disposable Syringe Pack', cat: 'surgical', category: 'Surgical', price: '₹120', original: '₹150' },
  { icon: '🌿', name: 'Ashwagandha 60 Caps', cat: 'vitamin', category: 'Herbal', price: '₹249', original: '₹320' },
  { icon: '🧴', name: 'Antiseptic Cream 50g', cat: 'personal', category: 'Personal Care', price: '₹85', original: '₹100' },
  { icon: '💊', name: 'Amoxicillin 500mg', cat: 'otc', category: 'OTC Medicine', price: '₹65', original: '₹80' },
  { icon: '🩺', name: 'BP Monitor Digital', cat: 'diagnostic', category: 'Diagnostic', price: '₹1,299', original: '₹1,800' },
  { icon: '🌿', name: 'Vitamin D3 Supplements', cat: 'vitamin', category: 'Vitamins', price: '₹190', original: '₹240' },
  { icon: '🧪', name: 'Pregnancy Test Kit', cat: 'diagnostic', category: 'Diagnostic', price: '₹49', original: '₹70' },
  { icon: '💊', name: 'Cetirizine 10mg Strip', cat: 'otc', category: 'OTC Medicine', price: '₹32', original: '₹40' },
  { icon: '🩹', name: 'Bandage Roll 4"', cat: 'surgical', category: 'Surgical', price: '₹55', original: '₹70' },
  { icon: '🧴', name: 'Hand Sanitizer 500ml', cat: 'personal', category: 'Personal Care', price: '₹149', original: '₹190' },
];

function renderProducts(filter = 'all') {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  
  const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card reveal">
      <div class="product-img">${p.icon}</div>
      <div class="product-info">
        <div class="product-cat">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">
          <span class="original">${p.original}</span>${p.price}
        </div>
        <button class="product-btn" onclick="addToCart('${p.name}')">🛒 Add to Cart</button>
      </div>
    </div>
  `).join('');
}

// ─── CART & TOAST ─────────────────────────────────
function addToCart(name) {
  const isPrescription = name.toLowerCase().includes('amoxicillin');
  if (isPrescription) {
    showToast(`📝 Prescription Required for ${name}`);
  } else {
    showToast(`✅ ${name} added!`);
  }

  // AI Interaction
  setTimeout(() => {
    if (window.botpress && window.botpress.sendEvent) {
      window.botpress.sendEvent({ type: 'show' });
      window.botpress.sendPayload({ type: 'text', text: `I want to order ${name}.` });
    }
  }, 1000);
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.style.cssText = `
    position:fixed; bottom:90px; left:50%; transform:translateX(-50%);
    background:#00c896; color:#0d1117; padding:12px 24px; border-radius:50px;
    font-weight:600; font-size:0.9rem; z-index:9999;
    box-shadow: 0 8px 30px rgba(0,200,150,0.4);
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ─── HEALTH TIPS CAROUSEL ─────────────────────────
const tips = [
  { icon: '💧', title: 'Stay Hydrated', text: 'Drink at least 8 glasses of water daily.' },
  { icon: '🥗', title: 'Balanced Diet', text: 'Include a rainbow of vegetables and lean proteins.' },
  { icon: '😴', title: 'Quality Sleep', text: 'Adults need 7–9 hours of quality sleep.' },
];

function buildTipsCarousel() {
  const carousel = document.getElementById('tipsCarousel');
  const dotsEl = document.getElementById('tipsDots');
  if (!carousel || !dotsEl) return;
  
  carousel.innerHTML = `<div class="tips-track" id="tipsTrack">
    ${tips.map(t => `
      <div class="tip-slide">
        <div class="tip-card">
          <div class="tip-icon">${t.icon}</div>
          <div><h3>${t.title}</h3><p>${t.text}</p></div>
        </div>
      </div>
    `).join('')}
  </div>`;
}

// ─── DYNAMIC STYLES (Single Declaration) ───────────
const customStyles = document.createElement('style');
customStyles.textContent = `
  @keyframes fadeDown { to { opacity:0; transform:translateX(-50%) translateY(20px); } }
  @keyframes fadeUp { from { opacity:0; transform:translateX(-50%) translateY(20px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
  .reveal { opacity: 0; transform: translateY(30px); transition: 0.8s all ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(customStyles);
