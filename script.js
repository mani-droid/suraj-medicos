/* ============================
   SURAJ MEDICOS — script.js
   ============================ */

// ─── 1. ENGINE START ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  console.log("Suraj Medicos Engine Started...");
  renderProducts('all');
  buildTipsCarousel();
  setupScrollReveal();
  setupStatsCounter();
  
  // This turns on the live search bar
  if (typeof setupLiveSearch === 'function') setupLiveSearch(); 
  
  // This waits 2 seconds, then turns on the Typewriter
  setTimeout(startTypewriter, 2000); 
  // NEW FUNCTIONS
  updateCartBadge();   // Checks memory for old cart items
  checkStoreStatus();  // Checks the clock for Open/Closed
  setupFAQ();          // Turns on the Accordion clicks
});

// ─── 2. PRELOADER ─────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
  }, 1000);
});

// ─── 3. CUSTOM CURSOR ─────────────────────────────
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

// ─── 4. NAVBAR & SCROLL TO TOP ────────────────────
const navbar = document.getElementById('navbar');
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
  if (scrollBtn) scrollBtn.classList.toggle('show', window.scrollY > 400);
});

if (scrollBtn) scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ─── 5. STATS COUNTER ─────────────────────────────
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

// ─── 6. PRODUCTS & LIVE SEARCH ────────────────────
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
  { icon: '🧴', name: 'Hand Sanitizer 500ml', cat: 'personal', category: 'Personal Care', price: '₹149', original: '₹190' }
];

