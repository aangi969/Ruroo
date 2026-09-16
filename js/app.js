/**
 * RUROO Global Platform - Core Application Logic
 * Interactive Catalog, Quick View, Sample RFQ Drawer, Search & Currency Switcher
 */

class RurooApp {
  constructor(data) {
    this.data = data;
    this.currentCategory = "all";
    this.searchQuery = "";
    this.currentCurrency = "USD";
    this.sampleCart = this.loadCart();
    this.calculator = null;

    this.init();
  }

  init() {
    this.cacheDom();
    this.bindEvents();
    this.initCalculator();
    this.renderCategories();
    this.renderProducts();
    this.renderCertificationsMarquee();
    this.renderFaqs();
    this.updateCartBadge();
    this.initMapTooltips();
  }

  cacheDom() {
    // Nav & Controls
    this.currencySelect = document.getElementById("currency-select");
    this.searchInput = document.getElementById("header-search-input");
    this.searchDropdown = document.getElementById("search-live-results");
    this.mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    this.mobileNavDrawer = document.getElementById("mobile-nav-drawer");
    this.mobileNavClose = document.getElementById("mobile-nav-close");
    this.cartTrigger = document.getElementById("cart-drawer-trigger");
    this.cartBadge = document.getElementById("cart-badge-count");
    
    // Catalog
    this.catalogGrid = document.getElementById("catalog-products-grid");
    this.categoryTabsContainer = document.getElementById("category-filter-tabs");
    this.categoryExplorerGrid = document.getElementById("category-explorer-grid");
    this.catalogCountDisplay = document.getElementById("catalog-count-display");

    // Quick View Modal
    this.quickViewModal = document.getElementById("quick-view-modal");
    this.quickViewModalContent = document.getElementById("quick-view-modal-body");
    this.quickViewClose = document.getElementById("quick-view-close");

    // RFQ Drawer
    this.rfqDrawer = document.getElementById("rfq-sample-drawer");
    this.rfqDrawerClose = document.getElementById("rfq-drawer-close");
    this.rfqBackdrop = document.getElementById("rfq-drawer-backdrop");
    this.rfqItemsList = document.getElementById("rfq-drawer-items");
    this.rfqSubtotalEl = document.getElementById("rfq-drawer-subtotal");
    this.rfqForm = document.getElementById("rfq-inquiry-form");

    // Success Modal
    this.successModal = document.getElementById("rfq-success-modal");
    this.successModalClose = document.getElementById("success-modal-close");

    // Ticker & FAQs
    this.marqueeTrack = document.getElementById("certifications-marquee-track");
    this.faqAccordion = document.getElementById("faq-accordion");
    this.toastContainer = document.getElementById("toast-container");
  }

