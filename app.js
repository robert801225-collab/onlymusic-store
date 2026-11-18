/**
 * ONLYMUSIC - E-COMMERCE & TIENDA VIRTUAL (PÁGINAS INDEPENDIENTES)
 * Lógica completa de catálogo, carrito, pasarela de pago interactiva con tarjeta 3D,
 * enrutador de páginas independientes (Hogar, Catálogo de Productos, Sobre Nosotros, Contáctanos),
 * carrusel de inicio, filtros y efectos de sonido.
 */

// --- Base de Datos de Productos Oficiales OnlyMusic (Precios en Pesos Mexicanos MXN) ---
const PRODUCTS = [
  {
    id: 'pro-x',
    name: 'OnlyMusic Pro X',
    category: 'auriculares',
    subtext: 'Con cable e inalámbrico | Audio nítido | Deportes',
    basePriceMXN: 2999,
    originalPriceMXN: 3799,
    image: 'assets/product_pro_x.png',
    badge: 'Más Vendido',
    rating: 4.9,
    reviewsCount: 342,
    specs: {
      'Conectividad': 'Bluetooth 5.3 + Jack 3.5mm Hi-Res',
      'Cancelación de Ruido': 'ANC Híbrido hasta 42dB',
      'Batería': 'Hasta 50 horas (ANC off) / 38h (ANC on)',
      'Drivers': '40mm Titanio con diafragma compuesto',
      'Carga': 'USB-C Ultra Rápida (10 min = 5 horas)',
      'Micrófono': 'Dual con reducción de ruido ambiental ENC',
      'Resistencia': 'IPX4 resistente al sudor y salpicaduras'
    },
    description: 'El buque insignia de OnlyMusic. Diseñado para ofrecer una fidelidad de audio impecable tanto para entrenar como para sesiones prolongadas de estudio, viajes o uso diario.'
  },
  {
    id: 'gamer-71',
    name: 'OnlyMusic Gamer 7.1',
    category: 'gamer',
    subtext: 'Juegos | Baja latencia | Con micrófono',
    basePriceMXN: 3499,
    originalPriceMXN: 4299,
    image: 'assets/product_gamer_71.png',
    badge: 'Gamer Pro',
    rating: 4.8,
    reviewsCount: 215,
    specs: {
      'Conectividad': 'Wireless 2.4GHz Dongle + Bluetooth 5.3 + Cable',
      'Sonido': 'Surround Virtual 7.1 Espacial 360°',
      'Latencia': 'Ultra baja de 28ms (Modo Gaming)',
      'Micrófono': 'Boom desmontable con filtro antipop',
      'Iluminación': 'RGB Spectrum sincronizable',
      'Batería': '40 horas continuas de juego',
      'Almohadillas': 'Memory Foam transpirable con gel frío'
    },
    description: 'Diseñado específicamente para gaming competitivo. Escucha los pasos y disparos con precisión milimétrica y comunícate con claridad cristalina en tus partidas.'
  },
  {
    id: 'bass-x',
    name: 'OnlyMusic Bass X',
    category: 'auriculares',
    subtext: 'Inalámbrico | Graves potenciados | Música y películas',
    basePriceMXN: 1999,
    originalPriceMXN: 2599,
    image: 'assets/product_bass_x.png',
    badge: 'Super Bass',
    rating: 4.7,
    reviewsCount: 189,
    specs: {
      'Conectividad': 'Bluetooth 5.2 con códec AAC',
      'Perfil de Sonido': 'Graves potentes BassBoost™ integrado',
      'Batería': 'Hasta 45 horas de reproducción',
      'Drivers': '50mm Neodimio afinado para frecuencias sub-graves',
      'Diseño': 'Plegable con diadema acolchada ergonómica',
      'Controles': 'Botones físicos integrados de reproducción y volumen'
    },
    description: 'Para quienes aman sentir el impacto del bajo. La tecnología BassBoost realza las notas bajas sin saturar los medios ni los agudos.'
  },
  {
    id: 'elite',
    name: 'OnlyMusic Elite',
    category: 'premium',
    subtext: 'Serie Premium | Elegante | Edición Especial',
    basePriceMXN: 5999,
    originalPriceMXN: 7499,
    image: 'assets/product_elite.png',
    badge: 'Edición Limitada',
    rating: 5.0,
    reviewsCount: 94,
    specs: {
      'Materiales': 'Aleación de aluminio aeroespacial y cuero genuino',
      'Drivers': 'Transductores electrodinámicos de 50mm Hi-Res',
      'Respuesta en Frecuencia': '5 Hz - 40.000 Hz',
      'Códecs': 'LDAC, aptX HD, AAC, SBC',
      'Cancelación de Ruido': 'ANC Adaptativo inteligente de 45dB',
      'Batería': 'Hasta 60 horas con estuche rígido incluido'
    },
    description: 'La máxima expresión del lujo acústico de OnlyMusic. Acabado en oro rosa, detalles artesanales y un sonido con certificación Hi-Res Audio.'
  },
  // --- Bocinas Personales Bluetooth (Requerimiento especial) ---
  {
    id: 'bassboom-360',
    name: 'OnlyMusic BassBoom 360',
    category: 'bocinas',
    subtext: 'Sonido 360° Envolvente | Resistencia IPX7 | Batería 24h',
    basePriceMXN: 2499,
    originalPriceMXN: 3199,
    image: 'assets/product_bassboom_360.svg',
    badge: 'Bocina Bluetooth',
    rating: 4.8,
    reviewsCount: 167,
    specs: {
      'Potencia': '30W RMS con doble radiador pasivo',
      'Sonido': 'Dispersión acústica omnidireccional 360°',
      'Impermeabilidad': 'Certificación IPX7 (sumergible 1m por 30 min)',
      'Batería': 'Batería recargable de 5200 mAh (hasta 24 horas)',
      'Función TWS': 'Empareja 2 bocinas para auténtico estéreo inalámbrico',
      'Conexión': 'Bluetooth 5.3 + Entrada Auxiliar 3.5mm + Ranura MicroSD'
    },
    description: 'Bocina personal cilíndrica de alta fidelidad. Llena cualquier habitación o terraza con sonido dinámico y bajos envolventes.'
  },
  {
    id: 'pulse-mini',
    name: 'OnlyMusic Pulse Mini',
    category: 'bocinas',
    subtext: 'Ultra portátil | Graves contundentes | Luces LED rítmicas',
    basePriceMXN: 1499,
    originalPriceMXN: 1899,
    image: 'assets/product_pulse_mini.svg',
    badge: 'Compacta',
    rating: 4.6,
    reviewsCount: 122,
    specs: {
      'Potencia': '15W RMS con realce dinámico',
      'Iluminación': 'Anillo LED RGB que pulsa al ritmo del sonido',
      'Dimensiones': 'Bolsillo / Palma de la mano (peso 280g)',
      'Batería': 'Hasta 12 horas continuas con luces encendidas',
      'Micrófono': 'Manos libres para llamadas con cancelación de eco',
      'Conectividad': 'Bluetooth 5.3 de largo alcance (hasta 20m)'
    },
    description: 'Bocina personal de bolsillo diseñada para llevar tu música en la mochila, bicicleta o escritorio con un espectáculo de luces rítmicas.'
  },
  {
    id: 'soundstudio-desk',
    name: 'OnlyMusic SoundStudio Desk',
    category: 'bocinas',
    subtext: 'Bocina Personal de Escritorio | Audio Hi-Fi | Micrófono',
    basePriceMXN: 3199,
    originalPriceMXN: 3999,
    image: 'assets/product_soundstudio.svg',
    badge: 'Audio de Estudio',
    rating: 4.9,
    reviewsCount: 88,
    specs: {
      'Potencia': '40W RMS bi-amplificada',
      'Diseño': 'Acabado en tela acústica premium y base metálica',
      'Conectividad': 'Bluetooth 5.3, USB-C Audio DAC, Óptica y Auxiliar',
      'Micrófono': 'Matriz de 4 micrófonos para conferencias de trabajo claras',
      'Perfiles de EQ': 'Modo Música, Películas y Voz'
    },
    description: 'La compañera perfecta para tu estación de trabajo o computadora. Proporciona una separación estéreo nítida y llamadas cristalinas.'
  },
  {
    id: 'aquabeat-go',
    name: 'OnlyMusic AquaBeat Go',
    category: 'bocinas',
    subtext: 'Ultra portátil con mosquetón | 100% Sumergible | Sonido Potente',
    basePriceMXN: 1299,
    originalPriceMXN: 1699,
    image: 'assets/product_aquabeat.svg',
    badge: 'Outdoor IPX7',
    rating: 4.7,
    reviewsCount: 145,
    specs: {
      'Potencia': '10W RMS con refuerzo de bajos',
      'Impermeabilidad': 'IP67 a prueba de agua, polvo y caídas',
      'Agarre': 'Mosquetón de aluminio integrado de liberación rápida',
      'Batería': '15 horas de música continua a volumen medio',
      'Flotabilidad': 'Diseño especial flotante en albercas y agua salada'
    },
    description: 'Creada para la aventura. Cuélgala de tu mochila o tómala en la ducha sin preocuparte por golpes ni salpicaduras.'
  }
];

