import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import * as schema from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { EmailService } from "./email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // (pg or mysql)
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Disabled: Need to implement /verify-email page, sendVerificationEmail handler, and resend verification UI if its wanted
    sendResetPassword: async ({ user, url }) => {
      try {
        const result = await EmailService.sendPasswordReset(
          user.email,
          url,
          user.name
        );
        if (!result.success) {
          console.error("Failed to send password reset email:", result.error);
        } else {
          console.log(
            "Password reset email sent successfully:",
            result.messageId
          );
        }
      } catch (error) {
        console.error("Error sending password reset email:", error);
      }
    },
  },
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //   },
  //   apple: {
  //     clientId: process.env.APPLE_CLIENT_ID!,
  //     clientSecret: process.env.APPLE_CLIENT_SECRET!,
  //   },
  //   meta: {
  //     clientId: process.env.META_CLIENT_ID!,
  //     clientSecret: process.env.META_CLIENT_SECRET!,
  //   },
  // },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  plugins: [nextCookies()],
});
