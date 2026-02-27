FreshMart - Online Grocery Store

A fully functional grocery store built with Next.js 16, MongoDB, and custom authentication.

🎥 Demo Video

Watch the full working demo here:
👉 https://drive.google.com/file/d/1it2IzPLJw6vRG-LuojHITPi3qdeV-iph/view?usp=sharing 

Features

Browse products by category

Add items to shopping cart

User authentication (signup/login)

Guest checkout available

Order tracking

Delivery address and order notes

Responsive design with fresh green theme

Tech Stack

Framework: Next.js 16 (App Router)

Database: MongoDB

Authentication: Custom JWT-based auth with bcrypt

Styling: Tailwind CSS

UI Components: Radix UI + shadcn/ui

State Management: React Context API

Notifications: Sonner

Getting Started
Prerequisites

Node.js 18+ and pnpm

MongoDB database (local or cloud like MongoDB Atlas)

Environment Variables

Create a .env.local file in the root directory:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
Installation

Install dependencies:

pnpm install

Seed the database with sample products:

pnpm seed

Run the development server:

pnpm dev

Open http://localhost:3000
 in your browser.

Project Structure
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── products/
│   │   ├── categories/
│   │   └── orders/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   ├── products/
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── AuthDialog.tsx
├── contexts/
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── lib/
│   ├── models/
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   └── Order.ts
│   ├── mongodb.ts
│   └── auth.ts
└── scripts/
    └── seed-products.ts
Features Overview
Products

20+ sample products across 6 categories

Product images (emoji placeholders)

Stock management

Featured products

Category filtering

Shopping Cart

Add/remove items

Update quantities

Persistent cart (localStorage)

Real-time total calculation

Checkout

Guest or authenticated checkout

Collect customer information

Delivery address

Order notes

Order confirmation page

Authentication

Custom JWT-based authentication

Secure password hashing with bcrypt

Persistent sessions

User profile data

Categories

Fruits

Vegetables

Dairy

Meat

Bakery

Pantry

API Endpoints
Authentication

POST /api/auth/signup

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/me

Products

GET /api/products

GET /api/products/[id]

Categories

GET /api/categories

Orders

POST /api/orders

GET /api/orders

GET /api/orders/[id]

Database Models
User

Name, email, password (hashed)

Phone, address (optional)

Timestamps

Product

Name, description, price

Category, unit, stock

Featured flag

Timestamps

Order

Customer information

Order items (with product details)

Pricing breakdown

Delivery address

Order notes

Status tracking

Timestamps

Customization
Adding Products

Edit:

scripts/seed-products.ts

Then run:

pnpm seed
Changing Theme

Edit color variables in:

app/globals.css

under :root.

Adding Categories

Add products with new category names. They will automatically appear in the filter.

Production Deployment

Set up MongoDB database

Configure environment variables in Vercel

Deploy:

vercel deploy
License

MIT
