import { getBaseHtml, type BaseEmailData, type EmailTemplate } from "./base";

export interface EmailVerificationData extends BaseEmailData {
  verificationUrl: string;
  expiresIn?: string;
}

export const createEmailVerificationTemplate = (
  data: EmailVerificationData
): EmailTemplate => {
  const { userName, verificationUrl, expiresIn = "24 hours" } = data;

  const subject = "Verify your email address";

  const text = `Hello${userName ? ` ${userName}` : ""},

Welcome! Please verify your email address by clicking the link below:

${verificationUrl}

This link will expire in ${expiresIn}.

If you didn't create an account, please ignore this email.

Best regards,
Your App Team`;

  const content = `
    <h2 style="color: #2c3e50; margin-bottom: 20px;">Welcome! Verify your email</h2>
    <p style="font-size: 16px; margin-bottom: 20px;">
      Hello${userName ? ` ${userName}` : ""},
    </p>
    <p style="font-size: 16px; margin-bottom: 30px;">
      Welcome to our platform! Please verify your email address by clicking the button below:
    </p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${verificationUrl}" class="button button-success">
        Verify Email Address
      </a>
    </div>
    <p class="text-muted" style="margin-bottom: 20px;">
      This link will expire in ${expiresIn}.
    </p>
    <p class="text-muted">
      If you didn't create an account, please ignore this email.
    </p>
    <hr class="divider">
    <p class="text-muted">
      <strong>What's next?</strong> Once you verify your email, you'll have full access to all features and can start using your account immediately.
    </p>
  `;

  return {
    subject,
    text,
    html: getBaseHtml(content, data),
  };
};
