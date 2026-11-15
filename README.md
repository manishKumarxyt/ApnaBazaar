# SabkaBazar - Har dukaan apke paas! 🛍️🏪

> **Taglines:**
> - *Har dukaan apke paas!*
> - *Har zaroorat, ek bazaar*
> - *Aapka Apna Shopping Bazaar*
> - *Shop local, shop smart*
> - *Har dukaan ab online*

**SabkaBazar** is a modern, hyperlocal quick-commerce web application inspired by the fast, intuitive UX of Blinkit, but completely customized for local neighborhood commerce. It allows connecting all local physical stores (Kirana, Electronics, Hardware, Clothes, Pharmacy, Bakery, etc.) into one seamless digital marketplace with genuine customer reviews, 15-minute neighborhood delivery, and direct store onboarding.

---

## ✨ Key Highlights & Features

1. **Brand Identity & Color Upgrade ("Change the colour of everything and do better")**:
   - Replaced typical plain yellow/green with a **Deep Forest Emerald & Mint Jade** (`#064e3b` / `#059669`) combined with **Electric Flame Tangerine & Saffron Gold** (`#f97316` / `#f59e0b`).
   - Clean, high-contrast typography using **Inter** and **Outfit** with glassmorphism sticky headers and smooth micro-animations.

2. **Full Multi-Category Support**:
   - ⚡ **Electronics & Gadgets**: Mobile accessories, chargers, earbuds, smart watches, routers, laptop accessories, and local repair shops.
   - 🔧 **Hardware & Tools**: Bosch power drills, Stanley screwdrivers, plumbing taps, M-Seal, padlocks, household ladders.
   - 👗 **Clothes & Fashion**: Lucknowi chikankari kurtis, cotton palazzos, Raymond formal shirts, leather belts, boutique wear.
   - 🛒 **Kirana & Supermarket**: Chakki atta, cold-pressed mustard oil, spices, daily pulses, dairy.
   - 💊 **Pharmacy & Health**: Omron BP monitors, first-aid, Dettol, prescription medicines.
   - 📚 **Books & Stationery**: Classmate spiral notebooks, Parker pens, school exam materials.
   - 🛋️ **Home Decor & Kitchen**: Prestige induction kadhai, Milton thermosteel flasks, organizers.
   - 🎂 **Sweets & Bakery**: Pure desi ghee kaju katli, fresh samosas, cakes, breads.

3. **Category Click -> Stores with Verified Reviews**:
   - Clicking on **Electronics** (or any category) instantly filters and displays all local electronic stores.
   - Each store card features:
     - Distance (`0.8 km`), Delivery Time (`15-20 mins`)
     - Star Rating (`⭐ 4.8`) and total reviews count (`342 reviews`)
     - **Review Spotlight Section**: Direct quote from a verified local buyer (e.g. *"Super fast delivery in just 14 minutes! The charger is 100% genuine with official brand seal." - Ankit Verma*)
     - **Read All Reviews** button with star breakdown & review submission form
     - **Enter Dukaan** button to browse the store's full digital catalog

4. **"Dukaan Jodo" / Merchant Onboarding Portal**:
   - Local shopkeepers can connect their shop in under 1 minute!
   - Fill in store name, category, owner name, WhatsApp contact, delivery radius, description, and list their initial products.
   - Stored in persistent `localStorage` and immediately goes live across category listings and search.

5. **Blinkit-Style Cart & Hyperlocal Checkout**:
   - Instant `ADD` button with smooth `+` / `-` quantity stepper.
   - Slide-over cart drawer grouping items by local store.
   - Automatic bill calculation (Item total, FREE delivery over ₹199, handling fee).
   - Promo coupon discounts: use `SABKA50` for ₹50 off or `PEHLADUKAAN` for 20% off.
   - Payment method toggle: Instant UPI or Cash on Delivery.
   - Live Order Tracking simulation: 15-minute countdown and step-by-step dispatch status.

---

## 🚀 How to Run

### Option 1: Direct in Browser (Zero Install Required)
Simply double-click `index.html` or open it in Google Chrome, Microsoft Edge, Brave, or Firefox.

### Option 2: Local Server via PowerShell
Open PowerShell in this directory and run:
```powershell
powershell -ExecutionPolicy Bypass -File .\start-server.ps1
```
This opens `http://localhost:3000/` automatically in your browser.

---

## 📁 File Structure
```
ApnaBazaar/
├── index.html        # Main app UI (Header, Ticker, Categories, Store Cards, Modals, Drawer)
├── styles.css        # Custom styles, color palettes, animations, steppers, glassmorphism
├── data.js           # Comprehensive dataset with stores, reviews, products & localStorage manager
├── app.js            # Core interactive logic (search, category filter, reviews, cart, onboarding)
├── start-server.ps1  # Lightweight PowerShell local HTTP server
└── README.md         # Documentation & guide
```
