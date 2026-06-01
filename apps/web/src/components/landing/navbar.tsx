import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/10 bg-black py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-sm font-bold text-accent">
            SV
          </span>
          <span className="hidden font-semibold text-white sm:inline">SubVime</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-white/60 md:flex">
          <Link to="/pricing" className="transition-colors hover:text-white">
            Pricing
          </Link>
          <Link to="/changelog" className="transition-colors hover:text-white">
            Changelog
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/app"
            className="hidden rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15 md:flex"
          >
            Get started
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="p-2 text-white/60 transition-colors hover:text-white md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-black px-6 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              to="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-lg text-white/80"
            >
              Pricing
            </Link>
            <Link
              to="/changelog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-lg text-white/80"
            >
              Changelog
            </Link>
            <Link
              to="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-lg font-semibold text-white"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
