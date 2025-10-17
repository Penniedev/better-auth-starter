export * from "./client";
export * from "./config";
export * from "./services";
export * from "./templates";
export * from "./utils";

export { emailClient, sendEmail } from "./client";
export { EmailService } from "./services";
export { EMAIL_PROVIDERS, getEmailConfig, validateEmailConfig } from "./config";
