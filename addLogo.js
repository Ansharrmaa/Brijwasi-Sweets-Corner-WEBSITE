const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
const orderFile = path.join(__dirname, 'order.html');
const cssFile = path.join(__dirname, 'css', 'style.css');

const replaceLogo = (htmlStr) => {
  return htmlStr.replace(
    /<div class="nav-logo-icon">B<\/div>/g,
    '<img src="images/logo.jpg" alt="Brijwasi Sweet Corner Logo" class="nav-logo-img">'
  );
};

if (fs.existsSync(indexFile)) {
  fs.writeFileSync(indexFile, replaceLogo(fs.readFileSync(indexFile, 'utf8')));
}

if (fs.existsSync(orderFile)) {
  fs.writeFileSync(orderFile, replaceLogo(fs.readFileSync(orderFile, 'utf8')));
}

const cssAdditions = `
/* ============================================================
   LOGO STYLES
   ============================================================ */
.nav-logo-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--gold);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}
.nav-logo:hover .nav-logo-img {
  transform: rotate(5deg) scale(1.05);
}
`;

fs.appendFileSync(cssFile, cssAdditions);
console.log('Logo added to HTML and CSS updated.');
