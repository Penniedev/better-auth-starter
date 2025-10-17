// Export all templates
export * from "./base";
export * from "./password-reset";
export * from "./email-verification";
export * from "./welcome";

// Re-export commonly used types
export type { EmailTemplate, BaseEmailData } from "./base";
export type { PasswordResetData } from "./password-reset";
export type { EmailVerificationData } from "./email-verification";
export type { WelcomeData } from "./welcome";
