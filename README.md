# Better Auth Starter 🔐

A simple authentication starter with Next.js, Better Auth, Tailwind CSS, and shadcn/ui.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

## Environment Variables

```env
DATABASE_URL="your-database-url"
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
```

## What's Included

-  Next.js 14+ with App Router
-  Better Auth for authentication
-  Tailwind CSS for styling
-  shadcn/ui components
-  TypeScript

## Project Structure

```
app/
  (auth)/          # Login, register pages
  (protected)/     # Protected routes
lib/
  auth.ts          # Better Auth config
components/
  ui/              # shadcn/ui components
```

## Add shadcn Components

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add form
npx shadcn-ui@latest add card
```

## Resources

- [Better Auth Docs](https://better-auth.com)
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)