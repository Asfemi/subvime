import { Link } from "@tanstack/react-router";

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="SubVime Logo" className="w-10" />
              <span className="font-bold text-white">SubVime</span>
            </Link>
            <p className="text-white/40 text-sm mb-4 max-w-sm">
              Break complex tasks into nested subsets until every step is easy to finish.
            </p>
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} SubVime. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-white/40">
              <li>
                <Link to="/app" className="hover:text-white transition-colors">
                  Get started
                </Link>
              </li>
              <li>
                <Link to="/app" className="hover:text-white transition-colors">
                  Start a checklist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Documentation</h4>
            <ul className="space-y-2 text-sm text-white/40">
              <li>
                <Link to="/docs" className="hover:text-white transition-colors">
                  Docs
                </Link>
              </li>
              <li>
                <Link to="/docs#share" className="hover:text-white transition-colors">
                  Sharing
                </Link>
              </li>
              <li>
                <Link to="/docs#import-export" className="hover:text-white transition-colors">
                  Import & export
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-white/40">
              <li>
                <Link to="/changelog" className="hover:text-white transition-colors">
                  Changelog
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Asfemi/subvime"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