// --- Estado Global de la Aplicación ---
const AppState = {
  currentPage: 'hogar',
  cart: [],
  currency: 'MXN', // Pesos Mexicanos
  currencyRates: {
    MXN: { symbol: '$', suffix: ' MXN', rate: 1, decimals: 0 },
    USD: { symbol: '$', suffix: ' USD', rate: 0.055, decimals: 2 },
    INR: { symbol: '₹', suffix: '/-', rate: 4.55, decimals: 0 }
  },
  discountCode: null,
  discountPercentage: 0,
  activeCategory: 'all',
  searchQuery: '',
  soundEnabled: true,
  currentSlide: 0,
  carouselTimer: null
};

// --- ENRUTADOR DE PÁGINAS INDEPENDIENTES (Hogar, Catálogo de Productos, Sobre Nosotros, Contáctanos) ---
function navigateTo(pageId, event, filter) {
  if (event) {
    event.preventDefault();
  }

  // Normalizar identificador
  if (!pageId || pageId === '') pageId = 'hogar';
  pageId = pageId.replace('#', '').replace('page-', '').trim();

  // Compatibilidad: 'almacenar' ahora es 'catalogo'
  if (pageId === 'almacenar') pageId = 'catalogo';

  const validPages = ['hogar', 'catalogo', 'sobre-nosotros', 'contactanos'];
  if (!validPages.includes(pageId)) {
    pageId = 'hogar';
  }

  AppState.currentPage = pageId;

  // Ocultar todas las páginas y mostrar únicamente la seleccionada
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('active');
    view.style.display = 'none';
  });

  const targetView = document.getElementById(`page-${pageId}`);
  if (targetView) {
    targetView.style.display = 'block';
    // Forzar reflow para animación suave
    void targetView.offsetWidth;
    targetView.classList.add('active');
  }

  // Actualizar píldora activa en la barra de navegación
  document.querySelectorAll('.nav-menu .nav-pill[data-page]').forEach(pill => {
    if (pill.getAttribute('data-page') === pageId) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  // Si se pasa un filtro de categoría (por ejemplo: 'auriculares' o 'bocinas')
  if (filter) {
    filterCategory(filter);
  }

  // Actualizar hash en la barra de direcciones del navegador
  if (window.location.hash !== `#${pageId}`) {
    history.pushState(null, null, `#${pageId}`);
  }

  // Desplazar al inicio de la página seleccionada
  window.scrollTo({ top: 0, behavior: 'smooth' });
  playSound('click');
}

// Escuchar cambios en la URL (Botones Atrás / Adelante del navegador)
window.addEventListener('popstate', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    navigateTo(hash);
  } else {
    navigateTo('hogar');
  }
});

