import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { SignOutAction } from "./actions/auth";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <>
        <div className="flex h-full flex-col">
          <main className="flex-1 flex items-center justify-center px-8 py-12">
            <div className="max-w-3xl text-center">
              <h1 className="text-4xl font-bold">Better Auth Starter</h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                This is a starter project for Better Auth with Next.js 13, Drizzle
                ORM, and PostgreSQL.
              </p>

              <div className="mt-8 flex justify-center gap-4">
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline">Sign Up</Button>
                </Link>
              </div>
            </div>
          </main>

          <footer className="flex flex-col items-center justify-center border-t p-4">
            <a
              className="flex items-center gap-2"
              href="https://betterauth.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by Better Auth
            </a>
            <div className="mt-2 text-sm text-muted-foreground">
              Made with <span aria-hidden>💖</span> by Anakin
            </div>
          </footer>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex h-full flex-col">
        <main className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="max-w-3xl text-center">
            <h1 className="text-3xl font-semibold">Welcome back {session.user.name}</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              You are signed in.
            </p>
            <form action={SignOutAction} className="mt-8">
              <Button type="submit" variant="destructive">
                Sign Out
              </Button>
            </form>
          </div>
        </main>

        <footer className="flex flex-col items-center justify-center border-t p-4">
            <a
              className="flex items-center gap-2"
              href="https://betterauth.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by Better Auth
            </a>
            <div className="mt-2 text-sm text-muted-foreground">
              Made with <span aria-hidden>💖</span> by Anakin
            </div>
          </footer>
        </div>
    </>
  );
}
