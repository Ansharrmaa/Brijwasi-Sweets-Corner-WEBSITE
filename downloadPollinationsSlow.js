const fs = require('fs');
const path = require('path');
const https = require('https');

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

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Status Code: ${res.statusCode}`));
        return;
      }
      const writer = fs.createWriteStream(filepath);
      res.pipe(writer);
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
    req.on('error', reject);
  });
}

async function run() {
  for (const item of items) {
    const filename = item.toLowerCase().replace(/ /g, '-') + '.jpg';
    const filepath = path.join(imgDir, filename);
    
    // Check if valid image exists (> 1KB)
    if (fs.existsSync(filepath) && fs.statSync(filepath).size > 1000) {
      console.log(`Skipping ${item}, valid image already exists.`);
      continue;
    }
    
    try {
      console.log(`Downloading ${item}...`);
      const seed = Math.floor(Math.random() * 1000000);
      const prompt = encodeURIComponent(`${item} Indian sweet food photography realistic 4k`);
      const url = `https://image.pollinations.ai/prompt/${prompt}?width=400&height=300&nologo=true&seed=${seed}`;
      
      await downloadImage(url, filepath);
      console.log(`Successfully downloaded ${item}`);
      await delay(3000); // 3 seconds delay to avoid rate limit
    } catch (err) {
      console.error(`Error with ${item}:`, err.message);
      await delay(3000);
    }
  }
  console.log("All done!");
}

run();
