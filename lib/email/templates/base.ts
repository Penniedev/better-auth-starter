export interface BaseEmailData {
  userName?: string;
  appName?: string;
  appUrl?: string;
  supportEmail?: string;
}

export interface EmailTemplate {
  subject: string;
  text: string;
  html: string;
}

export const getBaseTemplateData = (): BaseEmailData => ({
  appName: process.env.APP_NAME || "Your App",
  appUrl:
    process.env.APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000",
  supportEmail: process.env.SUPPORT_EMAIL || "support@example.com",
});

export const getBaseStyles = () => `
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f8f9fa;
    }
    .email-container {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .email-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .email-content {
      padding: 30px;
    }
    .email-footer {
      background: #f8f9fa;
      padding: 20px 30px;
      text-align: center;
      border-top: 1px solid #eee;
    }
    .button {
      display: inline-block;
      background: #007bff;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin: 20px 0;
    }
    .button:hover {
      background: #0056b3;
    }
    .button-success {
      background: #28a745;
    }
    .button-success:hover {
      background: #1e7e34;
    }
    .text-muted {
      color: #666;
      font-size: 14px;
    }
    .text-small {
      font-size: 12px;
      color: #999;
    }
    .divider {
      border: none;
      border-top: 1px solid #eee;
      margin: 30px 0;
    }
    @media (max-width: 600px) {
      body {
        padding: 10px;
      }
      .email-header, .email-content, .email-footer {
        padding: 20px;
      }
    }
  </style>
`;

export const getBaseHtml = (
  content: string,
  data: BaseEmailData = {}
): string => {
  const baseData = { ...getBaseTemplateData(), ...data };
  const styles = getBaseStyles();

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${baseData.appName}</title>
        ${styles}
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1 style="margin: 0; font-size: 24px;">${baseData.appName}</h1>
          </div>
          <div class="email-content">
            ${content}
          </div>
          <div class="email-footer">
            <p class="text-small">
              This email was sent by ${baseData.appName}.<br>
              If you have any questions, contact us at <a href="mailto:${baseData.supportEmail}">${baseData.supportEmail}</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
};
