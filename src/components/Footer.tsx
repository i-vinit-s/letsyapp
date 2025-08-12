export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
          {/* Logo / Name */}
          <div className="text-center sm:text-left">
            <h2 className="text-white text-2xl font-bold">Let´sYapp</h2>
            <p className="text-gray-500 mt-1">
              Share your thoughts anonymously and securely with Let´sYapp.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {["Home"].map((link) => (
              <a
                key={link}
                href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                className="hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          {/* <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              🌐
            </a>
            <a href="#" className="hover:text-white transition-colors">
              📧
            </a>
            <a href="#" className="hover:text-white transition-colors">
              📱
            </a>
          </div> */}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <span>© {new Date().getFullYear()} Let´sYapp. All rights reserved.</span>
          {/* <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