  bindEvents() {
    // Currency Switcher
    if (this.currencySelect) {
      this.currencySelect.addEventListener("change", (e) => {
        this.currentCurrency = e.target.value;
        if (this.calculator) this.calculator.setCurrency(this.currentCurrency);
        this.renderProducts();
        this.renderCartDrawer();
        this.showToast(`Currency updated to ${this.data.currencies[this.currentCurrency].label}`);
      });
    }

    // Header Search Input
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.handleLiveSearchDropdown(this.searchQuery);
        this.renderProducts();
      });

      // Close live search dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (this.searchDropdown && !this.searchInput.contains(e.target) && !this.searchDropdown.contains(e.target)) {
          this.searchDropdown.classList.remove("active");
        }
      });
    }

    // Mobile Menu
    if (this.mobileMenuToggle && this.mobileNavDrawer) {
      this.mobileMenuToggle.addEventListener("click", () => {
        this.mobileNavDrawer.classList.add("active");
      });
    }
    if (this.mobileNavClose && this.mobileNavDrawer) {
      this.mobileNavClose.addEventListener("click", () => {
        this.mobileNavDrawer.classList.remove("active");
      });
    }

    // Drawer Toggles
    if (this.cartTrigger) {
      this.cartTrigger.addEventListener("click", () => this.openRfqDrawer());
    }
    if (this.rfqDrawerClose) {
      this.rfqDrawerClose.addEventListener("click", () => this.closeRfqDrawer());
    }
    if (this.rfqBackdrop) {
      this.rfqBackdrop.addEventListener("click", () => this.closeRfqDrawer());
    }

    // Quick View Modal Close
    if (this.quickViewClose && this.quickViewModal) {
      this.quickViewClose.addEventListener("click", () => this.closeQuickView());
      this.quickViewModal.addEventListener("click", (e) => {
        if (e.target === this.quickViewModal) this.closeQuickView();
      });
    }
    if (this.successModalClose && this.successModal) {
      this.successModalClose.addEventListener("click", () => {
        this.successModal.classList.remove("active");
      });
    }

    // ESC Key listener
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeQuickView();
        this.closeRfqDrawer();
        if (this.successModal) this.successModal.classList.remove("active");
        if (this.mobileNavDrawer) this.mobileNavDrawer.classList.remove("active");
      }
    });

    // RFQ Form Submit
    if (this.rfqForm) {
      this.rfqForm.addEventListener("submit", (e) => this.handleRfqSubmit(e));
    }
  }

  initCalculator() {
    if (window.RurooCalculator) {
      this.calculator = new window.RurooCalculator(this.data);
    }
  }

  formatMoney(amountUSD) {
    const curr = this.data.currencies[this.currentCurrency] || this.data.currencies.USD;
    const converted = amountUSD * curr.rate;
    return `${curr.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  // --- Search Dropdown ---
  handleLiveSearchDropdown(query) {
    if (!this.searchDropdown) return;
    if (!query || query.length < 2) {
      this.searchDropdown.classList.remove("active");
      this.searchDropdown.innerHTML = "";
      return;
    }

    const matches = this.data.products.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.categoryName.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    ).slice(0, 5);

    if (matches.length === 0) {
      this.searchDropdown.innerHTML = `<div class="search-no-results">No formulations found matching "${query}"</div>`;
    } else {
      this.searchDropdown.innerHTML = matches.map(p => `
        <div class="search-result-item" onclick="window.RurooApp.openQuickView('${p.id}'); window.RurooApp.closeSearchDropdown();">
          <img src="${p.image}" alt="${p.name}" class="search-result-thumb">
          <div class="search-result-info">
            <div class="search-result-title">${p.name}</div>
            <div class="search-result-meta">
              <span>Wholesale: <strong>${this.formatMoney(p.wholesalePrice)}</strong></span> • 
              <span class="text-emerald">${p.margin} Margin</span>
            </div>
          </div>
        </div>
      `).join("");
    }
    this.searchDropdown.classList.add("active");
  }

  closeSearchDropdown() {
    if (this.searchDropdown) this.searchDropdown.classList.remove("active");
  }

  // --- Categories Rendering ---
  renderCategories() {
    if (this.categoryTabsContainer) {
      const tabs = [
        { id: "all", name: "All Formulations" },
        ...this.data.categories
      ];

      this.categoryTabsContainer.innerHTML = tabs.map(tab => `
        <button type="button" class="category-tab-btn ${this.currentCategory === tab.id ? 'active' : ''}" 
          data-category="${tab.id}" onclick="window.RurooApp.setCategory('${tab.id}')">
          ${tab.name}
        </button>
      `).join("");
    }

    if (this.categoryExplorerGrid) {
      this.categoryExplorerGrid.innerHTML = this.data.categories.map(cat => `
        <div class="category-card hover-glow" onclick="window.RurooApp.setCategoryAndScroll('${cat.id}')">
          <div class="category-card-badge">${cat.badge}</div>
          <h3 class="category-card-title">${cat.name}</h3>
          <p class="category-card-desc">${cat.desc}</p>
          <div class="category-card-footer">
            <span class="category-item-count">${cat.count}</span>
            <span class="category-arrow-btn">Explore →</span>
          </div>
        </div>
      `).join("");
    }
  }

  setCategory(catId) {
    this.currentCategory = catId;
    // update active tab style
    const tabs = document.querySelectorAll(".category-tab-btn");
    tabs.forEach(tab => {
      if (tab.getAttribute("data-category") === catId) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
    this.renderProducts();
  }

  setCategoryAndScroll(catId) {
    this.setCategory(catId);
    const catalogEl = document.getElementById("catalog");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  }

  // --- Products Catalog Rendering ---
  renderProducts() {
    if (!this.catalogGrid) return;

    let filtered = this.data.products;

    if (this.currentCategory !== "all") {
      filtered = filtered.filter(p => p.category === this.currentCategory);
    }

    if (this.searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(this.searchQuery) ||
        p.description.toLowerCase().includes(this.searchQuery) ||
        p.categoryName.toLowerCase().includes(this.searchQuery)
      );
    }

    if (this.catalogCountDisplay) {
      this.catalogCountDisplay.innerText = `Showing ${filtered.length} verified formulation${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      this.catalogGrid.innerHTML = `
        <div class="no-products-found">
          <i class="fas fa-search fa-2x"></i>
          <h3>No formulations found</h3>
          <p>Try searching for a different keyword or select another category.</p>
          <button class="btn btn-secondary mt-3" onclick="window.RurooApp.resetFilters()">View All Products</button>
        </div>
      `;
      return;
    }

    this.catalogGrid.innerHTML = filtered.map(product => `
      <div class="product-card glass-card">
        <div class="product-card-top">
          <span class="product-badge">${product.badge}</span>
          <span class="product-dispatch-pill"><i class="fas fa-bolt text-amber"></i> ${product.dispatchTime}</span>
        </div>
        
        <div class="product-img-wrapper" onclick="window.RurooApp.openQuickView('${product.id}')">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
          <div class="product-quick-view-overlay">
            <span><i class="fas fa-eye"></i> Quick View</span>
          </div>
        </div>

        <div class="product-card-body">
          <div class="product-category-name">${product.categoryName}</div>
          <h3 class="product-title" onclick="window.RurooApp.openQuickView('${product.id}')">${product.name}</h3>

          <div class="product-ratings">
            <span class="stars"><i class="fas fa-star text-amber"></i> ${product.rating}</span>
            <span class="reviews-count">(${product.reviewsCount} reviews)</span>
          </div>

          <div class="product-financials-box">
            <div class="financial-row">
              <span class="fin-label">Wholesale Dropship:</span>
              <span class="fin-val highlight-wholesale">${this.formatMoney(product.wholesalePrice)} / unit</span>
            </div>
            <div class="financial-row">
              <span class="fin-label">Suggested Retail:</span>
              <span class="fin-val">${this.formatMoney(product.suggestedPrice)}</span>
            </div>
            <div class="financial-row margin-row">
              <span class="fin-label">Estimated Margin:</span>
              <span class="fin-margin-badge">${product.margin} Profit</span>
            </div>
          </div>

          <div class="product-moq-info">
            <span><strong>Sample MOQ:</strong> ${product.sampleMoq}</span>
            <span><strong>Bulk MOQ:</strong> ${product.bulkMoq}</span>
          </div>

          <div class="product-card-actions">
            <button type="button" class="btn btn-outline-primary btn-sm" onclick="window.RurooApp.openQuickView('${product.id}')">
              Details
            </button>
            <button type="button" class="btn btn-primary btn-sm" onclick="window.RurooApp.addToSampleKit('${product.id}')">
              <i class="fas fa-plus"></i> Add Sample
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  resetFilters() {
    this.currentCategory = "all";
    this.searchQuery = "";
    if (this.searchInput) this.searchInput.value = "";
    this.renderCategories();
    this.renderProducts();
  }

  // --- Quick View Modal ---
  openQuickView(productId) {
    const product = this.data.products.find(p => p.id === productId);
    if (!product || !this.quickViewModal || !this.quickViewModalContent) return;

    this.quickViewModalContent.innerHTML = `
      <div class="quick-view-grid">
        <div class="quick-view-media">
          <div class="quick-view-main-image-wrap">
            <img src="${product.image}" alt="${product.name}" class="quick-view-main-img">
            <span class="product-badge">${product.badge}</span>
          </div>
          <div class="quick-view-guarantees">
            <div class="guarantee-chip"><i class="fas fa-shipping-fast text-emerald"></i> 24-48h Global Dispatch</div>
            <div class="guarantee-chip"><i class="fas fa-user-shield text-emerald"></i> Blind Dropship Guaranteed</div>
            <div class="guarantee-chip"><i class="fas fa-award text-amber"></i> Full Formulation COA Included</div>
          </div>
        </div>

        <div class="quick-view-info">
          <div class="quick-view-header">
            <span class="product-category-name">${product.categoryName}</span>
            <h2 class="quick-view-title">${product.name}</h2>
            <div class="product-ratings mb-3">
              <span class="stars"><i class="fas fa-star text-amber"></i> ${product.rating}</span>
              <span class="reviews-count">(${product.reviewsCount} verified brand reviews)</span>
            </div>
          </div>

          <div class="quick-view-price-panel glass-card p-3 mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div>
                <span class="text-muted text-xs d-block">Wholesale Unit Price:</span>
                <span class="quick-view-price-main text-emerald">${this.formatMoney(product.wholesalePrice)}</span>
              </div>
              <div>
                <span class="text-muted text-xs d-block">Suggested Retail:</span>
                <span class="quick-view-price-rrp">${this.formatMoney(product.suggestedPrice)}</span>
              </div>
              <div>
                <span class="text-muted text-xs d-block">Profit Margin:</span>
                <span class="badge-margin-large">${product.margin}</span>
              </div>
            </div>
            <p class="quick-view-dispatch-note text-xs text-muted mb-0">
              <i class="fas fa-box-check text-emerald"></i> In stock for immediate sample dispatch or wholesale store sync.
            </p>
          </div>

          <div class="quick-view-section mb-3">
            <h4 class="section-micro-title">Formulation Overview</h4>
            <p class="quick-view-desc">${product.description}</p>
          </div>

          <div class="quick-view-section mb-3">
            <h4 class="section-micro-title">Key Active Ingredients</h4>
            <ul class="quick-view-actives-list">
              ${product.keyActives.map(act => `<li><i class="fas fa-check-circle text-emerald"></i> ${act}</li>`).join("")}
            </ul>
          </div>

          <div class="quick-view-section mb-3">
            <h4 class="section-micro-title">Packaging & Specs</h4>
            <p class="text-sm mb-1"><strong>Container:</strong> ${product.packagingSpecs}</p>
            <p class="text-sm mb-1"><strong>Shelf Life:</strong> ${product.shelfLife}</p>
            <p class="text-sm"><strong>MOQ:</strong> Sample: ${product.sampleMoq} | Custom Branding: ${product.bulkMoq}</p>
          </div>

          <div class="quick-view-badges mb-4">
            ${product.compliance.map(c => `<span class="compliance-tag"><i class="fas fa-shield-alt"></i> ${c}</span>`).join("")}
          </div>

          <div class="quick-view-actions">
            <button class="btn btn-primary btn-lg w-100" onclick="window.RurooApp.addToSampleKit('${product.id}'); window.RurooApp.closeQuickView();">
              <i class="fas fa-box"></i> Add to Sample Kit & Request Quote
            </button>
          </div>
        </div>
      </div>
    `;

    this.quickViewModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeQuickView() {
    if (this.quickViewModal) {
      this.quickViewModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // --- Sample Kit / RFQ Cart ---
  loadCart() {
    try {
      const saved = localStorage.getItem("ruroo_sample_cart");
      return saved ? JSON.parse(saved) : [
        { productId: "ruroo-p01", qty: 1 },
        { productId: "ruroo-p02", qty: 1 }
      ];
    } catch (e) {
      return [{ productId: "ruroo-p01", qty: 1 }];
    }
  }

  saveCart() {
    try {
      localStorage.setItem("ruroo_sample_cart", JSON.stringify(this.sampleCart));
    } catch (e) {}
  }

  addToSampleKit(productId) {
    const existing = this.sampleCart.find(item => item.productId === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.sampleCart.push({ productId, qty: 1 });
    }
    this.saveCart();
    this.updateCartBadge();
    this.renderCartDrawer();
    this.openRfqDrawer();
    
    const prod = this.data.products.find(p => p.id === productId);
    this.showToast(`Added ${prod ? prod.name : 'Sample'} to your Sample Kit!`);
  }

  removeFromCart(productId) {
    this.sampleCart = this.sampleCart.filter(item => item.productId !== productId);
    this.saveCart();
    this.updateCartBadge();
    this.renderCartDrawer();
  }

  updateQty(productId, delta) {
    const item = this.sampleCart.find(i => i.productId === productId);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCart();
        this.updateCartBadge();
        this.renderCartDrawer();
      }
    }
  }

  updateCartBadge() {
    const totalCount = this.sampleCart.reduce((sum, item) => sum + item.qty, 0);
    if (this.cartBadge) {
      this.cartBadge.innerText = totalCount;
      if (totalCount > 0) {
        this.cartBadge.classList.add("has-items");
      } else {
        this.cartBadge.classList.remove("has-items");
      }
    }
  }

  openRfqDrawer() {
    this.renderCartDrawer();
    if (this.rfqDrawer && this.rfqBackdrop) {
      this.rfqDrawer.classList.add("active");
      this.rfqBackdrop.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  closeRfqDrawer() {
    if (this.rfqDrawer && this.rfqBackdrop) {
      this.rfqDrawer.classList.remove("active");
      this.rfqBackdrop.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  renderCartDrawer() {
    if (!this.rfqItemsList) return;

    if (this.sampleCart.length === 0) {
      this.rfqItemsList.innerHTML = `
        <div class="empty-cart-state">
          <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
          <h4>Your Sample Kit is Empty</h4>
          <p class="text-sm text-muted">Browse our formulations and add samples to inspect textures, quality, and packaging in person.</p>
          <button class="btn btn-secondary btn-sm mt-2" onclick="window.RurooApp.closeRfqDrawer()">Browse Catalog</button>
        </div>
      `;
      if (this.rfqSubtotalEl) this.rfqSubtotalEl.innerText = this.formatMoney(0);
      return;
    }

    let subtotal = 0;
    this.rfqItemsList.innerHTML = this.sampleCart.map(item => {
      const product = this.data.products.find(p => p.id === item.productId);
      if (!product) return "";
      const itemTotal = product.wholesalePrice * item.qty;
      subtotal += itemTotal;

      return `
        <div class="drawer-item-card">
          <img src="${product.image}" alt="${product.name}" class="drawer-item-img">
          <div class="drawer-item-details">
            <h4 class="drawer-item-title">${product.name}</h4>
            <div class="drawer-item-price">${this.formatMoney(product.wholesalePrice)} / sample unit</div>
            <div class="drawer-item-controls">
              <div class="qty-stepper">
                <button type="button" class="stepper-btn" onclick="window.RurooApp.updateQty('${product.id}', -1)">-</button>
                <span class="stepper-val">${item.qty}</span>
                <button type="button" class="stepper-btn" onclick="window.RurooApp.updateQty('${product.id}', 1)">+</button>
              </div>
              <button type="button" class="drawer-item-remove" onclick="window.RurooApp.removeFromCart('${product.id}')">
                <i class="fas fa-trash-alt"></i> Remove
              </button>
            </div>
          </div>
          <div class="drawer-item-total">
            ${this.formatMoney(itemTotal)}
          </div>
        </div>
      `;
    }).join("");

    if (this.rfqSubtotalEl) {
      this.rfqSubtotalEl.innerText = this.formatMoney(subtotal);
    }
  }

  handleRfqSubmit(e) {
    e.preventDefault();
    if (this.sampleCart.length === 0) {
      this.showToast("Please add at least 1 sample product before submitting inquiry.", "error");
      return;
    }

    const brandName = document.getElementById("rfq-brand-name").value || "Your Brand";
    const email = document.getElementById("rfq-email").value;
    const phone = document.getElementById("rfq-phone").value;
    const country = document.getElementById("rfq-country").value;
    const refNumber = "RUROO-" + Math.floor(100000 + Math.random() * 900000);

    // Populate success modal
    const refEl = document.getElementById("success-ref-id");
    const brandEl = document.getElementById("success-brand-name");
    const emailEl = document.getElementById("success-email-target");
    if (refEl) refEl.innerText = refNumber;
    if (brandEl) brandEl.innerText = brandName;
    if (emailEl) emailEl.innerText = email;

    // Direct WhatsApp Link
    const waBtn = document.getElementById("success-whatsapp-link");
    if (waBtn) {
      const waMsg = encodeURIComponent(`Hi RUROO team, I just requested a sample quotation for my brand "${brandName}" (Ref: ${refNumber}). I'd like to discuss onboarding and private label dispatch.`);
      waBtn.href = `https://api.whatsapp.com/send?phone=918128153295&text=${waMsg}`;
    }

    this.closeRfqDrawer();
    if (this.successModal) {
      this.successModal.classList.add("active");
    }

    // Reset form
    this.rfqForm.reset();
  }

  // --- Certifications & FAQs ---
  renderCertificationsMarquee() {
    if (!this.marqueeTrack) return;
    // Repeat twice for seamless infinite loop
    const fullList = [...this.data.certifications, ...this.data.certifications];
    this.marqueeTrack.innerHTML = fullList.map(cert => `
      <div class="marquee-item">
        <div class="marquee-icon-wrap">
          <i class="fas fa-${cert.icon || 'shield-check'} text-emerald"></i>
        </div>
        <div class="marquee-text">
          <div class="marquee-title">${cert.title}</div>
          <div class="marquee-subtitle">${cert.subtitle}</div>
        </div>
      </div>
    `).join("");
  }

  renderFaqs() {
    if (!this.faqAccordion) return;
    this.faqAccordion.innerHTML = this.data.faqs.map((faq, idx) => `
      <div class="faq-item glass-card ${idx === 0 ? 'active' : ''}">
        <button type="button" class="faq-question" onclick="window.RurooApp.toggleFaq(this)">
          <span>${faq.q}</span>
          <i class="fas fa-chevron-down faq-chevron"></i>
        </button>
        <div class="faq-answer">
          <p>${faq.a}</p>
        </div>
      </div>
    `).join("");
  }

  toggleFaq(buttonEl) {
    const item = buttonEl.closest(".faq-item");
    if (item) {
      item.classList.toggle("active");
    }
  }

  initMapTooltips() {
    const mapPins = document.querySelectorAll(".map-network-pin");
    mapPins.forEach(pin => {
      pin.addEventListener("mouseenter", () => {
        pin.classList.add("hovered");
      });
      pin.addEventListener("mouseleave", () => {
        pin.classList.remove("hovered");
      });
    });
  }

  // --- Toast Notification System ---
  showToast(message, type = "success") {
    if (!this.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `ruroo-toast ${type}`;
    toast.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle text-emerald' : 'exclamation-circle text-crimson'}"></i>
      <span>${message}</span>
    `;
    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3500);
  }
}

// Global bootstrap
document.addEventListener("DOMContentLoaded", () => {
  if (typeof RUROO_DATA !== "undefined") {
    window.RurooApp = new RurooApp(RUROO_DATA);
  }
});
