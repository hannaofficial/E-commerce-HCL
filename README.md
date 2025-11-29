# 🛍️ Full-Stack E-Commerce Web App

A fully functional e-commerce platform featuring role-based authentication, product management, cart system, and instant purchase functionality. This project enables **Admins (sellers)** to upload and manage products, while **Users** can browse, add to cart, and purchase items.  

---

## 🚀 Deployment

> Hosted on: ****

---

## 🏗️ Tech Stack

### **Frontend**
- React.js  
- Tailwind CSS  
- Redux Toolkit (with caching)

### **Backend**
- Node.js  
- Express.js  

### **Database**
- MongoDB (via Mongoose)

### **Authentication**
- JWT-based Authentication  
- Role-based Access Control

---

## 🧠 Core Features

### 🔑 Authentication
- Login & Register using JWT
- Protected routes for Admin & User dashboard
- Tokens stored securely in HTTP-only cookies

---

### 👤 User-Side Features
- 🔍 Browse all products
- 📝 View product details
- 🛒 Add products to cart
- ⚡ **Buy Now** to skip cart and go directly to checkout
- 🛍️ View cart and proceed to purchase
- 🎟️ Smooth state-managed flow using Redux

---

### 🛠️ Admin-Side Features (Seller Workflow)
- ➕ Add new products (title, price, image, description, stock etc.)
- ✏️ Edit & manage listed products
- 📦 Added products instantly visible to users on Home Page

---

## 🧭 Workflow Overview

### From Home Page → Two Paths

| Role | Action | Next Page |
|------|--------|-----------|
| **User** | Click product | → Add to Cart / Buy Now → Cart or Checkout |
| **Admin** | Login | → Add Product Dashboard → Product visible to users |

---

### Add to Cart vs Buy Now Behavior

| Action | Flow |
|--------|------|
| **Add to Cart** | Product stored in cart → User taken to Cart Page |
| **Buy Now** | Skips cart → Opens Product Detail → Checkout |

---


---

## 🧪 Example API Routes

| Method | Route | Description |
|--------|--------|------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and get token |
| GET | `/products` | Get all products |
| POST | `/products` *(Admin)* | Add product for selling |
| POST | `/cart/add` | Add product to user cart |
| GET | `/checkout/buy-now` | Buy instantly |

---



