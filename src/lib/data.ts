const MEN_OUTFITS = {
  casual: {
    slim: [
      { name:"Layered Street Look", why:"Horizontal layers add visual volume to slim frames.", top:"Oversized Striped Oxford Shirt (H&M)", bottom:"Wide-Leg Beige Chinos (Uniqlo)", shoes:"White Low-Top Sneakers (Nike AF1)", accessory:"Tortoiseshell Glasses + Watch", price:"₹3,200–₹6,800", basePrice:5000, emoji:"👕", image:"/images/casual_layered.png", bg:"linear-gradient(135deg,#f5e6d3,#e8d0b0)", colors:["#E8D5C0","#8B6F5E","#FFFFFF"] },
      { name:"Monochrome Ease", why:"Single-color palette elongates the body visually.", top:"Ivory Linen Crew-Neck Tee (Zara)", bottom:"Ivory Slim Jogger Pants (Zara)", shoes:"Beige Canvas Slip-Ons (Vans)", accessory:"Minimalist Gold Chain", price:"₹2,800–₹5,500", basePrice:4200, emoji:"🤍", image:"/images/casual_look.png", bg:"linear-gradient(135deg,#faf6f0,#ede3d3)", colors:["#F5F0E8","#D4C5A9","#B8A898"] },
      { name:"Textured Casual Edit", why:"Corduroy creates the illusion of volume effortlessly.", top:"Olive Corduroy Overshirt (Pull&Bear)", bottom:"Slim Dark Jeans (Levi's 511)", shoes:"Chunky Suede Loafers (Clarks)", accessory:"Canvas Tote + Ring Stack", price:"₹4,000–₹8,000", basePrice:6000, emoji:"🫒", image:"/images/casual_layered.png", bg:"linear-gradient(135deg,#d4e0c4,#b8cc9e)", colors:["#4A6741","#2D4A24","#D4E0C4"] },
    ],
    medium: [
      { name:"Smart Casual Weekend", why:"Balanced proportions highlight your athletic frame.", top:"Fitted Polo Shirt (Ralph Lauren)", bottom:"Tapered Dark Chinos (Levi's)", shoes:"Clean White Sneakers (Adidas Stan Smith)", accessory:"Leather Strap Watch (Fossil)", price:"₹4,500–₹9,000", basePrice:6800, emoji:"👔", image:"/images/casual_look.png", bg:"linear-gradient(135deg,#e8f0e5,#d0e0cc)", colors:["#2D5A27","#4A3728","#F5F5F5"] },
      { name:"Effortless Saturday", why:"Relaxed-but-structured look enhancing your natural build.", top:"Washed Denim Shirt (Gap)", bottom:"Olive Cargo Pants (Zara)", shoes:"White Leather Sneakers (New Balance 574)", accessory:"Baseball Cap + Silver Watch", price:"₹3,800–₹7,500", basePrice:5500, emoji:"🧢", image:"/images/effortless_saturday.png", bg:"linear-gradient(135deg,#dce8f5,#bfd0e8)", colors:["#3A5B8A","#5A7B2A","#F0F0F0"] },
    ],
    chubby: [
      { name:"Relaxed Linen Layers", why:"Dark vertically-structured linen creates a streamlined silhouette.", top:"Dark Navy Linen Overshirt (Mango Man)", bottom:"Black Slim Joggers (Puma)", shoes:"Black Slip-On Loafers (Clarks)", accessory:"Minimal Silver Watch", price:"₹3,500–₹7,200", basePrice:5200, emoji:"🧥", image:"/images/casual_layered.png", bg:"linear-gradient(135deg,#1a274433,#0d0d0d22)", colors:["#1A2744","#0D0D0D","#8B9BB4"] },
    ]
  },
  formal: {
    slim: [
      { name:"Classic Power Suit", why:"Double-breasted blazer adds width to slim frames.", top:"White Dress Shirt (Charles Tyrwhitt)", bottom:"Charcoal Double-Breasted Suit (Raymond)", shoes:"Oxblood Oxford Brogues (Clarks)", accessory:"Silk Pocket Square + Cufflinks", price:"₹8,000–₹18,000", basePrice:13000, emoji:"🎩", image:"/images/business_suit.png", bg:"linear-gradient(135deg,#36393e33,#8b263533)", colors:["#36393E","#8B2635","#F5F5F5"] },
    ],
    medium: [
      { name:"Contemporary Business", why:"Slim-fit suit complements athletic builds perfectly.", top:"Light Blue French-Cuff Shirt (Van Heusen)", bottom:"Slim-Fit Navy Blue Suit (Arrow)", shoes:"Dark Brown Derby Shoes (Hush Puppies)", accessory:"Striped Tie + Leather Belt", price:"₹7,500–₹15,000", basePrice:11000, emoji:"💼", image:"/images/business_suit.png", bg:"linear-gradient(135deg,#1b3a6b22,#5b8db822)", colors:["#1B3A6B","#5B8DB8","#8B6542"] },
      { name:"The Tuxedo Statement", why:"Slim tuxedo shows off your build's proportions.", top:"White Dress Shirt + Black Bow Tie (Raymond)", bottom:"Black Slim Tuxedo Suit (Manyavar)", shoes:"Patent Leather Oxford (Bata Premium)", accessory:"Cufflinks + Boutonnière", price:"₹12,000–₹25,000", basePrice:18000, emoji:"🤵", image:"/images/formal_tuxedo.png", bg:"linear-gradient(135deg,#0d0d0d,#1a1a1a)", colors:["#000000","#FFFFFF","#C0A030"] },
    ],
    chubby: [
      { name:"Slim-Fit Authority", why:"Vertical pinstripes create a leaner silhouette.", top:"White Point-Collar Shirt (Wills Lifestyle)", bottom:"Pinstripe Charcoal Slim Suit (Park Avenue)", shoes:"Black Cap-Toe Oxfords (Bata Premium)", accessory:"Black Knit Tie + Pocket Square", price:"₹9,000–₹20,000", basePrice:14000, emoji:"🖤", image:"/images/formal_tuxedo.png", bg:"linear-gradient(135deg,#2c2c2c22,#44444422)", colors:["#2C2C2C","#FFFFFF","#1A1A1A"] },
    ]
  },
  party: {
    slim: [
      { name:"Night Out Statement", why:"Metallic accents add presence to slim frames.", top:"Slim-Fit Printed Satin Shirt (ASOS)", bottom:"Black Skinny Dress Pants (H&M)", shoes:"Chelsea Boots in Black (Zara)", accessory:"Silver Chain Necklace + Ring", price:"₹4,000–₹9,500", basePrice:6800, emoji:"✨", image:"/images/party_night.png", bg:"linear-gradient(135deg,#1a1a2e,#16213e)", colors:["#1A1A2E","#C0C0C0","#8B0000"] },
      { name:"Velvet Luxe Edit", why:"Velvet blazer over a simple base — drama without bulk.", top:"Black Velvet Blazer (Zara Man)", bottom:"Slim Black Trousers (H&M)", shoes:"Pointed Chelsea Boots (ALDO)", accessory:"Gold Watch + Statement Ring", price:"₹6,000–₹14,000", basePrice:10000, emoji:"🌟", image:"/images/party_velvet.png", bg:"linear-gradient(135deg,#2d0a4e,#1a0030)", colors:["#2D0A4E","#C9A96E","#000000"] },
    ],
    medium: [
      { name:"Club-Ready Quiet Luxury", why:"Fitted turtleneck channels quiet luxury perfectly.", top:"Black Ribbed Turtleneck (COS)", bottom:"Slim Camel Trousers (Zara Man)", shoes:"Suede Chelsea Boots (ALDO)", accessory:"Gold Bracelet + Minimal Watch", price:"₹5,500–₹12,000", basePrice:8500, emoji:"🥂", image:"/images/quiet_luxury.png", bg:"linear-gradient(135deg,#0d0d0d,#1a1a1a)", colors:["#0D0D0D","#C4A35A","#8B7355"] },
    ],
    chubby: [
      { name:"Bold Evening Presence", why:"Dark monochromatic colors with a statement accessory.", top:"Midnight Blue Mandarin-Collar Shirt (Fab India)", bottom:"Black Well-Cut Trousers (Westside)", shoes:"Pointed-Toe Black Loafers (Metro)", accessory:"Statement Watch + Pocket Square", price:"₹3,800–₹8,500", basePrice:6000, emoji:"🌙", image:"/images/party_night.png", bg:"linear-gradient(135deg,#0a0a2a,#141430)", colors:["#0A0A2A","#F1C43D","#0D0D0D"] },
    ]
  },
  sporty: {
    slim: [
      { name:"Athleisure Pro", why:"Color-blocking adds visual mass to leaner builds.", top:"Color-Block Windbreaker (Nike)", bottom:"Slim Jogger Sweatpants (Adidas)", shoes:"Chunky Sneakers (New Balance 990)", accessory:"Cap + Sports Watch", price:"₹5,000–₹14,000", basePrice:9500, emoji:"⚡", image:"/images/varsity_sport.png", bg:"linear-gradient(135deg,#0D5C4B,#1a7a63)", colors:["#0D5C4B","#FFFFFF","#F1C43D"] },
    ],
    medium: [
      { name:"Performance Meets Style", why:"Fitted performance wear showcases your athletic build.", top:"Fitted Dri-FIT Training Tee (Nike)", bottom:"Tapered Performance Shorts (Under Armour)", shoes:"Running Shoes (Asics Gel-Nimbus)", accessory:"Fitness Tracker + Cap", price:"₹4,500–₹12,000", basePrice:8000, emoji:"🏃", image:"/images/performance_sport.png", bg:"linear-gradient(135deg,#D97706,#f0890a)", colors:["#D97706","#FFFFFF","#1A1A1A"] },
      { name:"Varsity Street Sport", why:"A varsity jacket transforms athletic basics into street-ready.", top:"Varsity Jacket (H&M)", bottom:"Slim Track Pants (Puma)", shoes:"Retro Sneakers (Adidas Forum)", accessory:"Team Cap + Watch", price:"₹5,500–₹13,000", basePrice:9000, emoji:"🏆", image:"/images/varsity_sport.png", bg:"linear-gradient(135deg,#8B0000,#AA0000)", colors:["#8B0000","#FFFFFF","#FFD700"] },
    ],
    chubby: [
      { name:"Comfort Sport Look", why:"Dark fabrics with a clean cut keep you comfortable and stylish.", top:"Dark Compression Base Layer (Decathlon)", bottom:"Dark Loose Track Pants (Puma)", shoes:"Supportive Cross-Trainers (Reebok Nano)", accessory:"Sporty Watch + Gym Bag", price:"₹3,000–₹8,000", basePrice:5500, emoji:"💪", image:"/images/varsity_sport.png", bg:"linear-gradient(135deg,#1a1a1a,#2d2d2d)", colors:["#1A1A1A","#F1C43D","#FFFFFF"] },
    ]
  },
  streetwear: {
    slim: [
      { name:"Hypebeast Slim Edit", why:"Oversized tees and chunky kicks visually bulk up lean frames.", top:"Oversized Graphic Drop-Shoulder Tee (H&M)", bottom:"Baggy Cargo Pants (Zara)", shoes:"Chunky Platform Sneakers (Fila)", accessory:"Bucket Hat + Chain", price:"₹3,500–₹9,000", basePrice:6200, emoji:"🧢", image:"/images/streetwear_hypebeast.png", bg:"linear-gradient(135deg,#1a1a1a,#0d3a2e)", colors:["#1A1A1A","#0D5C4B","#F1C43D"] },
    ],
    medium: [
      { name:"Urban Explorer", why:"Technical fabrics and clean lines make a modern statement.", top:"Utility Overshirt (Zara)", bottom:"Slim-Fit Cargo Pants (H&M)", shoes:"White Chunky Sneakers (New Balance)", accessory:"Crossbody Bag + Beanie", price:"₹4,500–₹10,000", basePrice:7000, emoji:"🏙️", image:"/images/urban_explorer.png", bg:"linear-gradient(135deg,#1a1a1a,#2a2a4a)", colors:["#1A1A1A","#2A2A4A","#F0F0F0"] },
    ],
    chubby: [
      { name:"Bold Streetwear Statement", why:"Dark tones and strategic layering for confident street style.", top:"Oversized Dark Hoodie (Bewakoof)", bottom:"Wide-Leg Dark Jeans (ONLY)", shoes:"Black Chunky Sneakers (Fila)", accessory:"Snapback + Watch", price:"₹3,200–₹7,500", basePrice:5200, emoji:"🖤", image:"/images/streetwear_hypebeast.png", bg:"linear-gradient(135deg,#0d0d0d,#1a1a1a)", colors:["#0D0D0D","#F1C43D","#FFFFFF"] },
    ]
  },
  ethnic: {
    slim: [
      { name:"Classic Kurta Set", why:"Straight-cut kurta elongates and adds elegance to slim frames.", top:"White Cotton Kurta (Fab India)", bottom:"Churidar Pyjama (Fab India)", shoes:"Mojaris (Needledust)", accessory:"Minimalist Gold Kada", price:"₹2,500–₹6,000", basePrice:4200, emoji:"🪔", image:"/images/ethnic_kurta.png", bg:"linear-gradient(135deg,#f5e6d3,#e8d0b0)", colors:["#F5E6D3","#D4C5A9","#C8A96E"] },
    ],
    medium: [
      { name:"Festive Sherwani Look", why:"A fitted sherwani showcases your build's proportions with regal elegance.", top:"Ivory Sherwani (Manyavar)", bottom:"Churidar + Dupatta", shoes:"Embroidered Juttis (Fizzy Goblet)", accessory:"Safa + Brooch", price:"₹8,000–₹20,000", basePrice:14000, emoji:"👑", image:"/images/ethnic_sherwani.png", bg:"linear-gradient(135deg,#f5e6d3,#d4c5a9)", colors:["#F5E6D3","#C8A96E","#8B6542"] },
    ],
    chubby: [
      { name:"Relaxed Pathani Set", why:"Loose, breathable fabric with clean vertical lines create a dignified look.", top:"Dark Pathani Kurta (Fab India)", bottom:"Matching Salwar", shoes:"Kolhapuri Sandals (Metro)", accessory:"Pocket Square + Watch", price:"₹2,800–₹6,500", basePrice:4500, emoji:"🌿", image:"/images/ethnic_kurta.png", bg:"linear-gradient(135deg,#1a2a1a,#2a3a2a)", colors:["#1A2A1A","#F5E6D3","#8B6542"] },
    ]
  },
};

