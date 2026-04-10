const fs = require('fs');

const baseMen = {
  casual: {
    slim: [ { name:"Layered Street Look", why:"Horizontal layers add visual volume.", top:"Oversized Oxford Shirt", bottom:"Wide-Leg Chinos", shoes:"Low-Top Sneakers", accessory:"Glasses + Watch", price:"₹3,200", basePrice:5000, emoji:"👕", image:"/images/casual_layered.png", bg:"linear-gradient(135deg,#f5e6d3,#e8d0b0)", colors:["#E8D5C0","#FFFFFF"] } ],
    medium: [ { name:"Smart Casual Weekend", why:"Highlights athletic frame.", top:"Fitted Polo", bottom:"Tapered Chinos", shoes:"White Sneakers", accessory:"Leather Watch", price:"₹4,500", basePrice:6800, emoji:"👔", image:"/images/casual_look.png", bg:"linear-gradient(135deg,#e8f0e5,#d0e0cc)", colors:["#2D5A27","#F5F5F5"] } ],
    chubby: [ { name:"Relaxed Linen", why:"Creates a streamlined silhouette.", top:"Dark Navy Overshirt", bottom:"Slim Joggers", shoes:"Loafers", accessory:"Silver Watch", price:"₹3,500", basePrice:5200, emoji:"🧥", image:"/images/casual_layered.png", bg:"linear-gradient(135deg,#1a274433,#0d0d0d22)", colors:["#1A2744","#8B9BB4"] } ]
  },
  formal: {
    slim: [ { name:"Classic Power Suit", why:"Adds width.", top:"White Shirt", bottom:"Double-Breasted Suit", shoes:"Brogues", accessory:"Pocket Square", price:"₹8,000", basePrice:13000, emoji:"🎩", image:"/images/business_suit.png", bg:"linear-gradient(135deg,#36393e33,#8b263533)", colors:["#36393E","#F5F5F5"] } ],
    medium: [ { name:"Contemporary Business", why:"Complements athletic builds.", top:"French-Cuff Shirt", bottom:"Navy Suit", shoes:"Derby Shoes", accessory:"Striped Tie", price:"₹7,500", basePrice:11000, emoji:"💼", image:"/images/business_suit.png", bg:"linear-gradient(135deg,#1b3a6b22,#5b8db822)", colors:["#1B3A6B","#8B6542"] } ],
    chubby: [ { name:"Slim-Fit Authority", why:"Vertical pinstripes create a leaner look.", top:"Point-Collar Shirt", bottom:"Pinstripe Suit", shoes:"Oxfords", accessory:"Knit Tie", price:"₹9,000", basePrice:14000, emoji:"🖤", image:"/images/formal_tuxedo.png", bg:"linear-gradient(135deg,#2c2c2c22,#44444422)", colors:["#2C2C2C","#1A1A1A"] } ]
  },
  party: {
    slim: [ { name:"Night Out Statement", why:"Metallic accents add presence.", top:"Satin Shirt", bottom:"Skinny Pants", shoes:"Chelsea Boots", accessory:"Silver Chain", price:"₹4,000", basePrice:6800, emoji:"✨", image:"/images/party_night.png", bg:"linear-gradient(135deg,#1a1a2e,#16213e)", colors:["#1A1A2E","#8B0000"] } ],
    medium: [ { name:"Club-Ready", why:"Quiet luxury perfectly.", top:"Ribbed Turtleneck", bottom:"Camel Trousers", shoes:"Suede Boots", accessory:"Gold Bracelet", price:"₹5,500", basePrice:8500, emoji:"🥂", image:"/images/quiet_luxury.png", bg:"linear-gradient(135deg,#0d0d0d,#1a1a1a)", colors:["#0D0D0D","#8B7355"] } ],
    chubby: [ { name:"Bold Evening Presence", why:"Dark monotonic colors.", top:"Mandarin-Collar Shirt", bottom:"Well-Cut Trousers", shoes:"Loafers", accessory:"Statement Watch", price:"₹3,800", basePrice:6000, emoji:"🌙", image:"/images/party_night.png", bg:"linear-gradient(135deg,#0a0a2a,#141430)", colors:["#0A0A2A","#0D0D0D"] } ]
  },
  sporty: {
    slim: [ { name:"Athleisure Pro", why:"Color-blocking adds visual mass.", top:"Windbreaker", bottom:"Joggers", shoes:"Chunky Sneakers", accessory:"Sports Watch", price:"₹5,000", basePrice:9500, emoji:"⚡", image:"/images/varsity_sport.png", bg:"linear-gradient(135deg,#0D5C4B,#1a7a63)", colors:["#0D5C4B","#F1C43D"] } ],
    medium: [ { name:"Performance Meets Style", why:"Showcases athletic build.", top:"Training Tee", bottom:"Performance Shorts", shoes:"Running Shoes", accessory:"Fitness Tracker", price:"₹4,500", basePrice:8000, emoji:"🏃", image:"/images/performance_sport.png", bg:"linear-gradient(135deg,#D97706,#f0890a)", colors:["#D97706","#1A1A1A"] } ],
    chubby: [ { name:"Comfort Sport Look", why:"Clean cut keep you comfortable.", top:"Compression Base Layer", bottom:"Loose Track Pants", shoes:"Cross-Trainers", accessory:"Gym Bag", price:"₹3,000", basePrice:5500, emoji:"💪", image:"/images/varsity_sport.png", bg:"linear-gradient(135deg,#1a1a1a,#2d2d2d)", colors:["#1A1A1A","#FFFFFF"] } ]
  },
  streetwear: {
    slim: [ { name:"Hypebeast Slim Edit", why:"Oversized tees bulk up.", top:"Oversized Drop-Shoulder Tee", bottom:"Cargo Pants", shoes:"Platform Sneakers", accessory:"Bucket Hat", price:"₹3,500", basePrice:6200, emoji:"🧢", image:"/images/streetwear_hypebeast.png", bg:"linear-gradient(135deg,#1a1a1a,#0d3a2e)", colors:["#1A1A1A","#F1C43D"] } ],
    medium: [ { name:"Urban Explorer", why:"Technical fabrics for modern statement.", top:"Utility Overshirt", bottom:"Cargo Pants", shoes:"Chunky Sneakers", accessory:"Crossbody Bag", price:"₹4,500", basePrice:7000, emoji:"🏙️", image:"/images/urban_explorer.png", bg:"linear-gradient(135deg,#1a1a1a,#2a2a4a)", colors:["#1A1A1A","#F0F0F0"] } ],
    chubby: [ { name:"Bold Streetwear", why:"Dark tones for confident style.", top:"Oversized Hoodie", bottom:"Wide-Leg Jeans", shoes:"Chunky Sneakers", accessory:"Snapback", price:"₹3,200", basePrice:5200, emoji:"🖤", image:"/images/streetwear_hypebeast.png", bg:"linear-gradient(135deg,#0d0d0d,#1a1a1a)", colors:["#0D0D0D","#FFFFFF"] } ]
  },
  ethnic: {
    slim: [ { name:"Classic Kurta Set", why:"Straight-cut kurta elongates.", top:"White Cotton Kurta", bottom:"Churidar Pyjama", shoes:"Mojaris", accessory:"Gold Kada", price:"₹2,500", basePrice:4200, emoji:"🪔", image:"/images/ethnic_kurta.png", bg:"linear-gradient(135deg,#f5e6d3,#e8d0b0)", colors:["#F5E6D3","#C8A96E"] } ],
    medium: [ { name:"Festive Sherwani", why:"Showcases build's proportions.", top:"Ivory Sherwani", bottom:"Churidar + Dupatta", shoes:"Juttis", accessory:"Safa + Brooch", price:"₹8,000", basePrice:14000, emoji:"👑", image:"/images/ethnic_sherwani.png", bg:"linear-gradient(135deg,#f5e6d3,#d4c5a9)", colors:["#F5E6D3","#8B6542"] } ],
    chubby: [ { name:"Relaxed Pathani", why:"Breathable fabric with clean lines.", top:"Dark Pathani Kurta", bottom:"Matching Salwar", shoes:"Kolhapuri Sandals", accessory:"Pocket Square", price:"₹2,800", basePrice:4500, emoji:"🌿", image:"/images/ethnic_kurta.png", bg:"linear-gradient(135deg,#1a2a1a,#2a3a2a)", colors:["#1A2A1A","#8B6542"] } ]
  }
};

