import { Link, useRouter } from "@tanstack/react-router";
import { Search, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";

const NAV_LINKS = [
  { label: "HOME", to: "/" },
  { label: "COLLECTION", to: "/collection" },
  { label: "ABOUT", to: "/about" },
  { label: "CONTACT", to: "/contact" },
];

export default function Header() {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md shadow-sm" : ""
      }`}
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid oklch(0.88 0.02 60)",
      }}
    >
      {/* Top bar: logo + icons */}
      <div className="flex items-center justify-between px-6 md:px-12 py-3">
        {/* Left: search */}
        <div className="w-24 flex items-center gap-4">
          <button
            type="button"
            aria-label="Search"
            className="text-foreground/40 hover:text-coral-main transition-colors"
          >
            <Search size={18} />
          </button>
        </div>

        {/* Centered Logo */}
        <Link
          to="/"
          data-ocid="header.link"
          className="flex flex-col items-center group"
        >
          <img
            src="/assets/uploads/chatgpt_image_mar_25_2026_02_29_11_pm-019d2449-7329-77bc-b9bf-b8b8741925a5-1.png"
            alt="The Art of Craft"
            className="h-14 w-auto"
          />
        </Link>

        {/* Right: cart */}
        <div className="w-24 flex justify-end">
          <button
            type="button"
            aria-label={`Shopping bag, ${totalItems} items`}
            className="relative text-foreground/40 hover:text-coral-main transition-colors"
            data-ocid="header.toggle"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-coral-main text-[10px] font-bold text-white flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Light divider */}
      <div style={{ height: "1px", backgroundColor: "oklch(0.92 0.01 60)" }} />

      {/* Nav bar */}
      <nav className="flex items-center justify-center gap-8 px-6 py-2.5">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            data-ocid="nav.link"
            className={`font-nunito text-[12px] tracking-[0.2em] uppercase transition-colors duration-200 ${
              currentPath === link.to
                ? "text-coral-main font-semibold"
                : "text-foreground/50 hover:text-coral-main"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
