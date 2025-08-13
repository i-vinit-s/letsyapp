export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-24">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10 border border-purple-100">
        <h1 className="text-4xl font-bold mb-6 text-black border-b-2 border-purple-200 pb-2">
          Terms of Service
        </h1>
        <p className="mb-6 text-lg text-gray-700">
          Welcome to <strong>LetsYapp</strong>. By accessing or using our
          platform, you agree to the following terms.
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              1. Eligibility
            </h2>
            <p className="text-gray-700">
              You must be at least 16 years old to use LetsYapp. Certain
              features require signing up or signing in.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              2. Account Access
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                You must sign up/sign in to create your personal confession
                page.
              </li>
              <li>
                You must sign up/sign in to like or reply to any confession.
              </li>
              <li>
                Creating a confession does not require authentication, and
                viewing any confession is open to all.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              3. User Conduct
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                Do not post content that is illegal, harassing, or harmful.
              </li>
              <li>Respect the anonymity of others.</li>
              <li>
                Do not impersonate anyone or post misleading information with
                intent to harm.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              4. Content Ownership
            </h2>
            <p className="text-gray-700">
              You retain ownership of the content you post. By posting on
              LetsYapp, you grant us a non-exclusive license to display and
              distribute it within the platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              5. Termination
            </h2>
            <p className="text-gray-700">
              We reserve the right to suspend or terminate accounts that violate
              these terms or harm the community.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              6. Limitation of Liability
            </h2>
            <p className="text-gray-700">
              LetsYapp is provided &quot;as is&quot; without warranties of any
              kind. We are not liable for damages arising from your use of the
              platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              7. Changes
            </h2>
            <p className="text-gray-700">
              We may update these Terms of Service at any time. Continued use of
              the platform means you accept the updated terms.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
