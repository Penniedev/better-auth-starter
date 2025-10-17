import { NextRequest, NextResponse } from "next/server";
import { EmailService, EmailUtils } from "@/lib/email";

export async function GET() {
  try {
    const testResult = await EmailUtils.testEmailSetup();

    return NextResponse.json({
      success: testResult.success,
      config: {
        service: testResult.config.service,
        from: testResult.config.from,
      },
      provider: testResult.provider,
      errors: testResult.errors,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, type = "password-reset" } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case "password-reset":
        result = await EmailService.sendPasswordReset(
          email,
          `${
            process.env.NEXTAUTH_URL || "http://localhost:3000"
          }/reset-password?token=test-token`,
          "Test User"
        );
        break;

      case "verification":
        result = await EmailService.sendEmailVerification(
          email,
          `${
            process.env.NEXTAUTH_URL || "http://localhost:3000"
          }/verify-email?token=test-token`,
          "Test User"
        );
        break;

      case "welcome":
        result = await EmailService.sendWelcome(email, "Test User", {
          loginUrl: `${
            process.env.NEXTAUTH_URL || "http://localhost:3000"
          }/login`,
          dashboardUrl: `${
            process.env.NEXTAUTH_URL || "http://localhost:3000"
          }/dashboard`,
        });
        break;

      default:
        return NextResponse.json(
          { success: false, error: "Invalid email type" },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: result.success,
      messageId: result.messageId,
      error: result.error,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
