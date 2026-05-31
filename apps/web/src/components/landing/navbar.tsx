import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

// Original tunnel navbar imports (commented out)
// import { ChevronDown, Mail, Headphones, Activity, Bug, Copy, Download } from "lucide-react";
// import { authClient } from "@/lib/auth-client";
// import { SiGithub, SiVite, SiNextdotjs, SiExpress, SiNestjs } from "react-icons/si";
// import { GitHubButton } from "./github-button";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoContextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#000000] border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="SubVime Logo"
            className={`${scrolled ? "w-10" : "w-12"} transition-all`}
          />
          <span className="hidden font-semibold text-white sm:inline">SubVime</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/app" className="hover:text-white transition-colors">
            App
          </Link>

          {/* --- Original tunnel navbar links (commented out) ---
          Docs dropdown (Getting Started, CLI Reference, Plugins, Vite/Next/Express/NestJS)
          Pricing, Changelog, Help (Contact, Support, Status, Report a Bug)
          GitHubButton, Dashboard / Log In / Get Started via better-auth orgs
          Logo right-click brand asset menu
          --- end original navbar --- */}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/app"
            className="hidden md:flex px-5 py-2 bg-white/10 text-white border border-white/20 rounded-full font-medium hover:bg-white/15 transition-colors text-sm"
          >
            Open app
          </Link>

          {!mobileMenuOpen && (
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          )}
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-[#000000] z-[60] transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <img src="/logo.png" alt="SubVime Logo" className="w-10" />
            <span className="font-semibold">SubVime</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-2 px-6">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="py-4 text-2xl font-medium text-white/80 border-b border-white/10"
          >
            Home
          </Link>
          <Link
            to="/app"
            onClick={() => setMobileMenuOpen(false)}
            className="py-4 text-2xl font-medium text-white/80 border-b border-white/10"
          >
            App
          </Link>
        </div>
      </div>

      <div ref={logoContextMenuRef} className="hidden" />
    </nav>
  );
};