const baseWomen = {
  casual: {
    slim: [ { name:"Chic Weekend Layers", why:"Highlights natural figure.", top:"Silk Blouse", bottom:"Wide-Leg Trousers", shoes:"Mules", accessory:"Gold Hoops", price:"₹4,000", basePrice:6000, emoji:"👚", image:"/images/women_casual.png", bg:"linear-gradient(135deg,#f5e6d3,#e8d0b0)", colors:["#E8D5C0","#FFFFFF"] } ],
    medium: [ { name:"Effortless Denim", why:"Balanced proportions.", top:"White Crop Tee", bottom:"Mom Jeans", shoes:"White Sneakers", accessory:"Crossbody Bag", price:"₹3,000", basePrice:4500, emoji:"👖", image:"/images/women_casual.png", bg:"linear-gradient(135deg,#dce8f5,#bfd0e8)", colors:["#3A5B8A","#F0F0F0"] } ],
    chubby: [ { name:"Flowy Maxi Dress", why:"Continuous line creates elegant silhouette.", top:"Floral Maxi Dress", bottom:"", shoes:"Strappy Sandals", accessory:"Sun Hat", price:"₹3,500", basePrice:5000, emoji:"👗", image:"/images/women_casual.png", bg:"linear-gradient(135deg,#f0e6e6,#d0b8b8)", colors:["#D0B8B8","#1A1A1A"] } ]
  },
  formal: {
    slim: [ { name:"The Power Suit", why:"Structured shoulders exude confidence.", top:"Silk Camisole", bottom:"Two-Piece Suit", shoes:"Pointed Pumps", accessory:"Pearl Necklace", price:"₹8,000", basePrice:11000, emoji:"💼", image:"/images/women_formal.png", bg:"linear-gradient(135deg,#36393e33,#8b263533)", colors:["#36393E","#F5F5F5"] } ],
    medium: [ { name:"Contemporary Workwear", why:"Cinched waist beautifully accentuates.", top:"Wrap Blouse", bottom:"Pencil Skirt", shoes:"Kitten Heels", accessory:"Tote Bag", price:"₹6,000", basePrice:8000, emoji:"📝", image:"/images/women_formal.png", bg:"linear-gradient(135deg,#1b3a6b22,#5b8db822)", colors:["#1B3A6B","#F5F5F5"] } ],
    chubby: [ { name:"Elegant A-Line Shift", why:"Forgiving fit ultimate comfort.", top:"Tailored Shift Dress", bottom:"", shoes:"Block Heels", accessory:"Statement Watch", price:"₹5,000", basePrice:7500, emoji:"👗", image:"/images/women_formal.png", bg:"linear-gradient(135deg,#1a1a1a22,#3a3a3a22)", colors:["#1A1A1A","#F5F5F5"] } ]
  },
  party: {
    slim: [ { name:"Night Out Sparkle", why:"Sequins grab attention.", top:"Sequin Crop Top", bottom:"Leather Mini Skirt", shoes:"Stiletto Booties", accessory:"Clutch", price:"₹5,000", basePrice:7500, emoji:"✨", image:"/images/women_party.png", bg:"linear-gradient(135deg,#1a1a2e,#16213e)", colors:["#1A1A2E","#C0C0C0"] } ],
    medium: [ { name:"Velvet Elegance", why:"Luxurious texture hugs curves.", top:"Velvet Slip Dress", bottom:"", shoes:"Strappy Heels", accessory:"Chandelier Earrings", price:"₹6,000", basePrice:9000, emoji:"🌟", image:"/images/women_party.png", bg:"linear-gradient(135deg,#2d0a4e,#1a0030)", colors:["#2D0A4E","#C9A96E"] } ],
    chubby: [ { name:"Chic Wrap Cocktail", why:" universally flattering.", top:"Satin Wrap Dress", bottom:"", shoes:"Platform Heels", accessory:"Statement Ring", price:"₹4,500", basePrice:6500, emoji:"🥂", image:"/images/women_party.png", bg:"linear-gradient(135deg,#0a0a2a,#141430)", colors:["#0A0A2A","#F1C43D"] } ]
  },
  sporty: {
    slim: [ { name:"Studio Ready", why:"Form-fitting activewear.", top:"Sports Bra", bottom:"High-Rise Leggings", shoes:"Running Shoes", accessory:"Gym Bag", price:"₹4,000", basePrice:6000, emoji:"⚡", image:"/images/performance_sport.png", bg:"linear-gradient(135deg,#0D5C4B,#1a7a63)", colors:["#0D5C4B","#FFFFFF"] } ],
    medium: [ { name:"Athleisure Chic", why:"Comfortable layer over basics.", top:"Oversized Hoodie", bottom:"Biker Shorts", shoes:"Chunky Sneakers", accessory:"Cap", price:"₹3,500", basePrice:5000, emoji:"🏃‍♀️", image:"/images/performance_sport.png", bg:"linear-gradient(135deg,#D97706,#f0890a)", colors:["#D97706","#FFFFFF"] } ],
    chubby: [ { name:"Active Comfort", why:"Stretch fabrics move with you.", top:"Loose Tech Tee", bottom:"Joggers", shoes:"Cross Trainers", accessory:"Water Bottle", price:"₹3,000", basePrice:4500, emoji:"💪", image:"/images/performance_sport.png", bg:"linear-gradient(135deg,#1a1a1a,#2d2d2d)", colors:["#1A1A1A","#FFFFFF"] } ]
  },
  streetwear: {
    slim: [ { name:"Urban Edge", why:"Baggy fits add dynamic volume.", top:"Graphic Oversized Tee", bottom:"Cargo Pants", shoes:"Platform Sneakers", accessory:"Beanie", price:"₹3,500", basePrice:5500, emoji:"🧢", image:"/images/streetwear_hypebeast.png", bg:"linear-gradient(135deg,#1a1a1a,#0d3a2e)", colors:["#1A1A1A","#0D5C4B"] } ],
    medium: [ { name:"Downtown Cool", why:"Utility layers for practical style.", top:"Utility Jacket", bottom:"Straight Jeans", shoes:"Combat Boots", accessory:"Crossbody", price:"₹5,000", basePrice:7500, emoji:"🏙️", image:"/images/urban_explorer.png", bg:"linear-gradient(135deg,#1a1a1a,#2a2a4a)", colors:["#1A1A1A","#2A2A4A"] } ],
    chubby: [ { name:"Layered Street", why:"Confident layering builds structure.", top:"Oversized Flannel", bottom:"Wide-Leg Denim", shoes:"Chunky Kicks", accessory:"Bucket Hat", price:"₹4,000", basePrice:6000, emoji:"🖤", image:"/images/streetwear_hypebeast.png", bg:"linear-gradient(135deg,#0d0d0d,#1a1a1a)", colors:["#0D0D0D","#FFFFFF"] } ]
  },
  ethnic: {
    slim: [ { name:"Graceful Lehenga", why:"Adds volume for a stunning profile.", top:"Embroidered Choli", bottom:"Flared Lehenga", shoes:"Juttis", accessory:"Jhumkas", price:"₹10,000", basePrice:15000, emoji:"✨", image:"/images/ethnic_sherwani.png", bg:"linear-gradient(135deg,#f5e6d3,#e8d0b0)", colors:["#F5E6D3","#C8A96E"] } ],
    medium: [ { name:"Elegant Saree", why:"Drapes perfectly across curves.", top:"Matching Blouse", bottom:"Silk Saree", shoes:"Heels", accessory:"Bangles", price:"₹8,000", basePrice:12000, emoji:"🌸", image:"/images/ethnic_kurta.png", bg:"linear-gradient(135deg,#f5e6d3,#d4c5a9)", colors:["#F5E6D3","#8B6542"] } ],
    chubby: [ { name:"Festive Anarkali", why:"Flared silhouette provides grand elegance.", top:"Anarkali Suit", bottom:"Churidar", shoes:"Mojaris", accessory:"Chandbalis", price:"₹6,000", basePrice:9000, emoji:"🪔", image:"/images/ethnic_kurta.png", bg:"linear-gradient(135deg,#1a2a1a,#2a3a2a)", colors:["#1A2A1A","#F5E6D3"] } ]
  }
};

