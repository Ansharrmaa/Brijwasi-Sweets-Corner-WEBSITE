const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'js', 'menu-data.js');
let data = fs.readFileSync(menuPath, 'utf8');

// The file has lines like:
// { name:"Gulab Jamun",    hindi:"गुलाब जामुन",   price:400,  unit:"kg",    cat:"jamun",  emoji:"🟤" },

// Add available: true by default, and available: false for "Mini Jamun", "Khasta Kachori", "Milk Cake"
data = data.replace(/\{([^}]+)\}/g, (match, contents) => {
  if (contents.includes('available:')) return match; // already added

  let isAvailable = true;
  if (contents.includes('"Mini Jamun"') || contents.includes('"Khasta Kachori"') || contents.includes('"Milk Cake"')) {
    isAvailable = false;
  }
  
  // Insert available flag before closing brace
  return `{${contents}, available:${isAvailable} }`;
});

fs.writeFileSync(menuPath, data, 'utf8');
console.log('menu-data.js updated');
