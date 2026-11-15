/**
 * SabkaBazar - Har dukaan apke paas!
 * Core Application Logic & State Controller
 */

const App = {
  selectedCategory: null,
  activeFilter: 'all',
  currentStore: null,
  currentStoreTab: 'products',
  searchDebounceTimer: null,
  appliedPromo: null,
  currentLocation: "Sector 14, Main Market, Gurugram",

  init() {
    this.renderCategories();
    this.renderStores();
    this.renderPopularItems();
    this.updateCartUI();
    this.initKeyboardShortcuts();
    this.refreshIcons();
  },

  refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  // ---------------- CATEGORIES ----------------
  renderCategories() {
    const grid = document.getElementById("categories-grid");
    if (!grid) return;

    const stores = Storage.getStores();

    // Map store counts per category
    const catCounts = {};
    stores.forEach(s => {
      catCounts[s.category] = (catCounts[s.category] || 0) + 1;
    });

    grid.innerHTML = SABKA_BAZAR_DATA.categories.map(cat => {
      const count = catCounts[cat.id] || 0;
      const isActive = this.selectedCategory === cat.id;

      return `
        <div 
          onclick="App.selectCategory('${cat.id}')"
          class="category-card cursor-pointer p-3 sm:p-4 rounded-2xl bg-white border ${isActive ? 'active-cat border-emerald-600 bg-emerald-50/50' : 'border-slate-200 hover:border-emerald-300'} text-center flex flex-col items-center justify-between group transition select-none"
        >
          <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
            <i data-lucide="${cat.icon}" class="w-6 h-6"></i>
          </div>
          <div class="mt-2.5">
            <div class="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-emerald-700 leading-tight">
              ${cat.name}
            </div>
            <div class="text-[10px] text-slate-400 mt-0.5">
              ${cat.hindiName}
            </div>
            <div class="mt-1.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800'}">
              ${count} Dukaan${count !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      `;
    }).join("");

    this.refreshIcons();
  },

  selectCategory(categoryId) {
    this.selectedCategory = categoryId;
    this.activeFilter = 'all';

    // Update Category Cards UI
    this.renderCategories();

    // Update section header
    const cat = SABKA_BAZAR_DATA.categories.find(c => c.id === categoryId);
    if (cat) {
      document.getElementById("section-cat-title").textContent = `${cat.name} Stores in Your Area`;
      document.getElementById("section-cat-desc").textContent = `${cat.bannerText} • Verified local shop reviews & instant delivery`;
      
      const iconCont = document.getElementById("section-cat-icon-container");
      iconCont.className = `w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shadow`;
      iconCont.innerHTML = `<i data-lucide="${cat.icon}" class="w-5 h-5"></i>`;
    }

    this.renderStores();

    // Smooth scroll to stores section
    const sec = document.getElementById("stores-section");
    if (sec) {
      sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    this.refreshIcons();
  },

  showAllStores() {
    this.selectedCategory = null;
    this.activeFilter = 'all';
    
    document.getElementById("section-cat-title").textContent = `All Local Stores in ${this.currentLocation.split(',')[0]}`;
    document.getElementById("section-cat-desc").textContent = "Browse stores, verify customer reviews, and order directly from local merchants";
    
    const iconCont = document.getElementById("section-cat-icon-container");
    iconCont.className = `w-10 h-10 rounded-xl bg-bazar-100 text-bazar-800 flex items-center justify-center`;
    iconCont.innerHTML = `<i data-lucide="store" class="w-5 h-5"></i>`;

    this.renderCategories();
    this.renderStores();
    this.refreshIcons();
  },

  // ---------------- STORES RENDERING WITH REVIEWS SPOTLIGHT ----------------
  renderStores() {
    const container = document.getElementById("stores-list-container");
    const emptyState = document.getElementById("stores-empty-state");
    if (!container) return;

    let stores = Storage.getStores();

    // Filter by Category if selected
    if (this.selectedCategory) {
      stores = stores.filter(s => s.category === this.selectedCategory);
    }

    // Secondary Filter Chips
    if (this.activeFilter === 'top_rated') {
      stores = stores.filter(s => s.rating >= 4.8);
    } else if (this.activeFilter === 'fastest') {
      stores = stores.filter(s => s.deliveryTime.includes('10') || s.deliveryTime.includes('15'));
    } else if (this.activeFilter === 'verified') {
      stores = stores.filter(s => s.verified === true);
    }

    if (stores.length === 0) {
      container.innerHTML = "";
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");

    container.innerHTML = stores.map(store => {
      // Pick a top verified review for the spotlight
      const topReview = store.reviews && store.reviews.length > 0 ? store.reviews[0] : null;

      // Category badge
      const catObj = SABKA_BAZAR_DATA.categories.find(c => c.id === store.category);
      const catName = catObj ? catObj.name.split('&')[0] : store.category;

      return `
        <div class="store-card bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 flex flex-col justify-between group transition">
          
          <!-- Store Image & Floating Badges -->
          <div class="relative h-44 bg-slate-100 overflow-hidden cursor-pointer" onclick="App.openStoreModal('${store.id}')">
            <img 
              src="${store.image}" 
              alt="${store.name}" 
              class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              onerror="this.src='https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80'"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            <!-- Category & Badge -->
            <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-slate-900/80 text-white backdrop-blur uppercase">
                ${catName}
              </span>
              ${store.badge ? `
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-400 text-slate-950 shadow-sm">
                  ${store.badge}
                </span>
              ` : ''}
            </div>

            <!-- Distance & ETA Pill -->
            <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
              <div class="flex items-center gap-1 font-bold bg-black/60 backdrop-blur px-2.5 py-1 rounded-lg">
                <i data-lucide="zap" class="w-3.5 h-3.5 text-amber-300"></i>
                <span>${store.deliveryTime}</span>
                <span class="text-white/60">•</span>
                <span>${store.distance}</span>
              </div>
              
              <div class="flex items-center gap-1 font-extrabold bg-white text-slate-900 px-2 py-1 rounded-lg shadow">
                <span class="text-amber-500">${store.rating}</span>
                <i data-lucide="star" class="w-3 h-3 fill-amber-500 text-amber-500"></i>
                <span class="text-[10px] text-slate-500 font-normal">(${store.reviewCount})</span>
              </div>
            </div>
          </div>

          <!-- Store Body Details -->
          <div class="p-4 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-2">
                <div>
                  <h3 
                    onclick="App.openStoreModal('${store.id}')"
                    class="font-black text-slate-900 text-base leading-tight group-hover:text-bazar-700 transition cursor-pointer"
                  >
                    ${store.name}
                  </h3>
                  <p class="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i>
                    <span class="line-clamp-1">${store.address}</span>
                  </p>
                </div>
              </div>

              <!-- Owner & Dukaan Verification Tag -->
              <div class="flex items-center gap-2 mt-2.5 text-[11px]">
                <span class="text-slate-500">Owner: <strong class="text-slate-700">${store.owner}</strong></span>
                <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                <span class="text-emerald-700 font-bold flex items-center gap-0.5">
                  <i data-lucide="check-circle" class="w-3 h-3"></i> Verified Local Shop
                </span>
              </div>

              <!-- REVIEW SPOTLIGHT (Directly answers requirement: "if someone click electronics then all electronics stores shows with review") -->
              ${topReview ? `
                <div class="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div class="flex items-center justify-between text-[11px] mb-1">
                    <div class="flex items-center gap-1.5">
                      <span class="font-bold text-slate-800">${topReview.userName}</span>
                      <span class="text-amber-500 flex items-center">
                        ${'★'.repeat(topReview.rating)}
                      </span>
                    </div>
                    <span class="text-slate-400 text-[10px]">${topReview.date}</span>
                  </div>
                  <p class="text-slate-600 italic line-clamp-2 text-[11px]">
                    "${topReview.comment}"
                  </p>
                  ${topReview.purchasedItem ? `
                    <div class="mt-1 text-[10px] text-emerald-800 font-medium">
                      ✓ Verified purchase: ${topReview.purchasedItem}
                    </div>
                  ` : ''}
                </div>
              ` : `
                <div class="mt-3 p-2 rounded-xl bg-slate-50 text-[11px] text-slate-400 italic text-center">
                  Newly joined store. Be the first to leave a review!
                </div>
              `}

              <!-- Tags -->
              <div class="flex flex-wrap gap-1 mt-3">
                ${(store.tags || []).slice(0, 3).map(tag => `
                  <span class="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-100">
                    ${tag}
                  </span>
                `).join("")}
              </div>
            </div>

            <!-- Action Buttons: Read Reviews & Enter Dukaan -->
            <div class="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button 
                onclick="App.openStoreReviewsModal('${store.id}')"
                class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition"
              >
                <i data-lucide="message-square" class="w-3.5 h-3.5 text-amber-500"></i>
                <span>Reviews (${store.reviewCount})</span>
              </button>

              <button 
                onclick="App.openStoreModal('${store.id}')"
                class="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-bazar-600 hover:bg-bazar-700 text-white font-bold text-xs shadow-sm hover:shadow transition"
              >
                <span>Enter Dukaan</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>

          </div>

        </div>
      `;
    }).join("");

    this.refreshIcons();
  },

  filterStores(filterType) {
    this.activeFilter = filterType;
    
    // Update chip active states
    document.querySelectorAll(".filter-chip").forEach(chip => {
      if (chip.getAttribute("data-filter") === filterType) {
        chip.className = "filter-chip active-filter px-3 py-1.5 rounded-lg border font-semibold bg-emerald-100 text-emerald-800 border-emerald-300 transition";
      } else {
        chip.className = "filter-chip px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium transition";
      }
    });

    this.renderStores();
  },

  // ---------------- POPULAR LOCAL ITEMS ----------------
  renderPopularItems() {
    const container = document.getElementById("popular-items-grid");
    if (!container) return;

    const stores = Storage.getStores();
    const allProducts = [];

    stores.forEach(store => {
      (store.products || []).forEach(prod => {
        allProducts.push({
          ...prod,
          storeId: store.id,
          storeName: store.name,
          deliveryTime: store.deliveryTime
        });
      });
    });

    // Take top 6-12 fast items
    const featured = allProducts.slice(0, 12);

    container.innerHTML = featured.map(prod => {
      const cart = Storage.getCart();
      const existing = cart.find(c => c.id === prod.id);
      const qty = existing ? existing.quantity : 0;

      return `
        <div class="bg-white rounded-2xl border border-slate-200 p-3 flex flex-col justify-between hover:shadow-md transition group">
          <div class="relative">
            <div class="w-full h-28 sm:h-32 rounded-xl bg-slate-50 overflow-hidden mb-2">
              <img src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src='https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80'">
            </div>
            ${prod.badge ? `
              <span class="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-amber-400 text-slate-900 shadow">
                ${prod.badge}
              </span>
            ` : ''}
            <span class="absolute top-1.5 right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-600 text-white">
              ⚡ ${prod.deliveryTime.split(' ')[0]}
            </span>
          </div>

          <div>
            <div class="text-[10px] text-slate-400 font-semibold truncate">${prod.storeName}</div>
            <h4 class="font-bold text-xs text-slate-800 line-clamp-2 leading-tight mt-0.5 min-h-[32px]">${prod.name}</h4>
            <div class="text-[10px] text-slate-500 mt-0.5">${prod.unit}</div>
          </div>

          <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div class="text-xs font-black text-slate-900 font-['Outfit']">₹${prod.price}</div>
              ${prod.mrp ? `<div class="text-[10px] text-slate-400 line-through">₹${prod.mrp}</div>` : ''}
            </div>

            <!-- Blinkit Style ADD / Counter Button -->
            <div id="btn-container-${prod.id}">
              ${qty === 0 ? `
                <button 
                  onclick="App.addToCart('${prod.id}', '${prod.storeId}')" 
                  class="btn-blinkit-add px-3 py-1 rounded-lg text-xs"
                >
                  ADD
                </button>
              ` : `
                <div class="flex items-center rounded-lg overflow-hidden qty-counter text-xs font-bold shadow-sm">
                  <button onclick="App.updateCartQuantity('${prod.id}', -1)" class="px-2 py-1 hover:bg-black/20">-</button>
                  <span class="px-2 text-xs">${qty}</span>
                  <button onclick="App.updateCartQuantity('${prod.id}', 1)" class="px-2 py-1 hover:bg-black/20">+</button>
                </div>
              `}
            </div>
          </div>
        </div>
      `;
    }).join("");

    this.refreshIcons();
  },

  // ---------------- STORE DETAILS MODAL ----------------
  openStoreModal(storeId) {
    const stores = Storage.getStores();
    const store = stores.find(s => s.id === storeId);
    if (!store) return;

    this.currentStore = store;

    // Header info
    document.getElementById("modal-store-banner").src = store.banner || store.image;
    document.getElementById("modal-store-image").src = store.image;
    document.getElementById("modal-store-name").textContent = store.name;
    document.getElementById("modal-store-address").textContent = store.address;
    document.getElementById("modal-store-badge").textContent = store.badge || "Verified Dukaan";
    document.getElementById("modal-store-rating").textContent = store.rating;
    document.getElementById("modal-store-review-count").textContent = `(${store.reviewCount})`;
    document.getElementById("modal-store-time").textContent = `⚡ ${store.deliveryTime} delivery`;

    // Counts
    document.getElementById("modal-products-count").textContent = (store.products || []).length;
    document.getElementById("modal-reviews-count").textContent = store.reviewCount;

    // Reviews summary
    document.getElementById("rev-summary-score").textContent = store.rating;
    document.getElementById("rev-summary-total").textContent = `Based on ${store.reviewCount} verified neighborhood reviews`;

    // About Tab
    document.getElementById("modal-about-desc").textContent = store.description || "Authentic neighborhood store providing genuine local goods with instant delivery.";
    document.getElementById("modal-about-owner").textContent = store.owner || "Local Merchant";
    document.getElementById("modal-about-phone").textContent = store.phone || "+91 9811X XXXXX";
    document.getElementById("modal-about-full-address").textContent = store.address;
    
    const tagsContainer = document.getElementById("modal-about-tags");
    tagsContainer.innerHTML = (store.tags || []).map(t => `
      <span class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
        ✓ ${t}
      </span>
    `).join("");

    // Render Products & Reviews
    this.renderStoreProducts(store);
    this.renderStoreReviews(store);

    // Switch to products tab by default
    this.switchStoreTab('products');

    // Show modal
    document.getElementById("store-modal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
    this.refreshIcons();
  },

  closeStoreModal() {
    document.getElementById("store-modal").classList.add("hidden");
    document.body.style.overflow = "auto";
  },

  switchStoreTab(tab) {
    this.currentStoreTab = tab;

    // Buttons
    const prodBtn = document.getElementById("store-tab-products-btn");
    const revBtn = document.getElementById("store-tab-reviews-btn");
    const abtBtn = document.getElementById("store-tab-about-btn");

    // Views
    const prodView = document.getElementById("store-tab-products");
    const revView = document.getElementById("store-tab-reviews");
    const abtView = document.getElementById("store-tab-about");

    prodView.classList.add("hidden");
    revView.classList.add("hidden");
    abtView.classList.add("hidden");

    prodBtn.className = "py-3 font-bold text-sm border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-2";
    revBtn.className = "py-3 font-bold text-sm border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-2";
    abtBtn.className = "hidden sm:flex py-3 font-bold text-sm border-b-2 border-transparent text-slate-500 hover:text-slate-800 items-center gap-2";

    if (tab === 'products') {
      prodView.classList.remove("hidden");
      prodBtn.className = "py-3 font-bold text-sm border-b-2 border-bazar-600 text-bazar-700 flex items-center gap-2";
    } else if (tab === 'reviews') {
      revView.classList.remove("hidden");
      revBtn.className = "py-3 font-bold text-sm border-b-2 border-bazar-600 text-bazar-700 flex items-center gap-2";
    } else if (tab === 'about') {
      abtView.classList.remove("hidden");
      abtBtn.className = "hidden sm:flex py-3 font-bold text-sm border-b-2 border-bazar-600 text-bazar-700 items-center gap-2";
    }

    this.refreshIcons();
  },

  openStoreReviewsModal(storeId) {
    this.openStoreModal(storeId);
    this.switchStoreTab('reviews');
  },

  renderStoreProducts(store) {
    const grid = document.getElementById("modal-products-grid");
    if (!grid) return;

    if (!store.products || store.products.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-12 text-slate-400">
          <p class="font-bold text-slate-600">No items listed yet in this Dukaan.</p>
          <button onclick="App.openAddProductToCurrentStore()" class="mt-2 text-xs text-bazar-700 font-bold underline">
            + Add First Product
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = store.products.map(prod => {
      const cart = Storage.getCart();
      const existing = cart.find(c => c.id === prod.id);
      const qty = existing ? existing.quantity : 0;

      return `
        <div class="bg-white rounded-2xl border border-slate-200 p-3 flex flex-col justify-between hover:shadow-md transition">
          <div class="relative">
            <div class="w-full h-32 rounded-xl bg-slate-50 overflow-hidden mb-2">
              <img src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80'">
            </div>
            ${prod.badge ? `
              <span class="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-400 text-slate-900 shadow">
                ${prod.badge}
              </span>
            ` : ''}
          </div>

          <div>
            <span class="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">${prod.subcategory || 'General'}</span>
            <h4 class="font-bold text-xs text-slate-800 mt-1 line-clamp-2 leading-tight">${prod.name}</h4>
            <p class="text-[11px] text-slate-500 mt-0.5 line-clamp-1">${prod.description || ''}</p>
            <div class="text-[10px] text-slate-400 mt-1">${prod.unit}</div>
          </div>

          <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div class="text-sm font-black text-slate-900 font-['Outfit']">₹${prod.price}</div>
              ${prod.mrp ? `<div class="text-[10px] text-slate-400 line-through">₹${prod.mrp}</div>` : ''}
            </div>

            <div id="modal-btn-container-${prod.id}">
              ${qty === 0 ? `
                <button 
                  onclick="App.addToCart('${prod.id}', '${store.id}')" 
                  class="btn-blinkit-add px-3.5 py-1 rounded-lg text-xs"
                >
                  ADD
                </button>
              ` : `
                <div class="flex items-center rounded-lg overflow-hidden qty-counter text-xs font-bold shadow-sm">
                  <button onclick="App.updateCartQuantity('${prod.id}', -1)" class="px-2 py-1 hover:bg-black/20">-</button>
                  <span class="px-2 text-xs">${qty}</span>
                  <button onclick="App.updateCartQuantity('${prod.id}', 1)" class="px-2 py-1 hover:bg-black/20">+</button>
                </div>
              `}
            </div>
          </div>
        </div>
      `;
    }).join("");
  },

  renderStoreReviews(store) {
    const list = document.getElementById("modal-reviews-list");
    if (!list) return;

    if (!store.reviews || store.reviews.length === 0) {
      list.innerHTML = `
        <div class="text-center py-8 bg-white rounded-2xl border border-slate-200">
          <p class="text-xs text-slate-500">No reviews yet for this store.</p>
          <button onclick="App.toggleWriteReviewBox()" class="mt-2 text-xs font-bold text-bazar-700 underline">
            Be the first customer to leave a review!
          </button>
        </div>
      `;
      return;
    }

    list.innerHTML = store.reviews.map(rev => {
      return `
        <div class="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <img src="${rev.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}" alt="${rev.userName}" class="w-8 h-8 rounded-full object-cover">
              <div>
                <div class="font-bold text-xs text-slate-900">${rev.userName}</div>
                <div class="flex items-center gap-1 text-amber-500 text-xs">
                  ${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}
                  ${rev.verifiedBuyer ? `
                    <span class="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded ml-1">✓ Verified Local Buyer</span>
                  ` : ''}
                </div>
              </div>
            </div>
            <span class="text-[11px] text-slate-400">${rev.date}</span>
          </div>

          <p class="text-xs text-slate-700 leading-relaxed">${rev.comment}</p>

          ${rev.purchasedItem ? `
            <div class="text-[10px] text-slate-500 font-medium">
              Purchased item: <span class="text-slate-700 font-semibold">${rev.purchasedItem}</span>
            </div>
          ` : ''}

          <div class="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-400">
            <span>Helpful for neighborhood shoppers</span>
            <button onclick="App.toast('Thank you for voting this review helpful!')" class="hover:text-slate-600 flex items-center gap-1">
              <i data-lucide="thumbs-up" class="w-3 h-3"></i> Helpful (${rev.helpfulCount || 0})
            </button>
          </div>
        </div>
      `;
    }).join("");

    this.refreshIcons();
  },

  toggleWriteReviewBox() {
    const box = document.getElementById("write-review-container");
    if (box) {
      box.classList.toggle("hidden");
    }
  },

  handleReviewSubmit(e) {
    e.preventDefault();
    if (!this.currentStore) return;

    const name = document.getElementById("review-input-name").value.trim();
    const item = document.getElementById("review-input-item").value.trim();
    const rating = parseInt(document.getElementById("review-input-rating").value, 10);
    const comment = document.getElementById("review-input-text").value.trim();

    if (!name || !comment) return;

    const newRev = {
      id: "rev_user_" + Date.now(),
      userName: name,
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      rating: rating,
      date: "Just now",
      verifiedBuyer: true,
      purchasedItem: item || "Store Product",
      comment: comment,
      helpfulCount: 0
    };

    const stores = Storage.getStores();
    const targetStore = stores.find(s => s.id === this.currentStore.id);
    if (targetStore) {
      if (!targetStore.reviews) targetStore.reviews = [];
      targetStore.reviews.unshift(newRev);
      targetStore.reviewCount = (targetStore.reviewCount || 0) + 1;

      // Recalculate average
      const totalScore = targetStore.reviews.reduce((acc, r) => acc + r.rating, 0);
      targetStore.rating = parseFloat((totalScore / targetStore.reviews.length).toFixed(1));

      Storage.saveStores(stores);
      this.currentStore = targetStore;

      // Re-render
      this.renderStoreReviews(targetStore);
      document.getElementById("modal-store-rating").textContent = targetStore.rating;
      document.getElementById("modal-store-review-count").textContent = `(${targetStore.reviewCount})`;
      document.getElementById("modal-reviews-count").textContent = targetStore.reviewCount;
      document.getElementById("rev-summary-score").textContent = targetStore.rating;
      document.getElementById("rev-summary-total").textContent = `Based on ${targetStore.reviewCount} verified neighborhood reviews`;

      this.renderStores();
      this.toggleWriteReviewBox();
      this.toast("🎉 Your verified review has been published to SabkaBazar!");
    }
  },

  // ---------------- CONNECT / ONBOARD LOCAL STORE ----------------
  openStoreOnboardingModal() {
    document.getElementById("onboarding-modal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
    this.refreshIcons();
  },

  closeStoreOnboardingModal() {
    document.getElementById("onboarding-modal").classList.add("hidden");
    document.body.style.overflow = "auto";
  },

  handleCreateStore(e) {
    e.preventDefault();

    const name = document.getElementById("ob-store-name").value.trim();
    const category = document.getElementById("ob-store-cat").value;
    const owner = document.getElementById("ob-store-owner").value.trim();
    const phone = document.getElementById("ob-store-phone").value.trim();
    const address = document.getElementById("ob-store-address").value.trim();
    const deliveryTime = document.getElementById("ob-store-time").value;
    const desc = document.getElementById("ob-store-desc").value.trim();
    
    // First product
    const prodName = document.getElementById("ob-prod-name").value.trim();
    const prodPrice = parseInt(document.getElementById("ob-prod-price").value, 10) || 199;

    // Pick realistic cover image based on category
    const catImages = {
      electronics: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80",
      hardware: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=600&q=80",
      clothes: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
      kirana: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80",
      pharmacy: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=600&q=80",
      stationery: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
      homedecor: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
      bakery: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
    };

    const newStoreId = "store_custom_" + Date.now();
    const newStore = {
      id: newStoreId,
      name: name,
      category: category,
      rating: 5.0,
      reviewCount: 1,
      distance: "0.5 km",
      deliveryTime: deliveryTime,
      minOrder: 49,
      owner: owner,
      phone: phone,
      address: address,
      verified: true,
      badge: "Newly Joined Dukaan",
      image: catImages[category] || catImages.electronics,
      banner: catImages[category] || catImages.electronics,
      description: desc || `Welcome to ${name}! Serving the neighborhood with fresh local products and lightning delivery.`,
      tags: ["Neighborhood Store", "Instant Delivery", "Local Merchant"],
      reviews: [
        {
          id: "rev_first_" + Date.now(),
          userName: "SabkaBazar Verifier",
          userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
          rating: 5,
          date: "Today",
          verifiedBuyer: true,
          purchasedItem: prodName,
          comment: "Store profile verified by SabkaBazar neighborhood agent. Genuine catalog and quick dispatch ready.",
          helpfulCount: 5
        }
      ],
      products: [
        {
          id: "prod_custom_" + Date.now(),
          name: prodName,
          subcategory: "Featured",
          price: prodPrice,
          mrp: Math.round(prodPrice * 1.3),
          unit: "1 pc",
          inStock: true,
          stockCount: 15,
          image: catImages[category],
          description: "Freshly listed item by shop owner.",
          rating: 5.0,
          badge: "New Arrival"
        }
      ]
    };

    const stores = Storage.getStores();
    stores.unshift(newStore);
    Storage.saveStores(stores);

    this.closeStoreOnboardingModal();
    this.selectCategory(category);
    this.toast(`🎉 Mubarak! "${name}" is now live on SabkaBazar!`);
  },

  // ---------------- ADD ITEM TO CURRENT STORE ----------------
  openAddProductToCurrentStore() {
    if (!this.currentStore) return;
    document.getElementById("add-item-store-name").textContent = `For: ${this.currentStore.name}`;
    document.getElementById("add-item-modal").classList.remove("hidden");
    this.refreshIcons();
  },

  closeAddItemModal() {
    document.getElementById("add-item-modal").classList.add("hidden");
  },

  handleAddNewItem(e) {
    e.preventDefault();
    if (!this.currentStore) return;

    const title = document.getElementById("new-item-title").value.trim();
    const price = parseInt(document.getElementById("new-item-price").value, 10);
    const mrp = parseInt(document.getElementById("new-item-mrp").value, 10) || Math.round(price * 1.25);
    const subcat = document.getElementById("new-item-subcat").value.trim() || "Local Special";
    const stock = parseInt(document.getElementById("new-item-stock").value, 10) || 10;
    const desc = document.getElementById("new-item-desc").value.trim();

    const newProd = {
      id: "prod_add_" + Date.now(),
      name: title,
      subcategory: subcat,
      price: price,
      mrp: mrp,
      unit: "1 pc",
      inStock: true,
      stockCount: stock,
      image: this.currentStore.image,
      description: desc || "Authentic quality verified by store keeper.",
      rating: 4.8,
      badge: "In Stock"
    };

    const stores = Storage.getStores();
    const store = stores.find(s => s.id === this.currentStore.id);
    if (store) {
      if (!store.products) store.products = [];
      store.products.push(newProd);
      Storage.saveStores(stores);
      this.currentStore = store;

      this.renderStoreProducts(store);
      document.getElementById("modal-products-count").textContent = store.products.length;
      this.renderPopularItems();
      this.closeAddItemModal();
      this.toast(`✓ Added "${title}" to ${store.name}!`);
    }
  },

  // ---------------- CART MANAGEMENT ----------------
  addToCart(productId, storeId) {
    const stores = Storage.getStores();
    let foundProduct = null;
    let foundStore = null;

    for (const s of stores) {
      const p = (s.products || []).find(item => item.id === productId);
      if (p) {
        foundProduct = p;
        foundStore = s;
        break;
      }
    }

    if (!foundProduct || !foundStore) return;

    let cart = Storage.getCart();
    const existing = cart.find(item => item.id === productId);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: foundProduct.id,
        name: foundProduct.name,
        price: foundProduct.price,
        mrp: foundProduct.mrp,
        image: foundProduct.image,
        unit: foundProduct.unit,
        storeId: foundStore.id,
        storeName: foundStore.name,
        quantity: 1
      });
    }

    Storage.saveCart(cart);
    this.updateCartUI();
    this.renderPopularItems();
    if (this.currentStore) {
      this.renderStoreProducts(this.currentStore);
    }

    this.toast(`Added ${foundProduct.name} to cart`);
  },

  updateCartQuantity(productId, delta) {
    let cart = Storage.getCart();
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== productId);
    }

    Storage.saveCart(cart);
    this.updateCartUI();
    this.renderPopularItems();
    if (this.currentStore) {
      this.renderStoreProducts(this.currentStore);
    }
  },

  updateCartUI() {
    const cart = Storage.getCart();
    const totalCount = cart.reduce((acc, i) => acc + i.quantity, 0);
    const subtotal = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);

    // Header badge
    const badge = document.getElementById("cart-badge-count");
    if (badge) badge.textContent = totalCount;

    const itemsPreview = document.getElementById("cart-items-preview");
    if (itemsPreview) itemsPreview.textContent = `${totalCount} item${totalCount !== 1 ? 's' : ''}`;

    const totalPreview = document.getElementById("cart-total-preview");
    if (totalPreview) totalPreview.textContent = `₹${subtotal}`;

    // Modal cart count
    const modalCartCount = document.getElementById("modal-cart-count");
    if (modalCartCount) modalCartCount.textContent = totalCount;

    // Render inside Drawer
    this.renderCartDrawer(cart, subtotal);
  },

  renderCartDrawer(cart, subtotal) {
    const container = document.getElementById("cart-items-container");
    const emptyState = document.getElementById("cart-empty-state");
    const footer = document.getElementById("cart-checkout-footer");

    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = "";
      emptyState.classList.remove("hidden");
      footer.classList.add("hidden");
      return;
    }

    emptyState.classList.add("hidden");
    footer.classList.remove("hidden");

    // Group items by local store
    const storeGroups = {};
    cart.forEach(item => {
      if (!storeGroups[item.storeName]) {
        storeGroups[item.storeName] = [];
      }
      storeGroups[item.storeName].push(item);
    });

    container.innerHTML = Object.entries(storeGroups).map(([storeName, items]) => {
      return `
        <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <!-- Store header pill -->
          <div class="bg-slate-50 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between text-xs">
            <div class="flex items-center gap-1.5 font-bold text-slate-800">
              <i data-lucide="store" class="w-3.5 h-3.5 text-bazar-600"></i>
              <span>${storeName}</span>
            </div>
            <span class="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">15m delivery</span>
          </div>

          <!-- Items list -->
          <div class="divide-y divide-slate-100 p-2">
            ${items.map(item => `
              <div class="flex items-center justify-between gap-3 p-2">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-lg object-cover bg-slate-100 flex-shrink-0">
                <div class="flex-1 min-w-0">
                  <h5 class="text-xs font-bold text-slate-900 truncate">${item.name}</h5>
                  <div class="text-[11px] text-slate-500">${item.unit || '1 pc'} • ₹${item.price} each</div>
                </div>

                <!-- Stepper -->
                <div class="flex items-center rounded-lg overflow-hidden qty-counter text-xs font-bold shadow-sm">
                  <button onclick="App.updateCartQuantity('${item.id}', -1)" class="px-2 py-1 hover:bg-black/20">-</button>
                  <span class="px-2 text-xs">${item.quantity}</span>
                  <button onclick="App.updateCartQuantity('${item.id}', 1)" class="px-2 py-1 hover:bg-black/20">+</button>
                </div>

                <div class="text-right text-xs font-black text-slate-900 font-['Outfit'] w-14">
                  ₹${item.price * item.quantity}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }).join("");

    // Calculate Bill
    const deliveryFee = subtotal >= 199 ? 0 : 25;
    const handlingFee = 5;
    let discount = 0;

    if (this.appliedPromo === 'SABKA50') {
      discount = 50;
    } else if (this.appliedPromo === 'PEHLADUKAAN') {
      discount = Math.round(subtotal * 0.2);
    }

    const grandTotal = Math.max(0, subtotal + deliveryFee + handlingFee - discount);

    document.getElementById("bill-subtotal").textContent = `₹${subtotal}`;
    document.getElementById("bill-delivery").textContent = deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`;
    
    const discRow = document.getElementById("bill-discount-row");
    if (discount > 0) {
      discRow.classList.remove("hidden");
      document.getElementById("bill-discount").textContent = `-₹${discount}`;
    } else {
      discRow.classList.add("hidden");
    }

    document.getElementById("bill-grand-total").textContent = `₹${grandTotal}`;
    document.getElementById("btn-checkout-amount").textContent = `Total: ₹${grandTotal}`;

    this.refreshIcons();
  },

  openCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("cart-drawer-backdrop");
    drawer.classList.remove("translate-x-full");
    backdrop.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    this.refreshIcons();
  },

  closeCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("cart-drawer-backdrop");
    drawer.classList.add("translate-x-full");
    backdrop.classList.add("hidden");
    document.body.style.overflow = "auto";
  },

  applyPromoCode() {
    const code = document.getElementById("promo-code-input").value.trim().toUpperCase();
    const status = document.getElementById("promo-status");

    if (code === "SABKA50") {
      this.appliedPromo = "SABKA50";
      status.textContent = "✓ Coupon SABKA50 applied! Flat ₹50 off on local dukaan order.";
      status.className = "text-[11px] font-semibold text-emerald-600 block";
      this.updateCartUI();
      this.toast("🎉 Applied ₹50 coupon discount!");
    } else if (code === "PEHLADUKAAN") {
      this.appliedPromo = "PEHLADUKAAN";
      status.textContent = "✓ Coupon PEHLADUKAAN applied! 20% local welcome discount.";
      status.className = "text-[11px] font-semibold text-emerald-600 block";
      this.updateCartUI();
      this.toast("🎉 20% First Dukaan discount applied!");
    } else {
      status.textContent = "Invalid promo code. Try 'SABKA50' or 'PEHLADUKAAN'!";
      status.className = "text-[11px] font-semibold text-red-500 block";
    }
  },

  proceedToCheckout() {
    const cart = Storage.getCart();
    if (cart.length === 0) return;

    this.closeCartDrawer();
    const grandTotal = document.getElementById("bill-grand-total").textContent;
    document.getElementById("checkout-final-amount").textContent = grandTotal;

    document.getElementById("checkout-modal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
    this.refreshIcons();
  },

  closeCheckoutModal() {
    document.getElementById("checkout-modal").classList.add("hidden");
    document.body.style.overflow = "auto";
  },

  confirmAndTrackOrder() {
    this.closeCheckoutModal();

    // Clear cart and generate order ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `#SB-${randomNum}`;
    document.getElementById("tracking-order-id").textContent = orderId;

    Storage.saveCart([]);
    this.updateCartUI();

    document.getElementById("tracking-modal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
    this.refreshIcons();
    this.toast("🚀 Order sent directly to local shopkeeper! Delivery in 14 mins.");
  },

  closeTrackingModal() {
    document.getElementById("tracking-modal").classList.add("hidden");
    document.body.style.overflow = "auto";
  },

  // ---------------- LOCATION PICKER ----------------
  openLocationModal() {
    document.getElementById("location-modal").classList.remove("hidden");
    this.refreshIcons();
  },

  closeLocationModal() {
    document.getElementById("location-modal").classList.add("hidden");
  },

  selectLocation(locName) {
    this.currentLocation = locName;
    document.getElementById("current-location-text").textContent = locName;
    const mobLoc = document.getElementById("mobile-location-text");
    if (mobLoc) mobLoc.textContent = locName;

    this.closeLocationModal();
    this.toast(`📍 Location updated to ${locName.split(',')[0]}`);
  },

  // ---------------- GLOBAL LIVE SEARCH ----------------
  handleSearch(query) {
    clearTimeout(this.searchDebounceTimer);
    const clearBtn = document.getElementById("search-clear-btn");
    const dropdown = document.getElementById("search-results-dropdown");

    if (!query || query.trim().length === 0) {
      clearBtn.classList.add("hidden");
      dropdown.classList.add("hidden");
      return;
    }

    clearBtn.classList.remove("hidden");

    this.searchDebounceTimer = setTimeout(() => {
      const q = query.toLowerCase().trim();
      const stores = Storage.getStores();

      // Search matches in stores
      const matchedStores = stores.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.category.toLowerCase().includes(q) ||
        (s.tags || []).some(t => t.toLowerCase().includes(q))
      );

      // Search matches in products
      const matchedProducts = [];
      stores.forEach(s => {
        (s.products || []).forEach(p => {
          if (p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)) || (p.subcategory && p.subcategory.toLowerCase().includes(q))) {
            matchedProducts.push({
              ...p,
              storeId: s.id,
              storeName: s.name
            });
          }
        });
      });

      if (matchedStores.length === 0 && matchedProducts.length === 0) {
        dropdown.innerHTML = `
          <div class="p-4 text-center text-xs text-slate-500">
            No local store or item found for "<strong>${query}</strong>".
            <button onclick="App.openStoreOnboardingModal()" class="block mx-auto mt-2 text-bazar-700 font-bold underline">
              + Do you own a shop? List it here!
            </button>
          </div>
        `;
        dropdown.classList.remove("hidden");
        return;
      }

      dropdown.innerHTML = `
        <div class="space-y-3">
          ${matchedStores.length > 0 ? `
            <div>
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Nearby Local Stores</div>
              <div class="space-y-1">
                ${matchedStores.slice(0, 4).map(s => `
                  <div onclick="App.openStoreModal('${s.id}'); App.clearSearch();" class="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 cursor-pointer transition">
                    <div class="flex items-center gap-2.5">
                      <img src="${s.image}" class="w-8 h-8 rounded-lg object-cover">
                      <div>
                        <div class="font-bold text-xs text-slate-900">${s.name}</div>
                        <div class="text-[10px] text-slate-500">${s.address.split(',')[0]} • ${s.deliveryTime}</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <span class="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                        ★ ${s.rating}
                      </span>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ''}

          ${matchedProducts.length > 0 ? `
            <div>
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Products in Local Dukaans</div>
              <div class="space-y-1">
                ${matchedProducts.slice(0, 5).map(p => `
                  <div onclick="App.openStoreModal('${p.storeId}'); App.clearSearch();" class="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 cursor-pointer transition">
                    <div class="flex items-center gap-2.5">
                      <img src="${p.image}" class="w-8 h-8 rounded-lg object-cover bg-slate-50">
                      <div>
                        <div class="font-bold text-xs text-slate-900">${p.name}</div>
                        <div class="text-[10px] text-slate-500">Available at: ${p.storeName}</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="text-xs font-extrabold text-slate-900 font-['Outfit']">₹${p.price}</div>
                      <span class="text-[10px] text-emerald-700 font-bold">In Stock</span>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ''}
        </div>
      `;

      dropdown.classList.remove("hidden");
      this.refreshIcons();
    }, 150);
  },

  clearSearch() {
    const input = document.getElementById("global-search-input");
    const clearBtn = document.getElementById("search-clear-btn");
    const dropdown = document.getElementById("search-results-dropdown");
    if (input) input.value = "";
    if (clearBtn) clearBtn.classList.add("hidden");
    if (dropdown) dropdown.classList.add("hidden");
  },

  showHome() {
    this.showAllStores();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  openMerchantDashboard() {
    this.openStoreOnboardingModal();
  },

  initKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      // Press '/' to search
      if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault();
        const searchInput = document.getElementById("global-search-input");
        if (searchInput) searchInput.focus();
      }
      // Press ESC to close modals
      if (e.key === "Escape") {
        this.closeStoreModal();
        this.closeStoreOnboardingModal();
        this.closeAddItemModal();
        this.closeCartDrawer();
        this.closeCheckoutModal();
        this.closeTrackingModal();
        this.closeLocationModal();
        this.clearSearch();
      }
    });

    // Close search on click outside
    document.addEventListener("click", (e) => {
      const searchBox = document.getElementById("global-search-input");
      const dropdown = document.getElementById("search-results-dropdown");
      if (dropdown && !dropdown.contains(e.target) && e.target !== searchBox) {
        dropdown.classList.add("hidden");
      }
    });
  },

  toast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "bg-slate-900 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xl flex items-center gap-2 transform transition-all duration-300 translate-y-2 opacity-0 pointer-events-auto border border-slate-700";
    toast.innerHTML = `
      <i data-lucide="check" class="w-4 h-4 text-emerald-400"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.classList.remove("translate-y-2", "opacity-0");
    }, 10);

    setTimeout(() => {
      toast.classList.add("translate-y-2", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
};

// Initialize App when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
