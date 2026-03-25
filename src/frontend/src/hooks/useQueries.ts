import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product, ProductId } from "../backend.d";
import { useActor } from "./useActor";

const FALLBACK_PRODUCTS: Product[] = [
  {
    productId: 1n,
    name: "Golden Wire Wreath",
    description: "Handcrafted gold wire wreath with delicate filigree detail.",
    price: 38.0,
    imageUrl:
      "https://images.unsplash.com/photo-1606207695649-bdf89c8e0c38?w=600",
    category: "Wreaths",
    inStock: true,
  },
  {
    productId: 2n,
    name: "Pearl Drop Ornament",
    description: "Lustrous pearl drop with antique gold cap and ribbon.",
    price: 24.0,
    imageUrl:
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600",
    category: "Drops",
    inStock: true,
  },
  {
    productId: 3n,
    name: "Copper Spiral Pendant",
    description: "Hand-wound copper spiral pendant with warm metallic finish.",
    price: 29.0,
    imageUrl:
      "https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=600",
    category: "Pendants",
    inStock: true,
  },
  {
    productId: 4n,
    name: "Velvet Ribbon Bauble",
    description: "Classic glass bauble wrapped in deep velvet ribbon.",
    price: 19.0,
    imageUrl:
      "https://images.unsplash.com/photo-1606207695649-bdf89c8e0c38?w=600",
    category: "Baubles",
    inStock: true,
  },
  {
    productId: 5n,
    name: "Brass Filigree Star",
    description:
      "Six-pointed star cut from solid brass with ornate filigree work.",
    price: 45.0,
    imageUrl:
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600",
    category: "Stars",
    inStock: true,
  },
  {
    productId: 6n,
    name: "Gilded Pinecone",
    description: "Real pinecone dipped in 24k gold leaf, ethically sourced.",
    price: 32.0,
    imageUrl:
      "https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=600",
    category: "Nature",
    inStock: true,
  },
  {
    productId: 7n,
    name: "Frosted Glass Globe",
    description: "Hand-blown frosted glass globe with inner gold leaf flecks.",
    price: 27.0,
    imageUrl:
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600",
    category: "Globes",
    inStock: true,
  },
  {
    productId: 8n,
    name: "Antique Gold Teardrop",
    description:
      "Elongated teardrop with antique gold distressing and velvet loop.",
    price: 35.0,
    imageUrl: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600",
    category: "Drops",
    inStock: true,
  },
];

export function useProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return FALLBACK_PRODUCTS;
      try {
        const products = await actor.getProducts();
        return products.length > 0 ? products : FALLBACK_PRODUCTS;
      } catch {
        return FALLBACK_PRODUCTS;
      }
    },
    enabled: !isFetching,
    placeholderData: FALLBACK_PRODUCTS,
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<ProductId, Error, Product>({
    mutationFn: async (product) => {
      if (!actor) throw new Error("No actor");
      return actor.addProduct(product);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<void, Error, { productId: ProductId; product: Product }>({
    mutationFn: async ({ productId, product }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateProduct(productId, product);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation<void, Error, ProductId>({
    mutationFn: async (productId) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteProduct(productId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useAddSubscriber() {
  const { actor } = useActor();
  return useMutation<boolean, Error, string>({
    mutationFn: async (email) => {
      if (!actor) throw new Error("No actor");
      return actor.addSubscriber(email);
    },
  });
}

export function useSubscribers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSubscribers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
  });
}
