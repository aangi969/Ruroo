/**
 * RUROO Dropshipping & Private Label Margin Calculator
 * Interactive financial ROI & profit estimation engine
 */

class RurooCalculator {
  constructor(data) {
    this.data = data;
    this.currentCurrency = "USD";
    this.currentPreset = this.data.calculatorPresets[0];
    this.volume = 1200;
    this.packagingTier = "luxe"; // 'standard' or 'luxe'
    this.retailPrice = this.currentPreset.defaultRetailPrice;
    
    this.init();
  }

  init() {
    this.cacheDom();
    this.bindEvents();
    this.populatePresets();
    this.recalculate();
  }

  cacheDom() {
    this.productSelect = document.getElementById("calc-product-select");
    this.volumeSlider = document.getElementById("calc-volume-slider");
    this.volumeDisplay = document.getElementById("calc-volume-display");
    this.retailPriceInput = document.getElementById("calc-retail-price");
    this.packagingRadios = document.querySelectorAll("input[name='packaging-tier']");
    
    // Outputs
    this.unitWholesaleEl = document.getElementById("calc-out-wholesale");
    this.unitPackagingEl = document.getElementById("calc-out-packaging");
    this.unitFulfillmentEl = document.getElementById("calc-out-fulfillment");
    this.unitLandedEl = document.getElementById("calc-out-landed");
    this.unitProfitEl = document.getElementById("calc-out-unit-profit");
    this.marginPercentEl = document.getElementById("calc-out-margin-percent");
    this.marginBarEl = document.getElementById("calc-margin-bar");
    this.monthlyRevenueEl = document.getElementById("calc-out-monthly-revenue");
    this.monthlyProfitEl = document.getElementById("calc-out-monthly-profit");
    this.annualProfitEl = document.getElementById("calc-out-annual-profit");
    this.roiEl = document.getElementById("calc-out-roi");
    
    this.sampleBtn = document.getElementById("calc-add-sample-btn");
  }

  bindEvents() {
    if (this.productSelect) {
      this.productSelect.addEventListener("change", (e) => {
        const found = this.data.calculatorPresets.find(p => p.id === e.target.value);
        if (found) {
          this.currentPreset = found;
          this.retailPrice = found.defaultRetailPrice;
          if (this.retailPriceInput) {
            this.retailPriceInput.value = this.retailPrice.toFixed(2);
          }
          this.recalculate();
        }
      });
    }

    if (this.volumeSlider) {
      this.volumeSlider.addEventListener("input", (e) => {
        this.volume = parseInt(e.target.value, 10);
        if (this.volumeDisplay) {
          this.volumeDisplay.innerText = this.volume.toLocaleString() + " units/mo";
        }
        this.recalculate();
      });
    }

    if (this.retailPriceInput) {
      this.retailPriceInput.addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val) && val > 0) {
          this.retailPrice = val;
          this.recalculate();
        }
      });
    }

    if (this.packagingRadios) {
      this.packagingRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
          this.packagingTier = e.target.value;
          this.recalculate();
        });
      });
    }

    if (this.sampleBtn) {
      this.sampleBtn.addEventListener("click", () => {
        // Find matching product in catalog
        let targetProduct = this.data.products.find(p => 
          p.name.toLowerCase().includes(this.currentPreset.name.split(" ")[0].toLowerCase())
        ) || this.data.products[0];

        if (window.RurooApp && window.RurooApp.addToSampleKit) {
          window.RurooApp.addToSampleKit(targetProduct.id);
        }
      });
    }
  }

  populatePresets() {
    if (!this.productSelect) return;
    this.productSelect.innerHTML = this.data.calculatorPresets.map(preset => `
      <option value="${preset.id}">${preset.name}</option>
    `).join("");
    
    if (this.retailPriceInput) {
      this.retailPriceInput.value = this.currentPreset.defaultRetailPrice.toFixed(2);
    }
    if (this.volumeDisplay) {
      this.volumeDisplay.innerText = this.volume.toLocaleString() + " units/mo";
    }
  }

  setCurrency(currCode) {
    this.currentCurrency = currCode;
    this.recalculate();
  }

  formatMoney(amountUSD) {
    const curr = this.data.currencies[this.currentCurrency] || this.data.currencies.USD;
    const converted = amountUSD * curr.rate;
    return `${curr.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  recalculate() {
    const curr = this.data.currencies[this.currentCurrency] || this.data.currencies.USD;
    
    // Calculate volume discount (higher volume = cheaper packaging & bulk wholesale)
    let volumeDiscountFactor = 1.0;
    if (this.volume >= 5000) volumeDiscountFactor = 0.85;
    else if (this.volume >= 2500) volumeDiscountFactor = 0.90;
    else if (this.volume >= 1000) volumeDiscountFactor = 0.95;

    const baseWholesale = this.currentPreset.baseWholesaleCost * volumeDiscountFactor;
    const packaging = (this.packagingTier === "luxe" 
      ? this.currentPreset.luxePackagingCost 
      : this.currentPreset.stdPackagingCost) * volumeDiscountFactor;
    const fulfillment = this.currentPreset.fulfillmentCost;

    const totalLandedCost = baseWholesale + packaging + fulfillment;
    const retail = Math.max(this.retailPrice, totalLandedCost + 1.0);
    const unitProfit = retail - totalLandedCost;
    const marginPercent = Math.round((unitProfit / retail) * 100);
    const roiPercent = Math.round((unitProfit / totalLandedCost) * 100);

    const monthlyRevenue = retail * this.volume;
    const monthlyProfit = unitProfit * this.volume;
    const annualProfit = monthlyProfit * 12;

    // Render to DOM
    if (this.unitWholesaleEl) this.unitWholesaleEl.innerText = this.formatMoney(baseWholesale);
    if (this.unitPackagingEl) this.unitPackagingEl.innerText = this.formatMoney(packaging);
    if (this.unitFulfillmentEl) this.unitFulfillmentEl.innerText = this.formatMoney(fulfillment);
    if (this.unitLandedEl) this.unitLandedEl.innerText = this.formatMoney(totalLandedCost);
    if (this.unitProfitEl) this.unitProfitEl.innerText = this.formatMoney(unitProfit);
    
    if (this.marginPercentEl) this.marginPercentEl.innerText = `${marginPercent}%`;
    if (this.marginBarEl) {
      this.marginBarEl.style.width = `${Math.min(marginPercent, 100)}%`;
      if (marginPercent > 75) {
        this.marginBarEl.style.background = "linear-gradient(90deg, #00A86B, #10B981)";
      } else if (marginPercent > 50) {
        this.marginBarEl.style.background = "linear-gradient(90deg, #FF8A00, #F59E0B)";
      } else {
        this.marginBarEl.style.background = "linear-gradient(90deg, #E52E2D, #EF4444)";
      }
    }

    if (this.monthlyRevenueEl) this.monthlyRevenueEl.innerText = this.formatMoney(monthlyRevenue);
    if (this.monthlyProfitEl) this.monthlyProfitEl.innerText = this.formatMoney(monthlyProfit);
    if (this.annualProfitEl) this.annualProfitEl.innerText = this.formatMoney(annualProfit);
    if (this.roiEl) this.roiEl.innerText = `+${roiPercent}% ROI`;
  }
}

if (typeof window !== "undefined") {
  window.RurooCalculator = RurooCalculator;
}
