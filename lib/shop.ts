import shopItems from "@/data/shopItems.json";

export enum ShopItemType {
  ORIGINAL = "ORIGINAL",
  PRINT = "PRINT",
  STUDY = "STUDY",
  OTHERS = "OTHERS",
}

export enum ShopMedium {
  OIL = "Oil",
  WATERCOLOR = "Watercolor",
  GOUACHE = "Gouache",
}

export interface ShopSizeOption {
  label: string;
  available?: boolean;
}

export type ShopSizeValue = string | ShopSizeOption;

export interface ShopItem {
  id: number;
  title: string;
  type: ShopItemType;
  medium: ShopMedium;
  material: string;
  size: ShopSizeValue[];
  format: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  soldOut?: boolean;
}

export function normalizeSizeOptions(size: ShopSizeValue[]) {
  return size.map((option) => {
    if (typeof option === "string") {
      return { label: option, available: true };
    }

    return {
      label: option.label,
      available: option.available ?? true,
    };
  });
}

export function getDefaultSizeForItem(product: ShopItem) {
  if (product.size.length === 0) return "Original";

  const firstOption = product.size[0];
  return typeof firstOption === "string" ? firstOption : firstOption.label;
}

export const products: ShopItem[] = shopItems as ShopItem[];

export { getPriceBreakdown } from "@/lib/discounts";
