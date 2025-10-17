import { getBaseHtml, type BaseEmailData, type EmailTemplate } from "./base";

export interface PasswordResetData extends BaseEmailData {
  resetUrl: string;
  expiresIn?: string;
}

export const createPasswordResetTemplate = (
  data: PasswordResetData
): EmailTemplate => {
  const { userName, resetUrl, expiresIn = "1 hour" } = data;

  const subject = "Reset your password";

  const text = `Hello${userName ? ` ${userName}` : ""},

You requested to reset your password. Click the link below to reset it:

${resetUrl}

This link will expire in ${expiresIn} for security reasons.

If you didn't request this password reset, please ignore this email.

Best regards,
Your App Team`;

  const content = `
    <h2 style="color: #2c3e50; margin-bottom: 20px;">Reset your password</h2>
    <p style="font-size: 16px; margin-bottom: 20px;">
      Hello${userName ? ` ${userName}` : ""},
    </p>
    <p style="font-size: 16px; margin-bottom: 30px;">
      You requested to reset your password. Click the button below to reset it:
    </p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetUrl}" class="button">
        Reset Password
      </a>
    </div>
    <p class="text-muted" style="margin-bottom: 20px;">
      This link will expire in ${expiresIn} for security reasons.
    </p>
    <p class="text-muted">
      If you didn't request this password reset, please ignore this email.
    </p>
    <hr class="divider">
    <p class="text-muted">
      <strong>Security tip:</strong> If you didn't request this password reset, someone might be trying to access your account. 
      Consider changing your password and enabling two-factor authentication for better security.
    </p>
  `;

  return {
    subject,
    text,
    html: getBaseHtml(content, data),
  };
};
