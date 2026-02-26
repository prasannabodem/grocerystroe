# FreshMart - Online Grocery Store

A fully functional grocery store built with Next.js 16, MongoDB, and custom authentication.

## Features

- Browse products by category
- Add items to shopping cart
- User authentication (signup/login)
- Guest checkout available
- Order tracking
- Delivery address and order notes
- Responsive design with fresh green theme

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: MongoDB
- **Authentication**: Custom JWT-based auth with bcrypt
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Context API
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- MongoDB database (local or cloud like MongoDB Atlas)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Seed the database with sample products:
```bash
pnpm seed
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── products/      # Product endpoints
│   │   ├── categories/    # Categories endpoint
│   │   └── orders/        # Order endpoints
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── orders/            # Order confirmation
│   ├── products/          # Products listing and detail
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # UI components (shadcn)
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   └── AuthDialog.tsx     # Login/signup modal
├── contexts/
│   ├── AuthContext.tsx    # Authentication state
│   └── CartContext.tsx    # Shopping cart state
├── lib/
│   ├── models/            # MongoDB models
│   │   ├── User.ts        # User model
│   │   ├── Product.ts     # Product model
│   │   └── Order.ts       # Order model
│   ├── mongodb.ts         # MongoDB connection
│   └── auth.ts            # JWT utilities
└── scripts/
    └── seed-products.ts   # Database seeding script
```

## Features Overview

### Products
- 20+ sample products across 6 categories
- Product images (emoji placeholders)
- Stock management
- Featured products
- Category filtering

### Shopping Cart
- Add/remove items
- Update quantities
- Persistent cart (localStorage)
- Real-time total calculation

### Checkout
- Guest or authenticated checkout
- Collect customer information
- Delivery address
- Order notes
- Order confirmation page

### Authentication
- Custom JWT-based authentication
- Secure password hashing with bcrypt
- Persistent sessions
- User profile data

### Categories
- Fruits
- Vegetables
- Dairy
- Meat
- Bakery
- Pantry

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/[id]` - Get single product

### Categories
- `GET /api/categories` - Get all categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders (auth required)
- `GET /api/orders/[id]` - Get order details

## Database Models

### User
- Name, email, password (hashed)
- Phone, address (optional)
- Timestamps

### Product
- Name, description, price
- Category, unit, stock
- Featured flag
- Timestamps

### Order
- Customer information
- Order items (with product details)
- Pricing breakdown
- Delivery address
- Order notes
- Status tracking
- Timestamps

## Customization

### Adding Products
Edit `scripts/seed-products.ts` to add more products, then run:
```bash
pnpm seed
```

### Changing Theme
Edit color variables in `app/globals.css` under `:root` to customize the color scheme.

### Adding Categories
Simply add products with new category names - they'll automatically appear in the category filter.

## Production Deployment

1. Set up MongoDB database
2. Configure environment variables in Vercel
3. Deploy to Vercel:
```bash
vercel deploy
```

## License

MIT
