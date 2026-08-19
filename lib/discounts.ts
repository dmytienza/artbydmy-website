import type { ShopItem } from "@/lib/shop";
import discountRulesData from "@/data/discounts.json";

export type DiscountScope = "global" | "product" | "category";

export interface DiscountRule {
  id: string;
  description?: string;
  amount: number;
  dateAdded: string;
  dateFrom: string;
  dateTo: string;
  scope: DiscountScope;
  productId?: number;
  category?: string;
}

export const discountRules: DiscountRule[] = discountRulesData as DiscountRule[];

export function isDiscountActive(discount: DiscountRule, now = new Date()) {
  const current = now.getTime();
  const addDate = new Date(discount.dateAdded).getTime();
  const fromDate = new Date(discount.dateFrom).getTime();
  const toDate = new Date(discount.dateTo).getTime();

  return current >= addDate && current >= fromDate && current <= toDate;
}

export function getActiveDiscountsForProduct(product: ShopItem, now = new Date()) {
  return discountRules.filter((discount) => {
    if (!isDiscountActive(discount, now)) return false;

    if (discount.scope === "global") return true;
    if (discount.scope === "product") return discount.productId === product.id;
    if (discount.scope === "category") return discount.category === product.type;

    return false;
  });
}

export function getPriceBreakdown(product: ShopItem, now = new Date()) {
  const originalPrice = product.price;
  const activeDiscounts = getActiveDiscountsForProduct(product, now);
  const effectiveRate = activeDiscounts.reduce((rate, discount) => {
    const discountRate = discount.amount / 100;
    return rate + discountRate - rate * discountRate;
  }, 0);

  const discountedPrice = Number((originalPrice * (1 - effectiveRate)).toFixed(2));

  return {
    originalPrice,
    discountedPrice,
    discountRate: effectiveRate,
    discounts: activeDiscounts,
    totalDiscountAmount: Number((originalPrice - discountedPrice).toFixed(2)),
  };
}
