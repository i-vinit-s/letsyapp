export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-24">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10 border border-purple-100">
        <h1 className="text-4xl font-bold mb-6 text-black border-b-2 border-purple-200 pb-2">
          Privacy Policy
        </h1>
        <p className="mb-6 text-lg text-gray-700">
          At <strong>LetsYapp</strong>, your privacy is our priority. This
          Privacy Policy explains how we collect, use, and protect your
          information when you use our platform.
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              1. Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Account Information:</strong> If you sign up or sign in,
                we collect the information you provide (e.g., email, username)
                through our authentication provider.
              </li>
              <li>
                <strong>Anonymous Content:</strong> You can create confessions
                without signing in. These posts are not linked to your account.
              </li>
              <li>
                <strong>Interactions:</strong> Liking or replying to confessions
                requires authentication, and these actions are tied to your
                account but its still anonymous.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>To operate and improve the LetsYapp platform.</li>
              <li>
                To authenticate users for protected features like likes and
                replies etc.
              </li>
              <li>To moderate content and ensure community safety.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              3. Data Storage
            </h2>
            <p className="text-gray-700">
              Confessions created without signing in are stored without any
              personal identifiers. Authenticated actions (likes, replies) are
              stored with your account information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              4. Third-Party Services
            </h2>
            <p className="text-gray-700">
              We use third-party authentication and hosting providers. These
              services have their own privacy policies that govern their
              handling of your information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              5. Your Choices
            </h2>
            <p className="text-gray-700">
              You can delete your account at any time, which will remove your
              account details and any linked interactions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-black mb-3">
              6. Updates
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy occasionally. Changes will be
              posted here with an updated revision date.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