// Inicializar enrutador según hash inicial
function initPageRouter() {
  const hash = window.location.hash.replace('#', '');
  if (hash && ['hogar', 'catalogo', 'sobre-nosotros', 'contactanos'].includes(hash)) {
    navigateTo(hash);
  } else {
    navigateTo('hogar');
  }
}

// --- Web Audio API para Efectos de Sonido Sintetizados ---
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  if (!AppState.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'add-to-cart') {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.15, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.16);
      });
    } else if (type === 'success') {
      const freqs = [440, 554.37, 659.25, 880]; // Acorde A Mayor
      freqs.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.85);
      });
    }
  } catch (e) {
    console.warn('Audio no disponible', e);
  }
}

// --- Conversión y Formateo de Precios en Pesos Mexicanos (MXN) ---
function formatPrice(baseMXN) {
  const info = AppState.currencyRates[AppState.currency] || AppState.currencyRates.MXN;
  const converted = baseMXN * info.rate;
  
  if (AppState.currency === 'MXN') {
    const formatted = Math.round(converted).toLocaleString('es-MX');
    return `${info.symbol}${formatted}${info.suffix}`;
  } else if (AppState.currency === 'INR') {
    const formatted = Math.round(converted).toLocaleString('es-ES');
    return `${info.symbol}${formatted}${info.suffix}`;
  } else {
    const formatted = converted.toLocaleString('en-US', {
      minimumFractionDigits: info.decimals,
      maximumFractionDigits: info.decimals
    });
    return `${info.symbol}${formatted}${info.suffix}`;
  }
}

// Actualizar todos los precios de la página
function updateAllPricesOnPage() {
  document.querySelectorAll('.price-val').forEach(el => {
    const base = parseFloat(el.getAttribute('data-base'));
    if (!isNaN(base)) {
      el.textContent = formatPrice(base);
    }
  });

  const thresholdEl = document.querySelector('.shipping-threshold-text');
  if (thresholdEl) {
    thresholdEl.textContent = formatPrice(1999);
  }

  updateInstallmentsOptions();
  renderCart();
  renderProducts();
}

