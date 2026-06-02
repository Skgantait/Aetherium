# Aetherium Backend Setup Guide

## Overview
This project now includes:
- **Stripe** for payment processing
- **Supabase** for database storage (PostgreSQL)

## Step 1: Set up Supabase

### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Copy your **Project URL** and **Anon Key** from Project Settings → API

### Create Database Tables

In Supabase Dashboard, run these SQL queries:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  stripe_payment_intent_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security) for security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
```

## Step 2: Set up Stripe

### Create a Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Sign up or log in
3. Go to Developers → API Keys
4. Copy your **Secret Key** (starts with `sk_test_` for testing)

### Get Webhook Secret
1. In Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhook`
3. Select events: `payment_intent.succeeded` and `payment_intent.payment_failed`
4. Copy the **Signing Secret**

## Step 3: Configure Environment Variables

Create/update `.env.local`:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc... (your anon key)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (your service role key)

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Step 4: Use the API Endpoints

### Frontend Payment Example
```typescript
import { createPaymentSession } from "@/lib/stripe-client";

// When user clicks checkout
await createPaymentSession(userId, 49.99, [
  { product_id: "prod-123", quantity: 1, price: 49.99 },
]);
```

### Available API Endpoints

**POST /api/payment/intent**
- Create payment intent and order
- Body: `{ amount, userId, orderItems }`

**POST /api/webhook**
- Stripe webhook handler (auto-updates order status)

**GET /api/products**
- Get all products

**GET /api/products/:id**
- Get single product

**GET /api/orders?userId=USER_ID**
- Get all orders for a user

**GET /api/orders/:id**
- Get single order with items

## Step 5: Deploy

When deploying to Cloudflare Workers:
1. Set production environment variables in Wrangler or Cloudflare Dashboard
2. Ensure webhook URL is accessible from Stripe
3. Test webhook delivery in Stripe Dashboard

## Security Notes
- Service role key should only be used server-side (in `src/server.ts`)
- Never expose secret keys in frontend code
- Use Supabase RLS policies to secure data
- Validate all payment amounts server-side

## Next Steps
1. Add sample products to Supabase
2. Build checkout UI in React components
3. Implement user authentication
4. Add order history page
