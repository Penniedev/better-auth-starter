import { getBaseHtml, type BaseEmailData, type EmailTemplate } from "./base";

export interface WelcomeData extends BaseEmailData {
  loginUrl?: string;
  dashboardUrl?: string;
}

export const createWelcomeTemplate = (data: WelcomeData): EmailTemplate => {
  const { userName, loginUrl, dashboardUrl } = data;

  const subject = "Welcome to our platform!";

  const text = `Hello${userName ? ` ${userName}` : ""},

Welcome to our platform! Your account has been successfully created.

${loginUrl ? `You can sign in here: ${loginUrl}` : ""}
${dashboardUrl ? `Access your dashboard: ${dashboardUrl}` : ""}

We're excited to have you on board!

Best regards,
Your App Team`;

  const content = `
    <h2 style="color: #2c3e50; margin-bottom: 20px;">Welcome aboard!</h2>
    <p style="font-size: 16px; margin-bottom: 20px;">
      Hello${userName ? ` ${userName}` : ""},
    </p>
    <p style="font-size: 16px; margin-bottom: 30px;">
      Welcome to our platform! Your account has been successfully created and you're all set to get started.
    </p>
    ${
      loginUrl
        ? `
    <div style="text-align: center; margin: 30px 0;">
      <a href="${loginUrl}" class="button">
        Sign In to Your Account
      </a>
    </div>
    `
        : ""
    }
    ${
      dashboardUrl
        ? `
    <div style="text-align: center; margin: 30px 0;">
      <a href="${dashboardUrl}" class="button button-success">
        Go to Dashboard
      </a>
    </div>
    `
        : ""
    }
    <hr class="divider">
    <h3 style="color: #2c3e50; margin-bottom: 15px;">Getting Started</h3>
    <ul style="color: #666; line-height: 1.8;">
      <li>Complete your profile setup</li>
      <li>Explore our features and tools</li>
      <li>Check out our help documentation</li>
      <li>Connect with our community</li>
    </ul>
    <p class="text-muted">
      If you have any questions, don't hesitate to reach out to our support team. We're here to help!
    </p>
  `;

  return {
    subject,
    text,
    html: getBaseHtml(content, data),
  };
};
