/**
 * RUROO Global Dropshipping & Private Label Platform
 * Product Catalog, Categories, Certifications & Metrics Dataset
 */

const RUROO_DATA = {
  brand: {
    name: "RUROO",
    tagline: "The Global Engine for Dropshipping & Private Label Brands",
    description: "Empowering 850+ e-commerce brands with zero-inventory dropshipping, 3,500+ proven formulations, custom unboxing packaging, and 24-48 hour automated worldwide fulfillment.",
    phone: "+91 81281 53295",
    email: "partner@rurooglobal.com",
    whatsapp: "+918128153295",
    factoryLocation: "Gujarat Industrial Corridor, India",
    exportLicense: "EX-IND/COS/2026/9821"
  },

  currencies: {
    USD: { symbol: "$", rate: 1.0, label: "USD ($)" },
    EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
    GBP: { symbol: "£", rate: 0.79, label: "GBP (£)" },
    INR: { symbol: "₹", rate: 86.5, label: "INR (₹)" }
  },

  metrics: [
    { value: "850+", label: "Active Dropship Brands", desc: "From DTC startups to 8-figure e-commerce powerhouses" },
    { value: "42+", label: "Countries Shipped", desc: "Express delivery across US, UK, EU, UAE, Australia & Asia" },
    { value: "1,20,000", label: "Sq. Ft. Campus", desc: "Robotic filling lines & ISO Class-7 Cleanroom Labs" },
    { value: "1,50,000", label: "Units / Day", desc: "High-volume scalability with zero bottleneck guarantee" },
    { value: "3,500+", label: "Ready Formulations", desc: "Stability-tested, safety-approved, and market-validated" },
    { value: "24–48h", label: "Blind Dispatch SLA", desc: "Orders packed with your branding and shipped directly" }
  ],

  certifications: [
    { title: "FDA Compliant", subtitle: "Registered Facility", icon: "shield-check" },
    { title: "WHO - GMP", subtitle: "Good Manufacturing Practice", icon: "certificate" },
    { title: "ISO 9001:2015", subtitle: "Quality Management System", icon: "badge-check" },
    { title: "100% Cruelty Free", subtitle: "Leaping Bunny Verified", icon: "heart-handshake" },
    { title: "100% Vegan & Clean", subtitle: "No Harmful Preservatives", icon: "leaf" },
    { title: "Paraben & SLS Free", subtitle: "Dermatologist Approved", icon: "droplet-check" },
    { title: "Halal Verified", subtitle: "Global Compliance", icon: "globe" },
    { title: "Indiamart TrustSeal", subtitle: "Verified Exporter", icon: "award" }
  ],

  categories: [
    {
      id: "skincare",
      name: "Skincare & Serums",
      slug: "skincare",
      count: "850+ Formulations",
      desc: "Clinical-grade serums, peptides, ceramides, and hydrating toners.",
      badge: "Highest Margin (85%+)"
    },
    {
      id: "cosmetics",
      name: "Color & Makeup Cosmetics",
      slug: "cosmetics",
      count: "620+ Formulations",
      desc: "Velvet lipsticks, foundations, waterproof eyeliners, and highlighters.",
      badge: "TikTok Viral"
    },
    {
      id: "perfumes",
      name: "Luxury Fragrances & Perfumes",
      slug: "perfumes",
      count: "480+ Formulations",
      desc: "Extrait de parfum, Parisian notes, Arabic oud, and luxury roll-ons.",
      badge: "High AOV ($65+)"
    },
    {
      id: "haircare",
      name: "Hair & Scalp Solutions",
      slug: "haircare",
      count: "390+ Formulations",
      desc: "Rosemary growth oils, bond-repair shampoos, and peptide scalp serums.",
      badge: "High Repeat Rate"
    },
    {
      id: "petcare",
      name: "Pet Grooming & Wellness",
      slug: "petcare",
      count: "180+ Formulations",
      desc: "Botanical oatmeal sprays, paw balms, and gentle organic puppy shampoos.",
      badge: "Fastest Growing"
    },
    {
      id: "nutra",
      name: "Nutraceuticals & Wellness",
      slug: "nutra",
      count: "540+ Formulations",
      desc: "Hydrolyzed collagen shots, wellness powders, and herbal drops.",
      badge: "Daily Ingestibles"
    }
  ],

  products: [
    {
      id: "ruroo-p01",
      name: "Lumière 20% Vitamin C + Ferulic Acid Radiance Serum",
      category: "skincare",
      categoryName: "Skincare & Serums",
      wholesalePrice: 4.20,
      suggestedPrice: 36.00,
      margin: "88%",
      sampleMoq: "1 Unit",
      bulkMoq: "50 Units",
      image: "assets/images/hero-cosmetics.jpg",
      badge: "Top Seller #1",
      rating: 4.9,
      reviewsCount: 342,
      dispatchTime: "24h Blind Dropship",
      description: "Our #1 best-selling private label skincare formulation worldwide. Packed with 20% pure L-Ascorbic Acid, 0.5% Ferulic Acid, and Botanical Hyaluronic Acid. Clinically tested for instant luminosity and dark spot fading.",
      keyActives: [
        "20% Pure L-Ascorbic Acid (Vitamin C)",
        "0.5% Ferulic Acid for 8x Antioxidant Stability",
        "1.0% Low-Molecular Weight Hyaluronic Acid",
        "Vitamin E Tocopherol"
      ],
      packagingSpecs: "30ml Frosted Amber or Matte White Glass Dropper Bottle with Gold or Bamboo Dropper Collar.",
      shelfLife: "24 Months",
      compliance: ["FDA Registered", "Cruelty-Free", "Clean Formulation", "Paraben-Free"]
    },
    {
      id: "ruroo-p02",
      name: "L'Ambre D'Or Extrait De Parfum (French Amber & Vanilla Oud)",
      category: "perfumes",
      categoryName: "Luxury Fragrances",
      wholesalePrice: 7.80,
      suggestedPrice: 68.00,
      margin: "89%",
      sampleMoq: "1 Unit",
      bulkMoq: "30 Units",
      image: "assets/images/perfume.jpg",
      badge: "Ultra Luxury",
      rating: 5.0,
      reviewsCount: 289,
      dispatchTime: "24-48h Global Dispatch",
      description: "Crafted in partnership with master Grasse perfumers. Features a rich 24% perfume oil concentration that lasts 14+ hours. Opens with saffron and bergamot, melting into smoky amber, tonka bean, and Cambodian oud.",
      keyActives: [
        "24% Pure French Perfume Oil Concentration (Extrait)",
        "Organic Sugar Cane Alcohol Base",
        "Top Notes: Bergamot, Warm Saffron",
        "Heart: Damask Rose, Smoky Amber",
        "Base: Cambodian Oud, Vanilla Bourbon"
      ],
      packagingSpecs: "100ml Heavy Octagonal Crystal Flacon with Magnetic Weighted Gold Cap & Laser Engraved Plate.",
      shelfLife: "36 Months",
      compliance: ["IFRA Compliant", "FDA Registered", "Halal Certified Alcohol Alternative"]
    },
    {
      id: "ruroo-p03",
      name: "Signature Custom Brand Unboxing & Mailer Box Kit",
      category: "packaging",
      categoryName: "Custom Packaging",
      wholesalePrice: 1.60,
      suggestedPrice: 9.00,
      margin: "82%",
      sampleMoq: "1 Kit",
      bulkMoq: "100 Units",
      image: "assets/images/packaging-unboxing.jpg",
      badge: "Branding Essential",
      rating: 4.9,
      reviewsCount: 512,
      dispatchTime: "Instant Sample Dispatch",
      description: "Elevate your dropshipping brand from ordinary to luxury. Includes rigid matte-touch folding mailer, foil-stamped logo, custom watermark tissue wrapping paper, branded sticker seals, and thank-you insert cards.",
      keyActives: [
        "FSC-Certified 100% Recycled Rigid E-Flute Board",
        "Metallic Foil Stamping (Gold, Rose Gold, Silver, Holographic)",
        "Custom Printed Interior Art & Slogan",
        "Satin Tissue Wrap & Soy-Ink Thank You Card"
      ],
      packagingSpecs: "Fully customized dimensions tailored to your SKU assortment.",
      shelfLife: "Indefinite",
      compliance: ["FSC Certified", "100% Biodegradable", "Eco-Friendly Soy Inks"]
    },
    {
      id: "ruroo-p04",
      name: "Botanical Rosemary & Peppermint Follicle Densifying Scalp Elixir",
      category: "haircare",
      categoryName: "Hair & Scalp Solutions",
      wholesalePrice: 3.80,
      suggestedPrice: 28.00,
      margin: "86%",
      sampleMoq: "1 Unit",
      bulkMoq: "50 Units",
      image: "assets/images/hero-cosmetics.jpg",
      badge: "Viral Sensation",
      rating: 4.8,
      reviewsCount: 420,
      dispatchTime: "24h Blind Dropship",
      description: "Formulated specifically to capture the booming scalp care demand. Infused with pure Steam-Distilled Rosemary Oil, Redensyl, Caffeine, and Biotin to visibly reduce shedding and stimulate active hair growth in 6 weeks.",
      keyActives: [
        "Pure Spanish Rosemary Essential Oil",
        "3% Redensyl Active Hair Stimulant",
        "Caffeine + Biotin B7 Complex",
        "Golden Jojoba & Argan Carrier Oils"
      ],
      packagingSpecs: "50ml Amber Glass Dropper Vial with Precision Graduated Pipette.",
      shelfLife: "24 Months",
      compliance: ["Sulfate-Free", "Silicone-Free", "GMP Certified", "Vegan"]
    },
    {
      id: "ruroo-p05",
      name: "Aura Velvet Cloud Matte Transfer-Proof Liquid Lip Tint",
      category: "cosmetics",
      categoryName: "Color & Makeup",
      wholesalePrice: 2.10,
      suggestedPrice: 19.50,
      margin: "89%",
      sampleMoq: "1 Unit",
      bulkMoq: "100 Units",
      image: "assets/images/hero-cosmetics.jpg",
      badge: "High Volume",
      rating: 4.9,
      reviewsCount: 275,
      dispatchTime: "24-48h Dispatch",
      description: "Airy, whipped marshmallow texture that dries down to a comfortable, non-cracking matte finish. 16-hour transfer-proof wear enriched with Avocado Butter and Hyaluronic Spheres so lips never feel parched.",
      keyActives: [
        "Ultra-Fine Micronized Mineral Pigments",
        "Cold-Pressed Avocado Butter",
        "Hyaluronic Acid Filling Spheres",
        "Vitamin E Antioxidant"
      ],
      packagingSpecs: "6ml Soft-Touch Frosted Acrylic Cylinder with Rose Gold Collar & Doe-Foot Applicator.",
      shelfLife: "24 Months",
      compliance: ["Lead-Free", "FDA Cosmetic Certified", "Cruelty-Free"]
    },
    {
      id: "ruroo-p06",
      name: "Midnight Peptide & Multi-Ceramide Barrier Repair Cream",
      category: "skincare",
      categoryName: "Skincare & Serums",
      wholesalePrice: 5.40,
      suggestedPrice: 42.00,
      margin: "87%",
      sampleMoq: "1 Unit",
      bulkMoq: "50 Units",
      image: "assets/images/hero-cosmetics.jpg",
      badge: "Premium Skincare",
      rating: 4.9,
      reviewsCount: 198,
      dispatchTime: "24h Blind Dropship",
      description: "Restores compromised skin barriers overnight. Features 5 bio-identical ceramides, olive squalane, and copper peptides. Delivers deep cellular hydration without clogging pores or greasy residue.",
      keyActives: [
        "5 Bio-Identical Ceramides (EOP, NS, NP, AS, AP)",
        "Copper Tripeptide-1 (GHK-Cu)",
        "100% Plant-Derived Squalane",
        "Centella Asiatica (Cica) Extract"
      ],
      packagingSpecs: "50ml Airless Pump Jar or Heavy Frosted Glass Jar with Aluminum Cap.",
      shelfLife: "30 Months",
      compliance: ["Non-Comedogenic", "Fragrance-Free Option", "Dermatologist Tested"]
    },
    {
      id: "ruroo-p07",
      name: "PetPure Organic Oatmeal & Aloe Hypoallergenic Calming Coat Mist",
      category: "petcare",
      categoryName: "Pet Grooming & Care",
      wholesalePrice: 3.20,
      suggestedPrice: 22.00,
      margin: "85%",
      sampleMoq: "1 Unit",
      bulkMoq: "50 Units",
      image: "assets/images/hero-cosmetics.jpg",
      badge: "Pet Wellness",
      rating: 4.8,
      reviewsCount: 165,
      dispatchTime: "24h Blind Dropship",
      description: "Fast-acting leave-in conditioning spray for dogs and cats. Instantly relieves itchy dry skin, detangles matted fur, and neutralizes odors with a subtle organic lavender scent. Lick-safe and pH-balanced for pets.",
      keyActives: [
        "Colloidal Micro-Oatmeal",
        "Organic Aloe Vera Leaf Juice",
        "Hydrolyzed Wheat Protein",
        "Organic French Lavender Extract"
      ],
      packagingSpecs: "200ml Recyclable Aluminum Spray Bottle with Fine Mist Trigger.",
      shelfLife: "24 Months",
      compliance: ["Lick-Safe", "pH 7.0 Pet Balanced", "Cruelty-Free"]
    },
    {
      id: "ruroo-p08",
      name: "Hydro-Marine 5000mg Collagen Peptides + Glutathione Daily Elixir",
      category: "nutra",
      categoryName: "Nutraceuticals & Wellness",
      wholesalePrice: 1.70,
      suggestedPrice: 5.50,
      margin: "69%",
      sampleMoq: "1 Box (10 Shots)",
      bulkMoq: "100 Boxes",
      image: "assets/images/hero-cosmetics.jpg",
      badge: "High Retention",
      rating: 4.9,
      reviewsCount: 312,
      dispatchTime: "24-48h Dispatch",
      description: "Drinkable beauty wellness shot engineered for maximum absorption. Packed with 5,000mg low-dalton Hydrolyzed Marine Collagen, L-Glutathione, CoQ10, and Vitamin C in a delicious natural berry flavor.",
      keyActives: [
        "5,000mg Hydrolyzed Marine Collagen (Type I & III)",
        "250mg Fermented L-Glutathione",
        "Coenzyme Q10 + Zinc",
        "Buffered Vitamin C (Sodium Ascorbate)"
      ],
      packagingSpecs: "50ml Amber Glass Shots, sold individually or in 10-shot presentation magnetic gift boxes.",
      shelfLife: "18 Months",
      compliance: ["FSSAI Certified", "Non-GMO", "Heavy Metal Tested Zero"]
    }
  ],

  facilities: [
    {
      title: "Automated High-Speed Bottling & Filling",
      desc: "German and Japanese-engineered automated rotary filling lines capable of 150,000 units/day with ultra-precise ±0.1ml tolerance.",
      image: "assets/images/facility-lab.jpg",
      tag: "150k Units / Day"
    },
    {
      title: "ISO Class-7 Cleanroom Formulation Lab",
      desc: "Positive-pressure sterile cleanrooms with HEPA filtration where our PhD cosmetic chemists craft custom formulations and pilot batches.",
      image: "assets/images/facility-lab.jpg",
      tag: "ISO Class-7 Lab"
    },
    {
      title: "Stability, Microbiological & Safety Testing",
      desc: "In-house incubators, HPLC chromatography, and challenge testing verifying 24-month stability across extreme temperature variations.",
      image: "assets/images/facility-lab.jpg",
      tag: "Zero Defect QA"
    },
    {
      title: "Robotic Pick-Pack Blind Fulfillment Center",
      desc: "Dedicated dropshipping fulfillment hub integrating directly with Shopify, WooCommerce, and custom APIs with 24-hour dispatch.",
      image: "assets/images/facility-lab.jpg",
      tag: "24-48h Global Dispatch"
    }
  ],

  calculatorPresets: [
    {
      id: "serum",
      name: "Vitamin C Radiance Serum (30ml)",
      baseWholesaleCost: 4.20,
      defaultRetailPrice: 36.00,
      stdPackagingCost: 0.60,
      luxePackagingCost: 1.40,
      fulfillmentCost: 2.20
    },
    {
      id: "perfume",
      name: "Luxury Extrait De Parfum (100ml)",
      baseWholesaleCost: 7.80,
      defaultRetailPrice: 68.00,
      stdPackagingCost: 1.20,
      luxePackagingCost: 2.50,
      fulfillmentCost: 2.80
    },
    {
      id: "lipstick",
      name: "Velvet Matte Liquid Lip Tint (6ml)",
      baseWholesaleCost: 2.10,
      defaultRetailPrice: 19.50,
      stdPackagingCost: 0.40,
      luxePackagingCost: 0.90,
      fulfillmentCost: 1.80
    },
    {
      id: "hair-oil",
      name: "Rosemary Biotin Scalp Elixir (50ml)",
      baseWholesaleCost: 3.80,
      defaultRetailPrice: 28.00,
      stdPackagingCost: 0.50,
      luxePackagingCost: 1.20,
      fulfillmentCost: 2.20
    },
    {
      id: "night-cream",
      name: "Ceramide Barrier Repair Cream (50ml)",
      baseWholesaleCost: 5.40,
      defaultRetailPrice: 42.00,
      stdPackagingCost: 0.80,
      luxePackagingCost: 1.80,
      fulfillmentCost: 2.40
    }
  ],

  faqs: [
    {
      q: "What is RUROO's Dropshipping model and how is it different from ordinary dropshipping?",
      a: "Unlike low-quality marketplace dropshipping from generic platforms, RUROO provides true Private Label Dropshipping. We manufacture high-grade cosmetics, perfumes, and skincare in our own ISO & GMP certified factories. When your customer orders on your website, our automated warehouse prints your custom branded packaging and blind-ships directly to your customer within 24–48 hours with zero mention of RUROO."
    },
    {
      q: "What is the Minimum Order Quantity (MOQ) for samples and dropshipping?",
      a: "For blind dropshipping to individual end customers, the MOQ is 1 unit! For sample kits so you can evaluate the formulation, texture, scent, and packaging in person, the MOQ is also 1 unit. For custom fully bespoke silk-screen printed bottles, bulk runs start at just 50 to 100 units."
    },
    {
      q: "Can I customize the formulations or request custom scents/ingredients?",
      a: "Yes! While we have over 3,500 ready-to-sell formulations ready for instant labeling, our on-site R&D chemistry team can adjust viscosity, fragrance profile, active concentrations (e.g. increase Niacinamide to 12%), or add proprietary botanical extracts."
    },
    {
      q: "Which e-commerce platforms can I connect with RUROO?",
      a: "RUROO seamlessly integrates with Shopify, WooCommerce, TikTok Shop, Amazon, BigCommerce, and custom webstores via our automated REST API and Webhook suite. Order sync, tracking numbers, and address verification happen in real-time."
    },
    {
      q: "How fast do orders ship to the United States, Europe, and globally?",
      a: "All orders are dispatched from our fulfillment hubs within 24 to 48 hours. With our tier-1 express air carrier partnerships (FedEx International Priority, DHL Express, USPS Direct Injection), standard delivery to the US takes 4–6 business days, Europe takes 3–5 days, and UAE/GCC takes 2–3 days."
    },
    {
      q: "Are the formulations FDA approved and compliant with international cosmetic regulations?",
      a: "Yes. All RUROO formulations are manufactured in FDA-compliant, WHO-GMP, and ISO 9001:2015 certified facilities. We provide complete Certificates of Analysis (COA), Safety Data Sheets (SDS), and microbiological test reports with every SKU."
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = RUROO_DATA;
}
