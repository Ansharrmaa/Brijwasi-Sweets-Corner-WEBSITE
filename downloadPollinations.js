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

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Status Code: ${res.statusCode}`));
        return;
      }
      const writer = fs.createWriteStream(filepath);
      res.pipe(writer);
      writer.on('finish', resolve);
      writer.on('error', reject);
    }).on('error', reject);
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
      console.log(`Downloading ${item}...`);
      const prompt = encodeURIComponent(`${item} Indian sweet food photography realistic 4k`);
      const url = `https://image.pollinations.ai/prompt/${prompt}?width=400&height=300&nologo=true`;
      
      await downloadImage(url, filepath);
      console.log(`Successfully downloaded ${item}`);
    } catch (err) {
      console.error(`Error with ${item}:`, err.message);
    }
  }
}

run();
