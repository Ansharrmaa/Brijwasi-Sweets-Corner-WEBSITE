const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'css', 'style.css');

const additions = `
/* ============================================================
   NEW FEATURES (Lang, Fav, Stock, Order Page)
   ============================================================ */

/* Language Toggle */
.lang-toggle {
  background: var(--maroon-dark);
  color: var(--gold-light);
  border: 1px solid var(--gold);
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 15px;
  transition: all 0.2s;
}
.lang-toggle:hover {
  background: var(--gold);
  color: var(--maroon-dark);
}

/* Favorites Button in Menu Card */
.menu-card {
  position: relative;
}
.fav-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  font-size: 18px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  transition: transform 0.2s;
  z-index: 2;
}
.fav-btn:hover {
  transform: scale(1.1);
}
.fav-btn.active {
  color: red;
}

/* Stock Badge */
.stock-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(123, 28, 46, 0.9);
  color: white;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
  z-index: 2;
  letter-spacing: 0.5px;
}
.menu-card.unavailable .item-img,
.menu-card.unavailable .item-name,
.menu-card.unavailable .item-hindi,
.menu-card.unavailable .price-tag {
  opacity: 0.5;
  filter: grayscale(100%);
}

/* Order Page Spacer */
.order-page-spacer {
  height: 120px;
}

/* Fav Tab highlighting */
.fav-tab.active {
  background: #ffecf0;
  color: var(--maroon-dark);
  border-color: #ffb3c1;
}
`;

fs.appendFileSync(cssPath, additions);
console.log('CSS appended');
