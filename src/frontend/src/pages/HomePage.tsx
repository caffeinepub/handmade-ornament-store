import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import GoldButton from "../components/GoldButton";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { useAddSubscriber, useProducts } from "../hooks/useQueries";

export default function HomePage() {
  const { data: products = [], isLoading } = useProducts();
  const addSubscriber = useAddSubscriber();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await addSubscriber.mutateAsync(email.trim());
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(true);
    }
  }

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex" aria-label="Hero">
        {/* Left: ornament photo */}
        <div className="w-0 md:w-[58%] relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=1200"
            alt="Handmade colorful ornaments"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/10" />
        </div>

        {/* Right: text panel */}
        <div
          className="flex-1 flex flex-col justify-center px-8 md:px-16 py-24 md:py-32 relative"
          style={{ backgroundColor: "#fdf8f4" }}
        >
          <div className="relative z-10 max-w-md">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-nunito text-[11px] tracking-[0.4em] uppercase text-teal-main mb-6"
            >
              Handcrafted Collection 2026
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-playfair text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
              style={{
                background:
                  "linear-gradient(135deg, #E8547A 0%, #F0905A 50%, #D4821A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Crafted by Hand.
              <br />
              Worn with Grace.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-nunito text-sm md:text-base leading-relaxed text-foreground/60 mb-10"
            >
              Each ornament is shaped by hand, one at a time, using time-honored
              techniques and the finest materials.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <Link to="/collection">
                <GoldButton
                  size="lg"
                  data-ocid="hero.primary_button"
                  className="inline-flex items-center gap-3"
                >
                  Shop Collection <ArrowRight size={16} />
                </GoldButton>
              </Link>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
            <span className="text-[10px] tracking-widest uppercase text-foreground/50 font-nunito">
              Scroll
            </span>
            <ChevronDown
              size={14}
              className="text-foreground/50 animate-bounce"
            />
          </div>
        </div>
      </section>

      {/* ===== ARTISAN STORY ===== */}
      <section
        className="py-24"
        style={{
          backgroundColor: "#fef9f5",
          borderTop: "1px solid oklch(0.90 0.015 60)",
          borderBottom: "1px solid oklch(0.90 0.015 60)",
        }}
        aria-label="Artisan story"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left image */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800"
                alt="Artisan crafting ornaments"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute top-4 left-4 px-4 py-3 rounded"
                style={{ backgroundColor: "rgba(253,248,244,0.92)" }}
              >
                <p className="text-[11px] tracking-[0.3em] uppercase text-teal-main font-nunito">
                  Est. 2018
                </p>
              </div>
            </motion.div>

            {/* Right text */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p className="font-nunito text-[11px] tracking-[0.4em] uppercase text-teal-main mb-5">
                The Artisan
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl leading-tight mb-6 text-foreground">
                Made by <em className="text-coral-main not-italic">human</em>{" "}
                hands
              </h2>
              <div className="w-12 h-1 bg-coral-main rounded mb-8" />
              <div className="space-y-4 font-nunito text-sm text-foreground/60 leading-relaxed">
                <p>
                  Every piece begins with a sketch, an intention, and the
                  patience to follow each step without rushing.
                </p>
                <p>
                  We use only materials that age gracefully — genuine brass,
                  hand-blown glass, real pearls — because beauty should deepen
                  over time.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-24" aria-label="Featured products">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="font-nunito text-[11px] tracking-[0.4em] uppercase text-teal-main mb-3">
              Handpicked
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl text-foreground">
              Curated Collections
            </h2>
          </motion.div>

          {isLoading ? (
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
              data-ocid="product.loading_state"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
              data-ocid="product.list"
            >
              {products.map((product, i) => (
                <ProductCard
                  key={String(product.productId)}
                  product={product}
                  index={i + 1}
                />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/collection">
              <GoldButton
                variant="outlined"
                data-ocid="collection.primary_button"
              >
                View All Pieces →
              </GoldButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PRE-FOOTER BAND ===== */}
      <section
        style={{
          backgroundColor: "#fef9f5",
          borderTop: "1px solid oklch(0.90 0.015 60)",
          borderBottom: "1px solid oklch(0.90 0.015 60)",
        }}
        className="py-20"
        aria-label="Journal and newsletter"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Left: Journal */}
          <div>
            <h3 className="font-playfair text-xl text-foreground mb-5">
              Journal
            </h3>
            <ul className="space-y-3">
              {[
                "The Ritual of Making",
                "Why Wire Over Cast Metal",
                "Choosing a Statement Ornament",
                "Behind the Holiday Collection",
              ].map((title) => (
                <li key={title}>
                  <span className="font-nunito text-sm text-foreground/50 cursor-default">
                    {title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Center: Statement */}
          <div className="flex flex-col items-center justify-center text-center border-border md:border-x md:px-8">
            <div className="w-8 h-1 bg-coral-main rounded mb-6" />
            <h3 className="font-playfair text-2xl md:text-3xl text-foreground leading-tight mb-4">
              Exceptional
              <br />
              <span className="text-coral-main">Artistry</span>
            </h3>
            <p className="font-nunito text-sm text-foreground/50 leading-relaxed">
              Slow work. Lasting beauty.
              <br />
              Made to be handed down.
            </p>
            <div className="w-8 h-1 bg-coral-main rounded mt-6" />
          </div>

          {/* Right: Newsletter */}
          <div>
            <h3 className="font-playfair text-xl text-foreground mb-2">
              Stay Connected
            </h3>
            <p className="font-nunito text-sm text-foreground/50 mb-5">
              New pieces, behind-the-scenes stories, and quiet announcements.
            </p>
            {subscribed ? (
              <div
                className="border border-teal-main/30 bg-teal-main/5 px-5 py-4 rounded"
                data-ocid="newsletter.success_state"
              >
                <p className="font-nunito text-sm text-teal-main">
                  Thank you. You&apos;ll hear from us soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  data-ocid="newsletter.input"
                  className="bg-white border border-border text-foreground placeholder:text-foreground/30 px-4 py-3 text-sm font-nunito focus:outline-none focus:border-coral-main transition-colors rounded"
                />
                <GoldButton
                  type="submit"
                  size="md"
                  data-ocid="newsletter.submit_button"
                  disabled={addSubscriber.isPending}
                >
                  {addSubscriber.isPending ? "Subscribing..." : "Subscribe"}
                </GoldButton>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
