/**
 * app.js
 * Main application logic for Brijwasi Sweet Corner website.
 * Handles: Menu rendering & filtering, Order form, Bill calculation, Scroll animations.
 */

/* ============================================================
   GLOBAL STATES
   ============================================================ */
let isHindi = false;
let favItems = []; try { favItems = JSON.parse(localStorage.getItem('brijwasiFavs')) || []; } catch(e) {}

function toggleLang() {
  isHindi = !isHindi;
  document.documentElement.lang = isHindi ? 'hi' : 'en';
  // Re-render menu to flip Hindi/English text priority
  renderMenu(currentCat);
  
  // Translate static UI elements
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = isHindi ? el.getAttribute('data-hi') : el.getAttribute('data-en');
  });
}

function toggleFav(itemName, event) {
  event.stopPropagation();
  const idx = favItems.indexOf(itemName);
  if (idx > -1) {
    favItems.splice(idx, 1);
  } else {
    favItems.push(itemName);
  }
  try { localStorage.setItem('brijwasiFavs', JSON.stringify(favItems)); } catch(e) {}
  renderMenu(currentCat);
}

/* ============================================================
   MENU — Render & Filter
   ============================================================ */

// Track currently selected category (used by search to reset correctly)
var currentCat = 'all';

/** Render a given array of menu items into the grid. */

// ==========================================
// E-COMMERCE LOGIC (Cart, QuickView, Menu)
// ==========================================
let cart = []; try { cart = JSON.parse(localStorage.getItem('brijwasiCart')) || []; } catch(e) {}

function updateCartCount() {
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = cart.length;
}
updateCartCount();

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('show');
  renderCart();
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('show');
}

function addToCart(name, price, unit, weightStr) {
  const finalPrice = Math.round(price * eval(weightStr));
  const displayWeight = weightStr === '1' ? '1 kg' : (weightStr === '0.5' ? '500g' : '250g');
  const itemName = weightStr === '1' ? name : `${name} (${displayWeight})`;
  
  const existing = cart.find(c => c.name === itemName);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name: itemName, price: finalPrice, qty: 1 });
  }
  try { localStorage.setItem('brijwasiCart', JSON.stringify(cart)); } catch(e) {}
  updateCartCount();
  openCart();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const subtotalEl = document.getElementById('cartSubtotal');
  if (!container) return;
  
  if (cart.length === 0) {
    container.innerHTML = '<div style="padding:20px;text-align:center;">Cart is empty.</div>';
    subtotalEl.textContent = '₹0';
    return;
  }
  
  let total = 0;
  container.innerHTML = cart.map((item, index) => {
    total += item.price * item.qty;
    return `
      <div class="cart-item">
        <div style="flex:1">
          <div style="font-weight:600">${item.name}</div>
          <div style="font-size:12px;color:#666;">₹${item.price} x ${item.qty}</div>
        </div>
        <div>
          <button onclick="updateQty(${index}, -1)" style="padding:2px 8px;cursor:pointer">-</button>
          <span style="margin:0 8px">${item.qty}</span>
          <button onclick="updateQty(${index}, 1)" style="padding:2px 8px;cursor:pointer">+</button>
        </div>
      </div>
    `;
  }).join('');
  subtotalEl.textContent = '₹' + total;
}

function updateQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  localStorage.setItem('brijwasiCart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function proceedToCheckout() {
  if (cart.length === 0) return alert('Cart is empty!');
  window.location.href = 'order.html';
}