const WOMEN_OUTFITS = {
  casual: {
    slim: [ { name:"Chic Weekend Layers", why:"Highlights your natural figure without adding volume.", top:"Silk Blouse", bottom:"Wide-Leg Trousers", shoes:"Mules", accessory:"Gold Hoops", price:"₹4,000–₹8,000", basePrice:6000, emoji:"👚", image:"/images/women_casual.png", bg:"linear-gradient(135deg,#f5e6d3,#e8d0b0)", colors:["#E8D5C0","#8B6F5E","#FFFFFF"] } ],
    medium: [ { name:"Effortless Denim", why:"Balanced proportions for a versatile look.", top:"White Crop Tee", bottom:"High-Waisted Mom Jeans", shoes:"White Sneakers", accessory:"Crossbody Bag", price:"₹3,000–₹6,000", basePrice:4500, emoji:"👖", image:"/images/women_casual.png", bg:"linear-gradient(135deg,#dce8f5,#bfd0e8)", colors:["#3A5B8A","#F0F0F0"] } ],
    chubby: [ { name:"Flowy Maxi Dress", why:"A continuous line creates a beautiful, elegant silhouette.", top:"Floral Maxi Wrap Dress", bottom:"", shoes:"Strappy Sandals", accessory:"Sun Hat", price:"₹3,500–₹7,000", basePrice:5000, emoji:"👗", image:"/images/women_casual.png", bg:"linear-gradient(135deg,#f0e6e6,#d0b8b8)", colors:["#D0B8B8","#1A1A1A"] } ]
  },
  formal: {
    slim: [ { name:"The Power Suit", why:"Structured shoulders and tailored fit exude confidence.", top:"Silk Camisole", bottom:"Fitted Two-Piece Suit", shoes:"Pointed Pumps", accessory:"Pearl Necklace", price:"₹8,000–₹15,000", basePrice:11000, emoji:"💼", image:"/images/women_formal.png", bg:"linear-gradient(135deg,#36393e33,#8b263533)", colors:["#36393E","#F5F5F5"] } ],
    medium: [ { name:"Contemporary Workwear", why:"Cinched waist beautifully accentuates your profile.", top:"Wrap Blouse", bottom:"Pencil Skirt", shoes:"Kitten Heels", accessory:"Tote Bag", price:"₹6,000–₹12,000", basePrice:8000, emoji:"📝", image:"/images/women_formal.png", bg:"linear-gradient(135deg,#1b3a6b22,#5b8db822)", colors:["#1B3A6B","#F5F5F5"] } ],
    chubby: [ { name:"Elegant A-Line Shift", why:"Structured yet forgiving fit provides ultimate comfort.", top:"Tailored Shift Dress", bottom:"", shoes:"Block Heels", accessory:"Statement Watch", price:"₹5,000–₹10,000", basePrice:7500, emoji:"👗", image:"/images/women_formal.png", bg:"linear-gradient(135deg,#1a1a1a22,#3a3a3a22)", colors:["#1A1A1A","#F5F5F5"] } ]
  },
  party: {
    slim: [ { name:"Night Out Sparkle", why:"Sequins and metallic fabrics grab attention.", top:"Sequin Crop Top", bottom:"Leather Mini Skirt", shoes:"Stiletto Booties", accessory:"Clutch", price:"₹5,000–₹10,000", basePrice:7500, emoji:"✨", image:"/images/women_party.png", bg:"linear-gradient(135deg,#1a1a2e,#16213e)", colors:["#1A1A2E","#C0C0C0"] } ],
    medium: [ { name:"Velvet Elegance", why:"Luxurious texture that hugs your curves.", top:"Velvet Slip Dress", bottom:"", shoes:"Strappy Heels", accessory:"Chandelier Earrings", price:"₹6,000–₹12,000", basePrice:9000, emoji:"🌟", image:"/images/women_party.png", bg:"linear-gradient(135deg,#2d0a4e,#1a0030)", colors:["#2D0A4E","#C9A96E"] } ],
    chubby: [ { name:"Chic Wrap Cocktail", why:"V-neck wrap style is universally flattering.", top:"Satin Wrap Dress", bottom:"", shoes:"Platform Heels", accessory:"Statement Ring", price:"₹4,500–₹9,000", basePrice:6500, emoji:"🥂", image:"/images/women_party.png", bg:"linear-gradient(135deg,#0a0a2a,#141430)", colors:["#0A0A2A","#F1C43D"] } ]
  },
  sporty: {
    slim: [ { name:"Studio Ready", why:"Form-fitting activewear.", top:"Sports Bra", bottom:"High-Rise Leggings", shoes:"Running Shoes", accessory:"Gym Bag", price:"₹4,000–₹8,000", basePrice:6000, emoji:"⚡", image:"/images/performance_sport.png", bg:"linear-gradient(135deg,#0D5C4B,#1a7a63)", colors:["#0D5C4B","#FFFFFF"] } ],
    medium: [ { name:"Athleisure Chic", why:"Comfortable layer over supportive basics.", top:"Oversized Hoodie", bottom:"Biker Shorts", shoes:"Chunky Sneakers", accessory:"Cap", price:"₹3,500–₹7,000", basePrice:5000, emoji:"🏃‍♀️", image:"/images/performance_sport.png", bg:"linear-gradient(135deg,#D97706,#f0890a)", colors:["#D97706","#FFFFFF"] } ],
    chubby: [ { name:"Active Comfort", why:"Stretch fabrics that move with you.", top:"Loose Tech Tee", bottom:"Joggers", shoes:"Cross Trainers", accessory:"Water Bottle", price:"₹3,000–₹6,000", basePrice:4500, emoji:"💪", image:"/images/performance_sport.png", bg:"linear-gradient(135deg,#1a1a1a,#2d2d2d)", colors:["#1A1A1A","#FFFFFF"] } ]
  },
  streetwear: {
    slim: [ { name:"Urban Edge", why:"Baggy fits add dynamic volume.", top:"Graphic Oversized Tee", bottom:"Cargo Pants", shoes:"Platform Sneakers", accessory:"Beanie", price:"₹3,500–₹8,000", basePrice:5500, emoji:"🧢", image:"/images/streetwear_hypebeast.png", bg:"linear-gradient(135deg,#1a1a1a,#0d3a2e)", colors:["#1A1A1A","#0D5C4B"] } ],
    medium: [ { name:"Downtown Cool", why:"Utility layers for practical style.", top:"Utility Jacket", bottom:"Straight Jeans", shoes:"Combat Boots", accessory:"Crossbody", price:"₹5,000–₹10,000", basePrice:7500, emoji:"🏙️", image:"/images/urban_explorer.png", bg:"linear-gradient(135deg,#1a1a1a,#2a2a4a)", colors:["#1A1A1A","#2A2A4A"] } ],
    chubby: [ { name:"Layered Street", why:"Confident layering builds structure.", top:"Oversized Flannel", bottom:"Wide-Leg Denim", shoes:"Chunky Kicks", accessory:"Bucket Hat", price:"₹4,000–₹8,500", basePrice:6000, emoji:"🖤", image:"/images/streetwear_hypebeast.png", bg:"linear-gradient(135deg,#0d0d0d,#1a1a1a)", colors:["#0D0D0D","#FFFFFF"] } ]
  },
  ethnic: {
    slim: [ { name:"Graceful Lehenga", why:"Adds volume for a stunning profile.", top:"Embroidered Choli", bottom:"Flared Lehenga", shoes:"Juttis", accessory:"Jhumkas", price:"₹10,000–₹25,000", basePrice:15000, emoji:"✨", image:"/images/ethnic_sherwani.png", bg:"linear-gradient(135deg,#f5e6d3,#e8d0b0)", colors:["#F5E6D3","#C8A96E"] } ],
    medium: [ { name:"Elegant Saree", why:"Drapes perfectly across your curves.", top:"Matching Blouse", bottom:"Silk Saree", shoes:"Heels", accessory:"Bangles", price:"₹8,000–₹20,000", basePrice:12000, emoji:"🌸", image:"/images/ethnic_kurta.png", bg:"linear-gradient(135deg,#f5e6d3,#d4c5a9)", colors:["#F5E6D3","#8B6542"] } ],
    chubby: [ { name:"Festive Anarkali", why:"Flared silhouette provides grand elegance.", top:"Anarkali Suit", bottom:"Churidar", shoes:"Mojaris", accessory:"Chandbalis", price:"₹6,000–₹15,000", basePrice:9000, emoji:"🪔", image:"/images/ethnic_kurta.png", bg:"linear-gradient(135deg,#1a2a1a,#2a3a2a)", colors:["#1A2A1A","#F5E6D3"] } ]
  }
};

export const OUTFITS = {
  men: MEN_OUTFITS,
  women: WOMEN_OUTFITS
} as const;

export const CAT_META: Record<string, {label: string, color: string, bg: string}> = {
  casual:{label:'Casual',color:'#0D5C4B',bg:'rgba(13,92,75,0.1)'}, formal:{label:'Formal',color:'#1B3A6B',bg:'rgba(27,58,107,0.1)'},
  party:{label:'Party',color:'#8B0000',bg:'rgba(139,0,0,0.1)'}, sporty:{label:'Sporty',color:'#D97706',bg:'rgba(217,119,6,0.1)'},
  streetwear:{label:'Streetwear',color:'#2D2D2D',bg:'rgba(45,45,45,0.1)'}, ethnic:{label:'Ethnic',color:'#8B4513',bg:'rgba(139,69,19,0.1)'},
};

export type Outfit = {
  name: string;
  why: string;
  top: string;
  bottom: string;
  shoes: string;
  accessory?: string;
  price: string;
  basePrice: number;
  emoji?: string;
  image?: string;
  bg: string;
  colors: string[];
  category?: string;
  qty?: number;
};
