const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'js', 'app.js');
let appJs = fs.readFileSync(appPath, 'utf8');

// 1. Language Toggle State & Wishlist State
const headerAdditions = `
/* ============================================================
   GLOBAL STATES
   ============================================================ */
let isHindi = false;
let favItems = JSON.parse(localStorage.getItem('brijwasiFavs')) || [];

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
  localStorage.setItem('brijwasiFavs', JSON.stringify(favItems));
  renderMenu(currentCat);
}
`;

// Insert header additions after the main comment block
appJs = appJs.replace(/\*\/[\r\n]+/, '*/\n' + headerAdditions + '\n');

// 2. Update renderMenuItems
appJs = appJs.replace(/function renderMenuItems[\s\S]*?`\)\.join\(''\);\s*\}/, `
function renderMenuItems(items) {
  const grid = document.getElementById('menuGrid');
  if (!grid) return; // if we are on order.html where grid doesn't exist
  if (items.length === 0) {
    grid.innerHTML = '<div class="no-results"><span>😕</span>' + (isHindi ? 'कोई मिठाई नहीं मिली' : 'Koi mithai nahi mili.') + '<br>Try a different keyword!</div>';
    return;
  }
  grid.innerHTML = items.map(item => {
    const isFav = favItems.includes(item.name);
    const primaryName = isHindi ? item.hindi : item.name;
    const secondaryName = isHindi ? item.name : item.hindi;
    const stockBadge = item.available ? '' : '<div class="stock-badge out-of-stock">' + (isHindi ? 'खत्म हो गया' : 'Out of Stock') + '</div>';
    
    return \`
    <div class="menu-card \${item.available ? '' : 'unavailable'}">
      \${stockBadge}
      <button class="fav-btn \${isFav ? 'active' : ''}" onclick="toggleFav('\${item.name}', event)" title="Save to Favorites">
        \${isFav ? '❤️' : '🤍'}
      </button>
      <div class="item-img" style="background-image: url('images/menu/\${item.name.toLowerCase().replace(/ /g, '-')}.jpg');" title="\${item.name}"></div>
      <div class="item-name">\${primaryName}</div>
      <div class="item-hindi">\${secondaryName}</div>
      <div class="price-tag">₹\${item.price}/\${item.unit}</div>
    </div>
  \`}).join('');
}
`);

// 3. Update renderMenu to handle "fav" category
appJs = appJs.replace(/function renderMenu\(cat\)\s*\{[\s\S]*?\}/, `
function renderMenu(cat) {
  currentCat = cat;
  let filtered = [];
  if (cat === 'all') filtered = menuItems;
  else if (cat === 'fav') filtered = menuItems.filter(i => favItems.includes(i.name));
  else filtered = menuItems.filter(i => i.cat === cat);
  renderMenuItems(filtered);
}
`);

// 4. Prevent out of stock items from being added in the dropdown
appJs = appJs.replace(/function menuOpts\(selectedName\)\s*\{[\s\S]*?\}/, `
function menuOpts(selectedName) {
  return menuItems.map(m =>
    \`<option value="\${m.name}" data-p="\${m.price}" data-u="\${m.unit}"\${m.name === selectedName ? ' selected' : ''} \${!m.available ? 'disabled' : ''}>
      \${m.name} \${!m.available ? '(Out of Stock)' : ''} — ₹\${m.price}/\${m.unit}
    </option>\`
  ).join('');
}
`);

// 5. Update galleryData with the new images
appJs = appJs.replace(/const galleryData = \[([\s\S]*?)\];/, (match, p1) => {
  if (p1.includes('shop-exterior')) return match; // already added
  const newItems = `
  { src: 'images/shop-exterior.jpg', caption: 'Brijwasi Sweet Corner Exterior' },
  { src: 'images/shop-interior.jpg', caption: 'Brijwasi Sweet Corner Interior' },`;
  return `const galleryData = [${newItems}${p1}];`;
});

// Write changes back to app.js
fs.writeFileSync(appPath, appJs, 'utf8');
console.log('app.js successfully updated.');
