const { image_search } = require('duckduckgo-images-api');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const items = [
  "Gulab Jamun", "Mini Jamun", "Kala Jamun", "Rasgulla", "Rasbhari", "Chamcham",
  "Plain Barfi", "Milk Cake", "Besan Barfi", "Malai Barfi", "Lal Peda", "Kalakand",
  "Badam Barfi", "Pista Barfi", "Bikaneri Barfi", "Kaju Mawa Barfi", "Khoya Roll",
  "Mango Barfi", "Strawberry Barfi", "Kaju Katli", "Kaju Kalash", "Boondi Ladoo",
  "Besan Ladoo", "Desi Ghee Boondi Ladoo", "Desi Ghee Besan Ladoo", "Namak Pare",
  "Til Pare", "Mathi", "Methi Mathi", "Dhokla", "Samosa", "Bread Pakoda", "Khasta Kachori",
  "Rasmalai", "Rajbhog", "Chhena Payas", "Chhena Toast", "Malai Chaap", "Rabri"
];

const imgDir = path.join(__dirname, 'images', 'menu');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

async function downloadImage(url, filepath) {
  const writer = fs.createWriteStream(filepath);
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
    timeout: 5000,
  });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function run() {
  for (const item of items) {
    const filename = item.toLowerCase().replace(/ /g, '-') + '.jpg';
    const filepath = path.join(imgDir, filename);
    
    if (fs.existsSync(filepath)) {
      console.log(`Skipping ${item}, already exists.`);
      continue;
    }
    
    try {
      console.log(`Searching for ${item} Indian sweet...`);
      const results = await image_search({ query: item + " Indian sweet", moderate: true });
      if (results && results.length > 0) {
        let success = false;
        for (let i = 0; i < Math.min(3, results.length); i++) {
          try {
            await downloadImage(results[i].image, filepath);
            console.log(`Downloaded ${item}`);
            success = true;
            break;
          } catch (e) {
            console.log(`Failed to download ${results[i].image}, trying next...`);
          }
        }
        if (!success) console.log(`Failed all attempts for ${item}`);
      } else {
        console.log(`No results for ${item}`);
      }
    } catch (err) {
      console.error(`Error with ${item}:`, err.message);
    }
  }
}

run();
