const fs = require('fs');
const https = require('https');

const STUDIO_PICS = [
  "/images/gen_men_formal.png",
  "/images/gen_women_party.png",
  "/images/gen_women_casual.png",
  "/images/gen_men_street.png"
];

let dataRaw = fs.readFileSync('src/lib/data.ts', 'utf8');

// Extract all unique unsplash URLs
const urlRegex = /https:\/\/images\.unsplash\.com\/photo-[^?"]+\?[^"]+/g;
const allUrls = [...new Set(dataRaw.match(urlRegex) || [])];

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302);
    }).on('error', () => resolve(false));
  });
}

async function run() {
  console.log(`Checking ${allUrls.length} unique URLs...`);
  let failedUrls = [];
  
  for (let url of allUrls) {
    const isOk = await checkUrl(url);
    if (!isOk) {
      console.log('Broken URL found:', url);
      failedUrls.push(url);
    }
  }

  if (failedUrls.length > 0) {
    console.log(`Replacing ${failedUrls.length} broken URLs with high-quality studio photos...`);
    let studioIdx = 0;
    
    // Split into lines
    let lines = dataRaw.split('\n');
    let modifiedLines = lines.map(line => {
      let isBroken = failedUrls.some(failUrl => line.includes(failUrl));
      if (isBroken) {
        let studioUrl = STUDIO_PICS[studioIdx % STUDIO_PICS.length];
        studioIdx++;
        // Replace the entire unsplash url with the studio pic
        return line.replace(/"image":\s*"https:\/\/images\.unsplash\.com[^"]+"/, '"image": "' + studioUrl + '"');
      }
      return line;
    });
    
    fs.writeFileSync('src/lib/data.ts', modifiedLines.join('\n'));
    console.log('Successfully patched the file!');
  } else {
    console.log('No broken URLs found.');
  }
}

run();
