<p align="center">
  <picture>
    <source srcset="./banner-dark.png" media="(prefers-color-scheme: dark)">
    <source srcset="./banner.png" media="(prefers-color-scheme: light)">
    <img src="./banner.png" alt="Better Auth Logo">
  </picture>
  <h2 align="center">
    Better Auth Starter
  </h2>
  <p align="center">
    A simple authentication starter with Next.js, Better Auth, Tailwind CSS, and shadcn/ui
    <br />
    <a href="https://better-auth.com"><strong>Learn more »</strong></a>
    <br />
    <br />
    <a href="https://discord.gg/better-auth">Discord</a>
    ·
    <a href="https://better-auth.com">Website</a>
    ·
    <a href="https://github.com/better-auth/better-auth/issues">Issues</a>
  </p>
</p>
 
 [![npm version](https://img.shields.io/npm/v/better-auth.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/better-auth)
 [![GitHub stars](https://img.shields.io/github/stars/better-auth/better-auth?style=flat&colorA=000000&colorB=000000)](https://github.com/better-auth/better-auth/stargazers)

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

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
 - Drizzle ORM with Neon Database
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
