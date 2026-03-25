import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import GoldButton from "../components/GoldButton";

const VALUES = [
  {
    title: "Slow Making",
    desc: "We reject the speed of industry. Every ornament is given the time it deserves — no rushing, no shortcuts, no batches.",
  },
  {
    title: "Honest Materials",
    desc: "Brass, copper, real glass, genuine pearls. We use materials that age with grace and tell the truth of their origin.",
  },
  {
    title: "Enduring Design",
    desc: "Trends fade. We design for heirlooms — objects meant to be passed forward, carrying memory with them.",
  },
  {
    title: "Ethical Studio",
    desc: "Small production, fair wages, minimal waste. Our studio is a quiet place where good work happens without compromise.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-36 pb-24">
      {/* Hero band */}
      <section
        className="relative py-24 mb-20 overflow-hidden"
        style={{
          backgroundColor: "#fef9f5",
          borderBottom: "1px solid oklch(0.90 0.015 60)",
        }}
        aria-label="Brand story hero"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)",
          }}
        />
        <div className="absolute inset-0 bg-white/40" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-nunito text-[11px] tracking-[0.4em] uppercase text-teal-main mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-4xl md:text-6xl leading-tight mb-6 text-foreground"
          >
            Made by{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #E8547A 0%, #F0905A 50%, #D4821A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Human Hands
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-nunito text-base text-foreground/60 leading-relaxed max-w-xl mx-auto"
          >
            We believe in the value of things that take time — objects shaped by
            patience, skill, and a quiet refusal to compromise.
          </motion.p>
        </div>
      </section>

      {/* Split: image + story */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-square overflow-hidden rounded-lg shadow-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800"
              alt="Artisan at work"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl text-foreground mb-6">
              The Studio
            </h2>
            <div className="w-12 h-1 bg-coral-main rounded mb-8" />
            <div className="space-y-5 font-nunito text-sm text-foreground/60 leading-relaxed">
              <p>
                Our studio began in 2018 as a single workbench in a spare room.
                We were frustrated — frustrated by ornaments that felt cheap,
                that broke after a season, that meant nothing.
              </p>
              <p>
                So we started making our own. Slowly. One at a time. Wire
                wrapping learned from a retired jeweler in Lyon. Glass blowing
                studied over three winters in Prague.
              </p>
              <p>
                Today, the bench is larger. The techniques are refined. But the
                commitment is unchanged: every ornament leaves this studio only
                when it is ready — and not a moment before.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values grid */}
      <section
        className="py-20"
        style={{
          backgroundColor: "#fef9f5",
          borderTop: "1px solid oklch(0.90 0.015 60)",
        }}
        aria-label="Brand values"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="font-playfair text-2xl md:text-3xl text-foreground mb-12 text-center">
            What We <span className="text-coral-main">Stand For</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-t-2 border-coral-main pt-6"
              >
                <h3 className="font-playfair text-lg text-teal-main mb-3">
                  {v.title}
                </h3>
                <p className="font-nunito text-sm text-foreground/60 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <p className="font-nunito text-[11px] tracking-[0.4em] uppercase text-teal-main mb-4">
          Explore
        </p>
        <h2 className="font-playfair text-3xl md:text-4xl text-foreground mb-8">
          See the <span className="text-coral-main">Collection</span>
        </h2>
        <Link to="/collection">
          <GoldButton size="lg" data-ocid="about.primary_button">
            Shop All Pieces →
          </GoldButton>
        </Link>
      </section>
    </main>
  );
}
