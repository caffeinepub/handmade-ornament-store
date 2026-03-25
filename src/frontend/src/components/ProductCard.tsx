import { ShoppingBag } from "lucide-react";
import type { Product } from "../backend.d";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div
      data-ocid={`product.item.${index}`}
      className="product-card-hover group relative flex flex-col border border-border cursor-pointer rounded-lg overflow-hidden bg-white shadow-sm"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
        {!product.inStock && (
          <div className="absolute top-3 left-3 bg-white/90 rounded px-2 py-1">
            <span className="text-foreground/60 text-[11px] tracking-widest uppercase font-nunito">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex-1">
          <p className="text-[11px] tracking-[0.2em] uppercase text-teal-main font-nunito mb-1">
            {product.category}
          </p>
          <h3 className="font-playfair text-foreground text-base leading-snug">
            {product.name}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-coral-main font-nunito text-sm font-semibold">
            ${product.price.toFixed(2)}
          </span>
          <button
            type="button"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            data-ocid={`product.primary_button.${index}`}
            className="flex items-center gap-2 px-3 py-2 text-[11px] tracking-[0.15em] uppercase font-nunito font-medium transition-all duration-300 border border-border text-foreground/50 hover:border-teal-main hover:text-teal-main hover:bg-teal-main/5 rounded disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={13} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Hover coral border highlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
        style={{ boxShadow: "inset 0 0 0 2px oklch(0.62 0.18 15 / 0.4)" }}
      />
    </div>
  );
}
