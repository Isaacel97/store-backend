# 📄 README / Manual de Usuario
Este proyecto es una aplicación backend para gestionar una tienda en línea. Proporciona funcionalidades para manejar productos, usuarios, autenticación y generación de reportes de ventas.

## 1️⃣ Requisitos

- Node.js >= 20
- MySQL >= 8
- TypeScript
- npm / yarn
- Configuración de .env para variables de conexión a la DB y JWT

## 2️⃣ Instalación
```bash
git clone <repository-url>
cd store-backend
npm install
cp .env.example .env
# Configura las variables DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET
npm run dev
```

## 3️⃣ Autenticación
### Registro de Usuario
- Endpoint: `POST /api/auth/register`
- Body: `{ "username": "vendedor1", "email": "vendedor1@email.com", "password": "Vendedor.123", "full_name": "Juan Pérez", "role": "seller"}`

### Inicio de Sesión
- Endpoint: `POST /api/auth/login`
- Body: `{ "username": "vendedor1", "password": "Vendedor.123" }`
- Respuesta: `{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ2ZW5kZWRvcjEiLCJpYXQiOjE2OTg0NzY4MDAsImV4cCI6MTY5ODU2MzIwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", "user": { "id": 1, "username": "vendedor1", "role": "seller" } }`

## 4️⃣ Productos
### Obtener Productos
- Endpoint: `GET /api/products`
- Respuesta: Lista de productos.

### Crear Producto
- Endpoint: `POST /api/products`
- Body: `{"sku": "PROD001", "name": "Producto A", "price": 150.00, "type": "Electrónica", "status": "active"}`
- Respuesta: Producto creado.

### Actualizar Producto
- Endpoint: `PUT /api/products/:id`
- Path Params: `:id` ID del producto a actualizar
- Body: `{"name": "Producto A Actualizado", "image_url": "https://example.com/image.jpg", "price": 175.00, "type": "Electrónica", "status": "active"}`
- Respuesta: Producto actualizado.

### Eliminar Producto
- Endpoint: `DELETE /api/products/:id`
- Path Params: `:id` ID del producto a eliminar
- Respuesta: Producto eliminado.

### Actualizar Stock
- Endpoint: `PATCH /api/products/:id/stock`
- Path Params: `:id` ID del producto
- Body: `{"quantity": 50, "reason": "New stock arrival", "user_id": 1}`
- Respuesta: Stock actualizado.

## 5️⃣ Inventario
### Consultar stock
- Endpoint: `GET /api/inventory`
- Respuesta: Inventario actual

### Obtener stock de un producto
- Endpoint: `GET /api/inventory/:productId`
- Path Params: `:productId` ID del producto
- Respuesta: Stock del producto

## 6️⃣ Ventas
### Obtener Ventas
- Endpoint: `GET /api/sales`
- Respuesta: Lista de ventas.

### Crear Venta
- Endpoint: `POST /api/sales`
- Body: `{"seller_id": 1, "items": [{"product_id": 1, "qty": 2, "price": 150.00}]}`
- Respuesta: Venta creada.

### Revertir Venta
- Endpoint: `POST /api/sales/revert`
- Body: `{"sale_id": 1}`

## 7️⃣ Asistencia y Horarios
### Crear turno para un usuario
- Endpoint: `POST /api/shifts`
- Body: `{"user_id": 3, "day_of_week": 1, "start_time": "08:00", "end_time": "16:00"}`

### Registrar entrada
- Endpoint: `POST /api/attendance/clockin`
- Body: `{"user_id": 3}`
- Respuesta: Registro de entrada exitoso.

### Registrar salida
- Endpoint: `POST /api/attendance/clockout`
- Body: `{"user_id": 3}`
- Respuesta: Registro de salida exitoso.

### Historial de asistencia
- Endpoint: `GET /api/attendance?userId=3&from=2025-10-01&to=2025-10-31`
- Respuesta: Historial de asistencia

## 8️⃣ Reportes
### Reporte de ventas diarias
- Endpoint: `GET /api/reports/sales/daily?from=2025-10-01&to=2025-10-23`
- Respuesta: Reporte de ventas diarias

### Reporte de stock bajo
- Endpoint: `GET /api/reports/stock/low`
- Respuesta: Lista de productos con stock bajo
- Criterio: stock menor a 5 unidades

### Ventas por vendedor
- Endpoint: `GET /api/reports/sales/sellers?from=2025-10-01&to=2025-10-23`
- Respuesta: Ventas agrupadas por vendedor

### Movimientos de inventario
- Endpoint: `GET /api/reports/inventory/movements?limit=20&offset=0`
- Respuesta: Lista de movimientos de inventario con paginación

## 9️⃣ Seguridad
- Passwords en bcrypt
- Autenticación con JWT
- Todas las rutas protegidas requieren el token en Authorization

## 1️⃣0️⃣ Notas finales
- Para producción, usar HTTPS y no exponer directamente la DB.
- El frontend puede consumir los endpoints de forma segura y mostrar reportes, stock, ventas y asistencia.
- Todos los endpoints están listos para integrarse con tu UI de prueba.