import {
  EmailService,
  EMAIL_PROVIDERS,
  validateEmailConfig,
  getEmailConfig,
  type EmailConfig,
  EmailProvider,
} from "./index";

/**
 * Utility functions for email management and testing
 */
export class EmailUtils {
  /**
   * Test email configuration and connection
   */
  static async testEmailSetup(): Promise<{
    success: boolean;
    config: EmailConfig;
    errors: string[];
    provider: EmailProvider;
  }> {
    const config = getEmailConfig();
    const { valid, errors } = validateEmailConfig(config);
    const provider = EMAIL_PROVIDERS[config.service];

    if (!valid) {
      return {
        success: false,
        config,
        errors,
        provider,
      };
    }

    try {
      const connectionTest = await EmailService.testConnection();
      return {
        success: connectionTest.success,
        config,
        errors: connectionTest.success
          ? []
          : [connectionTest.error || "Connection failed"],
        provider,
      };
    } catch (error) {
      return {
        success: false,
        config,
        errors: [error instanceof Error ? error.message : "Unknown error"],
        provider,
      };
    }
  }
}
