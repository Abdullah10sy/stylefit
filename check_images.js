const https = require('https');

const W_PICS = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1529139574466-a30fa4a16b3b?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1502716119720-1237586dba28?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1485231183945-fc8dac70ae86?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1532453288672-3a27e9be204d?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1509631179647-09f52b6c6d04?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1481824429379-07aa5e5b0739?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1483118714900-540cb33736ce?auto=format&fit=crop&q=80&w=400&h=500"
];

const M_PICS = [
  "https://images.unsplash.com/photo-1516826957135-700eb1b4df0f?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1480455624303-ba4ef55e1fc5?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1504593811418-7b98a36c50ec?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1488161628813-0e86b0da3167?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1480428373209-efb511394ff0?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1512288092255-3252a129efdb?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1496345875508-ba90740a6baf?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1507680434267-33166d111242?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=500",
  "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=400&h=500"
];

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302) {
        resolve(true);
      } else {
        console.log('Failed:', res.statusCode, url);
        resolve(false);
      }
    }).on('error', () => {
      resolve(false);
    });
  });
}

async function run() {
  console.log("Checking Women Pics...");
  for (const url of W_PICS) {
    await checkUrl(url);
  }
  console.log("Checking Men Pics...");
  for (const url of M_PICS) {
    await checkUrl(url);
  }
}
run();