const adjectives = ["Premium", "Classic", "Modern", "Essential", "Signature"];

function expand(categoryData) {
  const result = {};
  for (const cat in categoryData) {
    result[cat] = {};
    for (const body in categoryData[cat]) {
      const items = categoryData[cat][body];
      const expanded = [...items];
      
      let i = 0;
      while (expanded.length < 5) {
        const baseItem = items[i % items.length];
        const newItem = { ...baseItem };
        const adj = adjectives[expanded.length % adjectives.length];
        newItem.name = adj + " " + newItem.name;
        if (!newItem.name.includes('Dress') && Math.random() > 0.5) {
           newItem.name = newItem.name + " Look";
        }
        newItem.basePrice = newItem.basePrice + (Math.floor(Math.random() * 10) * 100);
        expanded.push(newItem);
        i++;
      }
      result[cat][body] = expanded;
    }
  }
  return result;
}

const expandedMen = expand(baseMen);
const expandedWomen = expand(baseWomen);

let finalCode = "const MEN_OUTFITS = " + JSON.stringify(expandedMen, null, 2) + ";\n\n";
finalCode += "const WOMEN_OUTFITS = " + JSON.stringify(expandedWomen, null, 2) + ";\n\n";

finalCode += "export const OUTFITS = {\n";
finalCode += "  men: MEN_OUTFITS,\n";
finalCode += "  women: WOMEN_OUTFITS\n";
finalCode += "} as const;\n\n";