function updateInstallmentsOptions() {
  const { finalTotalMXN } = calculateCartTotals();
  const select = document.getElementById('installments-select');
  if (!select) return;

  const currentVal = select.value || '1';
  select.innerHTML = `
    <option value="1">1 pago al contado de ${formatPrice(finalTotalMXN)} (Sin intereses)</option>
    <option value="3">3 Meses Sin Intereses de ${formatPrice(finalTotalMXN / 3)}/mes</option>
    <option value="6">6 Meses Sin Intereses de ${formatPrice(finalTotalMXN / 6)}/mes</option>
    <option value="12">12 Meses Sin Intereses de ${formatPrice(finalTotalMXN / 12)}/mes</option>
  `;
  select.value = currentVal;
}

// --- Sistema de Toast de Notificaciones ---
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '✓';
  if (type === 'error') icon = '✕';
  if (type === 'info') icon = 'ℹ';

  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// --- Renderizado del Catálogo de Productos ---
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const filtered = PRODUCTS.filter(p => {
    const matchesCategory = (AppState.activeCategory === 'all') || (p.category === AppState.activeCategory);
    const matchesSearch = p.name.toLowerCase().includes(AppState.searchQuery.toLowerCase()) ||
                          p.subtext.toLowerCase().includes(AppState.searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(AppState.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; color: #64748b;">
        <p style="font-size: 1.2rem; margin-bottom: 8px;">No encontramos productos que coincidan con tu búsqueda.</p>
        <button class="btn-hero-primary" onclick="resetFilters()">Ver todos los productos</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <article class="product-card" data-product-id="${p.id}">
      ${p.badge ? `<span class="product-badge-flag">${p.badge}</span>` : ''}
      
      <div class="product-image-box" onclick="openProductModal('${p.id}')" title="Ver detalles de ${p.name}">
        <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
      </div>

      <div class="product-content">
        <h3 class="product-title" onclick="openProductModal('${p.id}')" style="cursor: pointer;">${p.name}</h3>
        <p class="product-features-subtext">${p.subtext}</p>
        <div class="product-price">${formatPrice(p.basePriceMXN)}</div>
      </div>

      <div class="product-card-actions">
        <button class="btn-green-buy" onclick="quickBuy('${p.id}')" title="Comprar ${p.name} inmediatamente">
          * Comprar ahora *
        </button>
        <button class="btn-add-cart-secondary" onclick="addToCart('${p.id}', 1)" title="Añadir ${p.name} al carrito">
          + Añadir al carrito
        </button>
      </div>
    </article>
  `).join('');
}

function filterCategory(category) {
  AppState.activeCategory = category;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    if (btn.getAttribute('data-category') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  renderProducts();
}

function resetFilters() {
  AppState.activeCategory = 'all';
  AppState.searchQuery = '';
  const searchInput = document.getElementById('product-search-input');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-category') === 'all');
  });
  renderProducts();
}

// --- Carrito de Compras (Lógica y Renderizado) ---
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('onlymusic_cart_mxn');
    if (saved) {
      AppState.cart = JSON.parse(saved);
    }
  } catch (e) {
    AppState.cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem('onlymusic_cart_mxn', JSON.stringify(AppState.cart));
  } catch (e) {}
}

function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = AppState.cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    AppState.cart.push({
      id: product.id,
      name: product.name,
      basePriceMXN: product.basePriceMXN,
      image: product.image,
      quantity: quantity
    });
  }

  saveCartToStorage();
  updateCartBadges();
  renderCart();
  playSound('add-to-cart');
  showToast(`¡${product.name} agregado al carrito!`, 'success');
}

function quickBuy(productId) {
  addToCart(productId, 1);
  openCartDrawer();
}

function updateCartQuantity(productId, delta) {
  const item = AppState.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    AppState.cart = AppState.cart.filter(i => i.id !== productId);
    showToast(`Producto removido del carrito`, 'info');
  } else {
    playSound('click');
  }

  saveCartToStorage();
  updateCartBadges();
  renderCart();
}

function removeFromCart(productId) {
  AppState.cart = AppState.cart.filter(i => i.id !== productId);
  saveCartToStorage();
  updateCartBadges();
  renderCart();
  playSound('click');
  showToast('Producto eliminado del carrito', 'info');
}

function clearCart() {
  if (AppState.cart.length === 0) return;
  if (confirm('¿Deseas vaciar todos los productos de tu carrito?')) {
    AppState.cart = [];
    AppState.discountCode = null;
    AppState.discountPercentage = 0;
    saveCartToStorage();
    updateCartBadges();
    renderCart();
    playSound('click');
    showToast('Carrito vaciado', 'info');
  }
}

function updateCartBadges() {
  const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const badgeNav = document.getElementById('cart-badge');
  const badgeFloat = document.getElementById('floating-badge');
  const countDisplay = document.getElementById('cart-count-display');

  if (badgeNav) badgeNav.textContent = totalCount;
  if (badgeFloat) badgeFloat.textContent = totalCount;
  if (countDisplay) countDisplay.textContent = totalCount;
}

function calculateCartTotals() {
  const subtotalMXN = AppState.cart.reduce((sum, item) => sum + (item.basePriceMXN * item.quantity), 0);
  const discountMXN = subtotalMXN * (AppState.discountPercentage / 100);
  
  let shippingMXN = 0;
  if (subtotalMXN > 0 && subtotalMXN < 1999 && AppState.discountCode !== 'ENVIOGRATIS') {
    shippingMXN = 149;
  }

  const finalTotalMXN = Math.max(0, subtotalMXN - discountMXN + shippingMXN);

  return {
    subtotalMXN,
    discountMXN,
    shippingMXN,
    finalTotalMXN
  };
}

function renderCart() {
  const list = document.getElementById('cart-items-list');
  if (!list) return;

  if (AppState.cart.length === 0) {
    list.innerHTML = `
      <div class="cart-empty-state">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="#cbd5e1">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
        <p style="font-size: 1.1rem; font-weight: 600; color: #475569; margin-bottom: 6px;">Tu carrito está vacío</p>
        <p style="font-size: 0.85rem; margin-bottom: 20px;">Explora nuestros auriculares y bocinas para agregar tus favoritos.</p>
        <button class="btn-green-buy" onclick="closeCartDrawer(); navigateTo('catalogo');">
          Explorar Catálogo de Productos
        </button>
      </div>
    `;

    document.getElementById('cart-subtotal-val').textContent = formatPrice(0);
    document.getElementById('cart-total-val').textContent = formatPrice(0);
    document.getElementById('shipping-progress-fill').style.width = '0%';
    document.getElementById('shipping-progress-text').textContent = 'Agrega productos para envío gratuito en México';
    document.getElementById('discount-row').style.display = 'none';
    return;
  }

  // Lista de items
  list.innerHTML = AppState.cart.map(item => `
    <div class="cart-item-row" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-price">${formatPrice(item.basePriceMXN)} x ${item.quantity} = <strong>${formatPrice(item.basePriceMXN * item.quantity)}</strong></div>
        <div class="cart-qty-controls">
          <button class="qty-btn" onclick="updateCartQuantity('${item.id}', -1)" aria-label="Disminuir cantidad">-</button>
          <span class="qty-number">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartQuantity('${item.id}', 1)" aria-label="Aumentar cantidad">+</button>
        </div>
      </div>
      <button class="cart-item-remove-btn" onclick="removeFromCart('${item.id}')" title="Eliminar producto">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        </svg>
      </button>
    </div>
  `).join('');

  // Totales
  const { subtotalMXN, discountMXN, shippingMXN, finalTotalMXN } = calculateCartTotals();

  document.getElementById('cart-subtotal-val').textContent = formatPrice(subtotalMXN);
  
  const discountRow = document.getElementById('discount-row');
  if (AppState.discountPercentage > 0) {
    discountRow.style.display = 'flex';
    document.getElementById('cart-discount-val').textContent = `-${formatPrice(discountMXN)} (${AppState.discountPercentage}%)`;
  } else {
    discountRow.style.display = 'none';
  }

  const shippingEl = document.getElementById('cart-shipping-val');
  if (shippingMXN === 0) {
    shippingEl.textContent = '¡Gratis a todo México!';
    shippingEl.style.color = '#15803d';
  } else {
    shippingEl.textContent = formatPrice(shippingMXN);
    shippingEl.style.color = '#475569';
  }

  document.getElementById('cart-total-val').textContent = formatPrice(finalTotalMXN);

  // Barra de progreso
  const progressPercent = Math.min(100, Math.round((subtotalMXN / 1999) * 100));
  const progressFill = document.getElementById('shipping-progress-fill');
  const progressText = document.getElementById('shipping-progress-text');
  
  if (progressFill && progressText) {
    progressFill.style.width = `${progressPercent}%`;
    if (subtotalMXN >= 1999 || AppState.discountCode === 'ENVIOGRATIS') {
      progressText.innerHTML = '🎉 <strong>¡Felicidades! Tienes Envío Gratis garantizado a todo México.</strong>';
    } else {
      const remainingMXN = 1999 - subtotalMXN;
      progressText.innerHTML = `Agrega <strong>${formatPrice(remainingMXN)}</strong> más para obtener <strong>Envío Gratis</strong>`;
    }
  }

  updateInstallmentsOptions();
}

// Drawer Controls
function openCartDrawer() {
  playSound('click');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCart();
}

function closeCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Cupón de descuento
function handleApplyCoupon() {
  const input = document.getElementById('coupon-code-input');
  const feedback = document.getElementById('coupon-feedback');
  if (!input || !feedback) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    feedback.textContent = 'Por favor ingresa un código de cupón';
    feedback.className = 'coupon-feedback error';
    return;
  }

  if (code === 'ONLYMUSIC10') {
    AppState.discountCode = 'ONLYMUSIC10';
    AppState.discountPercentage = 10;
    feedback.textContent = '✓ ¡Cupón ONLYMUSIC10 aplicado! 10% de descuento.';
    feedback.className = 'coupon-feedback success';
    playSound('add-to-cart');
  } else if (code === 'ONLYMUSIC20') {
    AppState.discountCode = 'ONLYMUSIC20';
    AppState.discountPercentage = 20;
    feedback.textContent = '✓ ¡Cupón VIP ONLYMUSIC20 aplicado! 20% de descuento.';
    feedback.className = 'coupon-feedback success';
    playSound('add-to-cart');
  } else if (code === 'ENVIOGRATIS') {
    AppState.discountCode = 'ENVIOGRATIS';
    AppState.discountPercentage = 5;
    feedback.textContent = '✓ ¡Envío gratis + 5% adicional aplicado!';
    feedback.className = 'coupon-feedback success';
    playSound('add-to-cart');
  } else {
    feedback.textContent = '✕ Cupón inválido o expirado. Prueba ONLYMUSIC10';
    feedback.className = 'coupon-feedback error';
    return;
  }

  renderCart();
}

// --- Pasarela de Pago con Tarjeta de Crédito / Débito ---
function openCheckoutModal() {
  if (AppState.cart.length === 0) {
    showToast('Tu carrito está vacío. Agrega productos para pagar.', 'error');
    return;
  }

  closeCartDrawer();
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  const miniList = document.getElementById('checkout-mini-items');
  const { finalTotalMXN } = calculateCartTotals();

  if (miniList) {
    miniList.innerHTML = AppState.cart.map(item => `
      <div class="mini-item-row">
        <span>${item.name} (x${item.quantity})</span>
        <strong>${formatPrice(item.basePriceMXN * item.quantity)}</strong>
      </div>
    `).join('');
  }

  document.getElementById('checkout-final-total-display').textContent = formatPrice(finalTotalMXN);
  document.getElementById('pay-button-amount').textContent = formatPrice(finalTotalMXN);
  updateInstallmentsOptions();
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

function setupVirtualCardListeners() {
  const cardElem = document.getElementById('interactive-card');
  const numInput = document.getElementById('card-number-input');
  const holderInput = document.getElementById('card-holder-input');
  const expInput = document.getElementById('card-expiry-input');
  const cvvInput = document.getElementById('card-cvv-input');

  const displayNum = document.getElementById('display-card-number');
  const displayHolder = document.getElementById('display-card-holder');
  const displayExp = document.getElementById('display-card-expiry');
  const displayCvv = document.getElementById('display-card-cvv');
  const brandLogo = document.getElementById('card-brand-logo');
  const inputBadge = document.getElementById('input-card-badge');

  if (!cardElem || !numInput) return;

  numInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 16) val = val.substring(0, 16);

    let formatted = '';
    for (let i = 0; i < val.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += val[i];
    }
    e.target.value = formatted;

    displayNum.textContent = formatted.padEnd(19, '•');

    if (val.startsWith('4')) {
      brandLogo.innerHTML = '<span class="brand-text-visa">VISA</span>';
      inputBadge.textContent = '💳 Visa';
    } else if (val.startsWith('5') || val.startsWith('2')) {
      brandLogo.innerHTML = '<span class="brand-text-mastercard">Mastercard</span>';
      inputBadge.textContent = '💳 Mastercard';
    } else if (val.startsWith('34') || val.startsWith('37')) {
      brandLogo.innerHTML = '<span class="brand-text-amex">AMEX</span>';
      inputBadge.textContent = '💳 Amex';
    } else {
      brandLogo.innerHTML = '<span class="brand-text-visa">CARD</span>';
      inputBadge.textContent = '💳';
    }
  });

  holderInput.addEventListener('input', (e) => {
    const val = e.target.value.trim().toUpperCase();
    displayHolder.textContent = val ? val : 'NOMBRE DEL CLIENTE';
  });

  expInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.substring(0, 4);

    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2);
    }
    e.target.value = val;
    displayExp.textContent = val ? val.padEnd(5, '•') : 'MM/AA';
  });

  cvvInput.addEventListener('focus', () => {
    cardElem.classList.add('is-flipped');
  });

  cvvInput.addEventListener('blur', () => {
    cardElem.classList.remove('is-flipped');
  });

  cvvInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.substring(0, 4);
    e.target.value = val;
    displayCvv.textContent = val ? '•'.repeat(val.length) : '•••';
  });
}

function processCardPayment(e) {
  e.preventDefault();

  const numInput = document.getElementById('card-number-input');
  const expInput = document.getElementById('card-expiry-input');
  const cvvInput = document.getElementById('card-cvv-input');

  const cleanNum = numInput.value.replace(/\s/g, '');
  if (cleanNum.length < 13) {
    showToast('Por favor introduce un número de tarjeta válido.', 'error');
    numInput.focus();
    return;
  }

  if (!expInput.value.includes('/') || expInput.value.length < 5) {
    showToast('Introduce la fecha de vencimiento en formato MM/AA.', 'error');
    expInput.focus();
    return;
  }

  if (cvvInput.value.length < 3) {
    showToast('Introduce el código de seguridad CVV (3 o 4 dígitos).', 'error');
    cvvInput.focus();
    return;
  }

  const submitBtn = document.getElementById('btn-pay-submit');
  const spinner = document.getElementById('pay-spinner');
  const payText = submitBtn.querySelector('.pay-text');

  submitBtn.disabled = true;
  spinner.style.display = 'block';
  payText.textContent = 'Encriptando y Procesando Pago Seguro...';

  setTimeout(() => {
    submitBtn.disabled = false;
    spinner.style.display = 'none';
    payText.textContent = 'Pagar';

    closeCheckoutModal();
    showOrderSuccessReceipt(cleanNum);
  }, 2200);
}

function showOrderSuccessReceipt(cardNumber) {
  playSound('success');

  const modal = document.getElementById('order-success-modal');
  const receiptContainer = document.getElementById('receipt-details');
  if (!modal || !receiptContainer) return;

  const orderId = 'OM-MX-' + Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const last4 = cardNumber.slice(-4);
  const { subtotalMXN, discountMXN, shippingMXN, finalTotalMXN } = calculateCartTotals();
  const buyerName = document.getElementById('ship-name').value || 'Cliente OnlyMusic México';
  const buyerAddress = document.getElementById('ship-address').value || 'Dirección de Entrega';
  const installments = document.getElementById('installments-select').value;
  
  let installmentText = '1 pago único';
  if (installments > 1) {
    installmentText = `${installments} Meses Sin Intereses de ${formatPrice(finalTotalMXN / installments)}/mes`;
  }

  receiptContainer.innerHTML = `
    <div class="receipt-header-row">
      <div>
        <div class="receipt-order-id">Folio de Orden: #${orderId}</div>
        <div class="receipt-date">${dateFormatted}</div>
      </div>
      <div style="text-align: right; color: #15803d; font-weight: 700;">
        PAGADO CON ÉXITO
      </div>
    </div>

    <div style="margin-bottom: 12px; font-size: 0.82rem; color: #475569;">
      <strong>Destinatario:</strong> ${buyerName}<br>
      <strong>Dirección de Entrega:</strong> ${buyerAddress}<br>
      <strong>Método de Pago:</strong> Tarjeta Terminada en •••• ${last4} (${installmentText})
    </div>

    <div class="receipt-items-list">
      <div style="font-weight: 700; margin-bottom: 6px; color: #0f172a;">Artículos comprados:</div>
      ${AppState.cart.map(item => `
        <div class="receipt-item">
          <span>${item.name} × ${item.quantity}</span>
          <span>${formatPrice(item.basePriceMXN * item.quantity)}</span>
        </div>
      `).join('')}
    </div>

    ${AppState.discountPercentage > 0 ? `
      <div class="receipt-item" style="color: #15803d;">
        <span>Descuento aplicado (${AppState.discountPercentage}%):</span>
        <span>-${formatPrice(discountMXN)}</span>
      </div>
    ` : ''}

    <div class="receipt-item">
      <span>Costo de Envío:</span>
      <span>${shippingMXN === 0 ? 'Gratis a todo México' : formatPrice(shippingMXN)}</span>
    </div>

    <div class="receipt-footer-total">
      <span>Total Pagado:</span>
      <span style="color: #22c55e;">${formatPrice(finalTotalMXN)}</span>
    </div>
  `;

  AppState.cart = [];
  AppState.discountCode = null;
  AppState.discountPercentage = 0;
  saveCartToStorage();
  updateCartBadges();
  renderCart();

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// --- Modales de Producto y Oferta Especial ---
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-detail-modal');
  const content = document.getElementById('product-detail-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="detail-img-box">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="detail-info-box">
      <span class="detail-category-tag">${product.category}</span>
      <h2 class="detail-title">${product.name}</h2>
      <div class="detail-price">${formatPrice(product.basePriceMXN)}</div>
      <p class="detail-desc">${product.description}</p>
      
      <table class="detail-specs-table">
        <tbody>
          ${Object.entries(product.specs).map(([k, v]) => `
            <tr>
              <td>${k}</td>
              <td>${v}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="detail-actions-row">
        <button class="btn-green-buy" onclick="quickBuy('${product.id}'); closeModals();">
          * Comprar ahora *
        </button>
        <button class="btn-add-cart-secondary" onclick="addToCart('${product.id}', 1)">
          + Agregar al carrito
        </button>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  playSound('click');
}

function openOfferModal(productId) {
  const modal = document.getElementById('special-offer-modal');
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  playSound('click');
}

function closeModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}

// --- Carrusel Slider Hero ---
function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.indicator-dot');
  if (slides.length === 0) return;

  function showSlide(index) {
    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === index);
    });
    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === index);
    });
    AppState.currentSlide = index;
  }

  function nextSlide() {
    const next = (AppState.currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    const prev = (AppState.currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(idx);
      resetTimer();
    });
  });

  function startTimer() {
    AppState.carouselTimer = setInterval(nextSlide, 6500);
  }

  function resetTimer() {
    clearInterval(AppState.carouselTimer);
    startTimer();
  }

  startTimer();
}

