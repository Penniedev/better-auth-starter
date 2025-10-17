import { emailClient, type SendEmailResult } from "./client";
import {
  createPasswordResetTemplate,
  createEmailVerificationTemplate,
  createWelcomeTemplate,
} from "./templates";

export class EmailService {
  /**
   * Send a password reset email
   */
  static async sendPasswordReset(
    email: string,
    resetUrl: string,
    userName?: string
  ): Promise<SendEmailResult> {
    const template = createPasswordResetTemplate({
      resetUrl,
      userName,
      expiresIn: "1 hour",
    });

    return emailClient.sendEmail({
      to: email,
      subject: template.subject,
      text: template.text,
      html: template.html,
    });
  }

  /**
   * Send an email verification email
   */
  static async sendEmailVerification(
    email: string,
    verificationUrl: string,
    userName?: string
  ): Promise<SendEmailResult> {
    const template = createEmailVerificationTemplate({
      verificationUrl,
      userName,
      expiresIn: "24 hours",
    });

    return emailClient.sendEmail({
      to: email,
      subject: template.subject,
      text: template.text,
      html: template.html,
    });
  }

  /**
   * Send a welcome email
   */
  static async sendWelcome(
    email: string,
    userName?: string,
    options?: {
      loginUrl?: string;
      dashboardUrl?: string;
    }
  ): Promise<SendEmailResult> {
    const template = createWelcomeTemplate({
      userName,
      loginUrl: options?.loginUrl,
      dashboardUrl: options?.dashboardUrl,
    });

    return emailClient.sendEmail({
      to: email,
      subject: template.subject,
      text: template.text,
      html: template.html,
    });
  }

  /**
   * Send a custom email using a template
   */
  static async sendCustomEmail(
    email: string,
    template: {
      subject: string;
      text: string;
      html: string;
    }
  ): Promise<SendEmailResult> {
    return emailClient.sendEmail({
      to: email,
      ...template,
    });
  }

  /**
   * Test email configuration
   */
  static async testConnection(): Promise<{ success: boolean; error?: string }> {
    return emailClient.testConnection();
  }

  /**
   * Get current email configuration
   */
  static getConfig() {
    return emailClient.getConfig();
  }
}

// Convenience functions for backward compatibility
export const sendPasswordResetEmail = EmailService.sendPasswordReset;
export const sendVerificationEmail = EmailService.sendEmailVerification;
export const sendWelcomeEmail = EmailService.sendWelcome;
