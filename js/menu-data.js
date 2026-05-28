/**
 * menu-data.js
 * All menu item data for Brijwasi Sweet Corner.
 * Edit prices, names, or categories here to update the menu across the site.
 */

const menuItems = [
  // ---- JAMUN / RASGULLA ----
  { name:"Gulab Jamun",    hindi:"गुलाब जामुन",   price:400,  unit:"kg",    cat:"jamun",  emoji:"🟤" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Mini Jamun",     hindi:"मिनी जामुन",    price:400,  unit:"kg",    cat:"jamun",  emoji:"🟤" , available:false , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Kala Jamun",     hindi:"काला जामुन",    price:400,  unit:"kg",    cat:"jamun",  emoji:"⚫" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Rasgulla",       hindi:"रसगुल्ला",      price:320,  unit:"kg",    cat:"jamun",  emoji:"⚪" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Rasbhari",       hindi:"रसभरी",         price:320,  unit:"kg",    cat:"jamun",  emoji:"🍡" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Chamcham",       hindi:"चमचम",          price:520,  unit:"kg",    cat:"jamun",  emoji:"🍯" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},

  // ---- BARFI ----
  { name:"Plain Barfi",        hindi:"सादा बर्फी",       price:540,  unit:"kg", cat:"barfi", emoji:"⬜" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Milk Cake",          hindi:"मिल्क केक",        price:540,  unit:"kg", cat:"barfi", emoji:"🎂" , available:false , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Besan Barfi",        hindi:"बेसन बर्फी",       price:540,  unit:"kg", cat:"barfi", emoji:"🟡" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Malai Barfi",        hindi:"मलाई बर्फी",       price:540,  unit:"kg", cat:"barfi", emoji:"🍦" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Lal Peda",           hindi:"लाल पेड़ा",        price:540,  unit:"kg", cat:"barfi", emoji:"🔴" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Kalakand",           hindi:"कलाकंद",           price:580,  unit:"kg", cat:"barfi", emoji:"🍮" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Badam Barfi",        hindi:"बादाम बर्फी",      price:580,  unit:"kg", cat:"barfi", emoji:"🟫" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Pista Barfi",        hindi:"पिस्ता बर्फी",     price:580,  unit:"kg", cat:"barfi", emoji:"🟢" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Bikaneri Barfi",     hindi:"बीकानेरी बर्फी",   price:580,  unit:"kg", cat:"barfi", emoji:"🧡" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Kaju Mawa Barfi",    hindi:"काजू मावा बर्फी",  price:580,  unit:"kg", cat:"barfi", emoji:"🥮" , available:true , shelfLife: 'Consume within 15 days', ingredients: 'Premium Cashews, Sugar, Silver Vark', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Khoya Roll",         hindi:"खोया रोल",         price:580,  unit:"kg", cat:"barfi", emoji:"🍥" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Mango Barfi",        hindi:"मैंगो बर्फी",      price:600,  unit:"kg", cat:"barfi", emoji:"🥭" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Strawberry Barfi",   hindi:"स्ट्रॉबेरी बर्फी", price:600,  unit:"kg", cat:"barfi", emoji:"🍓" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Kaju Katli",         hindi:"काजू कतली",        price:1200, unit:"kg", cat:"barfi", emoji:"💎" , available:true , shelfLife: 'Consume within 15 days', ingredients: 'Premium Cashews, Sugar, Silver Vark', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Kaju Kalash",        hindi:"काजू कलश",         price:1400, unit:"kg", cat:"barfi", emoji:"🏆" , available:true , shelfLife: 'Consume within 15 days', ingredients: 'Premium Cashews, Sugar, Silver Vark', desc: 'Authentic traditional sweet made with pure desi ghee.'},

  // ---- LADOO ----
  { name:"Boondi Ladoo",           hindi:"बूंदी लड्डू",          price:300, unit:"kg", cat:"ladoo", emoji:"🟠" , available:true , shelfLife: 'Consume within 10 days', ingredients: 'Gram Flour, Pure Desi Ghee, Sugar, Dry Fruits', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Besan Ladoo",            hindi:"बेसन लड्डू",           price:300, unit:"kg", cat:"ladoo", emoji:"🟡" , available:true , shelfLife: 'Consume within 10 days', ingredients: 'Gram Flour, Pure Desi Ghee, Sugar, Dry Fruits', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Desi Ghee Boondi Ladoo", hindi:"देसी घी बूंदी लड्डू", price:600, unit:"kg", cat:"ladoo", emoji:"✨" , available:true , shelfLife: 'Consume within 10 days', ingredients: 'Gram Flour, Pure Desi Ghee, Sugar, Dry Fruits', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Desi Ghee Besan Ladoo",  hindi:"देसी घी बेसन लड्डू",  price:600, unit:"kg", cat:"ladoo", emoji:"✨" , available:true , shelfLife: 'Consume within 10 days', ingredients: 'Gram Flour, Pure Desi Ghee, Sugar, Dry Fruits', desc: 'Authentic traditional sweet made with pure desi ghee.'},

  // ---- SNACKS ----
  { name:"Namak Pare",    hindi:"नमक पारे",  price:300, unit:"kg",    cat:"snack", emoji:"🧂" , available:true , shelfLife: 'Consume within 2 days', ingredients: 'Refined Flour, Spices, Edible Oil', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Til Pare",      hindi:"तिल पारे",  price:320, unit:"kg",    cat:"snack", emoji:"⚫" , available:true , shelfLife: 'Consume within 2 days', ingredients: 'Refined Flour, Spices, Edible Oil', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Mathi",         hindi:"मठी",       price:280, unit:"kg",    cat:"snack", emoji:"🍪" , available:true , shelfLife: 'Consume within 2 days', ingredients: 'Refined Flour, Spices, Edible Oil', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Methi Mathi",   hindi:"मेथी मठी",  price:300, unit:"kg",    cat:"snack", emoji:"🌿" , available:true , shelfLife: 'Consume within 2 days', ingredients: 'Refined Flour, Spices, Edible Oil', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Dhokla",        hindi:"ढोकला",     price:220, unit:"kg",    cat:"snack", emoji:"🟨" , available:true , shelfLife: 'Consume within 2 days', ingredients: 'Refined Flour, Spices, Edible Oil', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Samosa",        hindi:"समोसा",     price:20,  unit:"piece", cat:"snack", emoji:"🔶" , available:true , shelfLife: 'Consume within 2 days', ingredients: 'Refined Flour, Spices, Edible Oil', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Bread Pakoda",  hindi:"ब्रेड पकोड़ा", price:35, unit:"piece", cat:"snack", emoji:"🥙" , available:true , shelfLife: 'Consume within 2 days', ingredients: 'Refined Flour, Spices, Edible Oil', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Khasta Kachori",hindi:"खस्ता कचोरी", price:25, unit:"piece", cat:"snack", emoji:"🌙" , available:false , shelfLife: 'Consume within 2 days', ingredients: 'Refined Flour, Spices, Edible Oil', desc: 'Authentic traditional sweet made with pure desi ghee.'},

  // ---- PER PIECE ----
  { name:"Rasmalai",     hindi:"रस मलाई",   price:40,  unit:"piece", cat:"piece", emoji:"🍮" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Rajbhog",      hindi:"राजभोग",    price:35,  unit:"piece", cat:"piece", emoji:"🟠" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Chhena Payas", hindi:"छेना पायस", price:45,  unit:"piece", cat:"piece", emoji:"🥛" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Chhena Toast", hindi:"छेना टोस्ट",price:520, unit:"kg",    cat:"piece", emoji:"🍞" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Malai Chaap",  hindi:"मलाई चाप",  price:520, unit:"kg",    cat:"piece", emoji:"🥩" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},
  { name:"Rabri",        hindi:"रबड़ी",      price:520, unit:"kg",    cat:"piece", emoji:"🍶" , available:true , shelfLife: 'Consume within 3 days', ingredients: 'Milk, Sugar, Pure Desi Ghee, Cardamom', desc: 'Authentic traditional sweet made with pure desi ghee.'},

  { name:"Mathri", hindi:"मठरी", price:300, unit:"kg", cat:"namkeen", emoji:"🥟", available:true, shelfLife:"'Consume within 30 days'", ingredients:"'Flour, Ajwain, Salt, Oil'", desc:"'Crispy traditional savory snack.'" },
  { name:"Aloo Bhujia", hindi:"आलू भुजिया", price:350, unit:"kg", cat:"namkeen", emoji:"🍟", available:true, shelfLife:"'Consume within 45 days'", ingredients:"'Potato, Gram Flour, Spices'", desc:"'Spicy and crispy potato noodles.'" },
  { name:"Sugar-Free Barfi", hindi:"शुगर-फ्री बर्फी", price:800, unit:"kg", cat:"sugarfree", emoji:"🟦", available:true, shelfLife:"'Consume within 7 days'", ingredients:"'Milk, Stevia, Cardamom'", desc:"'Guilt-free delicious milk barfi.'" },
  { name:"Sugar-Free Ladoo", hindi:"शुगर-फ्री लड्डू", price:700, unit:"kg", cat:"sugarfree", emoji:"🟡", available:true, shelfLife:"'Consume within 15 days'", ingredients:"'Dry fruits, Gram flour, Stevia'", desc:"'Healthy ladoos with zero added sugar.'" },
];