// --- Formularios de Contacto y Suscripción ---
function handleContactSubmit(e) {
  e.preventDefault();
  const firstName = document.getElementById('contact-first-name').value.trim();
  const lastName = document.getElementById('contact-last-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  if (!firstName || !lastName || !email || !message) {
    showToast('Por favor completa todos los campos obligatorios (*).', 'error');
    return;
  }

  playSound('success');
  showToast(`¡Gracias ${firstName}! Tu mensaje ha sido enviado al equipo de OnlyMusic.`, 'success');
  e.target.reset();
}

function handleMissionSubscribe(e) {
  e.preventDefault();
  const phone = document.getElementById('subscribe-phone').value.trim();
  const email = document.getElementById('subscribe-email').value.trim();

  if (!phone || !email) {
    showToast('Por favor ingresa tu teléfono y correo.', 'error');
    return;
  }

  playSound('success');
  showToast(`¡Inscripción exitosa! Te hemos enviado un cupón del 10% de bienvenida a ${email}.`, 'success');
  e.target.reset();
}

// --- Navegación y Botón Volver Arriba ---
function initNavigation() {
  const stickyNav = document.getElementById('main-nav');
  const scrollTopBtn = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 40) {
      stickyNav.classList.add('is-scrolled');
    } else {
      stickyNav.classList.remove('is-scrolled');
    }

    if (scrollPos > 350) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      playSound('click');
    });
  }
}

