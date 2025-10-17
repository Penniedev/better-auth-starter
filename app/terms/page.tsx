export default function TermsPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl">
        <div className="bg-card rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-muted-foreground mb-4">
              This is a placeholder for the Terms of Service. Please replace
              this content with your actual terms.
            </p>
            <h2 className="text-xl font-semibold mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using this service, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>
            <h2 className="text-xl font-semibold mb-3">2. Use License</h2>
            <p className="text-muted-foreground mb-4">
              Permission is granted to temporarily download one copy of the
              materials on this website for personal, non-commercial transitory
              viewing only.
            </p>
            <h2 className="text-xl font-semibold mb-3">3. Disclaimer</h2>
            <p className="text-muted-foreground mb-4">
              The materials on this website are provided on an &quot;as is&quot;
              basis. This website makes no warranties, expressed or implied, and
              hereby disclaims and negates all other warranties.
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
