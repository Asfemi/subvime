import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_chunks/_libs/@tanstack/react-router.mjs";
import { X, M as Menu } from "../_libs/lucide-react.mjs";
const Navbar = () => {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  reactExports.useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "nav",
    {
      className: `fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-white/10 bg-black py-4" : "bg-transparent py-6"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-sm font-bold text-accent", children: "SV" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden font-semibold text-white sm:inline", children: "SubVime" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-8 text-sm font-medium text-white/60 md:flex", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", className: "transition-colors hover:text-white", children: "Pricing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/changelog", className: "transition-colors hover:text-white", children: "Changelog" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/app",
                className: "hidden rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15 md:flex",
                children: "Get started"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setMobileMenuOpen((open) => !open),
                className: "p-2 text-white/60 transition-colors hover:text-white md:hidden",
                "aria-label": mobileMenuOpen ? "Close menu" : "Open menu",
                children: mobileMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 24 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 24 })
              }
            )
          ] })
        ] }),
        mobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10 bg-black px-6 py-4 md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/pricing",
              onClick: () => setMobileMenuOpen(false),
              className: "py-3 text-lg text-white/80",
              children: "Pricing"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/changelog",
              onClick: () => setMobileMenuOpen(false),
              className: "py-3 text-lg text-white/80",
              children: "Changelog"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/app",
              onClick: () => setMobileMenuOpen(false),
              className: "py-3 text-lg font-semibold text-white",
              children: "Get started"
            }
          )
        ] }) })
      ]
    }
  );
};
const Footer = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-white/10 py-12 bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-8 md:flex-row md:items-start md:justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.png", alt: "SubVime Logo", className: "w-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-white", children: "SubVime" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-sm mb-4 max-w-sm", children: "Break complex tasks into nested subsets until every step is easy to finish." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/30 text-xs", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " SubVime. All rights reserved."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-white mb-4 text-sm", children: "Product" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-white/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", className: "hover:text-white transition-colors", children: "Get started" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/app", className: "hover:text-white transition-colors", children: "Start a checklist" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-white mb-4 text-sm", children: "Documentation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-white/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/docs", className: "hover:text-white transition-colors", children: "Docs" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/docs#share", className: "hover:text-white transition-colors", children: "Sharing" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/docs#import-export", className: "hover:text-white transition-colors", children: "Import & export" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-white mb-4 text-sm", children: "Resources" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-white/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/changelog", className: "hover:text-white transition-colors", children: "Changelog" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", className: "hover:text-white transition-colors", children: "Pricing" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "https://github.com/Asfemi/subvime",
            target: "_blank",
            rel: "noreferrer",
            className: "hover:text-white transition-colors",
            children: "GitHub"
          }
        ) })
      ] })
    ] })
  ] }) }) });
};
export {
  Footer as F,
  Navbar as N
};
