/* ============================
   SURAJ MEDICOS — script.js
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
  console.log("Suraj Medicos Engine Started...");
  // Manually trigger the first render to ensure items appear
  renderProducts('all');
  buildTipsCarousel();
});

// ─── PRELOADER ───────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 1800);
});

// ─── CUSTOM CURSOR ───────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .tab, .product-card, .service-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    follower.style.width = '60px';
    follower.style.height = '60px';
    follower.style.borderColor = '#00c896';
    follower.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.width = '36px';
    follower.style.height = '36px';
    follower.style.borderColor = '#00c896';
    follower.style.opacity = '0.5';
  });
});

// ─── NAVBAR SCROLL ───────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── HAMBURGER ───────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ─── SCROLL TO TOP ────────────────────────────────
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('show', window.scrollY > 400);
});
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

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

// ─── SCROLL REVEAL ────────────────────────────────
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

// Counter animation trigger
// --- IMPROVED STATS OBSERVER ---
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // If the stats section is visible on screen
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target); // Stop watching after it starts
    }
  });
}, { threshold: 0.2 }); // Triggers when 20% of the section is visible

const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
    statsObserver.observe(statsEl);
} else {
    // Emergency Backup: If the observer fails, just start the numbers
    setTimeout(animateCounters, 2000);
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
  
  // Re-observe reveal cards
  grid.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.05) + 's';
    revealObserver.observe(el);
  });
}

renderProducts();

// Filter tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderProducts(tab.dataset.cat);
  });
});

// Cart toast
/* ============================================================
   UPDATED CART & INTERACTION LOGIC (REPLACE YOUR OLD VERSION)
   ============================================================ */

// 1. FIXED: Append the dynamic style to the head so animations work
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeDown {
    to { opacity:0; transform:translateX(-50%) translateY(20px); }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateX(-50%) translateY(20px); }
    to { opacity:1; transform:translateX(-50%) translateY(0); }
  }
`;
document.head.appendChild(style); // THIS WAS MISSING

// 2. ENHANCED: Smart Ordering Logic
function addToCart(name) {
  // Check if it's a prescription drug (simple check for demo)
  const isPrescription = name.toLowerCase().includes('amoxicillin') || 
                         name.toLowerCase().includes('antibiotic');

  if (isPrescription) {
    showToast(`📝 Prescription Required for ${name}`);
  } else {
    showToast(`✅ ${name} added to inquiry!`);
  }

  // PIVOT TO INTERACTION: Open WhatsApp or AI after a short delay
  setTimeout(() => {
    const phone = "919650057400"; // Your Suraj Medicos Number
    const msg = encodeURIComponent(`Hello Suraj Medicos! I want to order ${name}. Please let me know the price and delivery time.`);
    
    // Option A: Open WhatsApp (Direct Sale)
    // window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');

    // Option B: Trigger Botpress AI (Better for consultation)
    if (window.botpress && window.botpress.sendEvent) {
      window.botpress.sendEvent({ type: 'show' });
      window.botpress.sendPayload({
        type: 'text',
        text: `I want to order ${name}.`
      });
    }
  }, 1000);
}

// Keep your existing showToast function below this...


function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:90px; left:50%; transform:translateX(-50%);
    background:#00c896; color:#0d1117; padding:12px 24px; border-radius:50px;
    font-weight:600; font-size:0.9rem; z-index:9999;
    animation: fadeUp 0.3s ease, fadeDown 0.3s 2s ease forwards;
    box-shadow: 0 8px 30px rgba(0,200,150,0.4);
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ─── HEALTH TIPS CAROUSEL ─────────────────────────
const tips = [
  { icon: '💧', title: 'Stay Hydrated', text: 'Drink at least 8 glasses of water daily. Proper hydration supports kidney function, skin health, and energy levels throughout the day.' },
  { icon: '🥗', title: 'Balanced Diet', text: 'Include a rainbow of vegetables, lean proteins, whole grains, and healthy fats. A balanced diet is the foundation of long-term health.' },
  { icon: '🚶', title: 'Daily Exercise', text: 'Even a 30-minute walk daily can reduce the risk of heart disease, diabetes, and depression significantly. Start small, stay consistent.' },
  { icon: '😴', title: 'Quality Sleep', text: 'Adults need 7–9 hours of quality sleep. Good sleep improves memory, mood, immunity, and metabolism.' },
  { icon: '💊', title: 'Medicine Compliance', text: 'Always complete the full course of prescribed medicines. Never self-medicate — consult a licensed pharmacist or doctor first.' },
];

let tipIdx = 0;

function buildTipsCarousel() {
  const carousel = document.getElementById('tipsCarousel');
  const dotsEl = document.getElementById('tipsDots');
  
  carousel.innerHTML = `<div class="tips-track" id="tipsTrack">
    ${tips.map(t => `
      <div class="tip-slide">
        <div class="tip-card">
          <div class="tip-icon">${t.icon}</div>
          <div>
            <h3>${t.title}</h3>
            <p>${t.text}</p>
          </div>
        </div>
      </div>
    `).join('')}
  </div>`;
  
  dotsEl.innerHTML = tips.map((_, i) =>
    `<div class="tip-dot ${i===0?'active':''}" onclick="goTip(${i})"></div>`
  ).join('');
}

function goTip(i) {
  tipIdx = i;
  const track = document.getElementById('tipsTrack');
  if (track) track.style.transform = `translateX(-${i * 100}%)`;
  document.querySelectorAll('.tip-dot').forEach((d, idx) =>
    d.classList.toggle('active', idx === i)
  );
}

buildTipsCarousel();
setInterval(() => goTip((tipIdx + 1) % tips.length), 4000);

// ─── CONTACT FORM ─────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '⏳ Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message 📨';
    btn.disabled = false;
    document.getElementById('formSuccess').style.display = 'block';
    e.target.reset();
    setTimeout(() => {
      document.getElementById('formSuccess').style.display = 'none';
    }, 5000);
  }, 1500);
});

// ─── ADD FADE-DOWN KEYFRAME DYNAMICALLY ───────────
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeDown {
    to { opacity:0; transform:translateX(-50%) translateY(20px); }
  }
`;
document.head.appendChild(style);
