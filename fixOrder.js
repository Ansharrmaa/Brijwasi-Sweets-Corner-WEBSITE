const fs = require('fs');
const path = require('path');

const orderFile = path.join(__dirname, 'order.html');
let orderHtml = fs.readFileSync(orderFile, 'utf8');

const heroStart = orderHtml.indexOf('<!-- HERO -->');
const orderSectStart = orderHtml.indexOf('<!-- ORDER FORM -->');

if (heroStart !== -1 && orderSectStart !== -1) {
  // Strip out everything between HERO and ORDER FORM
  orderHtml = orderHtml.substring(0, heroStart) + 
  `<div class="order-page-spacer"></div>\n` + 
  orderHtml.substring(orderSectStart);
}

// Remove the CONTACT section as well from order.html
const contactStart = orderHtml.indexOf('<!-- CONTACT -->');
const printStart = orderHtml.indexOf('<!-- PRINTABLE RECEIPT');

if (contactStart !== -1 && printStart !== -1) {
  orderHtml = orderHtml.substring(0, contactStart) + orderHtml.substring(printStart);
}

fs.writeFileSync(orderFile, orderHtml);
console.log('Fixed order.html');
