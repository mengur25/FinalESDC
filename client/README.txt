E-Commerce Website (React + Spring Boot)

A full-stack e-commerce web application built with **React (Frontend)** and **Spring Boot (Backend)**.  
It provides core e-commerce features such as user authentication, product management, cart, checkout, address management, and payment integration via **Razorpay** and **Stripe**.

---

## Features

### Frontend (React + Redux Toolkit + MUI)
- User authentication and protected routes  
- Manage multiple delivery addresses (Add / Edit / Delete / Select)  
- Dynamic checkout page:
  - Select saved address or add a new one  
  - Choose payment gateway (Razorpay or Stripe)  
  - Auto redirect to payment page after order creation  
- Modern UI built with **Material UI** and responsive layout  

### Backend (Spring Boot)
- JWT-based authentication  
- CRUD for Address and Product models  
- Order creation based on user's cart and selected address  
- Payment integration:
  - **Razorpay** (via Payment Link API)  
  - **Stripe** (via Payment Link API)
- Stores payment status and order history in database  

---

## Project Structure

ecommerce/
├── backend/
│ ├── src/main/java/com/project/ecommerce/
│ │ ├── controllers/
│ │ ├── services/
│ │ ├── models/
│ │ ├── repository/
│ │ └── request/
│ └── application.properties
└── frontend/
├── src/
│ ├── components/
│ ├── redux/
│ ├── pages/
│ └── App.tsx

yaml


---

## 🧑‍💻 Setup Instructions

### 1️⃣ Backend (Spring Boot)
```bash
# Navigate to backend
cd backend

# Build and run
mvn spring-boot:run
Configure your database and payment keys in application.properties:

properties
Sao chép mã
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=root
spring.datasource.password=yourpassword

razorpay.key_id=your_key_id
razorpay.key_secret=your_secret
stripe.api_key=your_stripe_api_key
2️⃣ Frontend (React)
bash
Sao chép mã
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start