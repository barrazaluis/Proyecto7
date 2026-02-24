# 🏕️ Nómada Outdoor – Proyecto 7 (Ecommerce MERN)

**Nómada Outdoor** es una aplicación Fullstack de comercio electrónico desarrollada con la arquitectura **MERN** (MongoDB, Express, React y Node.js).  
Este proyecto corresponde al módulo final e integra mejoras y funcionalidades avanzadas basadas en los proyectos 3 y 6, incorporando autenticación, carrito persistente y pagos en línea mediante **MercadoPago**.

La plataforma permite explorar productos outdoor, gestionar un carrito de compras, autenticarse como usuario y realizar pagos de prueba en CLP.

---

## 🚀 Tecnologías Utilizadas

### 🎨 Frontend
- React + Vite  
- React Router DOM  
- Context API (Autenticación y Carrito)  
- Fetch API  
- CSS personalizado y responsive  

### ⚙️ Backend
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- JWT (Autenticación)  
- MercadoPago Checkout Pro  

### ☁️ Infraestructura
- Frontend: Render (Static Site)  
- Backend: Render (Web Service)  
- Base de datos: MongoDB Atlas  
- Control de versiones: Git + GitHub  
- Entorno de desarrollo: Windows  

---

## ✨ Funcionalidades Principales

- 🛍️ Catálogo dinámico de productos almacenados en MongoDB  
- 🔐 Registro e inicio de sesión con autenticación JWT  
- 🛒 Carrito de compras persistente mediante Context API  
- 💳 Integración de pagos con MercadoPago (Checkout Pro)  
- 📦 Generación y registro de órdenes de compra  
- 👤 Panel de usuario (Mi Cuenta)  
- 🌐 Despliegue completo en Render (Frontend + Backend)  
- 📱 Diseño responsive adaptable a distintos dispositivos  

---

## 🌍 Proyecto en Producción

- **API Backend:**  
  https://proyecto7-44c6.onrender.com  

- **Frontend (Aplicación Web):**  
  https://proyecto7-1-hf71.onrender.com/

---

## 📦 Instalación y Ejecución Local

### Repositorio Git  
https://github.com/barrazaluis/Proyecto7.git

---

## 🧪 Datos de Prueba – MercadoPago

Para realizar compras de prueba, agrega productos al carrito y finaliza la compra.  
El sistema solicitará registro o inicio de sesión.

**Usuario de prueba:**  
`TESTUSER232417951203667369`

**Contraseña:**  
`2ussUQt0cp`

**Código de verificación:**  
`662312`

**ID asociado:**  
`3221662312`

---

## 🛠️ Gestión de Productos (Administración)

El ingreso de nuevos productos se realiza mediante la documentación interactiva del backend:

👉 https://proyecto7-44c6.onrender.com/api-docs/#/ mediante POST /api/product/create

Requiere una **cuenta de administración** (no incluida públicamente).

---