"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const originalSubtotal = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const hasDiscount = originalSubtotal > subtotal;

  if (items.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-6 px-6 pb-16 pt-[15px] text-center">
        <p className="text-[0.7rem] uppercase tracking-[0.32em] text-zinc-500">Cart</p>
        <h1 className="text-4xl font-light tracking-[0.08em] text-zinc-900">Your cart is empty</h1>
        <Link href="/shop" className="border border-[#D7D9BF] bg-white px-5 py-3 text-[0.62rem] uppercase tracking-[0.22em] text-[#48501E] transition hover:border-[#636B2F] hover:bg-[#F5F6EF]">
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-[15px] md:px-10 lg:px-12">
      <div className="mb-8 flex items-end justify-between border-b border-[#E7E7E2] pb-6">
        <div>
          <p className="mb-2 text-[0.7rem] uppercase tracking-[0.3em] text-zinc-500">Cart</p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">Your selection</h1>
        </div>
        <button type="button" onClick={clearCart} className="text-[0.62rem] uppercase tracking-[0.22em] text-zinc-500 transition hover:text-[#48501E]">
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-5">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex flex-col gap-4 border border-[#E7E7E2] bg-white p-4 sm:flex-row sm:items-center">
              <img src={item.image} alt={item.title} className="h-28 w-24 object-cover bg-zinc-100" />

              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-medium text-zinc-900">{item.title}</h2>
                  <p className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-zinc-500">{item.size}</p>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] text-zinc-500">
                    Qty
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.id, item.size, Math.min(10, Math.max(1, Number(event.target.value) || 1)))}
                      className="w-14 border border-[#D7D9BF] bg-white px-2 py-1 text-sm text-zinc-900 outline-none focus:border-[#636B2F]"
                    />
                  </label>

                  <button type="button" onClick={() => removeItem(item.id, item.size)} className="text-[0.62rem] uppercase tracking-[0.2em] text-zinc-500 transition hover:text-[#48501E]">
                    Remove
                  </button>
                </div>

                <div className="text-right text-sm">
                  <div className="flex flex-col items-end gap-1">
                    {item.originalPrice !== item.price ? (
                      <>
                        <span className="text-zinc-400 line-through">₱{item.originalPrice * item.quantity}</span>
                        <span className="font-bold text-[#48501E]">₱{item.price * item.quantity}</span>
                      </>
                    ) : (
                      <span className="font-medium text-zinc-900">₱{item.price * item.quantity}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="border border-[#E7E7E2] bg-[#F6F6F2] p-6">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-zinc-500">Summary</p>
          <div className="mt-6 flex items-center justify-between text-sm text-zinc-700">
            <span>Subtotal</span>
            {hasDiscount ? (
              <div className="flex flex-col items-end gap-1">
                <span className="text-zinc-400 line-through">₱{originalSubtotal}</span>
                <span className="font-bold text-[#48501E]">₱{subtotal}</span>
              </div>
            ) : (
              <span>₱{subtotal}</span>
            )}
          </div>
          <button type="button" className="mt-8 w-full border border-[#636B2F] bg-[#636B2F] px-5 py-3 text-[0.62rem] uppercase tracking-[0.24em] text-white transition hover:bg-[#49501F] hover:border-[#49501F]">
            Checkout
          </button>
        </aside>
      </div>
    </main>
  );
}
