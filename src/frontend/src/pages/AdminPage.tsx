import { Loader2, Pencil, Plus, ShieldAlert, Trash2, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../backend.d";
import GoldButton from "../components/GoldButton";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddProduct,
  useDeleteProduct,
  useIsAdmin,
  useProducts,
  useSubscribers,
  useUpdateProduct,
} from "../hooks/useQueries";

const EMPTY_PRODUCT: Omit<Product, "productId"> = {
  name: "",
  description: "",
  price: 0,
  imageUrl: "",
  category: "",
  inStock: true,
};

type ActiveTab = "products" | "subscribers";

export default function AdminPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: subscribers = [], isLoading: subsLoading } = useSubscribers();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, "productId">>(EMPTY_PRODUCT);
  const [deleteConfirmId, setDeleteConfirmId] = useState<bigint | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("products");

  function openAdd() {
    setEditingProduct(null);
    setForm(EMPTY_PRODUCT);
    setModalOpen(true);
  }

  function openEdit(product: Product) {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      inStock: product.inStock,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (editingProduct) {
      await updateProduct.mutateAsync({
        productId: editingProduct.productId,
        product: { ...form, productId: editingProduct.productId },
      });
    } else {
      await addProduct.mutateAsync({ ...form, productId: 0n });
    }
    setModalOpen(false);
  }

  async function handleDelete(productId: bigint) {
    await deleteProduct.mutateAsync(productId);
    setDeleteConfirmId(null);
  }

  const isPending = addProduct.isPending || updateProduct.isPending;

  // Not logged in
  if (!identity) {
    return (
      <main className="min-h-screen pt-36 pb-24 flex items-center justify-center">
        <div className="text-center max-w-sm px-6">
          <ShieldAlert className="text-teal-main w-12 h-12 mx-auto mb-6" />
          <h1 className="font-playfair text-3xl text-foreground mb-4">
            Admin Access
          </h1>
          <p className="font-nunito text-sm text-foreground/50 mb-8">
            Please log in to access the administration panel.
          </p>
          <GoldButton
            type="button"
            onClick={login}
            disabled={loginStatus === "logging-in"}
            size="lg"
            data-ocid="admin.primary_button"
          >
            {loginStatus === "logging-in" ? "Connecting…" : "Log In"}
          </GoldButton>
        </div>
      </main>
    );
  }

  // Checking admin status
  if (isAdminLoading) {
    return (
      <main className="min-h-screen pt-36 pb-24 flex items-center justify-center">
        <Loader2 className="animate-spin text-coral-main w-8 h-8" />
      </main>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <main className="min-h-screen pt-36 pb-24 flex items-center justify-center">
        <div
          className="text-center max-w-sm px-6"
          data-ocid="admin.error_state"
        >
          <ShieldAlert className="text-destructive w-12 h-12 mx-auto mb-6" />
          <h1 className="font-playfair text-3xl text-foreground mb-4">
            Unauthorized
          </h1>
          <p className="font-nunito text-sm text-foreground/50">
            Your account does not have administrator privileges.
          </p>
        </div>
      </main>
    );
  }

  const FORM_FIELDS = [
    {
      field: "name" as const,
      label: "Name",
      type: "text",
      placeholder: "Golden Wire Wreath",
      id: "prod-name",
    },
    {
      field: "category" as const,
      label: "Category",
      type: "text",
      placeholder: "Wreaths",
      id: "prod-cat",
    },
    {
      field: "price" as const,
      label: "Price",
      type: "number",
      placeholder: "38.00",
      id: "prod-price",
    },
    {
      field: "imageUrl" as const,
      label: "Image URL",
      type: "url",
      placeholder: "https://...",
      id: "prod-img",
    },
  ];

  return (
    <main className="min-h-screen pt-36 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-10">
          <p className="font-nunito text-[11px] tracking-[0.4em] uppercase text-teal-main mb-2">
            Management Panel
          </p>
          <h1 className="font-playfair text-3xl md:text-4xl text-foreground">
            Admin
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-8 border-b border-border" role="tablist">
          {(["products", "subscribers"] as const).map((tab) => (
            <button
              type="button"
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              data-ocid="admin.tab"
              className={`px-6 py-3 font-nunito text-[12px] tracking-[0.2em] uppercase transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-coral-main text-coral-main"
                  : "border-transparent text-foreground/40 hover:text-foreground/70"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products tab */}
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="font-nunito text-sm text-foreground/40">
                {products.length} products
              </p>
              <GoldButton
                type="button"
                onClick={openAdd}
                size="sm"
                data-ocid="admin.open_modal_button"
              >
                <Plus size={14} className="inline mr-1" /> Add Product
              </GoldButton>
            </div>

            {productsLoading ? (
              <div
                className="flex justify-center py-16"
                data-ocid="product.loading_state"
              >
                <Loader2 className="animate-spin text-foreground/30 w-6 h-6" />
              </div>
            ) : (
              <div
                className="border border-border rounded-lg overflow-x-auto shadow-sm"
                data-ocid="product.table"
              >
                <table className="w-full">
                  <thead>
                    <tr
                      style={{ borderBottom: "1px solid oklch(0.88 0.02 60)" }}
                      className="bg-muted/50"
                    >
                      {[
                        "Image",
                        "Name",
                        "Category",
                        "Price",
                        "Stock",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left px-4 py-3 font-nunito text-[11px] tracking-[0.2em] uppercase text-foreground/50"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, i) => (
                      <tr
                        key={String(product.productId)}
                        data-ocid={`product.row.${i + 1}`}
                        style={{
                          borderBottom: "1px solid oklch(0.92 0.01 60)",
                        }}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-nunito text-sm text-foreground">
                            {product.name}
                          </p>
                          <p className="font-nunito text-xs text-foreground/40 line-clamp-1 max-w-[200px]">
                            {product.description}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-nunito text-xs text-foreground/50">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-nunito text-sm text-coral-main font-semibold">
                            ${product.price.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`font-nunito text-xs ${
                              product.inStock
                                ? "text-teal-main"
                                : "text-foreground/30"
                            }`}
                          >
                            {product.inStock ? "In Stock" : "Sold Out"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => openEdit(product)}
                              data-ocid={`product.edit_button.${i + 1}`}
                              className="p-1.5 text-foreground/40 hover:text-teal-main transition-colors"
                              aria-label="Edit product"
                            >
                              <Pencil size={14} />
                            </button>
                            {deleteConfirmId === product.productId ? (
                              <div className="flex gap-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(product.productId)
                                  }
                                  data-ocid={`product.confirm_button.${i + 1}`}
                                  className="px-2 py-1 text-[10px] bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors rounded"
                                  disabled={deleteProduct.isPending}
                                >
                                  {deleteProduct.isPending ? (
                                    <Loader2
                                      size={10}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    "Confirm"
                                  )}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirmId(null)}
                                  data-ocid={`product.cancel_button.${i + 1}`}
                                  className="px-2 py-1 text-[10px] text-foreground/50 border border-border hover:border-foreground/30 transition-colors rounded"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  setDeleteConfirmId(product.productId)
                                }
                                data-ocid={`product.delete_button.${i + 1}`}
                                className="p-1.5 text-foreground/30 hover:text-destructive transition-colors"
                                aria-label="Delete product"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Subscribers tab */}
        {activeTab === "subscribers" && (
          <div>
            <p className="font-nunito text-sm text-foreground/40 mb-6">
              {subscribers.length} subscribers
            </p>
            {subsLoading ? (
              <div
                className="flex justify-center py-16"
                data-ocid="subscribers.loading_state"
              >
                <Loader2 className="animate-spin text-foreground/30 w-6 h-6" />
              </div>
            ) : subscribers.length === 0 ? (
              <div
                className="py-16 text-center"
                data-ocid="subscribers.empty_state"
              >
                <p className="font-playfair text-xl text-foreground/40">
                  No subscribers yet
                </p>
              </div>
            ) : (
              <div
                className="border border-border rounded-lg shadow-sm"
                data-ocid="subscribers.table"
              >
                <table className="w-full">
                  <thead>
                    <tr
                      style={{ borderBottom: "1px solid oklch(0.88 0.02 60)" }}
                      className="bg-muted/50"
                    >
                      {["Email", "Subscribed"].map((h) => (
                        <th
                          key={h}
                          className="text-left px-4 py-3 font-nunito text-[11px] tracking-[0.2em] uppercase text-foreground/50"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub, i) => (
                      <tr
                        key={sub.email}
                        data-ocid={`subscribers.row.${i + 1}`}
                        style={{
                          borderBottom: "1px solid oklch(0.92 0.01 60)",
                        }}
                      >
                        <td className="px-4 py-3 font-nunito text-sm text-foreground">
                          {sub.email}
                        </td>
                        <td className="px-4 py-3 font-nunito text-xs text-foreground/40">
                          {new Date(
                            Number(sub.subscribedAt / 1_000_000n),
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          data-ocid="product.dialog"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/30 backdrop-blur-sm cursor-default"
            onClick={() => setModalOpen(false)}
            aria-label="Close modal"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg"
            style={{
              border: "1px solid oklch(0.88 0.02 60)",
            }}
          >
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid oklch(0.92 0.01 60)" }}
            >
              <h2 className="font-playfair text-lg text-foreground">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                data-ocid="product.close_button"
                className="text-foreground/40 hover:text-coral-main transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {FORM_FIELDS.map(({ field, label, type, placeholder, id }) => (
                <div key={field}>
                  <label
                    htmlFor={id}
                    className="block font-nunito text-[11px] tracking-[0.2em] uppercase text-foreground/50 mb-2"
                  >
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    value={String(form[field])}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [field]:
                          type === "number"
                            ? Number.parseFloat(e.target.value) || 0
                            : e.target.value,
                      }))
                    }
                    placeholder={placeholder}
                    data-ocid="product.input"
                    className="w-full bg-white border border-border text-foreground placeholder:text-foreground/30 px-4 py-2.5 text-sm font-nunito focus:outline-none focus:border-coral-main transition-colors rounded"
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="prod-desc"
                  className="block font-nunito text-[11px] tracking-[0.2em] uppercase text-foreground/50 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="prod-desc"
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  data-ocid="product.textarea"
                  className="w-full bg-white border border-border text-foreground placeholder:text-foreground/30 px-4 py-2.5 text-sm font-nunito focus:outline-none focus:border-coral-main transition-colors resize-none rounded"
                  placeholder="Handcrafted with…"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="prod-instock"
                  checked={form.inStock}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, inStock: e.target.checked }))
                  }
                  data-ocid="product.checkbox"
                  className="w-4 h-4 accent-coral-main"
                />
                <label
                  htmlFor="prod-instock"
                  className="font-nunito text-sm text-foreground/60"
                >
                  In Stock
                </label>
              </div>
            </div>

            <div
              className="flex justify-end gap-3 px-6 py-4"
              style={{ borderTop: "1px solid oklch(0.92 0.01 60)" }}
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                data-ocid="product.cancel_button"
                className="px-5 py-2.5 font-nunito text-[12px] tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground/70 transition-colors border border-border hover:border-foreground/30 rounded"
              >
                Cancel
              </button>
              <GoldButton
                type="button"
                onClick={handleSave}
                disabled={isPending}
                data-ocid="product.save_button"
              >
                {isPending ? (
                  <Loader2 size={14} className="animate-spin inline mr-2" />
                ) : null}
                {editingProduct ? "Save Changes" : "Add Product"}
              </GoldButton>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
