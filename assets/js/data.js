/* Datos iniciales de demostración.
   Se cargan solo la primera vez (o al usar "Restaurar datos de demostración"). */
window.SEED = {
  categories: [
    { id: 'frutas-verduras', name: 'Frutas y verduras' },
    { id: 'lacteos-huevos', name: 'Lácteos y huevos' },
    { id: 'panaderia', name: 'Panadería' },
    { id: 'carnes-pescados', name: 'Carnes y pescados' },
    { id: 'despensa', name: 'Despensa' },
    { id: 'bebidas', name: 'Bebidas' },
    { id: 'limpieza', name: 'Limpieza del hogar' },
    { id: 'cuidado-personal', name: 'Cuidado personal' }
  ],

  products: [
    { name: 'Manzana roja', category: 'frutas-verduras', price: 2.40, offerPrice: null, unit: 'kg', stock: 80, featured: true, description: 'Manzanas rojas crujientes y dulces, seleccionadas a mano.' },
    { name: 'Plátano', category: 'frutas-verduras', price: 1.60, offerPrice: 1.35, unit: 'kg', stock: 120, featured: false, description: 'Plátanos maduros, ideales para desayunos y batidos.' },
    { name: 'Aguacate', category: 'frutas-verduras', price: 1.10, offerPrice: null, unit: 'unidad', stock: 60, featured: true, description: 'Aguacate cremoso en su punto justo de maduración.' },
    { name: 'Tomate', category: 'frutas-verduras', price: 2.10, offerPrice: null, unit: 'kg', stock: 70, featured: false, description: 'Tomate fresco para ensaladas y salsas.' },
    { name: 'Leche entera', category: 'lacteos-huevos', price: 1.25, offerPrice: null, unit: 'litro', stock: 150, featured: true, description: 'Leche entera pasteurizada, envase de 1 litro.' },
    { name: 'Huevos frescos', category: 'lacteos-huevos', price: 3.20, offerPrice: 2.90, unit: 'docena', stock: 45, featured: false, description: 'Docena de huevos de gallina de corral.' },
    { name: 'Queso fresco', category: 'lacteos-huevos', price: 4.50, offerPrice: null, unit: '500 g', stock: 30, featured: false, description: 'Queso fresco suave, perfecto para desayunos.' },
    { name: 'Yogur natural', category: 'lacteos-huevos', price: 0.85, offerPrice: null, unit: 'unidad', stock: 90, featured: false, description: 'Yogur natural sin azúcar añadido, 125 g.' },
    { name: 'Pan de molde integral', category: 'panaderia', price: 2.30, offerPrice: null, unit: 'unidad', stock: 40, featured: true, description: 'Pan integral de molde con semillas, 500 g.' },
    { name: 'Baguette', category: 'panaderia', price: 0.95, offerPrice: null, unit: 'unidad', stock: 50, featured: false, description: 'Baguette horneada cada mañana.' },
    { name: 'Pechuga de pollo', category: 'carnes-pescados', price: 7.90, offerPrice: 6.95, unit: 'kg', stock: 25, featured: true, description: 'Pechuga de pollo fresca, sin piel.' },
    { name: 'Filete de salmón', category: 'carnes-pescados', price: 16.50, offerPrice: null, unit: 'kg', stock: 12, featured: false, description: 'Salmón fresco en filetes, listo para cocinar.' },
    { name: 'Arroz blanco', category: 'despensa', price: 1.80, offerPrice: null, unit: 'kg', stock: 100, featured: false, description: 'Arroz de grano largo, bolsa de 1 kg.' },
    { name: 'Aceite de oliva virgen extra', category: 'despensa', price: 8.40, offerPrice: 7.60, unit: 'litro', stock: 35, featured: true, description: 'Aceite de oliva virgen extra de primera prensada en frío.' },
    { name: 'Pasta espagueti', category: 'despensa', price: 1.15, offerPrice: null, unit: '500 g', stock: 110, featured: false, description: 'Espaguetis de sémola de trigo duro.' },
    { name: 'Café molido', category: 'despensa', price: 5.20, offerPrice: null, unit: '250 g', stock: 4, featured: false, description: 'Café 100 % arábica de tueste medio.' },
    { name: 'Agua mineral', category: 'bebidas', price: 0.60, offerPrice: null, unit: '1,5 L', stock: 200, featured: false, description: 'Agua mineral natural de manantial.' },
    { name: 'Jugo de naranja', category: 'bebidas', price: 2.70, offerPrice: null, unit: 'litro', stock: 40, featured: false, description: 'Jugo de naranja exprimido, sin azúcar añadido.' },
    { name: 'Detergente líquido', category: 'limpieza', price: 9.90, offerPrice: 8.50, unit: '3 L', stock: 20, featured: false, description: 'Detergente para ropa, 40 lavados.' },
    { name: 'Lavavajillas', category: 'limpieza', price: 2.20, offerPrice: null, unit: '750 ml', stock: 3, featured: false, description: 'Lavavajillas concentrado con aroma a limón.' },
    { name: 'Champú suave', category: 'cuidado-personal', price: 3.90, offerPrice: null, unit: '400 ml', stock: 28, featured: false, description: 'Champú de uso diario para todo tipo de cabello.' },
    { name: 'Pasta dental', category: 'cuidado-personal', price: 2.50, offerPrice: null, unit: '100 ml', stock: 0, featured: false, description: 'Pasta dental con flúor y protección completa.' }
  ],

  settings: {
    storeName: 'Mercado Central',
    tagline: 'Calidad de siempre, a la puerta de su casa',
    address: 'Av. Principal 123, Centro',
    phone: '+1 (555) 010-2030',
    email: 'contacto@mercadocentral.com',
    hours: 'Lunes a sábado de 8:00 a 21:00 · Domingos de 9:00 a 14:00',
    currency: 'USD',
    taxRate: 0,
    pricesIncludeTax: true,
    shippingCost: 3.5,
    freeShippingFrom: 40,
    lowStockThreshold: 5,
    bank: {
      bankName: 'Banco Nacional',
      holder: 'Mercado Central S.A.',
      account: '0001 2345 6789 0123 4567',
      reference: 'Indique su número de pedido como concepto'
    },
    payments: {
      card: true,
      transfer: true,
      paypal: true,
      wallet: true,
      cash: true,
      cardOnDelivery: true
    }
  },

  // Contraseña inicial del perfil de administrador: "admin123"
  defaultAdminPassword: 'admin123'
};
