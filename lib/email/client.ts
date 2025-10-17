import nodemailer from "nodemailer";
import {
  getEmailConfig,
  validateEmailConfig,
  type EmailConfig,
} from "./config";

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

class EmailClient {
  private config: EmailConfig;
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.config = getEmailConfig();
    this.validateConfig();
  }

  private validateConfig(): void {
    const { valid, errors } = validateEmailConfig(this.config);
    if (!valid) {
      console.warn("Email configuration issues:", errors.join(", "));
      console.warn("Email functionality may not work properly.");
    }
  }

  private async getTransporter(): Promise<nodemailer.Transporter> {
    if (this.transporter) {
      return this.transporter;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transporterConfig: any = {
      host: this.config.host,
      port: this.config.port,
      secure: this.config.secure,
    };

    if (this.config.user && this.config.password) {
      transporterConfig.auth = {
        user: this.config.user,
        pass: this.config.password,
      };
    }

    this.transporter = nodemailer.createTransport(transporterConfig);

    // Verify connection
    try {
      await this.transporter.verify();
      console.log(`Email service (${this.config.service}) is ready`);
    } catch (error) {
      console.error(
        `Email service (${this.config.service}) connection failed:`,
        error
      );
      throw new Error(`Email service connection failed: ${error}`);
    }

    return this.transporter;
  }

  async sendEmail(options: EmailOptions): Promise<SendEmailResult> {
    try {
      const transporter = await this.getTransporter();

      const mailOptions = {
        from: this.config.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html || options.text,
      };

      const result = await transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: result.messageId,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Email sending failed:", errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      await this.getTransporter();
      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return { success: false, error: errorMessage };
    }
  }

  getConfig(): EmailConfig {
    return { ...this.config };
  }
}

export const emailClient = new EmailClient();

export const sendEmail = (options: EmailOptions): Promise<SendEmailResult> => {
  return emailClient.sendEmail(options);
};
