import { motion } from "motion/react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { useProducts } from "../hooks/useQueries";

const CATEGORIES = [
  "All",
  "Wreaths",
  "Drops",
  "Pendants",
  "Baubles",
  "Stars",
  "Nature",
  "Globes",
];

export default function CollectionPage() {
  const { data: products = [], isLoading } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="min-h-screen pt-36 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-nunito text-[11px] tracking-[0.4em] uppercase text-teal-main mb-3">
            Handcrafted
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl text-foreground mb-2">
            The <span className="text-coral-main">Collection</span>
          </h1>
          <div className="w-16 h-1 bg-coral-main rounded mt-4" />
        </motion.div>

        {/* Search + filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ornaments…"
            data-ocid="collection.search_input"
            className="bg-white border border-border text-foreground placeholder:text-foreground/30 px-4 py-2.5 text-sm font-nunito focus:outline-none focus:border-coral-main transition-colors rounded w-full md:w-72 shadow-sm"
          />

          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            data-ocid="collection.tab"
          >
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-nunito border rounded transition-colors duration-200 ${
                  activeCategory === cat
                    ? "border-coral-main text-coral-main bg-coral-main/5"
                    : "border-border text-foreground/50 hover:border-teal-main hover:text-teal-main"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
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
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center" data-ocid="product.empty_state">
            <p className="font-playfair text-2xl text-foreground/40">
              No pieces found
            </p>
            <p className="font-nunito text-sm text-foreground/40 mt-2">
              Try a different filter or search term
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            data-ocid="product.list"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={String(product.productId)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ProductCard product={product} index={i + 1} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
