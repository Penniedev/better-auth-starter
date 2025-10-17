export default function PrivacyPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl">
        <div className="bg-card rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground mb-4">
              This is a placeholder for the Privacy Policy. Please replace this
              content with your actual privacy policy.
            </p>
            <h2 className="text-xl font-semibold mb-3">
              1. Information We Collect
            </h2>
            <p className="text-muted-foreground mb-4">
              We collect information you provide directly to us, such as when
              you create an account, make a purchase, or contact us for support.
            </p>
            <h2 className="text-xl font-semibold mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to provide, maintain, and
              improve our services, process transactions, and communicate with
              you.
            </p>
            <h2 className="text-xl font-semibold mb-3">
              3. Information Sharing
            </h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this policy.
            </p>
            <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction.
            </p>
            <div className="mt-8">
              <a href="/login" className="text-primary hover:underline">
                ← Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
