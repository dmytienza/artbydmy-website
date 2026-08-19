"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import { useCart } from "@/components/CartContext";
import { getDefaultSizeForItem, getPriceBreakdown, normalizeSizeOptions, products } from "@/lib/shop";

export default function ShopItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((item) => item.id === Number(id));
  const { addItem } = useCart();
  const normalizedSizes = product ? normalizeSizeOptions(product.size) : [];
  const availableSizes = normalizedSizes.filter((size) => size.available);
  const defaultSize = product ? getDefaultSizeForItem(product) : "";
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const isOriginalOrStudy = product ? ["ORIGINAL", "STUDY"].includes(product.type) : false;
  const isSoldOut = Boolean(product?.soldOut) || (!isOriginalOrStudy && normalizedSizes.length > 0 && availableSizes.length === 0);
  const showQuantitySelector = product ? !isOriginalOrStudy && !isSoldOut : false;

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    if (isSoldOut) return;

    if (isOriginalOrStudy) {
      addItem(product, defaultSize || "Original", quantity);
      setIsAdded(true);
      window.setTimeout(() => setIsAdded(false), 1200);
      return;
    }

    if (!selectedSize || !availableSizes.some((size) => size.label === selectedSize)) return;

    addItem(product, selectedSize, quantity);
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 1200);
  };

  const decrementQuantity = () => setQuantity((current) => Math.max(1, current - 1));
  const incrementQuantity = () => setQuantity((current) => Math.min(10, current + 1));
  const showMediumMetadata = isOriginalOrStudy;
  const priceInfo = product ? getPriceBreakdown(product) : null;
  const hasDiscount = Boolean(priceInfo && priceInfo.discountRate > 0);
  const selectedSizeLabel = isOriginalOrStudy ? "" : selectedSize || defaultSize || "— not available";
  const materialSummary = product ? (product.material.includes(" on ") ? product.material.split(" on ").slice(1).join(" on ") : product.material) : "";
  const sizeSummaryLabel = (() => {
    if (isOriginalOrStudy) {
      return `${defaultSize || "Original"}`;
    }
    if (!product) return "";

    const availableCount = normalizedSizes.filter((size) => size.available).length;
    if (availableCount <= 1) return selectedSizeLabel || defaultSize || "1 size available";
    return `${availableCount} sizes available`;
  })();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-16 pt-[15px] lg:px-8">
      <Link href="/shop" className="text-[0.68rem] uppercase tracking-[0.12em] text-[#636B2F] transition hover:text-[#49501F]">
        ← Back to shop
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-4">
          <div className="relative overflow-hidden bg-zinc-100">
            {isSoldOut && (
              <span className="absolute right-3 top-3 z-10 rounded-full bg-[#636B2F] px-2.5 py-1 text-[0.56rem] font-medium uppercase tracking-[0.18em] text-white">
                Sold out
              </span>
            )}
            <img src={product.images?.[0] ?? product.image} alt={product.title} className="h-[520px] w-full object-cover" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {(product.images ?? [product.image]).map((image, index) => (
              <div key={`${product.id}-${index}`} className="overflow-hidden bg-zinc-100">
                <img src={image} alt={`${product.title} view ${index + 1}`} className="h-32 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-zinc-500">
              {product.type.charAt(0).toUpperCase() + product.type.slice(1).toLowerCase()}
              {showMediumMetadata ? ` · ${product.medium}` : ""}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">{product.title}</h1>
          </div>

          <div className="flex items-center gap-3">
            {hasDiscount && priceInfo ? (
              <>
                <span className="text-xl text-zinc-400 line-through">₱{priceInfo.originalPrice}</span>
                <span className="text-2xl font-bold text-[#48501E]">₱{priceInfo.discountedPrice}</span>
              </>
            ) : (
              <span className="text-2xl font-medium text-zinc-900">₱{product.price}</span>
            )}
          </div>

          <p className="text-base leading-7 text-zinc-700">{product.description}</p>

          <div className="space-y-4 pt-0">
            {!isSoldOut && (
              <p className="text-sm leading-6 text-zinc-800">
                <span className="font-semibold">
                  {product.type === "OTHERS"
                    ? `Artwork on ${materialSummary}`
                    : isOriginalOrStudy
                      ? `${product.medium} painting ${product.type.toLowerCase()} on ${materialSummary}`
                      : `${product.type.charAt(0).toUpperCase() + product.type.slice(1).toLowerCase()} on ${product.material}`}
                </span>
                {`, ${sizeSummaryLabel}`}
              </p>
            )}

            {!isOriginalOrStudy && !isSoldOut && (
              <div>
                <label className="block text-[0.62rem] uppercase tracking-[0.18em] text-zinc-500">Size</label>
                <div className="mt-3">
                  <select
                    value={selectedSize}
                    onChange={(event) => setSelectedSize(event.target.value)}
                    disabled={availableSizes.length === 0}
                    className="w-full rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-[#636B2F] disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400"
                  >
                    {availableSizes.length > 0 ? (
                      <>
                        <option value="" disabled>Select a size</option>
                        {normalizedSizes.map((size) => (
                          <option key={`${product.id}-${size.label}`} value={size.label} disabled={!size.available}>
                            {size.available ? size.label : "— not available"}
                          </option>
                        ))}
                      </>
                    ) : (
                      <option value="">— not available</option>
                    )}
                  </select>
                </div>
              </div>
            )}

            {showQuantitySelector && (
              <div>
                <label className="block text-[0.62rem] uppercase tracking-[0.18em] text-zinc-500">Quantity</label>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className={`h-10 w-10 rounded-full border text-lg transition ${
                      quantity <= 1
                        ? "cursor-not-allowed border-zinc-200 text-zinc-300"
                        : "border-zinc-300 text-zinc-700 hover:border-zinc-400"
                    }`}
                  >
                    −
                  </button>
                  <span className="min-w-4 text-center text-sm text-zinc-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    disabled={quantity >= 10}
                    className={`h-10 w-10 rounded-full border text-lg transition ${
                      quantity >= 10
                        ? "cursor-not-allowed border-zinc-200 text-zinc-300"
                        : "border-zinc-300 text-zinc-700 hover:border-zinc-400"
                    }`}
                  >
                    ＋
                  </button>
                </div>
              </div>
            )}
          </div>

          {!isOriginalOrStudy && isSoldOut && (
            <div className="space-y-3">
              <label className="block text-[0.62rem] uppercase tracking-[0.18em] text-zinc-500">Notify when available</label>
              <div className="flex items-center gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email address"
                  className="h-8 w-[72%] min-w-0 rounded-full border border-zinc-300 bg-white px-4 py-2 text-[11px] text-zinc-700 placeholder:text-zinc-400 outline-none transition focus:border-[#636B2F]"
                />
                <button
                  type="button"
                  className="flex h-8 items-center justify-center rounded-full border border-[#636B2F] bg-[#636B2F] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.08em] text-white transition hover:border-[#49501F] hover:bg-[#49501F]"
                >
                  Notify me
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isSoldOut}
            className={`relative inline-flex w-full items-center justify-center rounded-full border border-[#636B2F] bg-[#636B2F] px-5 py-3 text-[0.66rem] font-medium uppercase tracking-[0.08em] text-white transition duration-300 ease-out hover:bg-[#49501F] hover:border-[#49501F] active:scale-[0.99] disabled:cursor-not-allowed disabled:border-zinc-300 disabled:bg-zinc-300 disabled:text-zinc-500 ${
              isAdded ? "bg-[#49501F]" : ""
            }`}
          >
            <span className={`inline-block transition-all duration-300 ${isAdded ? "-translate-y-1 opacity-0" : "translate-y-0 opacity-100"}`}>
              {isSoldOut ? "Sold out" : "Add to cart"}
            </span>
            {!isSoldOut && (
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isAdded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                aria-live="polite"
              >
                Added
              </span>
            )}
          </button>

          {isAdded && (
            <div className="pointer-events-none fixed bottom-6 right-6 z-50 border border-[#636B2F] bg-[#636B2F] px-4 py-3 text-[0.62rem] uppercase tracking-[0.14em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 animate-[fadeIn_0.25s_ease-out]">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/70 text-[0.68rem] text-white">✓</span>
                <span>Added to cart</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
