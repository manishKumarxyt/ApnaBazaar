/**
 * SabkaBazar - Har dukaan apke paas!
 * Initial Mock Data & LocalStorage Store Manager
 */

const SABKA_BAZAR_DATA = {
  taglines: [
    "Har dukaan apke paas!",
    "Har zaroorat, ek bazaar",
    "Aapka Apna Shopping Bazaar",
    "Shop local, shop smart",
    "Har dukaan ab online"
  ],

  categories: [
    {
      id: "electronics",
      name: "Electronics & Gadgets",
      hindiName: "इलेक्ट्रॉनिक्स और मोबाइल",
      icon: "smartphone",
      color: "from-blue-600 to-indigo-700",
      accentBg: "bg-blue-50 text-blue-700 border-blue-200",
      description: "Mobile accessories, smartwatches, cables, audio, repair & home appliances",
      bannerText: "Best deals on authentic electronics from local verified tech shops"
    },
    {
      id: "hardware",
      name: "Hardware & Tools",
      hindiName: "हार्डवेयर और टूल्स",
      icon: "wrench",
      color: "from-amber-600 to-orange-700",
      accentBg: "bg-amber-50 text-amber-700 border-amber-200",
      description: "Power tools, drill machines, plumbing, sanitary, electricals & paints",
      bannerText: "Genuine hardware, building supplies & repair tools in 20 minutes"
    },
    {
      id: "clothes",
      name: "Clothes & Fashion",
      hindiName: "कपड़े और फैशन",
      icon: "shirt",
      color: "from-pink-600 to-rose-700",
      accentBg: "bg-pink-50 text-pink-700 border-pink-200",
      description: "Ethnic wear, kurtis, casual shirts, jeans, kids wear & footwear",
      bannerText: "Trendy outfits & tailoring from famous local fashion boutiques"
    },
    {
      id: "kirana",
      name: "Kirana & Supermarket",
      hindiName: "किराना और राशन",
      icon: "shopping-basket",
      color: "from-emerald-600 to-teal-700",
      accentBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      description: "Atta, dal, spices, edible oils, snacks, dairy & household essentials",
      bannerText: "Pure spices and fresh groceries from your neighborhood trusted bania"
    },
    {
      id: "pharmacy",
      name: "Pharmacy & Health",
      hindiName: "दवाइयां और सेहत",
      icon: "cross",
      color: "from-cyan-600 to-teal-700",
      accentBg: "bg-cyan-50 text-cyan-700 border-cyan-200",
      description: "Prescription medicines, wellness, first-aid, ayurvedic & baby care",
      bannerText: "100% genuine medicines with licensed local pharmacists"
    },
    {
      id: "stationery",
      name: "Books & Stationery",
      hindiName: "किताबें और स्टेशनरी",
      icon: "book-open",
      color: "from-purple-600 to-indigo-700",
      accentBg: "bg-purple-50 text-purple-700 border-purple-200",
      description: "Notebooks, office supplies, art items, calculators & exam essentials",
      bannerText: "School, college & work stationery delivered before your next meeting"
    },
    {
      id: "homedecor",
      name: "Home Decor & Kitchen",
      hindiName: "घर और रसोई",
      icon: "home",
      color: "from-yellow-600 to-amber-700",
      accentBg: "bg-yellow-50 text-yellow-700 border-yellow-200",
      description: "Cookware, organizers, decorative lights, curtains & pooja essentials",
      bannerText: "Upgrade your sweet home with artisanal local handicraft & utensils"
    },
    {
      id: "bakery",
      name: "Sweets & Bakery",
      hindiName: "मिठाई और बेकरी",
      icon: "cake",
      color: "from-red-500 to-pink-600",
      accentBg: "bg-red-50 text-red-700 border-red-200",
      description: "Fresh mithai, hot samosas, birthday cakes, namkeen & fresh bakery bread",
      bannerText: "Desi ghee sweets & oven-fresh bakery straight to your doorstep"
    }
  ],

  stores: [
    // ---------------- ELECTRONICS STORES ----------------
    {
      id: "store_elec_1",
      name: "Sharma Electronics & Mobile Hub",
      category: "electronics",
      rating: 4.8,
      reviewCount: 342,
      distance: "0.8 km",
      deliveryTime: "15-20 mins",
      minOrder: 99,
      owner: "Ramesh Sharma",
      phone: "+91 98112 34567",
      address: "Shop 14, Main Market, Sector 14, Gurugram",
      verified: true,
      badge: "Top Rated Tech Shop",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1200&q=80",
      description: "Serving the locality for over 18 years. Certified retailer of genuine smartphone chargers, Bluetooth buds, power banks, and on-spot screen protector application.",
      tags: ["Instant Delivery", "GST Bill Available", "Warranty Support", "Screen Guard Fitting"],
      reviews: [
        {
          id: "rev_e1_1",
          userName: "Ankit Verma",
          userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
          rating: 5,
          date: "Yesterday",
          verifiedBuyer: true,
          purchasedItem: "65W GaN Fast Charger Type-C",
          comment: "Super fast delivery in just 14 minutes! The charger is 100% genuine with official brand seal. Uncle even called to confirm phone model.",
          helpfulCount: 24
        },
        {
          id: "rev_e1_2",
          userName: "Pooja Malhotra",
          userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
          rating: 5,
          date: "3 days ago",
          verifiedBuyer: true,
          purchasedItem: "Boat Airdopes 141 ANC",
          comment: "I always buy from Sharma Electronics. Better price than online big brands and immediate delivery when my office headset broke down.",
          helpfulCount: 18
        },
        {
          id: "rev_e1_3",
          userName: "Suresh Gupta",
          userAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
          rating: 4,
          date: "1 week ago",
          verifiedBuyer: true,
          purchasedItem: "Braided 100W Type-C to Type-C Cable",
          comment: "Solid cable quality, durable heavy-duty copper braid. Fast dispatch by SabkaBazar runner.",
          helpfulCount: 7
        }
      ],
      products: [
        {
          id: "prod_e1_1",
          name: "65W GaN Ultra-Fast Charger (Dual Port)",
          subcategory: "Chargers & Adapters",
          price: 1199,
          mrp: 1999,
          unit: "1 pc",
          inStock: true,
          stockCount: 12,
          image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80",
          description: "Compact GaN technology, Type-C + USB-A, supports laptop & smartphone warp charging.",
          rating: 4.9,
          badge: "Bestseller"
        },
        {
          id: "prod_e1_2",
          name: "Boat Airdopes 141 ANC True Wireless",
          subcategory: "Audio & Earbuds",
          price: 1399,
          mrp: 3990,
          unit: "1 set",
          inStock: true,
          stockCount: 8,
          image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80",
          description: "Active Noise Cancellation up to 32dB, 42 hours total playtime, ENx quad mics.",
          rating: 4.8,
          badge: "65% OFF"
        },
        {
          id: "prod_e1_3",
          name: "Mi 20000mAh Power Bank 3i (18W Fast)",
          subcategory: "Power Banks",
          price: 1849,
          mrp: 2499,
          unit: "1 pc",
          inStock: true,
          stockCount: 15,
          image: "https://images.unsplash.com/photo-1609592806596-b33367ebff2a?auto=format&fit=crop&w=400&q=80",
          description: "Triple output ports, dual input (Micro-USB + Type-C), 12 layers circuit protection.",
          rating: 4.8,
          badge: "Heavy Duty"
        },
        {
          id: "prod_e1_4",
          name: "Reinforced Braided Type-C to Lightning Cable",
          subcategory: "Cables",
          price: 349,
          mrp: 799,
          unit: "1.5m length",
          inStock: true,
          stockCount: 30,
          image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=400&q=80",
          description: "MFi certified chip, unbreakable nylon braided, fast data sync & PD charging.",
          rating: 4.7,
          badge: "Must Have"
        },
        {
          id: "prod_e1_5",
          name: "Fire-Boltt Phoenix Bluetooth Calling Smartwatch",
          subcategory: "Smart Wearables",
          price: 1499,
          mrp: 4999,
          unit: "1 pc",
          inStock: true,
          stockCount: 6,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
          description: "1.3 inch HD display, 120+ sports modes, SpO2 & Heart Rate tracking.",
          rating: 4.6,
          badge: "70% OFF"
        }
      ]
    },
    {
      id: "store_elec_2",
      name: "Apex Gadgets & Computer World",
      category: "electronics",
      rating: 4.7,
      reviewCount: 219,
      distance: "1.4 km",
      deliveryTime: "20-25 mins",
      minOrder: 150,
      owner: "Vikram Singhania",
      phone: "+91 98711 88223",
      address: "SCO 42, Huda Market, Sector 15, Gurugram",
      verified: true,
      badge: "PC & Gaming Specialist",
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      description: "Everything for your home office & gaming rig: mice, keyboards, HDMI cables, Wi-Fi routers, webcams and thermal paste.",
      tags: ["IT Specialist", "Original Invoices", "Tested Hardware"],
      reviews: [
        {
          id: "rev_e2_1",
          userName: "Deepak Rawat",
          userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
          rating: 5,
          date: "5 days ago",
          verifiedBuyer: true,
          purchasedItem: "Logitech Silent Wireless Mouse",
          comment: "Saved my presentation! Ordered at 9:30 AM and got it at my flat by 9:48 AM. Genuine Logitech with seal intact.",
          helpfulCount: 15
        },
        {
          id: "rev_e2_2",
          userName: "Meenakshi Joshi",
          userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
          rating: 4,
          date: "2 weeks ago",
          verifiedBuyer: true,
          purchasedItem: "4K HDMI 2.1 Cable 2m",
          comment: "Works perfectly with my Sony Bravia TV 120Hz. Good local store with knowledgeable staff.",
          helpfulCount: 9
        }
      ],
      products: [
        {
          id: "prod_e2_1",
          name: "Logitech M221 Silent Wireless Mouse",
          subcategory: "Computer Accessories",
          price: 749,
          mrp: 1095,
          unit: "1 pc",
          inStock: true,
          stockCount: 18,
          image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80",
          description: "90% noise reduction, 18-month battery life, plug-and-play USB receiver.",
          rating: 4.8,
          badge: "Office Essential"
        },
        {
          id: "prod_e2_2",
          name: "TP-Link N300 Wi-Fi Router (High Gain)",
          subcategory: "Networking",
          price: 999,
          mrp: 1499,
          unit: "1 pc",
          inStock: true,
          stockCount: 7,
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
          description: "300Mbps wireless speed, two 5dBi antennas for wider home coverage.",
          rating: 4.7,
          badge: "Bestseller"
        },
        {
          id: "prod_e2_3",
          name: "Full HD 1080P USB Webcam with Mic",
          subcategory: "Computer Accessories",
          price: 1250,
          mrp: 2499,
          unit: "1 pc",
          inStock: true,
          stockCount: 5,
          image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80",
          description: "Autofocus, built-in noise cancelling microphone, privacy cover clip.",
          rating: 4.6,
          badge: "50% OFF"
        }
      ]
    },
    {
      id: "store_elec_3",
      name: "City Lights & Electricals",
      category: "electronics",
      rating: 4.9,
      reviewCount: 185,
      distance: "0.5 km",
      deliveryTime: "10-15 mins",
      minOrder: 50,
      owner: "Harish Chawla",
      phone: "+91 99912 44332",
      address: "Shop 7, Corner Market, Old Railway Road",
      verified: true,
      badge: "Quickest Delivery",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",
      description: "Smart LED bulbs, extension boards, mosquito rackets, Philips tubes, and emergency rechargeable lights.",
      tags: ["10-Min Delivery", "Energy Star", "Free Testing"],
      reviews: [
        {
          id: "rev_e3_1",
          userName: "Tarun Bajaj",
          userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
          rating: 5,
          date: "Yesterday",
          verifiedBuyer: true,
          purchasedItem: "Wipro 12W Smart RGB Bulb (Wi-Fi)",
          comment: "Delivered in literally 11 minutes! Chawla ji personally checked the warranty stamp before sending.",
          helpfulCount: 31
        }
      ],
      products: [
        {
          id: "prod_e3_1",
          name: "Wipro 12W Smart RGB LED Bulb (Alexa & Google)",
          subcategory: "Smart Home",
          price: 549,
          mrp: 990,
          unit: "1 pc",
          inStock: true,
          stockCount: 20,
          image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80",
          description: "16 million colors, dimmable, schedule timer, works without hub.",
          rating: 4.9,
          badge: "Smart Pick"
        },
        {
          id: "prod_e3_2",
          name: "Anchor by Panasonic 4-Socket Surge Protector 2m",
          subcategory: "Switches & Boards",
          price: 499,
          mrp: 750,
          unit: "1 pc",
          inStock: true,
          stockCount: 25,
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
          description: "Master switch with indicator, overload protection, fire-retardant plastic.",
          rating: 4.8,
          badge: "Safe Home"
        }
      ]
    },

    // ---------------- HARDWARE STORES ----------------
    {
      id: "store_hard_1",
      name: "Gupta Hardware & Sanitary Store",
      category: "hardware",
      rating: 4.9,
      reviewCount: 412,
      distance: "1.1 km",
      deliveryTime: "15-25 mins",
      minOrder: 99,
      owner: "Manoj Gupta",
      phone: "+91 98103 99887",
      address: "Plot 88, Hardware Galli, Krishna Market, Gurugram",
      verified: true,
      badge: "Master Hardware Specialist",
      image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
      description: "Everything from professional Bosch impact drill kits, water tap fittings, Asian Paints waterproofing, screws, nails, adhesives and hand tools.",
      tags: ["Wholesale Rates", "Bosch Authorized", "Same-Day Plumber Assist"],
      reviews: [
        {
          id: "rev_h1_1",
          userName: "Sunil Mathur",
          userAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80",
          rating: 5,
          date: "Yesterday",
          verifiedBuyer: true,
          purchasedItem: "Bosch GSB 500W Impact Drill Kit",
          comment: "Original Bosch tool with stamped warranty card! The delivery boy brought it in a safe heavy bag within 20 mins. Highly reliable shop.",
          helpfulCount: 29
        },
        {
          id: "rev_h1_2",
          userName: "Amitav Roy",
          userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
          rating: 5,
          date: "4 days ago",
          verifiedBuyer: true,
          purchasedItem: "Stainless Steel Kitchen Sink Tap",
          comment: "High quality chrome brass finish. No leakage, all washers included. Best local hardware shop in town.",
          helpfulCount: 14
        }
      ],
      products: [
        {
          id: "prod_h1_1",
          name: "Bosch GSB 500W Professional Impact Drill Machine Kit",
          subcategory: "Power Tools",
          price: 2899,
          mrp: 4450,
          unit: "Kit with 100 accessories",
          inStock: true,
          stockCount: 9,
          image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80",
          description: "500 Watts motor, forward/reverse modes, includes drill bits, hammer, pliers, screws.",
          rating: 4.9,
          badge: "Pro Choice"
        },
        {
          id: "prod_h1_2",
          name: "Stanley 16-Piece Multi-Tool Precision Screwdriver Set",
          subcategory: "Hand Tools",
          price: 449,
          mrp: 750,
          unit: "1 set",
          inStock: true,
          stockCount: 25,
          image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=400&q=80",
          description: "Magnetic tips, chrome vanadium steel, non-slip grip case.",
          rating: 4.8,
          badge: "Essential"
        },
        {
          id: "prod_h1_3",
          name: "M-Seal Multi-Purpose Epoxy Sealant 100g",
          subcategory: "Adhesives & Sealants",
          price: 35,
          mrp: 40,
          unit: "100g pack",
          inStock: true,
          stockCount: 100,
          image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=400&q=80",
          description: "Stops leakage in pipes, joints, and gaps in 90 minutes.",
          rating: 4.9,
          badge: "Super Saver"
        },
        {
          id: "prod_h1_4",
          name: "Heavy Duty Brass Padlock 50mm (3 Keys)",
          subcategory: "Locks & Security",
          price: 320,
          mrp: 450,
          unit: "1 pc",
          inStock: true,
          stockCount: 18,
          image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80",
          description: "Hardened steel shackle, corrosion resistant solid brass body.",
          rating: 4.7,
          badge: "Top Security"
        }
      ]
    },
    {
      id: "store_hard_2",
      name: "Kisan & National Tools Centre",
      category: "hardware",
      rating: 4.7,
      reviewCount: 164,
      distance: "1.8 km",
      deliveryTime: "20-30 mins",
      minOrder: 100,
      owner: "Baldev Singh",
      phone: "+91 97188 11223",
      address: "Shop 12, Subhash Chowk, Old Market",
      verified: true,
      badge: "Heavy Industrial Tools",
      image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=1200&q=80",
      description: "Safety gear, ladders, heavy chains, water motor pumps, and industrial painting tools.",
      tags: ["Industrial Grade", "Direct Factory Price"],
      reviews: [
        {
          id: "rev_h2_1",
          userName: "Praveen Yadav",
          userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
          rating: 5,
          date: "1 week ago",
          verifiedBuyer: true,
          purchasedItem: "5-Step Aluminum Folding Ladder",
          comment: "Baldev ji delivered the ladder right inside our hallway. Sturdy and lightweight.",
          helpfulCount: 11
        }
      ],
      products: [
        {
          id: "prod_h2_1",
          name: "Heavy Duty 5-Step Aluminum Household Ladder",
          subcategory: "Ladders & Platforms",
          price: 2499,
          mrp: 3800,
          unit: "1 unit",
          inStock: true,
          stockCount: 4,
          image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=400&q=80",
          description: "Anti-skid rubber feet, load capacity up to 150 kg, rustproof alloy.",
          rating: 4.8,
          badge: "Sturdy"
        }
      ]
    },

    // ---------------- CLOTHES & FASHION STORES ----------------
    {
      id: "store_clot_1",
      name: "Aparna Ethnic & Fashion Boutique",
      category: "clothes",
      rating: 4.9,
      reviewCount: 520,
      distance: "0.9 km",
      deliveryTime: "15-25 mins",
      minOrder: 199,
      owner: "Aparna Sen & Ritu Batra",
      phone: "+91 98111 67890",
      address: "Shop 21, Central Arcade, DLF Phase 2, Gurugram",
      verified: true,
      badge: "Trending Boutique",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
      description: "Finest pure cotton kurtis, festive dupattas, daily wear tunics, and matching palazzos crafted by local artisans.",
      tags: ["Pure Cotton", "Custom Alterations", "Trial at Home"],
      reviews: [
        {
          id: "rev_c1_1",
          userName: "Shalini Kapoor",
          userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
          rating: 5,
          date: "Yesterday",
          verifiedBuyer: true,
          purchasedItem: "Handloom Chikankari Pure Cotton Kurti",
          comment: "Fabric is so breathable and soft! Stitching is neat and color is identical to the photos. SabkaBazar made it so easy to shop from Aparna Boutique sitting at home.",
          helpfulCount: 42
        },
        {
          id: "rev_c1_2",
          userName: "Neelam Saxena",
          userAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
          rating: 5,
          date: "3 days ago",
          verifiedBuyer: true,
          purchasedItem: "Floral Print Rayon Anarkali Kurta Set",
          comment: "Aparna di sent two sizes so I could keep the best fit! That is the beauty of our local dukaan. Unbeatable service.",
          helpfulCount: 35
        }
      ],
      products: [
        {
          id: "prod_c1_1",
          name: "Handcrafted Lucknowi Chikankari Cotton Kurti",
          subcategory: "Women Ethnic",
          price: 899,
          mrp: 1899,
          unit: "Size M / L / XL",
          inStock: true,
          stockCount: 14,
          image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80",
          description: "Pure breathable mulmul cotton, intricate hand embroidery, pastel mint green.",
          rating: 4.9,
          badge: "Boutique Special"
        },
        {
          id: "prod_c1_2",
          name: "Printed Cotton Palazzo Pants (Free Size)",
          subcategory: "Women Bottoms",
          price: 449,
          mrp: 899,
          unit: "1 pc",
          inStock: true,
          stockCount: 22,
          image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80",
          description: "Comfortable elasticated waistband with drawstring, side pockets, all-day comfort.",
          rating: 4.8,
          badge: "50% OFF"
        },
        {
          id: "prod_c1_3",
          name: "Hand-Block Printed Chanderi Silk Dupatta",
          subcategory: "Dupattas & Stoles",
          price: 599,
          mrp: 1200,
          unit: "2.4m length",
          inStock: true,
          stockCount: 10,
          image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
          description: "Golden zari border, natural vegetable dyes, adds elegance to any plain suit.",
          rating: 4.9,
          badge: "Artisan Made"
        }
      ]
    },
    {
      id: "store_clot_2",
      name: "The Raymond & Men's Hub",
      category: "clothes",
      rating: 4.8,
      reviewCount: 289,
      distance: "1.3 km",
      deliveryTime: "20-30 mins",
      minOrder: 250,
      owner: "Kailash Chand Jain",
      phone: "+91 98104 33221",
      address: "Shop 5, Main Commercial Complex, Sector 14",
      verified: true,
      badge: "Men's Formal Specialist",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80",
      description: "Premium cotton shirts, trousers, chinos, neckties, leather belts and suiting lengths.",
      tags: ["Formal Wear", "Pure Linen", "Authentic Fabrics"],
      reviews: [
        {
          id: "rev_c2_1",
          userName: "Gaurav Sehgal",
          userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
          rating: 5,
          date: "5 days ago",
          verifiedBuyer: true,
          purchasedItem: "Pure Cotton Crisp White Formal Shirt",
          comment: "Needed an urgent crisp white shirt for an interview next morning. Delivered in 18 minutes, perfectly pressed in box packing!",
          helpfulCount: 27
        }
      ],
      products: [
        {
          id: "prod_c2_1",
          name: "Crisp Pure Cotton Slim-Fit Formal Shirt (White)",
          subcategory: "Men Formal",
          price: 999,
          mrp: 1799,
          unit: "Size 40 / 42",
          inStock: true,
          stockCount: 15,
          image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80",
          description: "100% Giza cotton, wrinkle-resistant finish, structured spread collar.",
          rating: 4.8,
          badge: "Interview Ready"
        },
        {
          id: "prod_c2_2",
          name: "Genuine Leather Reversible Belt (Black & Brown)",
          subcategory: "Accessories",
          price: 549,
          mrp: 1299,
          unit: "Free Size Adjustable",
          inStock: true,
          stockCount: 19,
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
          description: "Zinc alloy twist buckle, premium full-grain leather, dual color convenience.",
          rating: 4.7,
          badge: "Value Pack"
        }
      ]
    },

    // ---------------- KIRANA & GROCERY ----------------
    {
      id: "store_kir_1",
      name: "Aggarwal Super Kirana & Masala Bhandar",
      category: "kirana",
      rating: 4.9,
      reviewCount: 680,
      distance: "0.4 km",
      deliveryTime: "10-15 mins",
      minOrder: 49,
      owner: "Om Prakash Aggarwal",
      phone: "+91 98110 55443",
      address: "Shop 1-2, Aggarwal Market, Sector 14, Gurugram",
      verified: true,
      badge: "Neighborhood Favorite",
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
      description: "Farm-fresh pulses, hand-cleaned basmati rice, cold-pressed mustard oil, and genuine spices directly sourced from unadulterated mandis.",
      tags: ["Direct Mandi Sourcing", "Pure Desi Ghee", "Cleaned Grains"],
      reviews: [
        {
          id: "rev_k1_1",
          userName: "Sunita Singhal",
          userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
          rating: 5,
          date: "Yesterday",
          verifiedBuyer: true,
          purchasedItem: "Aashirvaad Shudh Chakki Atta 10kg",
          comment: "Aggarwal ji's delivery boy carried the 10kg bag directly to my 2nd floor flat with a smile. Fresh batch packed this month.",
          helpfulCount: 56
        }
      ],
      products: [
        {
          id: "prod_k1_1",
          name: "Aashirvaad Shudh Chakki Whole Wheat Atta",
          subcategory: "Flours & Grains",
          price: 435,
          mrp: 495,
          unit: "10 kg",
          inStock: true,
          stockCount: 40,
          image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80",
          description: "100% whole wheat grain with 0% maida, high fiber and authentic rotary stone milling.",
          rating: 4.9,
          badge: "Daily Essential"
        },
        {
          id: "prod_k1_2",
          name: "Fortune Kachi Ghani Pure Mustard Oil",
          subcategory: "Oils & Ghee",
          price: 155,
          mrp: 185,
          unit: "1 Litre Pouch",
          inStock: true,
          stockCount: 30,
          image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80",
          description: "Strong pungency and rich aroma, cold-pressed to retain natural antioxidants.",
          rating: 4.8,
          badge: "Cooking Must"
        },
        {
          id: "prod_k1_3",
          name: "Tata Salt Vacuum Evaporated Iodised",
          subcategory: "Spices & Salt",
          price: 28,
          mrp: 30,
          unit: "1 kg",
          inStock: true,
          stockCount: 80,
          image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=400&q=80",
          description: "Desh ka namak with guaranteed purity and proper iodine content.",
          rating: 4.9,
          badge: "Essential"
        }
      ]
    },

    // ---------------- PHARMACY & WELLNESS ----------------
    {
      id: "store_pharm_1",
      name: "Sanjivani Medicos & Healthcare",
      category: "pharmacy",
      rating: 4.9,
      reviewCount: 310,
      distance: "0.6 km",
      deliveryTime: "10-15 mins",
      minOrder: 50,
      owner: "Dr. Alok Srivastava",
      phone: "+91 98114 77665",
      address: "Booth 18, Opp. Civil Hospital Road",
      verified: true,
      badge: "Govt. Licensed Chemist",
      image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      description: "Temperature-controlled medicine storage, emergency night support, digital BP monitors, first-aid and baby care products.",
      tags: ["Licensed Pharmacist", "Cold Storage", "Doctor Consultation Assist"],
      reviews: [
        {
          id: "rev_p1_1",
          userName: "Kavita Nair",
          userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
          rating: 5,
          date: "Yesterday",
          verifiedBuyer: true,
          purchasedItem: "Omron Digital Blood Pressure Monitor",
          comment: "When mom's BP spiked in the evening, Sanjivani delivered the machine in just 12 mins. Saved us so much anxiety.",
          helpfulCount: 48
        }
      ],
      products: [
        {
          id: "prod_p1_1",
          name: "Omron HEM 7120 Fully Automatic Digital BP Monitor",
          subcategory: "Health Devices",
          price: 1899,
          mrp: 2640,
          unit: "1 unit with cuff",
          inStock: true,
          stockCount: 8,
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
          description: "Intellisense technology, irregular heartbeat detection, 3-year warranty.",
          rating: 4.9,
          badge: "Medical Grade"
        },
        {
          id: "prod_p1_2",
          name: "Dettol Antiseptic Liquid 550ml",
          subcategory: "First Aid & Hygiene",
          price: 195,
          mrp: 220,
          unit: "550ml bottle",
          inStock: true,
          stockCount: 35,
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
          description: "Protects against 100 illness-causing germs, antiseptic for cuts and home hygiene.",
          rating: 4.9,
          badge: "Must Have"
        }
      ]
    },

    // ---------------- STATIONERY & BOOKS ----------------
    {
      id: "store_stat_1",
      name: "Vidya Sagar Books & Fine Stationery",
      category: "stationery",
      rating: 4.8,
      reviewCount: 224,
      distance: "0.7 km",
      deliveryTime: "12-18 mins",
      minOrder: 50,
      owner: "Satish Chand Mittal",
      phone: "+91 98115 88990",
      address: "Shop 4, Near DAV Public School, Sector 14",
      verified: true,
      badge: "School & Office Favorite",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
      description: "Classmate notebooks, Parker and Pilot pens, sketchpads, acrylic colors, school project materials and calculators.",
      tags: ["Full School Kits", "Art Supplies", "Instant Print Assist"],
      reviews: [
        {
          id: "rev_s1_1",
          userName: "Rashmi Pillai",
          userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
          rating: 5,
          date: "2 days ago",
          verifiedBuyer: true,
          purchasedItem: "Classmate Spiral Notebook Set of 6",
          comment: "My daughter needed project sheets at 8 PM for school submission next morning. Vidya Sagar delivered right away!",
          helpfulCount: 21
        }
      ],
      products: [
        {
          id: "prod_s1_1",
          name: "Classmate Pulse Spiral Bound Notebook (Pack of 4)",
          subcategory: "Notebooks",
          price: 299,
          mrp: 380,
          unit: "Pack of 4 (300 pgs each)",
          inStock: true,
          stockCount: 22,
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
          description: "Elemental chlorine free paper, perforated sheets, durable polypropylene cover.",
          rating: 4.8,
          badge: "Student Pick"
        },
        {
          id: "prod_s1_2",
          name: "Parker Vector Matte Black Fountain & Ball Pen Set",
          subcategory: "Fine Pens",
          price: 549,
          mrp: 850,
          unit: "1 set in gift box",
          inStock: true,
          stockCount: 10,
          image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=400&q=80",
          description: "Timeless matte epoxy resin body, stainless steel nib, blue ink cartridge included.",
          rating: 4.9,
          badge: "Gift Special"
        }
      ]
    },

    // ---------------- HOME DECOR & KITCHEN ----------------
    {
      id: "store_home_1",
      name: "Radha Krishna Bartan & Home Decor",
      category: "homedecor",
      rating: 4.8,
      reviewCount: 198,
      distance: "1.2 km",
      deliveryTime: "20-25 mins",
      minOrder: 150,
      owner: "Murari Lal Agrawal",
      phone: "+91 98116 11229",
      address: "Shop 19, Bartan Market, Sadar Bazaar",
      verified: true,
      badge: "Pure Tri-Ply Steel",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      description: "Prestige induction cookware, tri-ply stainless steel kadhais, Milton thermosteel flasks, copper jugs and festive decor.",
      tags: ["Tri-Ply Utensils", "Prestige Authorized", "Lifetime Polish"],
      reviews: [
        {
          id: "rev_hd1_1",
          userName: "Mamta Bansal",
          userAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
          rating: 5,
          date: "Yesterday",
          verifiedBuyer: true,
          purchasedItem: "Milton Thermosteel 1000ml Hot & Cold Flask",
          comment: "Keeps tea steaming hot for 18 hours straight! Genuine Milton box with hologram.",
          helpfulCount: 19
        }
      ],
      products: [
        {
          id: "prod_hd1_1",
          name: "Milton Thermosteel Duo Deluxe Flask (1000 ml)",
          subcategory: "Bottles & Flasks",
          price: 899,
          mrp: 1240,
          unit: "1 Litre",
          inStock: true,
          stockCount: 15,
          image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80",
          description: "100% rustproof vacuum insulated double wall 304 grade stainless steel.",
          rating: 4.8,
          badge: "Hot & Cold"
        },
        {
          id: "prod_hd1_2",
          name: "Vinod Platinum Triply Stainless Steel Kadhai with Lid (2.5L)",
          subcategory: "Cookware",
          price: 1599,
          mrp: 2390,
          unit: "24 cm / 2.5 Litre",
          inStock: true,
          stockCount: 7,
          image: "https://images.unsplash.com/photo-1584990347449-a20c3a647a74?auto=format&fit=crop&w=400&q=80",
          description: "Even heat distribution, SAS technology (Steel-Aluminum-Steel), gas & induction compatible.",
          rating: 4.9,
          badge: "Chef Choice"
        }
      ]
    },

    // ---------------- BAKERY & SWEETS ----------------
    {
      id: "store_bake_1",
      name: "Bikanervala Sweets & Fresh Bakery",
      category: "bakery",
      rating: 4.9,
      reviewCount: 750,
      distance: "0.5 km",
      deliveryTime: "10-15 mins",
      minOrder: 80,
      owner: "Chhotu Ram & Sons",
      phone: "+91 98117 00112",
      address: "Main Sector Road, Near Community Centre",
      verified: true,
      badge: "Pure Desi Ghee",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
      banner: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
      description: "Hot crispy samosas with tamarind chutney, pure kaju katli, fresh rasgullas, oven baked brownies and sandwich bread.",
      tags: ["Hot & Fresh", "Desi Ghee Only", "10 Min Delivery"],
      reviews: [
        {
          id: "rev_b1_1",
          userName: "Rohit Oberoi",
          userAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80",
          rating: 5,
          date: "Today",
          verifiedBuyer: true,
          purchasedItem: "Special Pure Kaju Katli (500g)",
          comment: "Melt in mouth kaju katli! Packed in sealed hygienic festive box. Arrived warm and fresh.",
          helpfulCount: 63
        }
      ],
      products: [
        {
          id: "prod_b1_1",
          name: "Premium Silver Foil Pure Kaju Katli",
          subcategory: "Mithai",
          price: 490,
          mrp: 550,
          unit: "500 grams",
          inStock: true,
          stockCount: 30,
          image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80",
          description: "Made with AAA grade Goan cashews, minimal sugar, genuine edible silver vark.",
          rating: 4.9,
          badge: "Festive Hit"
        },
        {
          id: "prod_b1_2",
          name: "Crispy Punjabi Desi Samosa (Pack of 4)",
          subcategory: "Hot Snacks",
          price: 80,
          mrp: 100,
          unit: "4 pcs with green & imli chutney",
          inStock: true,
          stockCount: 50,
          image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80",
          description: "Crispy fried golden crust stuffed with spiced potatoes, green peas and paneer.",
          rating: 4.9,
          badge: "Teatime Favorite"
        }
      ]
    }
  ]
};

// LocalStorage helpers to allow user to add new stores, list new items, write reviews and manage cart
const Storage = {
  getStores: () => {
    const custom = localStorage.getItem("sabkabazar_stores");
    if (!custom) {
      localStorage.setItem("sabkabazar_stores", JSON.stringify(SABKA_BAZAR_DATA.stores));
      return SABKA_BAZAR_DATA.stores;
    }
    return JSON.parse(custom);
  },
  
  saveStores: (stores) => {
    localStorage.setItem("sabkabazar_stores", JSON.stringify(stores));
  },

  getCart: () => {
    const cart = localStorage.getItem("sabkabazar_cart");
    return cart ? JSON.parse(cart) : [];
  },

  saveCart: (cart) => {
    localStorage.setItem("sabkabazar_cart", JSON.stringify(cart));
  },

  getOrders: () => {
    const orders = localStorage.getItem("sabkabazar_orders");
    return orders ? JSON.parse(orders) : [];
  },

  saveOrders: (orders) => {
    localStorage.setItem("sabkabazar_orders", JSON.stringify(orders));
  }
};