finalCode += "export const CAT_META: Record<string, {label: string, color: string, bg: string}> = {\n";
finalCode += "  casual:{label:'Casual',color:'#0D5C4B',bg:'rgba(13,92,75,0.1)'}, formal:{label:'Formal',color:'#1B3A6B',bg:'rgba(27,58,107,0.1)'},\n";
finalCode += "  party:{label:'Party',color:'#8B0000',bg:'rgba(139,0,0,0.1)'}, sporty:{label:'Sporty',color:'#D97706',bg:'rgba(217,119,6,0.1)'},\n";
finalCode += "  streetwear:{label:'Streetwear',color:'#2D2D2D',bg:'rgba(45,45,45,0.1)'}, ethnic:{label:'Ethnic',color:'#8B4513',bg:'rgba(139,69,19,0.1)'},\n";
finalCode += "};\n\n";

finalCode += "export type Outfit = {\n";
finalCode += "  name: string;\n";
finalCode += "  why: string;\n";
finalCode += "  top: string;\n";
finalCode += "  bottom: string;\n";
finalCode += "  shoes: string;\n";
finalCode += "  accessory?: string;\n";
finalCode += "  price: string;\n";
finalCode += "  basePrice: number;\n";
finalCode += "  emoji?: string;\n";
finalCode += "  image?: string;\n";
finalCode += "  bg: string;\n";
finalCode += "  colors: string[];\n";
finalCode += "  category?: string;\n";
finalCode += "  qty?: number;\n";
finalCode += "};\n";

fs.writeFileSync('src/lib/data.ts', finalCode);
console.log('Expanded data written to src/lib/data.ts');
