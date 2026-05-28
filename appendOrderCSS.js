const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'css', 'style.css');

const styles = `
/* ============================================================
   PREMIUM ORDER PAGE STYLING
   ============================================================ */
body:has(.order-page-spacer) {
  background: var(--gold-faint);
}

.order-page-spacer {
  height: 100px;
}

body:has(.order-page-spacer) .order-section {
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 80px;
}

body:has(.order-page-spacer) .order-wrap {
  width: 100%;
  max-width: 900px;
}

body:has(.order-page-spacer) .order-card {
  box-shadow: 0 20px 50px rgba(74, 14, 26, 0.1);
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid var(--gold-pale);
  overflow: hidden;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

body:has(.order-page-spacer) .order-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 60px rgba(74, 14, 26, 0.15);
}

body:has(.order-page-spacer) .order-head {
  background: linear-gradient(135deg, var(--maroon-dark), var(--maroon));
  padding: 30px;
}

body:has(.order-page-spacer) .order-head h3, 
body:has(.order-page-spacer) .order-head p {
  color: var(--gold-pale);
}

body:has(.order-page-spacer) .order-head-icon {
  background: var(--gold-light);
  color: var(--maroon-dark);
}
`;

fs.appendFileSync(cssPath, styles);
console.log('Order page premium CSS appended');
