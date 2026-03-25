import { Link } from "@tanstack/react-router";
import { SiFacebook, SiInstagram, SiPinterest } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      style={{
        backgroundColor: "#fdf8f4",
        borderTop: "1px solid oklch(0.88 0.02 60)",
      }}
    >
      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo + tagline */}
          <div className="md:col-span-1">
            <img
              src="/assets/uploads/chatgpt_image_mar_25_2026_02_29_11_pm-019d2449-7329-77bc-b9bf-b8b8741925a5-1.png"
              alt="The Art of Craft"
              className="h-12 w-auto mb-4"
            />
            <p className="text-foreground/60 text-sm leading-relaxed">
              Handcrafted with devotion.
              <br />
              Each piece a quiet act of grace.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-foreground/40 hover:text-coral-main transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiInstagram size={18} />
              </a>
              <a
                href="https://pinterest.com"
                aria-label="Pinterest"
                className="text-foreground/40 hover:text-coral-main transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiPinterest size={18} />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="text-foreground/40 hover:text-coral-main transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiFacebook size={18} />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-playfair text-coral-main text-sm tracking-[0.2em] uppercase mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {[
                "All Ornaments",
                "Wreaths",
                "Pendants",
                "Baubles",
                "Stars",
                "Gift Sets",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/collection"
                    data-ocid="footer.link"
                    className="text-foreground/50 text-sm hover:text-coral-main transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About links */}
          <div>
            <h4 className="font-playfair text-coral-main text-sm tracking-[0.2em] uppercase mb-5">
              About
            </h4>
            <ul className="space-y-3">
              {[
                "Our Story",
                "The Artisan",
                "Craft Process",
                "Sustainability",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/about"
                    data-ocid="footer.link"
                    className="text-foreground/50 text-sm hover:text-coral-main transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer links */}
          <div>
            <h4 className="font-playfair text-coral-main text-sm tracking-[0.2em] uppercase mb-5">
              Customer
            </h4>
            <ul className="space-y-3">
              {["Contact Us", "Shipping & Returns", "Care Guide", "FAQ"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/contact"
                      data-ocid="footer.link"
                      className="text-foreground/50 text-sm hover:text-coral-main transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{ borderTop: "1px solid oklch(0.90 0.015 60)" }}
        className="max-w-6xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <p className="text-foreground/40 text-xs tracking-widest font-nunito">
          © {year} THE ART OF CRAFT. ALL RIGHTS RESERVED.
        </p>
        <p className="text-foreground/40 text-xs">
          Built with <span className="text-coral-main">♥</span> using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-coral-mid hover:text-coral-main transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