function openQV(name) {
  const item = menuItems.find(i => i.name === name);
  if (!item) return;
  
  const primaryName = isHindi ? item.hindi : item.name;
  
  document.getElementById('qvContent').innerHTML = `
    <div style="display:flex;gap:20px;">
      <div style="flex:1; background:url('images/menu/${item.name.toLowerCase().replace(/ /g, '-')}.jpg') center/cover; border-radius:10px; min-height:250px;"></div>
      <div style="flex:1;">
        <h2 style="margin:0;color:var(--maroon-dark)">${primaryName} ${item.emoji}</h2>
        <h4 style="margin:5px 0 15px;color:#666">${item.desc || 'Authentic traditional sweet.'}</h4>
        <div style="background:#f9f9f9;padding:10px;border-radius:5px;margin-bottom:15px;font-size:13px;">
          <p><strong>Ingredients:</strong> ${item.ingredients || 'Pure Desi Ghee, Milk, Sugar'}</p>
          <p><strong>Shelf Life:</strong> ${item.shelfLife || 'Consume within 5 days'}</p>
        </div>
        <div style="display:flex;gap:10px;align-items:center;">
          ${
            item.unit === 'kg' 
            ? `<select id="qvWeight" style="padding:8px; border:1px solid #ccc; border-radius:5px;">
                <option value="0.25">250g - ₹${Math.round(item.price * 0.25)}</option>
                <option value="0.5">500g - ₹${Math.round(item.price * 0.5)}</option>
                <option value="1" selected>1 kg - ₹${item.price}</option>
               </select>`
            : `<strong>₹${item.price}/${item.unit}</strong><input type="hidden" id="qvWeight" value="1">`
          }
          <button class="btn-primary" onclick="addToCart('${item.name}', ${item.price}, '${item.unit}', document.getElementById('qvWeight').value); closeQV();" ${!item.available ? 'disabled' : ''}>
            ${item.available ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('qvOverlay').style.display = 'flex';
}

function closeQV() {
  document.getElementById('qvOverlay').style.display = 'none';
}

function renderMenuItems(items) {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;
  if (items.length === 0) {
    grid.innerHTML = '<div class="no-results"><span>😕</span>No items found.</div>';
    return;
  }
  grid.innerHTML = items.map(item => {
    const isFav = favItems.includes(item.name);
    const primaryName = isHindi ? item.hindi : item.name;
    const secondaryName = isHindi ? item.name : item.hindi;
    const stockBadge = item.available ? '' : '<div class="stock-badge out-of-stock">Out of Stock</div>';
    
    return `
    <div class="menu-card ${item.available ? '' : 'unavailable'}">
      ${stockBadge}
      <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFav('${item.name}', event)">
        ${isFav ? '❤️' : '🤍'}
      </button>
      <div class="item-img" style="background-image: url('images/menu/${item.name.toLowerCase().replace(/ /g, '-')}.jpg'); cursor:pointer;" onclick="openQV('${item.name}')"></div>
      <div class="item-name" style="cursor:pointer" onclick="openQV('${item.name}')">${primaryName}</div>
      <div class="item-hindi">${secondaryName}</div>
      
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
        <div class="price-tag" style="margin-top:0">₹${item.price}/${item.unit}</div>
        ${
          item.unit === 'kg' 
          ? `<select id="sel_${item.name.replace(/ /g,'')}" style="padding:4px; font-size:12px; border:1px solid #ddd; border-radius:4px;">
              <option value="1">1 kg</option>
              <option value="0.5">500g</option>
              <option value="0.25">250g</option>
             </select>`
          : `<input type="hidden" id="sel_${item.name.replace(/ /g,'')}" value="1">`
        }
      </div>
      <button class="add-to-cart-btn" onclick="addToCart('${item.name}', ${item.price}, '${item.unit}', document.getElementById('sel_${item.name.replace(/ /g,'')}').value)" ${!item.available ? 'disabled' : ''}>
        ${item.available ? 'Add + ' : 'Unavailable'}
      </button>
    </div>
  `}).join('');
}

// Carousel Logic
let currentSlide = 0;
function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  if (!slides.length) return;
  slides.forEach(s => s.classList.remove('active'));
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}
function changeSlide(dir) { showSlide(currentSlide + dir); }
setInterval(() => { changeSlide(1); }, 5000);

// Populate Order Form on order.html from Cart
document.addEventListener('DOMContentLoaded', () => {
  const billLines = document.getElementById('billLines');
  if (billLines && cart.length > 0) {
    // We are on order.html and cart has items. Auto-populate!
    const tableBody = cart.map(item => `
      <div class="bill-row">
        <span>${item.name}</span>
        <span>x ${item.qty}</span>
        <span>₹${item.price * item.qty}</span>
      </div>
    `).join('');
    billLines.innerHTML = tableBody;
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById('billTotal').textContent = '₹' + total;
    document.getElementById('billBox').style.display = 'block';
    
    // Hide the manual add-row system since cart is in use
    document.querySelector('.items-list').style.display = 'none';
    document.querySelector('.add-row-btn').style.display = 'none';
    document.querySelector('.items-table-head').style.display = 'none';
  }
});


// ==========================================
// RESTORED CORE LOGIC
// ==========================================
var currentCat = 'all';

function renderMenu(cat) {
  currentCat = cat;
  let filtered = [];
  if (cat === 'all') {
    filtered = menuItems;
  } else if (cat === 'fav') {
    filtered = menuItems.filter(i => favItems.includes(i.name));
  } else {
    filtered = menuItems.filter(i => i.cat === cat);
  }
  
  const searchInput = document.getElementById('menuSearch');
  if (searchInput && searchInput.value.trim() !== '') {
    const q = searchInput.value.trim().toLowerCase();
    filtered = filtered.filter(i => i.name.toLowerCase().includes(q) || i.hindi.includes(q));
  }
  
  if (typeof renderMenuItems === 'function') {
    renderMenuItems(filtered);
  }
}

function filterMenu(cat, btn) {
  document.querySelectorAll('.filter-tabs .tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderMenu(cat);
}

// Search Logic
const searchInput = document.getElementById('menuSearch');
if (searchInput) {
  searchInput.addEventListener('input', () => renderMenu(currentCat));
}

function clearSearch() {
  if (searchInput) {
    searchInput.value = '';
    renderMenu(currentCat);
  }
}

// Sticky Navbar & Scroll Spy
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('menuGrid')) {
    renderMenu('all');
  }
  if (document.getElementById('gcPeople')) {
    calcGiftBox();
  }
});

/* ============================================================
   GIFT BOX CALCULATOR
   ============================================================ */
function calcGiftBox() {
  const people = parseInt(document.getElementById('gcPeople').value) || 10;
  const budget = parseInt(document.getElementById('gcBudget').value) || 500;
  const occasion = document.getElementById('gcOccasion').value || 'diwali';
  const resultEl = document.getElementById('gcResult');
  if (!resultEl) return;

  // Package definitions based on budget
  let pkgNameEn = "";
  let pkgNameHi = "";
  let weight = "";
  let descEn = "";
  let descHi = "";
  let cards = [];

  if (budget === 300) {
    pkgNameEn = "Brijwasi Classic Selection";
    pkgNameHi = "बृजवासी क्लासिक डिब्बा";
    weight = "600g";
    descEn = "An elegant sweet box combining our all-time favorites, perfect for sharing.";
    descHi = "हमारे सबसे पसंदीदा पारंपरिक स्वादों का एक सुंदर बॉक्स, जो उत्सवों के लिए उत्तम है।";
    cards = [
      { title: "Sweet Delights / मिठास", items: ["Plain Barfi (250g)", "Boondi Ladoo (250g)"] },
      { title: "Salty Crunch / नमकीन", items: ["Namak Pare (100g)"] }
    ];
  } else if (budget === 500) {
    pkgNameEn = "Brijwasi Premium Assortment";
    pkgNameHi = "बृजवासी प्रीमियम डिब्बा";
    weight = "650g";
    descEn = "A beautifully curated sweet box featuring rich cashew sweets and classic ghee treats.";
    descHi = "काजू की प्रीमियम मिठाइयों और देसी घी के लड्डुओं का एक ख़ास उत्सव बॉक्स।";
    cards = [
      { title: "Sweet Delights / मिठास", items: ["Kaju Katli (250g)", "Besan Ladoo (250g)"] },
      { title: "Salty Crunch / नमकीन", items: ["Methi Mathri (150g)"] }
    ];
  } else if (budget === 800) {
    pkgNameEn = "Brijwasi Festive Luxury Box";
    pkgNameHi = "बृजवासी उत्सव लक्ज़री";
    weight = "900g";
    descEn = "A generous box containing rich premium sweets, hand-rolled pure ghee ladoos, and crunchy savories.";
    descHi = "काजू कतली, खोया रोल, शुद्ध देसी घी बूंदी लड्डू और काजू पिस्ता का एक शानदार मिश्रण।";
    cards = [
      { title: "Sweet Delights / मिठास", items: ["Kaju Katli (250g)", "Kaju Mawa Barfi (250g)", "Desi Ghee Besan Ladoo (250g)"] },
      { title: "Premium Nuts / ड्राई फ्रूट्स", items: ["Premium Salted Cashews (150g)"] }
    ];
  } else if (budget === 1200) {
    pkgNameEn = "Brijwasi Royal Gold Box";
    pkgNameHi = "बृजवासी रॉयल गोल्ड";
    weight = "1050g";
    descEn = "Our finest gold-grade sweet box, adorned with premium dry fruits, rich saffron sweets, and royal dry-fruit delicacies.";
    descHi = "प्रीमियम सूखे मेवों, केसर इलायची की शाही मिठाइयों और बादाम बर्फी का सबसे उत्कृष्ट उपहार।";
    cards = [
      { title: "Royal Sweets / शाही मिठास", items: ["Kaju Kalash (250g)", "Badam Barfi (250g)", "Desi Ghee Boondi Ladoo (250g)"] },
      { title: "Premium Nuts / ड्राई फ्रूट्स", items: ["Premium Almonds (150g)", "Pistachios (150g)"] }
    ];
  } else { // 2000
    pkgNameEn = "Brijwasi Maharaja Premium Hamper";
    pkgNameHi = "बृजवासी महाराजा उत्सव हैम्पर";
    weight = "1500g";
    descEn = "The ultimate royal gifting experience. A lavish designer tray filled with pure premium sweets, assorted exotic nuts, and rich traditional savories.";
    descHi = "परम शाही उत्सव उपहार। प्रीमियम मिठाइयों, विदेशी काजू-बादाम, और स्वादिष्ट पारंपरिक नमकीन का एक आलीशान डिज़ाइनर हैम्पर।";
    cards = [
      { title: "Maharaja Sweets / महाराजा मिठास", items: ["Premium Kaju Katli (500g)", "Kalakand (250g)", "Sugar-Free Dry Fruit Ladoo (250g)"] },
      { title: "Exotic Crunch / मेवे व नमकीन", items: ["Exotic Dry Fruits Mix (250g)", "Special Namkeen Mixture (250g)"] }
    ];
  }

  const displayName = isHindi ? pkgNameHi : pkgNameEn;
  const displayDesc = isHindi ? descHi : descEn;
  const totalCost = people * budget;

  let resultHtml = `
    <h3 style="margin-top:0; color:var(--maroon-dark); font-family:'Playfair Display',serif;">💡 Suggested Box: ${displayName}</h3>
    <p style="color:#666;font-size:14px;margin-bottom:1.5rem;line-height:1.5;">${displayDesc}</p>
    <div class="gc-box-list" style="margin-bottom:1.5rem;">
      ${cards.map(c => `
        <div class="gc-box-card">
          <h4 style="margin:0 0 8px 0; color:var(--maroon-dark); font-family:'Playfair Display',serif; font-size:15px; border-bottom:1px solid rgba(200,150,50,0.2); padding-bottom:5px;">${c.title}</h4>
          <ul style="margin:0; padding:0; list-style:none;">
            ${c.items.map(item => `
              <li style="font-size:13px; color:var(--text-mid); padding:3px 0; display:flex; align-items:center; gap:6px;">
                <span style="color:var(--gold);">✦</span> ${item}
              </li>
            `).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
    <div class="gc-summary" style="background:var(--maroon-dark); color:#fff; padding:1.5rem; border-radius:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem; box-shadow:0 4px 15px rgba(0,0,0,0.15);">
      <div style="display:flex; gap:2rem; flex-wrap:wrap;">
        <div class="gc-summary-item" style="text-align:left;">
          <span class="gc-val" style="font-size:1.8rem; font-weight:700; color:var(--gold-light); display:block;">${weight}</span>
          <span class="gc-lbl" style="font-size:11px; text-transform:uppercase; letter-spacing:1px; color:rgba(255,255,255,0.7); display:block; margin-top:4px;">Est. Weight</span>
        </div>
        <div class="gc-summary-item" style="text-align:left;">
          <span class="gc-val" style="font-size:1.8rem; font-weight:700; color:var(--gold-light); display:block;">₹${budget}</span>
          <span class="gc-lbl" style="font-size:11px; text-transform:uppercase; letter-spacing:1px; color:rgba(255,255,255,0.7); display:block; margin-top:4px;">Cost / Box</span>
        </div>
        <div class="gc-summary-item" style="text-align:left;">
          <span class="gc-val" style="font-size:1.8rem; font-weight:700; color:var(--gold-light); display:block;">₹${totalCost.toLocaleString('en-IN')}</span>
          <span class="gc-lbl" style="font-size:11px; text-transform:uppercase; letter-spacing:1px; color:rgba(255,255,255,0.7); display:block; margin-top:4px;">Total Budget</span>
        </div>
      </div>
      <div class="gc-summary-item" style="flex-grow:1; text-align:right;">
        <button class="btn-primary" onclick="addGiftBoxesToCart('${pkgNameEn}', ${budget}, ${people})" style="background:var(--gold); color:var(--maroon-dark); border:none; padding:12px 24px; font-weight:700; font-size:14px; border-radius:30px; cursor:pointer; box-shadow:0 4px 10px rgba(0,0,0,0.1); transition:transform 0.2s, background-color 0.2s;">
          🛒 Add ${people} Boxes to Cart
        </button>
      </div>
    </div>
  `;

  resultEl.innerHTML = resultHtml;
}

function addGiftBoxesToCart(name, price, qty) {
  const finalName = `${name} (Gift Box)`;
  const existing = cart.find(c => c.name === finalName);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name: finalName, price: price, qty: qty });
  }
  try { localStorage.setItem('brijwasiCart', JSON.stringify(cart)); } catch(e) {}
  updateCartCount();
  openCart();
}