// --- Inicialización Principal ---
document.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  updateCartBadges();
  renderProducts();
  renderCart();
  initCarousel();
  initNavigation();
  setupVirtualCardListeners();
  initPageRouter();

  // Selector de moneda
  const currSelector = document.getElementById('currency-selector');
  if (currSelector) {
    currSelector.addEventListener('change', (e) => {
      AppState.currency = e.target.value;
      updateAllPricesOnPage();
      playSound('click');
      showToast(`Moneda cambiada a ${AppState.currency}`, 'info');
    });
  }

  // Toggle de Sonido
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      AppState.soundEnabled = !AppState.soundEnabled;
      soundBtn.classList.toggle('active', AppState.soundEnabled);
      const label = soundBtn.querySelector('.sound-label');
      if (label) label.textContent = AppState.soundEnabled ? 'Sonido ON' : 'Silencio';
      if (AppState.soundEnabled) playSound('click');
      showToast(`Efectos de sonido: ${AppState.soundEnabled ? 'Activados' : 'Desactivados'}`, 'info');
    });
  }

  // Búsqueda en tienda
  const searchInput = document.getElementById('product-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Filtros de categoría
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterCategory(btn.getAttribute('data-category'));
      playSound('click');
    });
  });

  // Botones de Carrito
  const navCartBtn = document.getElementById('nav-cart-btn');
  const floatingCartBtn = document.getElementById('floating-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  const clearCartBtn = document.getElementById('btn-clear-cart');
  const continueShoppingBtn = document.getElementById('btn-continue-shopping');
  const proceedCheckoutBtn = document.getElementById('btn-proceed-checkout');
  const applyCouponBtn = document.getElementById('apply-coupon-btn');

  if (navCartBtn) navCartBtn.addEventListener('click', openCartDrawer);
  if (floatingCartBtn) floatingCartBtn.addEventListener('click', openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);
  if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', () => {
    closeCartDrawer();
    navigateTo('catalogo');
  });
  if (proceedCheckoutBtn) proceedCheckoutBtn.addEventListener('click', openCheckoutModal);
  if (applyCouponBtn) applyCouponBtn.addEventListener('click', handleApplyCoupon);

  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) closeCartDrawer();
    });
  }

  // Cerrar modales
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', closeModals);
  });

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModals();
    });
  });
});