function renderProducts(filter = 'all', searchTerm = '') {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  
  let filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);
  
  if (searchTerm) {
    filtered = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.category.toLowerCase().includes(searchTerm)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="text-align:center; grid-column: 1/-1; color: var(--text-muted); padding: 40px 0;">No products found for "${searchTerm}". Try asking our AI or on WhatsApp!</p>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card reveal visible" style="opacity: 1; transform: none;">
      <div class="product-img">${p.icon}</div>
      <div class="product-info">
        <div class="product-cat">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price"><span class="original">${p.original}</span>${p.price}</div>
        <button class="product-btn" onclick="addToCart('${p.name}')">🛒 Add to Cart</button>
      </div>
    </div>
  `).join('');
}

// Category Tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderProducts(tab.dataset.cat);
    const searchInput = document.getElementById('searchInput');
    if(searchInput) searchInput.value = ''; // clear search when switching tabs
  });
});

// Live Search logic
function setupLiveSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      // Remove active state from tabs when searching
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      renderProducts('all', e.target.value.toLowerCase());
    });
  }
}

// ─── 7. SMART MEMORY CART ENGINE ──────────────────────
// Load cart from LocalStorage, or start empty if nothing exists
// ─── 7. SMART MEMORY CART ENGINE ──────────────────────
let cart = JSON.parse(localStorage.getItem('surajCart')) || []; 

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  
  if (cart.length > 0) {
    badge.style.display = 'flex';
    badge.textContent = cart.length;
    badge.style.transform = 'scale(1.3)';
    setTimeout(() => badge.style.transform = 'scale(1)', 200);
  } else {
    badge.style.display = 'none';
    badge.textContent = '0';
  }
}

// Handles grid buttons
function addToCart(name) {
  cart.push(name); 
  localStorage.setItem('surajCart', JSON.stringify(cart));
  updateCartBadge();
  showToast(`✅ ${name} added!`);
}

// Handles typed-in unlisted medicines
function addCustomItem() {
  const input = document.getElementById('customItemInput');
  const itemName = input.value.trim();
  
  if (itemName === '') {
    showToast("⚠️ Please type a medicine name first.");
    return;
  }
  
  cart.push(itemName);
  localStorage.setItem('surajCart', JSON.stringify(cart));
  updateCartBadge();
  showToast(`✅ Added custom request!`);
  input.value = ''; // clears the box after adding
}

// The New WhatsApp Checkout Flow
function checkoutCart() {
  if (cart.length === 0) {
    showToast("⚠️ Your cart is empty!");
    return;
  }
  
  // Notice we ask for availability and the final bill here
  let orderText = "Hello Suraj Medicos! 🏥\nI would like to check availability for the following items:\n\n";

  cart.forEach((item, index) => {
    orderText += `${index + 1}. ${item}\n`;
  });
  
  orderText += "\nCould you please confirm if these are in stock and let me know the final discounted bill amount?";

  const phone = "919650037400"; 
  const encodedText = encodeURIComponent(orderText);
  window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
  
  cart = [];
  localStorage.removeItem('surajCart');
  updateCartBadge();
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:90px; left:50%; transform:translateX(-50%);
    background:#00c896; color:#0d1117; padding:12px 24px; border-radius:50px;
    font-weight:600; font-size:0.9rem; z-index:9999;
    box-shadow: 0 8px 30px rgba(0,200,150,0.4);
    animation: fadeUp 0.3s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}


// ─── 8. LIVE STORE STATUS (CLOCK) ─────────────────────
function checkStoreStatus() {
  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');
  if (!dot || !text) return;

  const now = new Date();
  const day = now.getDay(); // 0 is Sunday
  const hour = now.getHours();
  
  let isOpen = false;
  // Sunday 9 AM to 8 PM
  if (day === 0) {
    isOpen = (hour >= 9 && hour < 20);
  } 
  // Mon-Sat 10 AM to 11 PM
  else {
    isOpen = (hour >= 10 && hour < 23);
  }

  if (isOpen) {
    dot.className = 'status-dot open';
    text.textContent = '🟢 Open Now';
    text.style.color = '#25d366';
  } else {
    dot.className = 'status-dot closed';
    text.textContent = '🔴 Closed';
    text.style.color = '#f85149';
  }
}

// ─── 9. INTERACTIVE FAQ ACCORDION ─────────────────────
function setupFAQ() {
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.parentElement;
      // Close all other FAQs first
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parent) item.classList.remove('active');
      });
      // Toggle the one you clicked
      parent.classList.toggle('active');
    });
  });
}


// ─── 10. HEALTH TIPS CAROUSEL ──────────────────────
const healthTipsData = [
  { icon: '💧', title: 'Stay Hydrated', text: 'Drink at least 8 glasses of water daily. Proper hydration supports kidney function and energy.' },
  { icon: '🥗', title: 'Balanced Diet', text: 'Include a rainbow of vegetables and lean proteins. Good nutrition is the foundation of health.' },
  { icon: '🚶', title: 'Daily Exercise', text: 'A 30-minute walk daily can reduce the risk of heart disease and diabetes significantly.' }
];

let tipIdx = 0;

function buildTipsCarousel() {
  const carousel = document.getElementById('tipsCarousel');
  const dotsEl = document.getElementById('tipsDots');
  if (!carousel || !dotsEl) return;
  
  carousel.innerHTML = `<div class="tips-track" id="tipsTrack">
    ${healthTipsData.map(t => `
      <div class="tip-slide">
        <div class="tip-card">
          <div class="tip-icon">${t.icon}</div>
          <div><h3>${t.title}</h3><p>${t.text}</p></div>
        </div>
      </div>`).join('')}
  </div>`;
  
  dotsEl.innerHTML = healthTipsData.map((_, i) =>
    `<div class="tip-dot ${i===0?'active':''}" onclick="goTip(${i})"></div>`
  ).join('');

  setInterval(() => goTip((tipIdx + 1) % healthTipsData.length), 4000);
}

function goTip(i) {
  tipIdx = i;
  const track = document.getElementById('tipsTrack');
  if (track) track.style.transform = `translateX(-${i * 100}%)`;
  document.querySelectorAll('.tip-dot').forEach((d, idx) => d.classList.toggle('active', idx === i));
}

// ─── 11. SCROLL REVEAL ─────────────────────────────
function setupScrollReveal() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .testi-card, .why-item').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}

// ─── 12. DYNAMIC TYPEWRITER EFFECT ────────────────
const typeWords = ["Health", "Wellness", "Family", "Recovery"];
let wordIdx = 0;
let charIdx = 6; // Starts at 6 because "Health" is already on the screen
let isDeleting = true; // Tells the script to start by erasing

function startTypewriter() {
  const typeElement = document.getElementById('typewriter');
  if (!typeElement) return;

  const currentWord = typeWords[wordIdx];
  
  // Typing or Erasing logic
  if (isDeleting) {
    typeElement.textContent = currentWord.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typeElement.textContent = currentWord.substring(0, charIdx + 1);
    charIdx++;
  }

  // Set the speed (Erasing is faster than typing)
  let typingSpeed = isDeleting ? 80 : 150;

  // When a word is fully typed out, pause for 2 seconds
  if (!isDeleting && charIdx === currentWord.length) {
    typingSpeed = 2000; 
    isDeleting = true;
  } 
  // When a word is fully erased, switch to the next word
  else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    wordIdx = (wordIdx + 1) % typeWords.length;
    typingSpeed = 500; // Short pause before typing new word
  }

  // Loop the function
  setTimeout(startTypewriter, typingSpeed);
}

// ─── 13. PRESCRIPTION UPLOAD ROUTER ────────────────
function sendPrescription() {
  const phone = "919650037400"; // Your Suraj Medicos WhatsApp number
  const message = "Hello Suraj Medicos! 🏥\n\nI would like to order medicines using my prescription. I will attach the photo of my prescription below.";
  
  const encodedText = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
}

// ─── 14. CONTACT FORM EMAIL ROUTER ────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stops the page from redirecting
    
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Sending...';
    btn.disabled = true;

    const formData = new FormData(contactForm);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(async (response) => {
      if (response.status == 200) {
        // Show success message and clear the form
        document.getElementById('formSuccess').style.display = 'block';
        contactForm.reset();
      } else {
        showToast("⚠️ Error sending message. Please try WhatsApp.");
      }
    })
    .catch(error => {
      showToast("⚠️ Network error. Please try WhatsApp.");
    })
    .finally(() => {
      // Put the button back to normal
      btn.innerHTML = originalText;
      btn.disabled = false;
      
      // Hide the green success message after 5 seconds
      setTimeout(() => {
        const successMsg = document.getElementById('formSuccess');
        if(successMsg) successMsg.style.display = 'none';
      }, 5000);
    });
  });
}

// ─── 15. PWA SERVICE WORKER ─────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('App Engine Registered!'))
      .catch((err) => console.log('App Engine Failed!', err));
  });
}

