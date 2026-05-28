const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
const orderFile = path.join(__dirname, 'order.html');

let indexHtml = fs.readFileSync(indexFile, 'utf8');
let orderHtml = fs.readFileSync(orderFile, 'utf8');

// -------- refactor index.html --------
// 1. Add Language toggle
indexHtml = indexHtml.replace(
  /<button class="nav-order-btn"[^>]*>Order Now<\/button>/,
  `<button class="lang-toggle" onclick="toggleLang()" id="langBtn" title="Translate / अनुवाद">अ/A</button>
  <button class="nav-order-btn" onclick="window.location.href='order.html'" data-i18n="orderNow">Order Now</button>`
);
// Replace internal #order links with order.html
indexHtml = indexHtml.replace(/href="#order"/g, 'href="order.html"');
indexHtml = indexHtml.replace(/onclick="document\.getElementById\('order'\)\.scrollIntoView\(\{behavior:'smooth'\}\)"/g, 'onclick="window.location.href=\'order.html\'"');

// 2. Add Favorites tab
indexHtml = indexHtml.replace(
  /<button class="tab active" onclick="filterMenu\('all',this\)">All \/ सभी<\/button>/,
  `<button class="tab active" onclick="filterMenu('all',this)">All / सभी</button>
    <button class="tab fav-tab" onclick="filterMenu('fav',this)">❤️ Favorites</button>`
);

// 3. Remove order section from index
const orderStart = indexHtml.indexOf('<!-- WHATSAPP ORDER FORM -->');
const orderEnd = indexHtml.indexOf('<!-- FOOTER -->');
if (orderStart !== -1 && orderEnd !== -1) {
  indexHtml = indexHtml.substring(0, orderStart) + indexHtml.substring(orderEnd);
}

// -------- refactor order.html --------
// order.html needs to ONLY have the order form (and header/footer).
const heroStart = orderHtml.indexOf('<!-- HERO -->');
const orderSectStart = orderHtml.indexOf('<!-- WHATSAPP ORDER FORM -->');
if (heroStart !== -1 && orderSectStart !== -1) {
  orderHtml = orderHtml.substring(0, heroStart) + 
  `<div class="order-page-spacer" style="height:100px;"></div>\n` + 
  orderHtml.substring(orderSectStart);
}

// Update nav in order.html to point back to index.html
orderHtml = orderHtml.replace(/href="#/g, 'href="index.html#');
orderHtml = orderHtml.replace(
  /<button class="nav-order-btn"[^>]*>Order Now<\/button>/,
  `<button class="lang-toggle" onclick="toggleLang()" id="langBtn" title="Translate / अनुवाद">अ/A</button>`
);

fs.writeFileSync(indexFile, indexHtml);
fs.writeFileSync(orderFile, orderHtml);
console.log('HTML files refactored successfully.');