/* ============================================================
   PHOTO GALLERY - LIGHTBOX
   ============================================================ */
const galleryData = [
  { src: 'images/shop-exterior.jpg', caption: 'Brijwasi Sweet Corner Exterior - बृजवासी स्वीट कॉर्नर बाहरी दृश्य' },
  { src: 'images/shop-interior.jpg', caption: 'Brijwasi Sweet Corner Interior - बृजवासी स्वीट कॉर्नर आंतरिक दृश्य' },
  { src: 'images/gallery-1.png', caption: 'Sweet Shop Display - मिठाई की दुकान' },
  { src: 'images/gallery-2.png', caption: 'Gift Boxes Collection - गिफ्ट बॉक्स' },
  { src: 'images/gallery-3.png', caption: 'Gulab Jamun - गुलाब जामुन' },
  { src: 'images/gallery-4.png', caption: 'Kaju Katli - काजू कतली' },
  { src: 'images/gallery-5.png', caption: 'Diwali Festival Setup - दीवाली सजावट' },
  { src: 'images/gallery-6.png', caption: 'Rasmalai - रसमलाई' }
];

let lbIndex = 0;

function openLightbox(i) {
  lbIndex = i;
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  document.getElementById('lbImg').src = galleryData[i].src;
  document.getElementById('lbCaption').textContent = galleryData[i].caption;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
  if (event) event.stopPropagation();
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.remove('active');
  document.body.style.overflow = '';
}

function lbNav(dir, event) {
  if (event) event.stopPropagation();
  lbIndex = (lbIndex + dir + galleryData.length) % galleryData.length;
  document.getElementById('lbImg').src = galleryData[lbIndex].src;
  document.getElementById('lbCaption').textContent = galleryData[lbIndex].caption;
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.lbNav = lbNav;

