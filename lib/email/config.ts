export interface EmailConfig {
  service: "gmail" | "smtp" | "sendgrid" | "resend";
  user?: string;
  password?: string;
  apiKey?: string;
  host?: string;
  port?: number;
  secure?: boolean;
  from: string;
}

export interface EmailProvider {
  name: string;
  description: string;
  requiredEnvVars: string[];
  setupUrl?: string;
}

export const EMAIL_PROVIDERS: Record<string, EmailProvider> = {
  gmail: {
    name: "Gmail",
    description:
      "Use Gmail SMTP with App Password (recommended for development)",
    requiredEnvVars: ["EMAIL_USER", "EMAIL_APP_PASSWORD", "EMAIL_FROM"],
    setupUrl: "https://support.google.com/accounts/answer/185833",
  },
  smtp: {
    name: "Custom SMTP",
    description: "Use any SMTP provider (Outlook, Yahoo, custom server, etc.)",
    requiredEnvVars: [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASS",
      "EMAIL_FROM",
    ],
  },
  sendgrid: {
    name: "SendGrid",
    description:
      "Professional email delivery service (recommended for production)",
    requiredEnvVars: ["SENDGRID_API_KEY", "EMAIL_FROM"],
    setupUrl: "https://sendgrid.com",
  },
  resend: {
    name: "Resend",
    description: "Modern email API for developers",
    requiredEnvVars: ["RESEND_API_KEY", "EMAIL_FROM"],
    setupUrl: "https://resend.com",
  },
};

export const getEmailConfig = (): EmailConfig => {
  const service =
    (process.env.EMAIL_SERVICE as EmailConfig["service"]) || "gmail";

  const baseConfig: EmailConfig = {
    service,
    from:
      process.env.EMAIL_FROM || process.env.EMAIL_USER || "noreply@example.com",
  };

  switch (service) {
    case "gmail":
      return {
        ...baseConfig,
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_APP_PASSWORD,
      };

    case "smtp":
      return {
        ...baseConfig,
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        user: process.env.SMTP_USER,
        password: process.env.SMTP_PASS,
      };

    case "sendgrid":
      return {
        ...baseConfig,
        apiKey: process.env.SENDGRID_API_KEY,
        user: "apikey",
        password: process.env.SENDGRID_API_KEY,
        host: "smtp.sendgrid.net",
        port: 587,
        secure: false,
      };

    case "resend":
      return {
        ...baseConfig,
        apiKey: process.env.RESEND_API_KEY,
        user: "resend",
        password: process.env.RESEND_API_KEY,
        host: "smtp.resend.com",
        port: 587,
        secure: false,
      };

    default:
      throw new Error(`Unsupported email service: ${service}`);
  }
};

export const validateEmailConfig = (
  config: EmailConfig
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const provider = EMAIL_PROVIDERS[config.service];

  if (!provider) {
    errors.push(`Unknown email service: ${config.service}`);
    return { valid: false, errors };
  }

  // Check required environment variables
  for (const envVar of provider.requiredEnvVars) {
    if (!process.env[envVar]) {
      errors.push(`Missing required environment variable: ${envVar}`);
    }
  }

  // Service-specific validations
  if (config.service === "gmail" && !config.password) {
    errors.push("Gmail requires EMAIL_APP_PASSWORD (not regular password)");
  }

  if (config.service === "smtp" && !config.host) {
    errors.push("SMTP requires SMTP_HOST");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
