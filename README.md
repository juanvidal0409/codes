# Supermercado en línea

Sitio web completo para un supermercado: catálogo, carrito, pago con varios métodos y un **perfil de administrador** para gestionar la tienda. Hecho con HTML, CSS y JavaScript, sin dependencias ni compilación.

## Cómo usarlo

Abra `index.html` en el navegador, o sírvalo localmente:

```bash
python3 -m http.server 8000
# luego visite http://localhost:8000
```

## Funciones

**Tienda**
- Inicio con categorías, productos destacados y ofertas.
- Catálogo con búsqueda, filtro por categoría, "solo ofertas", "solo disponibles" y orden por precio o nombre.
- Página de detalle de cada producto.
- **Carrito**: cambiar cantidades, eliminar, vaciar, ahorro por ofertas y barra de progreso hacia el envío gratis.
- **Pago** con entrega a domicilio o retiro en tienda, fecha y franja horaria, y métodos de pago:
  tarjeta de crédito/débito (con validación y cuotas), transferencia bancaria, PayPal, billetera digital
  (Apple Pay, Google Pay, Mercado Pago), efectivo contra entrega (calcula el cambio) y tarjeta contra entrega.
- Comprobante del pedido imprimible.

**Perfil de administrador** (`Administrador` en el menú, contraseña inicial `admin123`)
- **Resumen**: ventas, ticket promedio, pedidos por atender, stock bajo y ventas por método de pago.
- **Productos**: agregar, editar, ocultar y eliminar. Nombre, categoría, precio, precio de oferta, unidad, stock, descripción, imagen (subida desde el equipo o por URL) y destacado.
- **Categorías**: crear, renombrar y eliminar.
- **Pedidos**: ver el detalle y cambiar el estado (al cancelar, el stock se devuelve al inventario).
- **Configuración**: datos de la tienda, moneda, impuestos, costo de envío y envío gratis, métodos de pago habilitados, datos bancarios, cambio de contraseña, exportar/importar copia de seguridad (JSON) y restaurar los datos de demostración.

## Importante

- Los datos se guardan en el **almacenamiento local del navegador** (`localStorage`). Cada navegador o equipo tiene sus propios datos; use *Exportar copia* para respaldarlos o trasladarlos.
- Los pagos son **simulados**: no se cobra dinero ni se guarda el número completo de la tarjeta. Para cobrar de verdad hay que integrar una pasarela de pago (Stripe, Mercado Pago, PayPal, etc.) desde un servidor.
- La contraseña del administrador se verifica en el navegador, lo que sirve para una demostración o uso interno, pero **no es una protección real**. Para publicar la tienda se necesita un backend con autenticación y una base de datos.

## Estructura

```
index.html            Estructura de la página
assets/css/styles.css Estilos (paleta minimalista, Cormorant Garamond + Source Sans 3)
assets/js/data.js     Datos de demostración y configuración inicial
assets/js/app.js      Lógica de la tienda, el carrito, el pago y el panel de administración
```
