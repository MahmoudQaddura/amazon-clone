# E-store built with Next.js:

- Next.js Framework
- Tailwind CSS
- Redux store
- Prisma ORM & Postgres database (ERD image available inside prisma folder)
- database stores products, users and orders
- NextAuth with Google Provider and Credentials Provider connected to the database
- Stripe checkout
- Webhook that registers orders to database
- Vercel deployment

# Installation Steps

Run commands

1. `npm install`

2. `npm run dev`

### runs stripe emulator to test webhook locally on localhost:3000

3. `npm run listen`

### prisma script to be used with the dotenv package due to .env.local name conflict

4. `npm run prisma-push||prisma-studio||prisma-gen`

# Needed environment variables to run this project

## Create a .env.local file in the root directory with the following

HOST=

### Authentication through https://console.developers.google.com

GOOGLE_ID=
GOOGLE_SECRET=
NEXTAUTH_URL=
NEXTAUTH_SECRET=

### Stripe. Create a stripe account and get these varaibles from there.

STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=

### Stripe Terminal/CLI

STRIPE_SIGNING_SECRET=

### Postgres. You can make a local db or get one through the storage option on Vercel

POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
