"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ShopItem } from "@/lib/shop";
import { getPriceBreakdown } from "@/lib/discounts";

export type CartItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  size: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: ShopItem, size: string, quantity?: number) => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
  removeItem: (id: number, size: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

const STORAGE_KEY = "artbydmy-cart";
const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as CartItem[];
        setItems(parsed);
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: ShopItem, size: string, quantity = 1) => {
    setItems((current) => {
      const safeQuantity = Math.min(10, Math.max(1, quantity));
      const priceBreakdown = getPriceBreakdown(product);
      const existing = current.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return current.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: Math.min(10, item.quantity + safeQuantity) }
            : item,
        );
      }

      return [...current, {
        id: product.id,
        title: product.title,
        image: product.image,
        price: priceBreakdown.discountedPrice,
        originalPrice: priceBreakdown.originalPrice,
        size,
        quantity: safeQuantity,
      }];
    });
  };

  const updateQuantity = (id: number, size: string, quantity: number) => {
    const safeQuantity = Math.min(10, Math.max(0, quantity));

    setItems((current) =>
      current
        .map((item) => (item.id === id && item.size === size ? { ...item, quantity: safeQuantity } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: number, size: string) => {
    setItems((current) => current.filter((item) => !(item.id === id && item.size === size)));
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const originalSubtotal = useMemo(() => items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
