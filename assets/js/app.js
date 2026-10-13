/* =========================================================================
   Supermercado — aplicación de una sola página (sin dependencias).
   Los datos se guardan en el almacenamiento local del navegador.
   ========================================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     Constantes
     --------------------------------------------------------------------- */
  const KEYS = {
    products: 'sm_products',
    categories: 'sm_categories',
    settings: 'sm_settings',
    cart: 'sm_cart',
    orders: 'sm_orders',
    auth: 'sm_admin_auth',
    session: 'sm_admin_session'
  };

  const CURRENCIES = [
    { code: 'USD', label: 'Dólar estadounidense (USD)', locale: 'es-US' },
    { code: 'EUR', label: 'Euro (EUR)', locale: 'es-ES' },
    { code: 'MXN', label: 'Peso mexicano (MXN)', locale: 'es-MX' },
    { code: 'COP', label: 'Peso colombiano (COP)', locale: 'es-CO' },
    { code: 'ARS', label: 'Peso argentino (ARS)', locale: 'es-AR' },
    { code: 'CLP', label: 'Peso chileno (CLP)', locale: 'es-CL' },
    { code: 'PEN', label: 'Sol peruano (PEN)', locale: 'es-PE' },
    { code: 'UYU', label: 'Peso uruguayo (UYU)', locale: 'es-UY' },
    { code: 'GTQ', label: 'Quetzal (GTQ)', locale: 'es-GT' },
    { code: 'DOP', label: 'Peso dominicano (DOP)', locale: 'es-DO' }
  ];

  const ICONS = {
    card: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3 9.5h18M6.5 15h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    bank: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9l9-5 9 5M4.5 9.5v8M9.5 9.5v8M14.5 9.5v8M19.5 9.5v8M3 20h18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    paypal: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 20l2.2-14h5.3c2.6 0 4 1.5 3.6 3.8-.5 2.8-2.6 4.2-5.3 4.2h-2.3L10.6 20H8z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M5.5 17l2-13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    wallet: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 18.5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    cash: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="6" width="19" height="12" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6 9.5v5M18 9.5v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    pos: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8.5" y="5" width="7" height="4" rx=".6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 12.5h.01M12 12.5h.01M15 12.5h.01M9 15.5h.01M12 15.5h.01M15 15.5h.01M9 18.5h.01M12 18.5h.01M15 18.5h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    truck: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="6.5" cy="17.5" r="1.8" fill="var(--surface)" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="17.5" r="1.8" fill="var(--surface)" stroke="currentColor" stroke-width="1.5"/></svg>',
    store: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v10h16V10M3 10l1.5-5.5h15L21 10c0 1.4-1.1 2.5-2.5 2.5S16 11.4 16 10c0 1.4-1.1 2.5-2.5 2.5h-3C9.1 12.5 8 11.4 8 10c0 1.4-1.1 2.5-2.5 2.5S3 11.4 3 10zM10 20v-5h4v5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7.5 3v5.5c0 4.5-3.2 8.2-7.5 9.5-4.3-1.3-7.5-5-7.5-9.5V6L12 3z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8.8 12.2l2.2 2.2 4.3-4.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15zM5 19l8-8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  const PAYMENT_METHODS = {
    card: { label: 'Tarjeta de crédito o débito', short: 'Tarjeta', desc: 'Visa, Mastercard, American Express', icon: 'card' },
    transfer: { label: 'Transferencia bancaria', short: 'Transferencia', desc: 'Recibirá los datos bancarios al confirmar', icon: 'bank' },
    paypal: { label: 'PayPal', short: 'PayPal', desc: 'Pague de forma segura con su cuenta PayPal', icon: 'paypal' },
    wallet: { label: 'Billetera digital', short: 'Billetera digital', desc: 'Apple Pay, Google Pay, Mercado Pago y otras', icon: 'wallet' },
    cash: { label: 'Efectivo contra entrega', short: 'Efectivo', desc: 'Pague al recibir o retirar su pedido', icon: 'cash' },
    cardOnDelivery: { label: 'Tarjeta contra entrega', short: 'Datáfono', desc: 'Pague con tarjeta al recibir su pedido', icon: 'pos' }
  };

  const ORDER_STATUSES = ['Pendiente de pago', 'Pendiente', 'Pagado', 'En preparación', 'Enviado', 'Listo para retirar', 'Entregado', 'Cancelado'];

  const DELIVERY_SLOTS = ['Mañana (9:00 – 13:00)', 'Tarde (14:00 – 18:00)', 'Noche (18:00 – 21:00)'];

  const UNIT_SUGGESTIONS = ['unidad', 'kg', 'g', 'litro', 'ml', 'docena', 'paquete', 'caja', '500 g', '250 g'];

  /* ---------------------------------------------------------------------
     Utilidades
     --------------------------------------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

  const toNumber = (v) => {
    if (v === null || v === undefined || v === '') return NaN;
    return Number(String(v).replace(',', '.'));
  };

  const normalize = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

  const slugify = (s) => normalize(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || uid();

  const initials = (name) => String(name || '?').trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

  const safeImageSrc = (src) => (/^(https?:\/\/|data:image\/)/i.test(String(src || '')) ? src : '');

  const debounce = (fn, ms) => {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  };

  const storage = {
    read(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (_) {
        return fallback;
      }
    },
    write(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (_) {
        toast('No se pudo guardar: el almacenamiento del navegador está lleno o bloqueado.', 'error');
        return false;
      }
    }
  };

  const session = {
    get() { try { return sessionStorage.getItem(KEYS.session) === '1'; } catch (_) { return memorySession; } },
    set(on) {
      memorySession = on;
      try { on ? sessionStorage.setItem(KEYS.session, '1') : sessionStorage.removeItem(KEYS.session); } catch (_) { /* memoria */ }
    }
  };
  let memorySession = false;

  /* ---------------------------------------------------------------------
     Estado
     --------------------------------------------------------------------- */
  const state = {
    products: [],
    categories: [],
    settings: {},
    cart: [],
    orders: []
  };

  function buildSeedProducts() {
    return window.SEED.products.map((p) => ({
      id: uid(),
      name: p.name,
      category: p.category,
      price: p.price,
      offerPrice: p.offerPrice,
      unit: p.unit,
      stock: p.stock,
      description: p.description,
      image: '',
      active: true,
      featured: !!p.featured,
      createdAt: new Date().toISOString()
    }));
  }

  function mergeSettings(saved) {
    const base = JSON.parse(JSON.stringify(window.SEED.settings));
    if (!saved || typeof saved !== 'object') return base;
    return {
      ...base,
      ...saved,
      bank: { ...base.bank, ...(saved.bank || {}) },
      payments: { ...base.payments, ...(saved.payments || {}) }
    };
  }

  function loadState() {
    const products = storage.read(KEYS.products, null);
    const categories = storage.read(KEYS.categories, null);
    state.categories = Array.isArray(categories) ? categories : JSON.parse(JSON.stringify(window.SEED.categories));
    state.products = Array.isArray(products) ? products : buildSeedProducts();
    state.settings = mergeSettings(storage.read(KEYS.settings, null));
    state.cart = (storage.read(KEYS.cart, []) || []).filter((l) => l && l.id && l.qty > 0);
    state.orders = storage.read(KEYS.orders, []) || [];
    if (!Array.isArray(products)) save('products');
    if (!Array.isArray(categories)) save('categories');
  }

  function save(...keys) {
    keys.forEach((k) => storage.write(KEYS[k], state[k]));
  }

  /* ---------------------------------------------------------------------
     Autenticación del administrador
     (protección del lado del cliente; para producción se requiere un servidor)
     --------------------------------------------------------------------- */
  function fnvHash(text) {
    let h = 2166136261;
    for (const ch of text) {
      h ^= ch.codePointAt(0);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(16);
  }

  async function sha256(text) {
    if (!(window.crypto && crypto.subtle)) return null;
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  async function hashPassword(pw) {
    const salted = 'supermercado::' + pw;
    return { sha256: await sha256(salted), fnv: fnvHash(salted) };
  }

  async function ensureAuth() {
    const auth = storage.read(KEYS.auth, null);
    if (!auth || (!auth.sha256 && !auth.fnv)) {
      storage.write(KEYS.auth, await hashPassword(window.SEED.defaultAdminPassword));
    }
  }

  async function verifyPassword(pw) {
    await ensureAuth();
    const auth = storage.read(KEYS.auth, null);
    if (!auth) return false;
    const h = await hashPassword(pw);
    if (auth.sha256 && h.sha256) return auth.sha256 === h.sha256;
    return auth.fnv === h.fnv;
  }

  const isAdmin = () => session.get();

  /* ---------------------------------------------------------------------
     Formato
     --------------------------------------------------------------------- */
  function currencyInfo() {
    return CURRENCIES.find((c) => c.code === state.settings.currency) || CURRENCIES[0];
  }

  let moneyFormatter = null;
  let moneyFormatterKey = '';
  function money(n) {
    const c = currencyInfo();
    if (moneyFormatterKey !== c.code) {
      try {
        moneyFormatter = new Intl.NumberFormat(c.locale, { style: 'currency', currency: c.code });
      } catch (_) {
        moneyFormatter = { format: (v) => c.code + ' ' + Number(v).toFixed(2) };
      }
      moneyFormatterKey = c.code;
    }
    return moneyFormatter.format(Number(n) || 0);
  }

  const dateFormatter = new Intl.DateTimeFormat('es', { dateStyle: 'medium', timeStyle: 'short' });
  const formatDate = (iso) => { try { return dateFormatter.format(new Date(iso)); } catch (_) { return iso; } };
  const formatDay = (ymd) => {
    if (!ymd) return '';
    const [y, m, d] = ymd.split('-').map(Number);
    try { return new Intl.DateTimeFormat('es', { dateStyle: 'full' }).format(new Date(y, m - 1, d)); } catch (_) { return ymd; }
  };

  /* ---------------------------------------------------------------------
     Productos y precios
     --------------------------------------------------------------------- */
  const getProduct = (id) => state.products.find((p) => p.id === id);
  const getCategory = (id) => state.categories.find((c) => c.id === id);
  const categoryName = (id) => (getCategory(id) || {}).name || 'Sin categoría';
  const visibleProducts = () => state.products.filter((p) => p.active);

  const hasOffer = (p) => Number(p.offerPrice) > 0 && Number(p.offerPrice) < Number(p.price);
  const effectivePrice = (p) => (hasOffer(p) ? Number(p.offerPrice) : Number(p.price));
  const discountPct = (p) => (hasOffer(p) ? Math.round((1 - p.offerPrice / p.price) * 100) : 0);

  function toneFor(key) {
    let h = 0;
    for (const ch of String(key)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return h % 6;
  }

  function productImage(p, cls = 'card-img') {
    const src = safeImageSrc(p.image);
    if (src) return `<img class="${cls}" src="${esc(src)}" alt="${esc(p.name)}" loading="lazy">`;
    return `<div class="${cls} placeholder" data-tone="${toneFor(p.category)}" aria-hidden="true"><span>${esc(initials(p.name))}</span></div>`;
  }

  function priceHTML(p) {
    if (hasOffer(p)) {
      return `<span class="price price-offer">${money(p.offerPrice)}</span> <s class="price-old">${money(p.price)}</s>`;
    }
    return `<span class="price">${money(p.price)}</span>`;
  }

  /* ---------------------------------------------------------------------
     Carrito
     --------------------------------------------------------------------- */
  const cartQty = (id) => (state.cart.find((l) => l.id === id) || {}).qty || 0;

  function cartLines() {
    return state.cart
      .map((l) => ({ product: getProduct(l.id), qty: l.qty }))
      .filter((l) => l.product && l.product.active);
  }

  const cartCount = () => cartLines().reduce((n, l) => n + l.qty, 0);

  function setCartQty(id, qty) {
    const p = getProduct(id);
    if (!p) return;
    const max = Math.max(0, Number(p.stock) || 0);
    const next = Math.max(0, Math.min(Math.floor(qty), max));
    const line = state.cart.find((l) => l.id === id);
    if (next === 0) {
      state.cart = state.cart.filter((l) => l.id !== id);
    } else if (line) {
      line.qty = next;
    } else {
      state.cart.push({ id, qty: next });
    }
    save('cart');
    if (qty > max && max > 0) toast(`Solo hay ${max} disponibles de «${p.name}».`, 'warn');
  }

  // Ajusta el carrito si cambió el stock o se ocultaron/eliminaron productos.
  function reconcileCart() {
    let changed = false;
    state.cart = state.cart.filter((l) => {
      const p = getProduct(l.id);
      if (!p || !p.active || p.stock <= 0) { changed = true; return false; }
      if (l.qty > p.stock) { l.qty = p.stock; changed = true; }
      return true;
    });
    if (changed) save('cart');
    return changed;
  }

  function computeTotals(lines, deliveryType = 'delivery') {
    const s = state.settings;
    const subtotal = round2(lines.reduce((sum, l) => sum + effectivePrice(l.product) * l.qty, 0));
    const savings = round2(lines.reduce((sum, l) => sum + (Number(l.product.price) - effectivePrice(l.product)) * l.qty, 0));
    let shipping = 0;
    if (deliveryType === 'delivery' && subtotal > 0) {
      const freeFrom = Number(s.freeShippingFrom) || 0;
      shipping = freeFrom > 0 && subtotal >= freeFrom ? 0 : Number(s.shippingCost) || 0;
    }
    const rate = (Number(s.taxRate) || 0) / 100;
    let tax = 0;
    let taxIncluded = 0;
    if (rate > 0) {
      if (s.pricesIncludeTax) taxIncluded = round2(subtotal - subtotal / (1 + rate));
      else tax = round2(subtotal * rate);
    }
    const total = round2(subtotal + tax + shipping);
    return { subtotal, savings, shipping: round2(shipping), tax, taxIncluded, total };
  }

  function totalsRowsHTML(t, deliveryType) {
    const s = state.settings;
    const freeFrom = Number(s.freeShippingFrom) || 0;
    const shippingLabel = deliveryType === 'pickup'
      ? 'Retiro en tienda'
      : 'Envío a domicilio';
    return `
      <dl class="totals">
        <div><dt>Subtotal</dt><dd>${money(t.subtotal)}</dd></div>
        ${t.savings > 0 ? `<div class="totals-savings"><dt>Ahorro en ofertas</dt><dd>− ${money(t.savings)}</dd></div>` : ''}
        <div><dt>${shippingLabel}</dt><dd>${t.shipping > 0 ? money(t.shipping) : 'Gratis'}</dd></div>
        ${t.tax > 0 ? `<div><dt>Impuestos (${esc(s.taxRate)} %)</dt><dd>${money(t.tax)}</dd></div>` : ''}
        <div class="totals-total"><dt>Total</dt><dd>${money(t.total)}</dd></div>
        ${t.taxIncluded > 0 ? `<p class="totals-note">Incluye ${money(t.taxIncluded)} de impuestos (${esc(s.taxRate)} %).</p>` : ''}
        ${deliveryType === 'delivery' && freeFrom > 0 && t.subtotal < freeFrom
          ? `<p class="totals-note">Agregue ${money(freeFrom - t.subtotal)} más para obtener envío gratis.</p>`
          : ''}
      </dl>`;
  }

  /* ---------------------------------------------------------------------
     Notificaciones y diálogos
     --------------------------------------------------------------------- */
  function toast(message, type = 'ok', action) {
    const region = $('#toasts');
    if (!region) return;
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `<span>${esc(message)}</span>${action ? `<a href="${esc(action.href)}" class="toast-action">${esc(action.label)}</a>` : ''}`;
    region.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 300);
    }, 3600);
  }

  function confirmDialog(title, message, okLabel = 'Confirmar') {
    const dlg = $('#confirm-dialog');
    if (!dlg || typeof dlg.showModal !== 'function') return Promise.resolve(window.confirm(message));
    $('#confirm-title').textContent = title;
    $('#confirm-message').textContent = message;
    $('#confirm-ok').textContent = okLabel;
    dlg.returnValue = '';
    dlg.showModal();
    return new Promise((resolve) => {
      dlg.addEventListener('close', () => resolve(dlg.returnValue === 'ok'), { once: true });
    });
  }

  /* ---------------------------------------------------------------------
     Enrutador
     --------------------------------------------------------------------- */
  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, '');
    const [path, qs] = raw.split('?');
    return { parts: path.split('/').filter(Boolean).map(decodeURIComponent), params: new URLSearchParams(qs || '') };
  }

  const navigate = (hash) => { location.hash = hash; };

  function render() {
    const { parts, params } = parseHash();
    const app = $('#app');
    const [section, ...rest] = parts;
    let html;

    switch (section || 'inicio') {
      case 'inicio': html = viewHome(); break;
      case 'productos': html = viewCatalog(params); break;
      case 'producto': html = viewProduct(rest[0]); break;
      case 'carrito': html = viewCart(); break;
      case 'pago': html = viewCheckout(); break;
      case 'pedido': html = viewOrderConfirmation(rest[0]); break;
      case 'admin': html = viewAdmin(rest, params); break;
      default: html = viewNotFound();
    }

    if (html === null) return; // la vista redirigió
    app.innerHTML = html;
    updateChrome();
    afterRender(section || 'inicio', rest);
  }

  function afterRender(section, rest) {
    if (section === 'pago') initCheckout();
    if (section === 'admin' && rest[0] === 'productos' && (rest[1] === 'nuevo' || rest[1] === 'editar')) initProductForm();
    if (section === 'admin' && rest[0] === 'ajustes') initSettingsForm();
  }

  /* ---------------------------------------------------------------------
     Elementos comunes de la interfaz
     --------------------------------------------------------------------- */
  function updateChrome() {
    const s = state.settings;
    $$('[data-store-name]').forEach((el) => { el.textContent = s.storeName; });
    $$('[data-store-tagline]').forEach((el) => { el.textContent = s.tagline; });
    $$('[data-store-address]').forEach((el) => { el.textContent = s.address; });
    $$('[data-store-phone]').forEach((el) => { el.textContent = s.phone; });
    $$('[data-store-email]').forEach((el) => { el.textContent = s.email; });
    $$('[data-store-hours]').forEach((el) => { el.textContent = s.hours; });
    $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
    const pay = $('[data-footer-payments]');
    if (pay) {
      pay.innerHTML = enabledPayments().map((k) => `<li>${esc(PAYMENT_METHODS[k].label)}</li>`).join('');
    }
    const count = cartCount();
    $$('[data-cart-count]').forEach((el) => {
      el.textContent = count;
      el.classList.toggle('is-empty', count === 0);
    });

    const { parts, params } = parseHash();
    const sec = parts[0] || 'inicio';
    let active = sec;
    if (sec === 'productos' && params.get('ofertas') === '1') active = 'ofertas';
    if (sec === 'producto') active = 'productos';
    if (sec === 'pago' || sec === 'pedido') active = 'carrito';
    $$('[data-nav]').forEach((a) => {
      if (a.dataset.nav === active) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    const titles = {
      inicio: '', productos: 'Productos', producto: 'Producto', carrito: 'Carrito',
      pago: 'Finalizar compra', pedido: 'Pedido confirmado', admin: 'Administración'
    };
    const t = titles[sec];
    document.title = t ? `${t} · ${s.storeName}` : s.storeName;
  }

  const enabledPayments = () => Object.keys(PAYMENT_METHODS).filter((k) => state.settings.payments[k]);

  function stepperHTML(p, qty) {
    return `
      <div class="stepper" role="group" aria-label="Cantidad de ${esc(p.name)}">
        <button type="button" data-action="dec" data-id="${esc(p.id)}" aria-label="Quitar uno">−</button>
        <span class="stepper-value">${qty}</span>
        <button type="button" data-action="inc" data-id="${esc(p.id)}" aria-label="Agregar uno" ${qty >= p.stock ? 'disabled' : ''}>+</button>
      </div>`;
  }

  function cardActionsHTML(p) {
    if (p.stock <= 0) return '<button class="btn btn-block" type="button" disabled>Agotado</button>';
    const qty = cartQty(p.id);
    if (qty > 0) return stepperHTML(p, qty);
    return `<button class="btn btn-primary btn-block" type="button" data-action="add" data-id="${esc(p.id)}">Agregar</button>`;
  }

  function productCardHTML(p) {
    const low = p.stock > 0 && p.stock <= (Number(state.settings.lowStockThreshold) || 0);
    return `
      <article class="card">
        <a class="card-media" href="#/producto/${encodeURIComponent(p.id)}" tabindex="-1" aria-hidden="true">
          ${productImage(p)}
          ${hasOffer(p) ? `<span class="badge badge-offer">−${discountPct(p)} %</span>` : ''}
          ${p.stock <= 0 ? '<span class="badge badge-muted">Agotado</span>' : ''}
        </a>
        <div class="card-body">
          <p class="card-cat">${esc(categoryName(p.category))}</p>
          <h3 class="card-title"><a href="#/producto/${encodeURIComponent(p.id)}">${esc(p.name)}</a></h3>
          <p class="card-unit">Precio por ${esc(p.unit || 'unidad')}${low ? ' · <span class="text-warn">Últimas unidades</span>' : ''}</p>
          <div class="card-price">${priceHTML(p)}</div>
          <div class="card-actions" data-card-actions="${esc(p.id)}">${cardActionsHTML(p)}</div>
        </div>
      </article>`;
  }

  const productGridHTML = (list) => `<div class="grid-products">${list.map(productCardHTML).join('')}</div>`;

  function emptyStateHTML(title, text, cta) {
    return `
      <div class="empty">
        <h2>${esc(title)}</h2>
        <p class="muted">${esc(text)}</p>
        ${cta ? `<a class="btn btn-primary" href="${esc(cta.href)}">${esc(cta.label)}</a>` : ''}
      </div>`;
  }

  /* ---------------------------------------------------------------------
     Vista: Inicio
     --------------------------------------------------------------------- */
  function viewHome() {
    const s = state.settings;
    const products = visibleProducts();
    const featured = products.filter((p) => p.featured).slice(0, 8);
    const offers = products.filter(hasOffer).slice(0, 4);
    const freeFrom = Number(s.freeShippingFrom) || 0;
    const nPay = enabledPayments().length;

    const cats = state.categories
      .map((c) => ({ ...c, count: products.filter((p) => p.category === c.id).length }))
      .filter((c) => c.count > 0);

    return `
      <section class="hero">
        <div class="container hero-inner">
          <div class="hero-copy">
            <p class="eyebrow">Supermercado en línea</p>
            <h1>${esc(s.tagline || s.storeName)}</h1>
            <p class="lead">Productos frescos, despensa y artículos para el hogar seleccionados con cuidado. Haga su pedido en minutos y recíbalo en casa o retírelo en tienda.</p>
            <div class="hero-actions">
              <a class="btn btn-primary btn-lg" href="#/productos">Ver productos</a>
              <a class="btn btn-ghost btn-lg" href="#/productos?ofertas=1">Ofertas de la semana</a>
            </div>
          </div>
          <ul class="hero-features">
            <li><span class="icon">${ICONS.truck}</span><div><strong>${freeFrom > 0 ? `Envío gratis desde ${money(freeFrom)}` : 'Entrega a domicilio'}</strong><span>Entregas en la franja horaria que usted elija.</span></div></li>
            <li><span class="icon">${ICONS.store}</span><div><strong>Retiro en tienda sin costo</strong><span>Prepare su pedido y recójalo cuando quiera.</span></div></li>
            <li><span class="icon">${ICONS.shield}</span><div><strong>${nPay} ${nPay === 1 ? 'medio' : 'medios'} de pago</strong><span>Tarjeta, transferencia, billeteras digitales y más.</span></div></li>
          </ul>
        </div>
      </section>

      ${cats.length ? `
      <section class="section">
        <div class="container">
          <div class="section-head">
            <h2>Categorías</h2>
            <a href="#/productos" class="link-arrow">Ver todo</a>
          </div>
          <div class="grid-categories">
            ${cats.map((c) => `
              <a class="category-tile" data-tone="${toneFor(c.id)}" href="#/productos?cat=${encodeURIComponent(c.id)}">
                <span class="category-name">${esc(c.name)}</span>
                <span class="category-count">${c.count} ${c.count === 1 ? 'producto' : 'productos'}</span>
              </a>`).join('')}
          </div>
        </div>
      </section>` : ''}

      ${featured.length ? `
      <section class="section">
        <div class="container">
          <div class="section-head">
            <h2>Destacados</h2>
            <a href="#/productos" class="link-arrow">Ver catálogo</a>
          </div>
          ${productGridHTML(featured)}
        </div>
      </section>` : ''}

      ${offers.length ? `
      <section class="section section-alt">
        <div class="container">
          <div class="section-head">
            <h2>Ofertas</h2>
            <a href="#/productos?ofertas=1" class="link-arrow">Ver todas las ofertas</a>
          </div>
          ${productGridHTML(offers)}
        </div>
      </section>` : ''}

      ${!products.length ? `<section class="section"><div class="container">${emptyStateHTML('Aún no hay productos', 'El administrador todavía no ha publicado productos en la tienda.', { href: '#/admin', label: 'Ir al perfil de administrador' })}</div></section>` : ''}

      <section class="section">
        <div class="container info-strip">
          <div><span class="icon">${ICONS.leaf}</span><h3>Frescura garantizada</h3><p class="muted">Recibimos frutas, verduras y panadería todos los días.</p></div>
          <div><span class="icon">${ICONS.shield}</span><h3>Compra segura</h3><p class="muted">Sus datos se tratan con total confidencialidad.</p></div>
          <div><span class="icon">${ICONS.store}</span><h3>Atención cercana</h3><p class="muted">${esc(s.hours)}</p></div>
        </div>
      </section>`;
  }

  /* ---------------------------------------------------------------------
     Vista: Catálogo
     --------------------------------------------------------------------- */
  function catalogFilters(params) {
    return {
      cat: params.get('cat') || '',
      q: params.get('q') || '',
      ofertas: params.get('ofertas') === '1',
      disponibles: params.get('disponibles') === '1',
      orden: params.get('orden') || 'relevancia'
    };
  }

  function catalogHash(f) {
    const p = new URLSearchParams();
    if (f.cat) p.set('cat', f.cat);
    if (f.q) p.set('q', f.q);
    if (f.ofertas) p.set('ofertas', '1');
    if (f.disponibles) p.set('disponibles', '1');
    if (f.orden && f.orden !== 'relevancia') p.set('orden', f.orden);
    const qs = p.toString();
    return '#/productos' + (qs ? '?' + qs : '');
  }

  function filterProducts(f) {
    const q = normalize(f.q);
    let list = visibleProducts().filter((p) => {
      if (f.cat && p.category !== f.cat) return false;
      if (f.ofertas && !hasOffer(p)) return false;
      if (f.disponibles && p.stock <= 0) return false;
      if (q) {
        const hay = normalize(`${p.name} ${p.description} ${categoryName(p.category)}`);
        return q.split(/\s+/).every((term) => hay.includes(term));
      }
      return true;
    });
    const byName = (a, b) => a.name.localeCompare(b.name, 'es');
    switch (f.orden) {
      case 'precio-asc': list.sort((a, b) => effectivePrice(a) - effectivePrice(b)); break;
      case 'precio-desc': list.sort((a, b) => effectivePrice(b) - effectivePrice(a)); break;
      case 'nombre': list.sort(byName); break;
      default: list.sort((a, b) => (b.featured - a.featured) || ((b.stock > 0) - (a.stock > 0)) || byName(a, b));
    }
    return list;
  }

  function catalogResultsHTML(f) {
    const list = filterProducts(f);
    const count = `<p class="results-count">${list.length} ${list.length === 1 ? 'producto' : 'productos'}</p>`;
    if (!list.length) {
      return count + emptyStateHTML('Sin resultados', 'No encontramos productos con esos criterios. Pruebe con otra búsqueda o categoría.', { href: '#/productos', label: 'Limpiar filtros' });
    }
    return count + productGridHTML(list);
  }

  function viewCatalog(params) {
    const f = catalogFilters(params);
    const products = visibleProducts();
    const title = f.ofertas ? 'Ofertas' : (f.cat ? categoryName(f.cat) : 'Todos los productos');
    const catBtn = (id, name, count) => `
      <li><button type="button" class="filter-link ${f.cat === id ? 'is-active' : ''}" data-action="filter-cat" data-cat="${esc(id)}" ${f.cat === id ? 'aria-current="true"' : ''}>
        <span>${esc(name)}</span><span class="filter-count">${count}</span>
      </button></li>`;

    return `
      <div class="container page">
        <nav class="breadcrumbs" aria-label="Ruta"><a href="#/">Inicio</a><span>/</span><span>Productos</span></nav>
        <div class="page-head">
          <h1>${esc(title)}</h1>
        </div>
        <div class="catalog">
          <aside class="catalog-filters" aria-label="Filtros">
            <h2 class="filters-title">Categorías</h2>
            <ul class="filter-list">
              ${catBtn('', 'Todas', products.length)}
              ${state.categories.map((c) => catBtn(c.id, c.name, products.filter((p) => p.category === c.id).length)).join('')}
            </ul>
            <h2 class="filters-title">Mostrar</h2>
            <label class="check"><input type="checkbox" data-filter="ofertas" ${f.ofertas ? 'checked' : ''}> Solo ofertas</label>
            <label class="check"><input type="checkbox" data-filter="disponibles" ${f.disponibles ? 'checked' : ''}> Solo disponibles</label>
          </aside>
          <div class="catalog-main">
            <div class="toolbar">
              <div class="field field-inline field-grow">
                <label for="catalog-q" class="visually-hidden">Buscar</label>
                <input id="catalog-q" type="search" data-filter="q" value="${esc(f.q)}" placeholder="Buscar por nombre o descripción">
              </div>
              <div class="field field-inline">
                <label for="catalog-sort">Ordenar por</label>
                <select id="catalog-sort" data-filter="orden">
                  <option value="relevancia" ${f.orden === 'relevancia' ? 'selected' : ''}>Relevancia</option>
                  <option value="precio-asc" ${f.orden === 'precio-asc' ? 'selected' : ''}>Precio: menor a mayor</option>
                  <option value="precio-desc" ${f.orden === 'precio-desc' ? 'selected' : ''}>Precio: mayor a menor</option>
                  <option value="nombre" ${f.orden === 'nombre' ? 'selected' : ''}>Nombre (A–Z)</option>
                </select>
              </div>
            </div>
            <div id="catalog-results">${catalogResultsHTML(f)}</div>
          </div>
        </div>
      </div>`;
  }

  function currentCatalogFilters() {
    return catalogFilters(parseHash().params);
  }

  function applyCatalogFilters(f, fullRender) {
    history.replaceState(null, '', catalogHash(f));
    if (fullRender) {
      render();
    } else {
      const box = $('#catalog-results');
      if (box) box.innerHTML = catalogResultsHTML(f);
      updateChrome();
    }
  }

  /* ---------------------------------------------------------------------
     Vista: Detalle de producto
     --------------------------------------------------------------------- */
  function viewProduct(id) {
    const p = getProduct(id);
    if (!p || !p.active) return viewNotFound('Producto no disponible', 'El producto que busca no existe o ya no está a la venta.');
    const inCart = cartQty(p.id);
    const available = Math.max(0, p.stock - inCart);
    const related = visibleProducts().filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

    return `
      <div class="container page">
        <nav class="breadcrumbs" aria-label="Ruta">
          <a href="#/">Inicio</a><span>/</span>
          <a href="#/productos?cat=${encodeURIComponent(p.category)}">${esc(categoryName(p.category))}</a><span>/</span>
          <span>${esc(p.name)}</span>
        </nav>
        <div class="product-detail">
          <div class="product-media">
            ${productImage(p, 'detail-img')}
            ${hasOffer(p) ? `<span class="badge badge-offer">−${discountPct(p)} %</span>` : ''}
          </div>
          <div class="product-info">
            <p class="eyebrow">${esc(categoryName(p.category))}</p>
            <h1>${esc(p.name)}</h1>
            <div class="detail-price">${priceHTML(p)} <span class="muted">/ ${esc(p.unit || 'unidad')}</span></div>
            ${p.description ? `<p class="lead">${esc(p.description)}</p>` : ''}
            <p class="stock-line">${p.stock > 0
              ? `<span class="dot dot-ok"></span> Disponible · ${p.stock} en existencia`
              : '<span class="dot dot-off"></span> Agotado temporalmente'}</p>
            ${p.stock > 0 ? `
              <form class="add-form" data-form="add-detail" data-id="${esc(p.id)}">
                <div class="field field-inline">
                  <label for="detail-qty">Cantidad</label>
                  <input id="detail-qty" name="qty" type="number" min="1" max="${available}" value="1" ${available === 0 ? 'disabled' : ''} inputmode="numeric">
                </div>
                <button class="btn btn-primary btn-lg" type="submit" ${available === 0 ? 'disabled' : ''}>Agregar al carrito</button>
              </form>
              ${inCart ? `<p class="muted">Ya tiene ${inCart} en su <a href="#/carrito">carrito</a>.</p>` : ''}` : ''}
          </div>
        </div>
        ${related.length ? `
          <section class="section">
            <div class="section-head"><h2>También le puede interesar</h2></div>
            ${productGridHTML(related)}
          </section>` : ''}
      </div>`;
  }

  /* ---------------------------------------------------------------------
     Vista: Carrito
     --------------------------------------------------------------------- */
  function viewCart() {
    if (reconcileCart()) toast('Actualizamos su carrito según la disponibilidad actual.', 'warn');
    const lines = cartLines();
    if (!lines.length) {
      return `<div class="container page">
        <div class="page-head"><h1>Carrito</h1></div>
        ${emptyStateHTML('Su carrito está vacío', 'Explore nuestro catálogo y agregue los productos que necesita.', { href: '#/productos', label: 'Ver productos' })}
      </div>`;
    }
    const t = computeTotals(lines, 'delivery');
    const freeFrom = Number(state.settings.freeShippingFrom) || 0;
    const pct = freeFrom > 0 ? Math.min(100, Math.round((t.subtotal / freeFrom) * 100)) : 100;

    return `
      <div class="container page">
        <div class="page-head">
          <h1>Carrito</h1>
          <button type="button" class="btn btn-ghost btn-sm" data-action="clear-cart">Vaciar carrito</button>
        </div>
        <div class="cart-layout">
          <section aria-label="Productos en el carrito">
            <ul class="cart-list">
              ${lines.map(({ product: p, qty }) => `
                <li class="cart-item">
                  <a href="#/producto/${encodeURIComponent(p.id)}" class="cart-thumb">${productImage(p, 'thumb-img')}</a>
                  <div class="cart-item-info">
                    <a href="#/producto/${encodeURIComponent(p.id)}" class="cart-item-name">${esc(p.name)}</a>
                    <span class="muted">${money(effectivePrice(p))} / ${esc(p.unit || 'unidad')}${hasOffer(p) ? ' · <span class="text-accent">en oferta</span>' : ''}</span>
                  </div>
                  ${stepperHTML(p, qty)}
                  <span class="cart-item-total">${money(effectivePrice(p) * qty)}</span>
                  <button type="button" class="icon-btn" data-action="remove" data-id="${esc(p.id)}" aria-label="Eliminar ${esc(p.name)}">${ICONS.trash}</button>
                </li>`).join('')}
            </ul>
            <a href="#/productos" class="link-arrow link-back">Seguir comprando</a>
          </section>
          <aside class="summary">
            <h2>Resumen</h2>
            ${freeFrom > 0 ? `
              <div class="progress-block">
                <p>${t.subtotal >= freeFrom ? 'Su pedido tiene <strong>envío gratis</strong>.' : `Le faltan <strong>${money(freeFrom - t.subtotal)}</strong> para el envío gratis.`}</p>
                <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-label="Progreso hacia el envío gratis"><span style="width:${pct}%"></span></div>
              </div>` : ''}
            ${totalsRowsHTML(t, 'delivery')}
            <p class="totals-note">El costo de envío es una estimación para entrega a domicilio. El retiro en tienda es gratuito.</p>
            <a class="btn btn-primary btn-block btn-lg" href="#/pago">Continuar al pago</a>
            <ul class="pay-icons" aria-label="Medios de pago aceptados">
              ${enabledPayments().map((k) => `<li title="${esc(PAYMENT_METHODS[k].label)}">${ICONS[PAYMENT_METHODS[k].icon]}<span class="visually-hidden">${esc(PAYMENT_METHODS[k].label)}</span></li>`).join('')}
            </ul>
          </aside>
        </div>
      </div>`;
  }

  /* ---------------------------------------------------------------------
     Vista: Pago (checkout)
     --------------------------------------------------------------------- */
  function todayYMD(offsetDays = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  function paymentDetailsHTML(method) {
    const s = state.settings;
    switch (method) {
      case 'card':
        return `
          <div class="grid-2">
            <div class="field field-span">
              <label for="card-number">Número de tarjeta</label>
              <input id="card-number" name="cardNumber" inputmode="numeric" autocomplete="cc-number" placeholder="1234 5678 9012 3456" maxlength="23" required>
              <span class="hint" id="card-brand"></span>
            </div>
            <div class="field field-span">
              <label for="card-name">Nombre como figura en la tarjeta</label>
              <input id="card-name" name="cardName" autocomplete="cc-name" required>
            </div>
            <div class="field">
              <label for="card-exp">Vencimiento (MM/AA)</label>
              <input id="card-exp" name="cardExp" inputmode="numeric" autocomplete="cc-exp" placeholder="MM/AA" maxlength="5" required>
            </div>
            <div class="field">
              <label for="card-cvv">Código de seguridad</label>
              <input id="card-cvv" name="cardCvv" inputmode="numeric" autocomplete="cc-csc" placeholder="CVV" maxlength="4" required>
            </div>
            <div class="field">
              <label for="card-installments">Cuotas</label>
              <select id="card-installments" name="installments">
                <option value="1">1 pago</option><option value="3">3 cuotas</option><option value="6">6 cuotas</option><option value="12">12 cuotas</option>
              </select>
            </div>
          </div>
          <p class="hint">${ICONS.shield} Pago simulado: no se almacena el número completo ni el código de seguridad.</p>`;
      case 'transfer':
        return `
          <div class="bank-box">
            <p>Al confirmar, realice la transferencia a la siguiente cuenta. Prepararemos su pedido al recibir el pago.</p>
            <dl class="kv">
              <div><dt>Banco</dt><dd>${esc(s.bank.bankName)}</dd></div>
              <div><dt>Titular</dt><dd>${esc(s.bank.holder)}</dd></div>
              <div><dt>Cuenta</dt><dd>${esc(s.bank.account)}</dd></div>
              <div><dt>Concepto</dt><dd>${esc(s.bank.reference)}</dd></div>
            </dl>
          </div>`;
      case 'paypal':
        return `
          <div class="field">
            <label for="paypal-email">Correo de su cuenta PayPal</label>
            <input id="paypal-email" name="paypalEmail" type="email" autocomplete="email" required>
          </div>
          <p class="hint">Será redirigido a PayPal para autorizar el pago (simulado).</p>`;
      case 'wallet':
        return `
          <div class="grid-2">
            <div class="field">
              <label for="wallet-provider">Billetera</label>
              <select id="wallet-provider" name="walletProvider">
                <option>Apple Pay</option><option>Google Pay</option><option>Mercado Pago</option><option>Otra</option>
              </select>
            </div>
            <div class="field">
              <label for="wallet-account">Teléfono o correo asociado</label>
              <input id="wallet-account" name="walletAccount" required>
            </div>
          </div>
          <p class="hint">Recibirá una solicitud de pago en su aplicación (simulado).</p>`;
      case 'cash':
        return `
          <div class="field">
            <label for="cash-amount">¿Con cuánto pagará? <span class="muted">(opcional, para preparar el cambio)</span></label>
            <input id="cash-amount" name="cashAmount" type="number" min="0" step="0.01" inputmode="decimal">
            <span class="hint" id="cash-change"></span>
          </div>`;
      case 'cardOnDelivery':
        return '<p class="hint">Nuestro repartidor o cajero llevará un datáfono. Se aceptan tarjetas de crédito y débito.</p>';
      default:
        return '';
    }
  }

  function viewCheckout() {
    reconcileCart();
    const lines = cartLines();
    if (!lines.length) {
      navigate('#/carrito');
      return null;
    }
    const methods = enabledPayments();
    const t = computeTotals(lines, 'delivery');

    return `
      <div class="container page">
        <nav class="breadcrumbs" aria-label="Ruta"><a href="#/carrito">Carrito</a><span>/</span><span>Finalizar compra</span></nav>
        <div class="page-head"><h1>Finalizar compra</h1></div>
        <form class="checkout" data-form="checkout" novalidate>
          <div class="checkout-main">
            <div class="form-errors" role="alert" hidden></div>

            <fieldset class="panel">
              <legend><span class="step">1</span> Datos de contacto</legend>
              <div class="grid-2">
                <div class="field field-span">
                  <label for="c-name">Nombre completo</label>
                  <input id="c-name" name="name" autocomplete="name" required>
                </div>
                <div class="field">
                  <label for="c-email">Correo electrónico</label>
                  <input id="c-email" name="email" type="email" autocomplete="email" required>
                </div>
                <div class="field">
                  <label for="c-phone">Teléfono</label>
                  <input id="c-phone" name="phone" type="tel" autocomplete="tel" required>
                </div>
              </div>
            </fieldset>

            <fieldset class="panel">
              <legend><span class="step">2</span> Entrega</legend>
              <div class="choice-grid">
                <label class="choice">
                  <input type="radio" name="delivery" value="delivery" checked>
                  <span class="choice-body"><span class="icon">${ICONS.truck}</span><span><strong>Envío a domicilio</strong><span class="muted" data-shipping-hint></span></span></span>
                </label>
                <label class="choice">
                  <input type="radio" name="delivery" value="pickup">
                  <span class="choice-body"><span class="icon">${ICONS.store}</span><span><strong>Retiro en tienda</strong><span class="muted">Gratis · ${esc(state.settings.address)}</span></span></span>
                </label>
              </div>
              <div class="grid-2" data-address-fields>
                <div class="field field-span">
                  <label for="c-address">Dirección</label>
                  <input id="c-address" name="address" autocomplete="street-address" required>
                </div>
                <div class="field">
                  <label for="c-city">Ciudad</label>
                  <input id="c-city" name="city" autocomplete="address-level2" required>
                </div>
                <div class="field">
                  <label for="c-ref">Referencias <span class="muted">(opcional)</span></label>
                  <input id="c-ref" name="reference" placeholder="Piso, departamento, indicaciones…">
                </div>
              </div>
              <div class="grid-2">
                <div class="field">
                  <label for="c-date">Fecha</label>
                  <input id="c-date" name="date" type="date" min="${todayYMD()}" value="${todayYMD(1)}" required>
                </div>
                <div class="field">
                  <label for="c-slot">Franja horaria</label>
                  <select id="c-slot" name="slot">${DELIVERY_SLOTS.map((x) => `<option>${esc(x)}</option>`).join('')}</select>
                </div>
              </div>
            </fieldset>

            <fieldset class="panel">
              <legend><span class="step">3</span> Método de pago</legend>
              ${methods.length ? `
                <div class="choice-grid choice-grid-pay">
                  ${methods.map((k, i) => `
                    <label class="choice">
                      <input type="radio" name="payment" value="${k}" ${i === 0 ? 'checked' : ''}>
                      <span class="choice-body"><span class="icon">${ICONS[PAYMENT_METHODS[k].icon]}</span><span><strong>${esc(PAYMENT_METHODS[k].label)}</strong><span class="muted">${esc(PAYMENT_METHODS[k].desc)}</span></span></span>
                    </label>`).join('')}
                </div>
                <div class="payment-details" data-payment-details>${paymentDetailsHTML(methods[0])}</div>`
              : '<p class="text-danger">La tienda no tiene métodos de pago habilitados en este momento.</p>'}
            </fieldset>

            <fieldset class="panel">
              <legend><span class="step">4</span> Notas del pedido <span class="muted">(opcional)</span></legend>
              <div class="field">
                <label for="c-notes" class="visually-hidden">Notas</label>
                <textarea id="c-notes" name="notes" rows="3" placeholder="Sustituciones permitidas, preferencias de madurez, etc."></textarea>
              </div>
            </fieldset>
          </div>

          <aside class="summary checkout-summary">
            <h2>Su pedido</h2>
            <ul class="mini-list">
              ${lines.map(({ product: p, qty }) => `
                <li><span class="mini-qty">${qty}×</span><span class="mini-name">${esc(p.name)}</span><span>${money(effectivePrice(p) * qty)}</span></li>`).join('')}
            </ul>
            <div data-checkout-totals>${totalsRowsHTML(t, 'delivery')}</div>
            <label class="check check-terms"><input type="checkbox" name="terms" required> Acepto los términos y condiciones de compra y la política de privacidad.</label>
            <button type="submit" class="btn btn-primary btn-block btn-lg" data-submit ${methods.length ? '' : 'disabled'}>Confirmar pedido · <span data-submit-total>${money(t.total)}</span></button>
            <a href="#/carrito" class="link-arrow link-back">Volver al carrito</a>
          </aside>
        </form>
      </div>`;
  }

  function checkoutDelivery(form) {
    return (form.querySelector('input[name="delivery"]:checked') || {}).value || 'delivery';
  }

  function refreshCheckoutTotals(form) {
    const delivery = checkoutDelivery(form);
    const t = computeTotals(cartLines(), delivery);
    $('[data-checkout-totals]', form).innerHTML = totalsRowsHTML(t, delivery);
    $('[data-submit-total]', form).textContent = money(t.total);
    const addr = $('[data-address-fields]', form);
    addr.hidden = delivery !== 'delivery';
    $$('input', addr).forEach((i) => { i.disabled = delivery !== 'delivery'; });
    const s = state.settings;
    const freeFrom = Number(s.freeShippingFrom) || 0;
    const hint = $('[data-shipping-hint]', form);
    if (hint) {
      const base = computeTotals(cartLines(), 'delivery');
      hint.textContent = base.shipping > 0
        ? `${money(base.shipping)}${freeFrom > 0 ? ` · gratis desde ${money(freeFrom)}` : ''}`
        : 'Gratis para este pedido';
    }
    updateCashChange(form);
    return t;
  }

  function updateCashChange(form) {
    const input = $('#cash-amount', form);
    const out = $('#cash-change', form);
    if (!input || !out) return;
    const total = computeTotals(cartLines(), checkoutDelivery(form)).total;
    const val = toNumber(input.value);
    if (!input.value) { out.textContent = ''; return; }
    out.textContent = val >= total ? `Su cambio: ${money(val - total)}` : `El monto debe ser al menos ${money(total)}.`;
    out.classList.toggle('text-danger', val < total);
  }

  function initCheckout() {
    const form = $('form[data-form="checkout"]');
    if (!form) return;
    refreshCheckoutTotals(form);

    form.addEventListener('change', (e) => {
      if (e.target.name === 'delivery') refreshCheckoutTotals(form);
      if (e.target.name === 'payment') {
        $('[data-payment-details]', form).innerHTML = paymentDetailsHTML(e.target.value);
        refreshCheckoutTotals(form);
      }
    });

    form.addEventListener('input', (e) => {
      const el = e.target;
      el.removeAttribute('aria-invalid');
      if (el.name === 'cardNumber') {
        const digits = el.value.replace(/\D/g, '').slice(0, 19);
        el.value = digits.replace(/(.{4})/g, '$1 ').trim();
        const brand = cardBrand(digits);
        $('#card-brand', form).textContent = brand ? `Tarjeta ${brand}` : '';
      }
      if (el.name === 'cardExp') {
        let d = el.value.replace(/\D/g, '').slice(0, 4);
        if (d.length >= 3) d = d.slice(0, 2) + '/' + d.slice(2);
        el.value = d;
      }
      if (el.name === 'cardCvv') el.value = el.value.replace(/\D/g, '').slice(0, 4);
      if (el.name === 'cashAmount') updateCashChange(form);
    });
  }

  function cardBrand(digits) {
    if (/^4/.test(digits)) return 'Visa';
    if (/^(5[1-5]|2[2-7])/.test(digits)) return 'Mastercard';
    if (/^3[47]/.test(digits)) return 'American Express';
    if (/^6(011|5)/.test(digits)) return 'Discover';
    return '';
  }

  function luhn(digits) {
    let sum = 0;
    let dbl = false;
    for (let i = digits.length - 1; i >= 0; i -= 1) {
      let n = Number(digits[i]);
      if (dbl) { n *= 2; if (n > 9) n -= 9; }
      sum += n;
      dbl = !dbl;
    }
    return digits.length >= 13 && sum % 10 === 0;
  }

  function validateCheckout(form) {
    const errors = [];
    const fd = new FormData(form);
    const val = (k) => String(fd.get(k) || '').trim();
    const mark = (name, msg) => {
      const el = form.elements[name];
      if (el && el.setAttribute) el.setAttribute('aria-invalid', 'true');
      errors.push({ name, msg });
    };

    if (val('name').length < 3) mark('name', 'Ingrese su nombre completo.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email'))) mark('email', 'Ingrese un correo electrónico válido.');
    if (val('phone').replace(/\D/g, '').length < 7) mark('phone', 'Ingrese un teléfono válido.');

    const delivery = checkoutDelivery(form);
    if (delivery === 'delivery') {
      if (val('address').length < 5) mark('address', 'Ingrese la dirección de entrega.');
      if (val('city').length < 2) mark('city', 'Ingrese la ciudad.');
    }
    if (!val('date') || val('date') < todayYMD()) mark('date', 'Seleccione una fecha válida (hoy o posterior).');

    const method = val('payment');
    if (!method || !state.settings.payments[method]) {
      errors.push({ name: 'payment', msg: 'Seleccione un método de pago.' });
    } else if (method === 'card') {
      const digits = val('cardNumber').replace(/\D/g, '');
      if (!luhn(digits)) mark('cardNumber', 'El número de tarjeta no es válido.');
      if (val('cardName').length < 3) mark('cardName', 'Ingrese el nombre del titular.');
      const m = val('cardExp').match(/^(\d{2})\/(\d{2})$/);
      let expOk = false;
      if (m) {
        const month = Number(m[1]);
        const year = 2000 + Number(m[2]);
        const now = new Date();
        expOk = month >= 1 && month <= 12 && (year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1));
      }
      if (!expOk) mark('cardExp', 'La fecha de vencimiento no es válida o la tarjeta está vencida.');
      const cvvLen = cardBrand(digits) === 'American Express' ? 4 : 3;
      if (val('cardCvv').length !== cvvLen) mark('cardCvv', `El código de seguridad debe tener ${cvvLen} dígitos.`);
    } else if (method === 'paypal') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('paypalEmail'))) mark('paypalEmail', 'Ingrese el correo de su cuenta PayPal.');
    } else if (method === 'wallet') {
      if (val('walletAccount').length < 5) mark('walletAccount', 'Ingrese el teléfono o correo de su billetera.');
    } else if (method === 'cash' && val('cashAmount')) {
      const total = computeTotals(cartLines(), delivery).total;
      if (toNumber(val('cashAmount')) < total) mark('cashAmount', `El monto en efectivo debe ser al menos ${money(total)}.`);
    }

    if (!form.elements.terms.checked) mark('terms', 'Debe aceptar los términos y condiciones.');
    return errors;
  }

  async function submitCheckout(form) {
    const box = $('.form-errors', form);
    const errors = validateCheckout(form);
    if (errors.length) {
      box.hidden = false;
      box.innerHTML = `<p><strong>Revise los siguientes datos:</strong></p><ul>${errors.map((e) => `<li>${esc(e.msg)}</li>`).join('')}</ul>`;
      const first = form.elements[errors[0].name];
      const target = first && first.focus ? first : (first && first[0]);
      if (target && target.focus) target.focus();
      box.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    box.hidden = true;

    // Verifica stock en el momento de confirmar.
    if (reconcileCart()) {
      toast('Algunos productos cambiaron de disponibilidad. Revise su carrito.', 'warn');
      navigate('#/carrito');
      return;
    }

    const btn = $('[data-submit]', form);
    const fd = new FormData(form);
    const val = (k) => String(fd.get(k) || '').trim();
    const method = val('payment');
    btn.disabled = true;
    btn.innerHTML = method === 'paypal' ? 'Conectando con PayPal…' : 'Procesando pago…';
    await new Promise((r) => setTimeout(r, 1100));

    const delivery = checkoutDelivery(form);
    const lines = cartLines();
    const totals = computeTotals(lines, delivery);

    let detail = '';
    if (method === 'card') {
      const digits = val('cardNumber').replace(/\D/g, '');
      const n = Number(val('installments')) || 1;
      detail = `${cardBrand(digits) || 'Tarjeta'} terminada en ${digits.slice(-4)}${n > 1 ? ` · ${n} cuotas` : ''}`;
    } else if (method === 'paypal') {
      detail = val('paypalEmail');
    } else if (method === 'wallet') {
      detail = `${val('walletProvider')} · ${val('walletAccount')}`;
    } else if (method === 'cash' && val('cashAmount')) {
      const amount = toNumber(val('cashAmount'));
      detail = `Paga con ${money(amount)} · cambio ${money(amount - totals.total)}`;
    }

    const status = ['card', 'paypal', 'wallet'].includes(method) ? 'Pagado'
      : method === 'transfer' ? 'Pendiente de pago' : 'Pendiente';

    const number = state.orders.reduce((max, o) => Math.max(max, Number(o.number) || 0), 1000) + 1;
    const order = {
      id: uid(),
      number,
      code: `PED-${number}`,
      date: new Date().toISOString(),
      customer: { name: val('name'), email: val('email'), phone: val('phone') },
      delivery: {
        type: delivery,
        address: delivery === 'delivery' ? val('address') : '',
        city: delivery === 'delivery' ? val('city') : '',
        reference: delivery === 'delivery' ? val('reference') : '',
        date: val('date'),
        slot: val('slot')
      },
      items: lines.map(({ product: p, qty }) => ({
        id: p.id, name: p.name, unit: p.unit, qty,
        price: effectivePrice(p), regularPrice: Number(p.price)
      })),
      totals,
      currency: state.settings.currency,
      payment: { method, label: PAYMENT_METHODS[method].label, detail },
      notes: val('notes'),
      status,
      restocked: false
    };

    lines.forEach(({ product: p, qty }) => { p.stock = Math.max(0, p.stock - qty); });
    state.orders.unshift(order);
    state.cart = [];
    save('products', 'orders', 'cart');
    navigate(`#/pedido/${order.id}`);
  }

  /* ---------------------------------------------------------------------
     Vista: Confirmación de pedido
     --------------------------------------------------------------------- */
  function orderItemsTable(order) {
    return `
      <table class="table">
        <thead><tr><th>Producto</th><th class="num">Cant.</th><th class="num">Precio</th><th class="num">Importe</th></tr></thead>
        <tbody>
          ${order.items.map((it) => `
            <tr>
              <td>${esc(it.name)} <span class="muted">/ ${esc(it.unit || 'unidad')}</span></td>
              <td class="num">${it.qty}</td>
              <td class="num">${money(it.price)}</td>
              <td class="num">${money(it.price * it.qty)}</td>
            </tr>`).join('')}
        </tbody>
      </table>`;
  }

  function deliveryText(order) {
    const d = order.delivery;
    const when = `${formatDay(d.date)} · ${d.slot}`;
    if (d.type === 'pickup') return `<strong>Retiro en tienda</strong><br>${esc(state.settings.address)}<br>${esc(when)}`;
    return `<strong>Envío a domicilio</strong><br>${esc(d.address)}, ${esc(d.city)}${d.reference ? `<br>${esc(d.reference)}` : ''}<br>${esc(when)}`;
  }

  function viewOrderConfirmation(id) {
    const order = state.orders.find((o) => o.id === id);
    if (!order) return viewNotFound('Pedido no encontrado', 'No encontramos el pedido solicitado en este dispositivo.');
    const s = state.settings;
    return `
      <div class="container page page-narrow">
        <div class="confirm-head">
          <span class="confirm-check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          <p class="eyebrow">Pedido ${esc(order.code)}</p>
          <h1>Gracias por su compra, ${esc(order.customer.name.split(' ')[0])}</h1>
          <p class="lead">Hemos registrado su pedido. Le enviaremos la confirmación a <strong>${esc(order.customer.email)}</strong>.</p>
        </div>

        ${order.payment.method === 'transfer' && order.status === 'Pendiente de pago' ? `
          <div class="bank-box">
            <h2>Datos para la transferencia</h2>
            <dl class="kv">
              <div><dt>Importe</dt><dd><strong>${money(order.totals.total)}</strong></dd></div>
              <div><dt>Banco</dt><dd>${esc(s.bank.bankName)}</dd></div>
              <div><dt>Titular</dt><dd>${esc(s.bank.holder)}</dd></div>
              <div><dt>Cuenta</dt><dd>${esc(s.bank.account)}</dd></div>
              <div><dt>Concepto</dt><dd>${esc(order.code)}</dd></div>
            </dl>
          </div>` : ''}

        <div class="panel">
          <div class="order-meta">
            <div><span class="meta-label">Fecha</span>${esc(formatDate(order.date))}</div>
            <div><span class="meta-label">Estado</span><span class="status" data-status="${esc(order.status)}">${esc(order.status)}</span></div>
            <div><span class="meta-label">Pago</span>${esc(order.payment.label)}${order.payment.detail ? `<br><span class="muted">${esc(order.payment.detail)}</span>` : ''}</div>
            <div><span class="meta-label">Entrega</span>${deliveryText(order)}</div>
          </div>
          ${orderItemsTable(order)}
          ${totalsRowsHTML(order.totals, order.delivery.type).replace(/<p class="totals-note">Agregue[\s\S]*?<\/p>/, '')}
        </div>

        <div class="actions-row">
          <a class="btn btn-primary" href="#/productos">Seguir comprando</a>
          <button class="btn btn-ghost" type="button" data-action="print">Imprimir comprobante</button>
        </div>
      </div>`;
  }

  /* ---------------------------------------------------------------------
     Vista: No encontrado
     --------------------------------------------------------------------- */
  function viewNotFound(title = 'Página no encontrada', text = 'La página que busca no existe.') {
    return `<div class="container page">${emptyStateHTML(title, text, { href: '#/', label: 'Volver al inicio' })}</div>`;
  }

  /* =====================================================================
     PERFIL DE ADMINISTRADOR
     ===================================================================== */
  const ADMIN_TABS = [
    { id: 'resumen', label: 'Resumen' },
    { id: 'productos', label: 'Productos' },
    { id: 'categorias', label: 'Categorías' },
    { id: 'pedidos', label: 'Pedidos' },
    { id: 'ajustes', label: 'Configuración' }
  ];

  function viewAdmin(rest, params) {
    if (!isAdmin()) return viewAdminLogin();
    const tab = rest[0] || 'resumen';
    let content;
    switch (tab) {
      case 'resumen': content = adminDashboard(); break;
      case 'productos':
        if (rest[1] === 'nuevo') content = adminProductForm(null);
        else if (rest[1] === 'editar') content = adminProductForm(getProduct(rest[2]) || undefined);
        else content = adminProducts(params);
        break;
      case 'categorias': content = adminCategories(); break;
      case 'pedidos': content = adminOrders(params); break;
      case 'ajustes': content = adminSettings(); break;
      default: content = emptyStateHTML('Sección no encontrada', 'Elija una opción del menú.', null);
    }
    return `
      <div class="container page admin">
        <div class="admin-head">
          <div>
            <p class="eyebrow">Perfil de administrador</p>
            <h1>Panel de administración</h1>
          </div>
          <div class="admin-head-actions">
            <a class="btn btn-ghost btn-sm" href="#/">Ver tienda</a>
            <button class="btn btn-ghost btn-sm" type="button" data-action="logout">Cerrar sesión</button>
          </div>
        </div>
        <div class="admin-layout">
          <nav class="admin-nav" aria-label="Administración">
            ${ADMIN_TABS.map((t) => `<a href="#/admin/${t.id}" ${t.id === tab ? 'aria-current="page"' : ''}>${esc(t.label)}${t.id === 'pedidos' ? pendingBadge() : ''}</a>`).join('')}
          </nav>
          <div class="admin-content">${content}</div>
        </div>
      </div>`;
  }

  const isOpenOrder = (o) => !['Entregado', 'Cancelado'].includes(o.status);

  function pendingBadge() {
    const n = state.orders.filter(isOpenOrder).length;
    return n ? ` <span class="nav-badge">${n}</span>` : '';
  }

  function viewAdminLogin() {
    return `
      <div class="container page page-narrow">
        <div class="login-card panel">
          <p class="eyebrow">Acceso restringido</p>
          <h1>Perfil de administrador</h1>
          <p class="muted">Ingrese la contraseña para administrar productos, precios, pedidos y la configuración de la tienda.</p>
          <form data-form="login" class="stack">
            <div class="field">
              <label for="admin-pass">Contraseña</label>
              <input id="admin-pass" name="password" type="password" autocomplete="current-password" required autofocus>
            </div>
            <p class="text-danger" data-login-error hidden>Contraseña incorrecta.</p>
            <button class="btn btn-primary btn-block btn-lg" type="submit">Ingresar</button>
          </form>
          <p class="hint">Contraseña inicial: <code>admin123</code>. Cámbiela en <em>Configuración → Seguridad</em>.</p>
        </div>
      </div>`;
  }

  /* --- Resumen --- */
  function adminDashboard() {
    const valid = state.orders.filter((o) => o.status !== 'Cancelado');
    const revenue = valid.reduce((sum, o) => sum + (o.totals ? o.totals.total : 0), 0);
    const open = state.orders.filter(isOpenOrder);
    const threshold = Number(state.settings.lowStockThreshold) || 0;
    const low = state.products.filter((p) => p.stock <= threshold).sort((a, b) => a.stock - b.stock);
    const active = state.products.filter((p) => p.active).length;
    const avg = valid.length ? revenue / valid.length : 0;

    const byMethod = Object.keys(PAYMENT_METHODS).map((k) => {
      const os = valid.filter((o) => o.payment.method === k);
      return { k, count: os.length, total: os.reduce((s, o) => s + o.totals.total, 0) };
    }).filter((r) => r.count > 0);

    return `
      <div class="kpis">
        <div class="kpi"><span class="kpi-label">Ventas</span><span class="kpi-value">${money(revenue)}</span><span class="kpi-sub">${valid.length} pedidos válidos</span></div>
        <div class="kpi"><span class="kpi-label">Ticket promedio</span><span class="kpi-value">${money(avg)}</span><span class="kpi-sub">por pedido</span></div>
        <div class="kpi"><span class="kpi-label">Por atender</span><span class="kpi-value">${open.length}</span><span class="kpi-sub">pedidos abiertos</span></div>
        <div class="kpi"><span class="kpi-label">Productos</span><span class="kpi-value">${active}</span><span class="kpi-sub">activos de ${state.products.length}</span></div>
      </div>

      <div class="admin-grid">
        <section class="panel">
          <div class="panel-head"><h2>Últimos pedidos</h2><a href="#/admin/pedidos" class="link-arrow">Ver todos</a></div>
          ${state.orders.length ? `
            <div class="table-wrap"><table class="table">
              <thead><tr><th>Pedido</th><th>Cliente</th><th>Estado</th><th class="num">Total</th></tr></thead>
              <tbody>${state.orders.slice(0, 6).map((o) => `
                <tr><td>${esc(o.code)}<br><span class="muted small">${esc(formatDate(o.date))}</span></td><td>${esc(o.customer.name)}</td>
                <td><span class="status" data-status="${esc(o.status)}">${esc(o.status)}</span></td><td class="num">${money(o.totals.total)}</td></tr>`).join('')}
              </tbody></table></div>` : '<p class="muted">Todavía no se han recibido pedidos.</p>'}
        </section>

        <section class="panel">
          <div class="panel-head"><h2>Stock bajo</h2><span class="muted small">≤ ${threshold} unidades</span></div>
          ${low.length ? `
            <ul class="simple-list">${low.slice(0, 8).map((p) => `
              <li><a href="#/admin/productos/editar/${encodeURIComponent(p.id)}">${esc(p.name)}</a>
              <span class="${p.stock <= 0 ? 'text-danger' : 'text-warn'}">${p.stock <= 0 ? 'Agotado' : `${p.stock} u.`}</span></li>`).join('')}
            </ul>` : '<p class="muted">Todo el inventario está en niveles adecuados.</p>'}
        </section>

        <section class="panel">
          <div class="panel-head"><h2>Ventas por método de pago</h2></div>
          ${byMethod.length ? `
            <div class="table-wrap"><table class="table">
              <thead><tr><th>Método</th><th class="num">Pedidos</th><th class="num">Importe</th></tr></thead>
              <tbody>${byMethod.map((r) => `<tr><td>${esc(PAYMENT_METHODS[r.k].label)}</td><td class="num">${r.count}</td><td class="num">${money(r.total)}</td></tr>`).join('')}</tbody>
            </table></div>` : '<p class="muted">Sin datos todavía.</p>'}
        </section>

        <section class="panel">
          <div class="panel-head"><h2>Acciones rápidas</h2></div>
          <div class="stack">
            <a class="btn btn-primary" href="#/admin/productos/nuevo">Agregar producto</a>
            <a class="btn btn-ghost" href="#/admin/categorias">Gestionar categorías</a>
            <a class="btn btn-ghost" href="#/admin/ajustes">Configurar tienda y pagos</a>
          </div>
        </section>
      </div>`;
  }

  /* --- Productos --- */
  function adminProducts(params) {
    const q = params.get('q') || '';
    const cat = params.get('cat') || '';
    const nq = normalize(q);
    const list = state.products
      .filter((p) => (!cat || p.category === cat) && (!nq || normalize(p.name).includes(nq)))
      .sort((a, b) => a.name.localeCompare(b.name, 'es'));
    const threshold = Number(state.settings.lowStockThreshold) || 0;

    return `
      <div class="panel-head panel-head-top">
        <h2>Productos <span class="muted small">(${state.products.length})</span></h2>
        <a class="btn btn-primary" href="#/admin/productos/nuevo">+ Agregar producto</a>
      </div>
      <form class="toolbar" data-form="admin-product-filter">
        <div class="field field-inline field-grow">
          <label for="ap-q" class="visually-hidden">Buscar</label>
          <input id="ap-q" name="q" type="search" value="${esc(q)}" placeholder="Buscar producto por nombre">
        </div>
        <div class="field field-inline">
          <label for="ap-cat">Categoría</label>
          <select id="ap-cat" name="cat">
            <option value="">Todas</option>
            ${state.categories.map((c) => `<option value="${esc(c.id)}" ${c.id === cat ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}
          </select>
        </div>
        <button class="btn btn-ghost" type="submit">Filtrar</button>
      </form>
      ${list.length ? `
      <div class="table-wrap">
        <table class="table table-products">
          <thead><tr><th></th><th>Producto</th><th>Categoría</th><th class="num">Precio</th><th class="num">Oferta</th><th class="num">Stock</th><th>Estado</th><th class="actions-col">Acciones</th></tr></thead>
          <tbody>
            ${list.map((p) => `
              <tr class="${p.active ? '' : 'is-inactive'}">
                <td>${productImage(p, 'table-img')}</td>
                <td><strong>${esc(p.name)}</strong>${p.featured ? ' <span class="tag">Destacado</span>' : ''}<br><span class="muted small">por ${esc(p.unit || 'unidad')}</span></td>
                <td>${esc(categoryName(p.category))}</td>
                <td class="num">${money(p.price)}</td>
                <td class="num">${hasOffer(p) ? money(p.offerPrice) : '<span class="muted">—</span>'}</td>
                <td class="num ${p.stock <= 0 ? 'text-danger' : p.stock <= threshold ? 'text-warn' : ''}">${p.stock}</td>
                <td><span class="status" data-status="${p.active ? 'Visible' : 'Oculto'}">${p.active ? 'Visible' : 'Oculto'}</span></td>
                <td class="actions-col">
                  <a class="btn btn-ghost btn-sm" href="#/admin/productos/editar/${encodeURIComponent(p.id)}">Editar</a>
                  <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-product" data-id="${esc(p.id)}">${p.active ? 'Ocultar' : 'Mostrar'}</button>
                  <button class="btn btn-ghost btn-sm btn-danger-text" type="button" data-action="delete-product" data-id="${esc(p.id)}">Eliminar</button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>` : emptyStateHTML('Sin productos', q || cat ? 'Ningún producto coincide con el filtro.' : 'Agregue su primer producto para empezar a vender.', { href: '#/admin/productos/nuevo', label: 'Agregar producto' })}`;
  }

  function adminProductForm(p) {
    if (p === undefined) return emptyStateHTML('Producto no encontrado', 'Es posible que haya sido eliminado.', { href: '#/admin/productos', label: 'Volver a productos' });
    const isNew = !p;
    const v = p || { name: '', category: (state.categories[0] || {}).id || '', price: '', offerPrice: '', unit: 'unidad', stock: '', description: '', image: '', active: true, featured: false };
    const img = safeImageSrc(v.image);

    if (!state.categories.length) {
      return emptyStateHTML('Primero cree una categoría', 'Cada producto debe pertenecer a una categoría.', { href: '#/admin/categorias', label: 'Crear categoría' });
    }

    return `
      <div class="panel-head panel-head-top">
        <h2>${isNew ? 'Agregar producto' : 'Editar producto'}</h2>
        <a class="link-arrow link-back" href="#/admin/productos">Volver a productos</a>
      </div>
      <form class="panel product-form" data-form="product" data-id="${isNew ? '' : esc(p.id)}" novalidate>
        <div class="form-errors" role="alert" hidden></div>
        <div class="product-form-grid">
          <div class="stack">
            <div class="field">
              <label for="pf-name">Nombre del producto *</label>
              <input id="pf-name" name="name" value="${esc(v.name)}" maxlength="80" required>
            </div>
            <div class="grid-2">
              <div class="field">
                <label for="pf-cat">Categoría *</label>
                <select id="pf-cat" name="category" required>
                  ${state.categories.map((c) => `<option value="${esc(c.id)}" ${c.id === v.category ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}
                </select>
              </div>
              <div class="field">
                <label for="pf-unit">Unidad de venta</label>
                <input id="pf-unit" name="unit" value="${esc(v.unit)}" list="unit-list" maxlength="20" placeholder="unidad, kg, litro…">
                <datalist id="unit-list">${UNIT_SUGGESTIONS.map((u) => `<option value="${esc(u)}">`).join('')}</datalist>
              </div>
              <div class="field">
                <label for="pf-price">Precio (${esc(currencyInfo().code)}) *</label>
                <input id="pf-price" name="price" type="number" min="0" step="0.01" inputmode="decimal" value="${esc(v.price)}" required>
              </div>
              <div class="field">
                <label for="pf-offer">Precio de oferta <span class="muted">(opcional)</span></label>
                <input id="pf-offer" name="offerPrice" type="number" min="0" step="0.01" inputmode="decimal" value="${esc(v.offerPrice ?? '')}">
                <span class="hint">Debe ser menor que el precio normal.</span>
              </div>
              <div class="field">
                <label for="pf-stock">Stock disponible *</label>
                <input id="pf-stock" name="stock" type="number" min="0" step="1" inputmode="numeric" value="${esc(v.stock)}" required>
              </div>
            </div>
            <div class="field">
              <label for="pf-desc">Descripción</label>
              <textarea id="pf-desc" name="description" rows="4" maxlength="500">${esc(v.description)}</textarea>
            </div>
            <div class="checks-row">
              <label class="check"><input type="checkbox" name="active" ${v.active ? 'checked' : ''}> Visible en la tienda</label>
              <label class="check"><input type="checkbox" name="featured" ${v.featured ? 'checked' : ''}> Mostrar en destacados</label>
            </div>
          </div>

          <div class="stack">
            <span class="label">Imagen</span>
            <div class="image-preview" data-image-preview>
              ${img ? `<img src="${esc(img)}" alt="Vista previa">` : '<span class="muted">Sin imagen</span>'}
            </div>
            <input type="hidden" name="image" value="${esc(img)}">
            <div class="field">
              <label for="pf-file" class="btn btn-ghost btn-block file-btn">Subir imagen desde el equipo</label>
              <input id="pf-file" type="file" accept="image/*" class="visually-hidden" data-image-file>
            </div>
            <div class="field">
              <label for="pf-url">o pegue una URL de imagen</label>
              <input id="pf-url" type="url" placeholder="https://…" value="${img.startsWith('data:') ? '' : esc(img)}" data-image-url>
            </div>
            <button type="button" class="btn btn-ghost btn-sm" data-action="clear-image">Quitar imagen</button>
            <p class="hint">Las imágenes subidas se reducen automáticamente para ahorrar espacio.</p>
          </div>
        </div>

        <div class="form-actions">
          <a class="btn btn-ghost" href="#/admin/productos">Cancelar</a>
          ${isNew ? '<button class="btn btn-ghost" type="submit" name="again" value="1">Guardar y agregar otro</button>' : ''}
          <button class="btn btn-primary" type="submit">Guardar producto</button>
        </div>
      </form>`;
  }

  function resizeImage(file, max = 640) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('Imagen no válida'));
        img.onload = () => {
          const scale = Math.min(1, max / Math.max(img.width, img.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(img.width * scale));
          canvas.height = Math.max(1, Math.round(img.height * scale));
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.82));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function setFormImage(form, src) {
    const clean = safeImageSrc(src);
    form.elements.image.value = clean;
    $('[data-image-preview]', form).innerHTML = clean ? `<img src="${esc(clean)}" alt="Vista previa">` : '<span class="muted">Sin imagen</span>';
  }

  function initProductForm() {
    const form = $('form[data-form="product"]');
    if (!form) return;
    $('[data-image-file]', form).addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) { toast('El archivo debe ser una imagen.', 'error'); return; }
      try {
        setFormImage(form, await resizeImage(file));
        $('[data-image-url]', form).value = '';
      } catch (_) {
        toast('No se pudo leer la imagen.', 'error');
      }
    });
    $('[data-image-url]', form).addEventListener('change', (e) => {
      const url = e.target.value.trim();
      if (!url) return;
      if (!/^https?:\/\//i.test(url)) { toast('La URL debe comenzar con http:// o https://', 'error'); return; }
      setFormImage(form, url);
    });
  }

  function submitProduct(form, submitter) {
    const fd = new FormData(form);
    const val = (k) => String(fd.get(k) || '').trim();
    const errors = [];
    const name = val('name');
    const price = toNumber(val('price'));
    const offerRaw = val('offerPrice');
    const offer = offerRaw === '' ? null : toNumber(offerRaw);
    const stock = toNumber(val('stock'));

    if (name.length < 2) errors.push('El nombre debe tener al menos 2 caracteres.');
    if (!getCategory(val('category'))) errors.push('Seleccione una categoría.');
    if (!(price > 0)) errors.push('Ingrese un precio mayor que cero.');
    if (offer !== null && (!(offer > 0) || offer >= price)) errors.push('El precio de oferta debe ser mayor que cero y menor que el precio normal.');
    if (!Number.isInteger(stock) || stock < 0) errors.push('El stock debe ser un número entero igual o mayor que cero.');

    const box = $('.form-errors', form);
    if (errors.length) {
      box.hidden = false;
      box.innerHTML = `<ul>${errors.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>`;
      box.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const data = {
      name,
      category: val('category'),
      price: round2(price),
      offerPrice: offer === null ? null : round2(offer),
      unit: val('unit') || 'unidad',
      stock,
      description: val('description'),
      image: safeImageSrc(val('image')),
      active: form.elements.active.checked,
      featured: form.elements.featured.checked
    };

    const id = form.dataset.id;
    if (id) {
      const p = getProduct(id);
      if (!p) return;
      Object.assign(p, data, { updatedAt: new Date().toISOString() });
    } else {
      state.products.push({ id: uid(), ...data, createdAt: new Date().toISOString() });
    }
    if (!storage.write(KEYS.products, state.products)) return;
    reconcileCart();
    toast(id ? 'Producto actualizado.' : `«${name}» se agregó al catálogo.`);
    if (!id && submitter && submitter.name === 'again') {
      render();
      $('#pf-name') && $('#pf-name').focus();
    } else {
      navigate('#/admin/productos');
    }
  }

  /* --- Categorías --- */
  function adminCategories() {
    return `
      <div class="panel-head panel-head-top"><h2>Categorías</h2></div>
      <form class="panel toolbar" data-form="category-add">
        <div class="field field-inline field-grow">
          <label for="cat-new">Nueva categoría</label>
          <input id="cat-new" name="name" maxlength="40" placeholder="Ej.: Congelados" required>
        </div>
        <button class="btn btn-primary" type="submit">Agregar</button>
      </form>
      <ul class="category-admin-list">
        ${state.categories.map((c) => {
          const count = state.products.filter((p) => p.category === c.id).length;
          return `
          <li class="panel">
            <form data-form="category-rename" data-id="${esc(c.id)}" class="category-row">
              <label class="visually-hidden" for="cat-${esc(c.id)}">Nombre</label>
              <input id="cat-${esc(c.id)}" name="name" value="${esc(c.name)}" maxlength="40" required>
              <span class="muted small">${count} ${count === 1 ? 'producto' : 'productos'}</span>
              <button class="btn btn-ghost btn-sm" type="submit">Guardar</button>
              <button class="btn btn-ghost btn-sm btn-danger-text" type="button" data-action="delete-category" data-id="${esc(c.id)}">Eliminar</button>
            </form>
          </li>`;
        }).join('')}
      </ul>
      ${state.categories.length ? '' : '<p class="muted">No hay categorías todavía.</p>'}`;
  }

  /* --- Pedidos --- */
  function adminOrders(params) {
    const filter = params.get('estado') || '';
    const list = state.orders.filter((o) => !filter || o.status === filter);
    return `
      <div class="panel-head panel-head-top">
        <h2>Pedidos <span class="muted small">(${state.orders.length})</span></h2>
        <div class="field field-inline">
          <label for="order-filter">Estado</label>
          <select id="order-filter" data-action-change="order-filter">
            <option value="">Todos</option>
            ${ORDER_STATUSES.map((s) => `<option ${s === filter ? 'selected' : ''}>${esc(s)}</option>`).join('')}
          </select>
        </div>
      </div>
      ${list.length ? `<div class="order-list">${list.map((o) => `
        <details class="panel order">
          <summary>
            <span class="order-code">${esc(o.code)}</span>
            <span class="muted small">${esc(formatDate(o.date))}</span>
            <span class="order-customer">${esc(o.customer.name)}</span>
            <span class="muted small">${esc(PAYMENT_METHODS[o.payment.method] ? PAYMENT_METHODS[o.payment.method].short : o.payment.label)}</span>
            <span class="status" data-status="${esc(o.status)}">${esc(o.status)}</span>
            <strong class="order-total">${money(o.totals.total)}</strong>
          </summary>
          <div class="order-body">
            <div class="order-meta">
              <div><span class="meta-label">Cliente</span>${esc(o.customer.name)}<br><a href="mailto:${esc(o.customer.email)}">${esc(o.customer.email)}</a><br>${esc(o.customer.phone)}</div>
              <div><span class="meta-label">Entrega</span>${deliveryText(o)}</div>
              <div><span class="meta-label">Pago</span>${esc(o.payment.label)}${o.payment.detail ? `<br><span class="muted">${esc(o.payment.detail)}</span>` : ''}</div>
              ${o.notes ? `<div><span class="meta-label">Notas</span>${esc(o.notes)}</div>` : ''}
            </div>
            ${orderItemsTable(o)}
            <div class="order-footer">
              <div class="field field-inline">
                <label for="st-${esc(o.id)}">Cambiar estado</label>
                <select id="st-${esc(o.id)}" data-action-change="order-status" data-id="${esc(o.id)}" ${o.status === 'Cancelado' ? 'disabled' : ''}>
                  ${ORDER_STATUSES.map((s) => `<option ${s === o.status ? 'selected' : ''}>${esc(s)}</option>`).join('')}
                </select>
              </div>
              <span>Total: <strong>${money(o.totals.total)}</strong></span>
            </div>
          </div>
        </details>`).join('')}</div>`
      : emptyStateHTML('Sin pedidos', filter ? 'No hay pedidos con ese estado.' : 'Los pedidos de sus clientes aparecerán aquí.', null)}`;
  }

  /* --- Configuración --- */
  function adminSettings() {
    const s = state.settings;
    const field = (id, label, name, value, attrs = '') => `
      <div class="field">
        <label for="${id}">${label}</label>
        <input id="${id}" name="${name}" value="${esc(value)}" ${attrs}>
      </div>`;

    return `
      <div class="panel-head panel-head-top"><h2>Configuración</h2></div>
      <form class="stack" data-form="settings" novalidate>
        <fieldset class="panel">
          <legend>Datos de la tienda</legend>
          <div class="grid-2">
            ${field('s-name', 'Nombre de la tienda', 'storeName', s.storeName, 'maxlength="50" required')}
            ${field('s-tag', 'Lema', 'tagline', s.tagline, 'maxlength="90"')}
            ${field('s-addr', 'Dirección', 'address', s.address, 'maxlength="120"')}
            ${field('s-phone', 'Teléfono', 'phone', s.phone, 'maxlength="40"')}
            ${field('s-email', 'Correo electrónico', 'email', s.email, 'type="email" maxlength="80"')}
            ${field('s-hours', 'Horario de atención', 'hours', s.hours, 'maxlength="120"')}
          </div>
        </fieldset>

        <fieldset class="panel">
          <legend>Precios, impuestos y envío</legend>
          <div class="grid-2">
            <div class="field">
              <label for="s-cur">Moneda</label>
              <select id="s-cur" name="currency">
                ${CURRENCIES.map((c) => `<option value="${c.code}" ${c.code === s.currency ? 'selected' : ''}>${esc(c.label)}</option>`).join('')}
              </select>
            </div>
            ${field('s-tax', 'Impuesto (%)', 'taxRate', s.taxRate, 'type="number" min="0" max="100" step="0.01" inputmode="decimal"')}
            ${field('s-ship', 'Costo de envío a domicilio', 'shippingCost', s.shippingCost, 'type="number" min="0" step="0.01" inputmode="decimal"')}
            ${field('s-free', 'Envío gratis desde (0 = nunca)', 'freeShippingFrom', s.freeShippingFrom, 'type="number" min="0" step="0.01" inputmode="decimal"')}
            ${field('s-low', 'Aviso de stock bajo (unidades)', 'lowStockThreshold', s.lowStockThreshold, 'type="number" min="0" step="1" inputmode="numeric"')}
            <div class="field field-check">
              <label class="check"><input type="checkbox" name="pricesIncludeTax" ${s.pricesIncludeTax ? 'checked' : ''}> Los precios ya incluyen impuestos</label>
            </div>
          </div>
        </fieldset>

        <fieldset class="panel">
          <legend>Métodos de pago</legend>
          <p class="muted">Seleccione los métodos que estarán disponibles para sus clientes.</p>
          <div class="pay-toggle-grid">
            ${Object.entries(PAYMENT_METHODS).map(([k, m]) => `
              <label class="choice choice-check">
                <input type="checkbox" name="pay_${k}" ${s.payments[k] ? 'checked' : ''}>
                <span class="choice-body"><span class="icon">${ICONS[m.icon]}</span><span><strong>${esc(m.label)}</strong><span class="muted">${esc(m.desc)}</span></span></span>
              </label>`).join('')}
          </div>
        </fieldset>

        <fieldset class="panel">
          <legend>Datos bancarios para transferencias</legend>
          <div class="grid-2">
            ${field('s-bank', 'Banco', 'bankName', s.bank.bankName, 'maxlength="60"')}
            ${field('s-holder', 'Titular', 'holder', s.bank.holder, 'maxlength="80"')}
            ${field('s-acc', 'Número de cuenta / IBAN / CBU', 'account', s.bank.account, 'maxlength="60"')}
            ${field('s-ref', 'Instrucciones de concepto', 'reference', s.bank.reference, 'maxlength="120"')}
          </div>
        </fieldset>

        <div class="form-errors" role="alert" hidden></div>
        <div class="form-actions"><button class="btn btn-primary" type="submit">Guardar configuración</button></div>
      </form>

      <form class="panel stack" data-form="password" novalidate>
        <h3 class="panel-title">Seguridad</h3>
        <div class="grid-3">
          <div class="field"><label for="pw-cur">Contraseña actual</label><input id="pw-cur" name="current" type="password" autocomplete="current-password" required></div>
          <div class="field"><label for="pw-new">Nueva contraseña</label><input id="pw-new" name="next" type="password" autocomplete="new-password" minlength="6" required></div>
          <div class="field"><label for="pw-rep">Repetir contraseña</label><input id="pw-rep" name="repeat" type="password" autocomplete="new-password" required></div>
        </div>
        <div class="form-actions"><button class="btn btn-primary" type="submit">Cambiar contraseña</button></div>
      </form>

      <section class="panel stack">
        <h3 class="panel-title">Datos de la tienda</h3>
        <p class="muted">Los datos se guardan en este navegador. Exporte una copia de seguridad para conservarlos o trasladarlos a otro equipo.</p>
        <div class="actions-row">
          <button class="btn btn-ghost" type="button" data-action="export">Exportar copia (JSON)</button>
          <label class="btn btn-ghost file-btn" for="import-file">Importar copia</label>
          <input id="import-file" type="file" accept="application/json,.json" class="visually-hidden" data-import-file>
          <button class="btn btn-ghost btn-danger-text" type="button" data-action="clear-orders">Borrar pedidos</button>
          <button class="btn btn-ghost btn-danger-text" type="button" data-action="reset-demo">Restaurar datos de demostración</button>
        </div>
      </section>`;
  }

  function initSettingsForm() {
    const input = $('[data-import-file]');
    if (!input) return;
    input.addEventListener('change', async () => {
      const file = input.files && input.files[0];
      input.value = '';
      if (!file) return;
      try {
        const data = JSON.parse(await file.text());
        if (!Array.isArray(data.products) || !Array.isArray(data.categories)) throw new Error('Formato no válido');
        const ok = await confirmDialog('Importar copia', `Se reemplazarán los productos, categorías, configuración y pedidos actuales por los del archivo (${data.products.length} productos). ¿Desea continuar?`, 'Importar');
        if (!ok) return;
        state.products = data.products.filter((p) => p && p.id && p.name).map((p) => ({ ...p, image: safeImageSrc(p.image) }));
        state.categories = data.categories.filter((c) => c && c.id && c.name);
        state.settings = mergeSettings(data.settings);
        state.orders = Array.isArray(data.orders) ? data.orders : [];
        save('products', 'categories', 'settings', 'orders');
        reconcileCart();
        toast('Copia importada correctamente.');
        render();
      } catch (_) {
        toast('El archivo no es una copia válida de la tienda.', 'error');
      }
    });
  }

  function submitSettings(form) {
    const fd = new FormData(form);
    const val = (k) => String(fd.get(k) || '').trim();
    const num = (k) => toNumber(val(k));
    const errors = [];
    if (val('storeName').length < 2) errors.push('El nombre de la tienda es obligatorio.');
    ['taxRate', 'shippingCost', 'freeShippingFrom', 'lowStockThreshold'].forEach((k) => {
      if (!(num(k) >= 0)) errors.push('Los importes y porcentajes deben ser números iguales o mayores que cero.');
    });
    if (num('taxRate') > 100) errors.push('El impuesto no puede superar el 100 %.');
    const payments = {};
    Object.keys(PAYMENT_METHODS).forEach((k) => { payments[k] = !!form.elements[`pay_${k}`].checked; });
    if (!Object.values(payments).some(Boolean)) errors.push('Debe habilitar al menos un método de pago.');

    const box = $('.form-errors', form);
    if (errors.length) {
      box.hidden = false;
      box.innerHTML = `<ul>${[...new Set(errors)].map((e) => `<li>${esc(e)}</li>`).join('')}</ul>`;
      box.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    state.settings = {
      ...state.settings,
      storeName: val('storeName'),
      tagline: val('tagline'),
      address: val('address'),
      phone: val('phone'),
      email: val('email'),
      hours: val('hours'),
      currency: val('currency'),
      taxRate: round2(num('taxRate')),
      pricesIncludeTax: form.elements.pricesIncludeTax.checked,
      shippingCost: round2(num('shippingCost')),
      freeShippingFrom: round2(num('freeShippingFrom')),
      lowStockThreshold: Math.floor(num('lowStockThreshold')),
      payments,
      bank: { bankName: val('bankName'), holder: val('holder'), account: val('account'), reference: val('reference') }
    };
    save('settings');
    toast('Configuración guardada.');
    render();
  }

  async function submitPassword(form) {
    const cur = form.elements.current.value;
    const next = form.elements.next.value;
    const rep = form.elements.repeat.value;
    if (!(await verifyPassword(cur))) { toast('La contraseña actual no es correcta.', 'error'); return; }
    if (next.length < 6) { toast('La nueva contraseña debe tener al menos 6 caracteres.', 'error'); return; }
    if (next !== rep) { toast('Las contraseñas nuevas no coinciden.', 'error'); return; }
    storage.write(KEYS.auth, await hashPassword(next));
    form.reset();
    toast('Contraseña actualizada.');
  }

  function exportData() {
    const data = {
      app: 'supermercado',
      version: 1,
      exportedAt: new Date().toISOString(),
      settings: state.settings,
      categories: state.categories,
      products: state.products,
      orders: state.orders
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `tienda-${todayYMD()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  /* ---------------------------------------------------------------------
     Acciones (delegación de eventos)
     --------------------------------------------------------------------- */
  function afterCartChange(id) {
    const sec = parseHash().parts[0];
    if (sec === 'carrito' || sec === 'producto') {
      render();
      return;
    }
    const p = getProduct(id);
    if (p) $$(`[data-card-actions="${CSS.escape(id)}"]`).forEach((el) => { el.innerHTML = cardActionsHTML(p); });
    updateChrome();
  }

  const actions = {
    add(el) {
      const p = getProduct(el.dataset.id);
      if (!p) return;
      setCartQty(p.id, cartQty(p.id) + 1);
      afterCartChange(p.id);
      toast(`«${p.name}» agregado al carrito.`, 'ok', { href: '#/carrito', label: 'Ver carrito' });
      const stepperBtn = $(`[data-card-actions="${CSS.escape(p.id)}"] [data-action="inc"]`);
      if (stepperBtn) stepperBtn.focus();
    },
    inc(el) {
      setCartQty(el.dataset.id, cartQty(el.dataset.id) + 1);
      afterCartChange(el.dataset.id);
      refocus(el.dataset.id, 'inc');
    },
    dec(el) {
      setCartQty(el.dataset.id, cartQty(el.dataset.id) - 1);
      afterCartChange(el.dataset.id);
      refocus(el.dataset.id, 'dec');
    },
    remove(el) {
      const p = getProduct(el.dataset.id);
      setCartQty(el.dataset.id, 0);
      afterCartChange(el.dataset.id);
      if (p) toast(`«${p.name}» se eliminó del carrito.`);
    },
    async 'clear-cart'() {
      if (!(await confirmDialog('Vaciar carrito', '¿Desea quitar todos los productos del carrito?', 'Vaciar'))) return;
      state.cart = [];
      save('cart');
      render();
    },
    'filter-cat'(el) {
      const f = currentCatalogFilters();
      f.cat = el.dataset.cat;
      applyCatalogFilters(f, true);
    },
    print() { window.print(); },
    logout() {
      session.set(false);
      toast('Sesión cerrada.');
      navigate('#/');
    },
    async 'toggle-product'(el) {
      const p = getProduct(el.dataset.id);
      if (!p) return;
      p.active = !p.active;
      save('products');
      reconcileCart();
      toast(p.active ? `«${p.name}» ahora es visible en la tienda.` : `«${p.name}» se ocultó de la tienda.`);
      render();
    },
    async 'delete-product'(el) {
      const p = getProduct(el.dataset.id);
      if (!p) return;
      if (!(await confirmDialog('Eliminar producto', `¿Eliminar «${p.name}» definitivamente? Esta acción no se puede deshacer.`, 'Eliminar'))) return;
      state.products = state.products.filter((x) => x.id !== p.id);
      save('products');
      reconcileCart();
      toast('Producto eliminado.');
      render();
    },
    'clear-image'(el) {
      const form = el.closest('form');
      setFormImage(form, '');
      $('[data-image-url]', form).value = '';
    },
    async 'delete-category'(el) {
      const c = getCategory(el.dataset.id);
      if (!c) return;
      const count = state.products.filter((p) => p.category === c.id).length;
      if (count) {
        toast(`No se puede eliminar «${c.name}»: tiene ${count} ${count === 1 ? 'producto asignado' : 'productos asignados'}. Muévalos a otra categoría primero.`, 'error');
        return;
      }
      if (!(await confirmDialog('Eliminar categoría', `¿Eliminar la categoría «${c.name}»?`, 'Eliminar'))) return;
      state.categories = state.categories.filter((x) => x.id !== c.id);
      save('categories');
      toast('Categoría eliminada.');
      render();
    },
    export() { exportData(); },
    async 'clear-orders'() {
      if (!(await confirmDialog('Borrar pedidos', 'Se eliminará el historial completo de pedidos. El stock no se modificará. ¿Continuar?', 'Borrar'))) return;
      state.orders = [];
      save('orders');
      toast('Historial de pedidos eliminado.');
      render();
    },
    async 'reset-demo'() {
      if (!(await confirmDialog('Restaurar demostración', 'Se reemplazarán productos, categorías, configuración y pedidos por los datos de demostración. La contraseña no cambia. ¿Continuar?', 'Restaurar'))) return;
      state.categories = JSON.parse(JSON.stringify(window.SEED.categories));
      state.products = buildSeedProducts();
      state.settings = mergeSettings(null);
      state.orders = [];
      state.cart = [];
      save('categories', 'products', 'settings', 'orders', 'cart');
      toast('Datos de demostración restaurados.');
      render();
    }
  };

  function refocus(id, action) {
    const btn = $(`[data-action="${action}"][data-id="${CSS.escape(id)}"]`) ||
      $(`[data-card-actions="${CSS.escape(id)}"] button`);
    if (btn && !btn.disabled) btn.focus();
  }

  const formHandlers = {
    checkout: (form) => submitCheckout(form),
    product: (form, submitter) => submitProduct(form, submitter),
    settings: (form) => submitSettings(form),
    password: (form) => submitPassword(form),
    async login(form) {
      const ok = await verifyPassword(form.elements.password.value);
      if (!ok) {
        $('[data-login-error]', form).hidden = false;
        form.elements.password.select();
        return;
      }
      session.set(true);
      toast('Bienvenido al panel de administración.');
      if (location.hash === '#/admin/resumen') render();
      else navigate('#/admin/resumen');
    },
    'add-detail'(form) {
      const id = form.dataset.id;
      const p = getProduct(id);
      const qty = Math.floor(toNumber(form.elements.qty.value));
      if (!p || !(qty > 0)) { toast('Ingrese una cantidad válida.', 'error'); return; }
      setCartQty(id, cartQty(id) + qty);
      toast(`«${p.name}» agregado al carrito.`, 'ok', { href: '#/carrito', label: 'Ver carrito' });
      render();
    },
    'admin-product-filter'(form) {
      const p = new URLSearchParams();
      const q = form.elements.q.value.trim();
      if (q) p.set('q', q);
      if (form.elements.cat.value) p.set('cat', form.elements.cat.value);
      const qs = p.toString();
      navigate('#/admin/productos' + (qs ? '?' + qs : ''));
    },
    'category-add'(form) {
      const name = form.elements.name.value.trim();
      if (name.length < 2) { toast('El nombre de la categoría es demasiado corto.', 'error'); return; }
      if (state.categories.some((c) => normalize(c.name) === normalize(name))) { toast('Ya existe una categoría con ese nombre.', 'error'); return; }
      let id = slugify(name);
      while (getCategory(id)) id = `${slugify(name)}-${Math.random().toString(36).slice(2, 5)}`;
      state.categories.push({ id, name });
      save('categories');
      toast(`Categoría «${name}» creada.`);
      render();
      $('#cat-new') && $('#cat-new').focus();
    },
    'category-rename'(form) {
      const c = getCategory(form.dataset.id);
      const name = form.elements.name.value.trim();
      if (!c) return;
      if (name.length < 2) { toast('El nombre de la categoría es demasiado corto.', 'error'); return; }
      if (state.categories.some((x) => x.id !== c.id && normalize(x.name) === normalize(name))) { toast('Ya existe una categoría con ese nombre.', 'error'); return; }
      c.name = name;
      save('categories');
      toast('Categoría actualizada.');
      render();
    }
  };

  const changeHandlers = {
    'order-filter'(el) {
      navigate('#/admin/pedidos' + (el.value ? '?estado=' + encodeURIComponent(el.value) : ''));
    },
    async 'order-status'(el) {
      const o = state.orders.find((x) => x.id === el.dataset.id);
      if (!o) return;
      const next = el.value;
      if (next === 'Cancelado') {
        const ok = await confirmDialog('Cancelar pedido', `¿Cancelar el pedido ${o.code}? Las unidades se devolverán al inventario y el estado ya no podrá modificarse.`, 'Cancelar pedido');
        if (!ok) { el.value = o.status; return; }
        if (!o.restocked) {
          o.items.forEach((it) => {
            const p = getProduct(it.id);
            if (p) p.stock += it.qty;
          });
          o.restocked = true;
          save('products');
        }
      }
      o.status = next;
      save('orders');
      toast(`Pedido ${o.code}: ${next}.`);
      const openId = o.id;
      render();
      const sel = $(`[data-action-change="order-status"][data-id="${CSS.escape(openId)}"]`);
      if (sel) sel.closest('details').open = true;
    }
  };

  function bindGlobalEvents() {
    const app = $('#app');

    app.addEventListener('click', (e) => {
      const el = e.target.closest('[data-action]');
      if (!el || !app.contains(el)) return;
      const fn = actions[el.dataset.action];
      if (fn) { e.preventDefault(); fn(el, e); }
    });

    app.addEventListener('submit', (e) => {
      const form = e.target.closest('form[data-form]');
      if (!form) return;
      const fn = formHandlers[form.dataset.form];
      if (fn) { e.preventDefault(); fn(form, e.submitter); }
    });

    app.addEventListener('change', (e) => {
      const el = e.target;
      if (el.dataset.actionChange && changeHandlers[el.dataset.actionChange]) {
        changeHandlers[el.dataset.actionChange](el);
        return;
      }
      if (el.dataset.filter === 'ofertas' || el.dataset.filter === 'disponibles') {
        const f = currentCatalogFilters();
        f[el.dataset.filter] = el.checked;
        applyCatalogFilters(f, false);
      } else if (el.dataset.filter === 'orden') {
        const f = currentCatalogFilters();
        f.orden = el.value;
        applyCatalogFilters(f, false);
      }
    });

    const onCatalogSearch = debounce((value) => {
      const f = currentCatalogFilters();
      f.q = value.trim();
      applyCatalogFilters(f, false);
    }, 220);
    app.addEventListener('input', (e) => {
      if (e.target.dataset.filter === 'q') onCatalogSearch(e.target.value);
    });

    // Barra de búsqueda del encabezado
    $('#header-search').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = $('#header-search-input');
      const q = input.value.trim();
      closeNav();
      navigate('#/productos' + (q ? '?q=' + encodeURIComponent(q) : ''));
      input.value = '';
    });

    // Menú móvil
    const toggle = $('.nav-toggle');
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-open', open);
    });
    $('#main-nav').addEventListener('click', (e) => { if (e.target.closest('a')) closeNav(); });

    window.addEventListener('hashchange', () => {
      render();
      window.scrollTo(0, 0);
      $('#main').focus({ preventScroll: true });
    });

    // Sincroniza entre pestañas abiertas
    window.addEventListener('storage', (e) => {
      if (!e.key || !Object.values(KEYS).includes(e.key) || e.key === KEYS.session) return;
      loadState();
      const sec = parseHash().parts[0];
      if (sec !== 'pago' && !(sec === 'admin' && document.activeElement && document.activeElement.closest('form'))) render();
      else updateChrome();
    });
  }

  function closeNav() {
    const toggle = $('.nav-toggle');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  /* ---------------------------------------------------------------------
     Inicio
     --------------------------------------------------------------------- */
  async function init() {
    loadState();
    bindGlobalEvents();
    render();
    try {
      await ensureAuth();
    } catch (_) {
      /* sin almacenamiento disponible: el inicio de sesión fallará de forma segura */
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
