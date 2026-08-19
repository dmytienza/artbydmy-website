# Art by DMY — Features, Logic, and Behavior

## Overview
This project is a minimalist artist storefront and portfolio built with Next.js App Router, TypeScript, and Tailwind CSS. The experience combines editorial presentation, a works gallery, a shop catalog, product detail pages, and a cart with discount-aware pricing.

The visual system favors a clean white background, olive-green accents, uppercase small-label typography, and a restrained gallery-first layout.

---

## Tech and Structure

### Stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- App Router

### Main areas
- Home page: landing shell with centered navigation and brand presence
- Works page: gallery of selected works
- Shop page: product catalog with filters, sorting, and pagination
- Product detail page: artwork info, variant selection, pricing, add-to-cart flow
- Cart page: quantity editing, subtotal display, and final total
- About / Contact pages: content pages in the same visual system

---

## Global Design Behavior

### Navigation
- Header remains minimal and editorial.
- Navigation labels are uppercase and lightweight, not bold by default.
- Olive green is used for accents and active emphasis.
- White background is retained across core layout surfaces.
- Thin promo banner sits above the navbar with a brand olive background.

### Typography
- Typeface is Roboto via Next.js font loading.
- Headings are condensed and elegant, with a restrained tracking rhythm.
- Body copy remains normal and readable, not overly emphasized.

### Layout rhythm
- Most pages use a compact top spacing scheme.
- Core content widths remain consistent and centered.
- Card and panel borders are subtle, often light neutral tones rather than strong black lines.

---

## Home Page Behavior

- The homepage retains the navbar and footer.
- The page content is intentionally minimal, consistent with the rest of the site aesthetic.
- The home page is visually immersive but not crowded.
- The overall look is intentionally white and pared back, with the brand name and navigation remaining visible.

---

## Works Page Behavior

### Works gallery
- The works section presents a visual grid of portfolio artworks.
- Each card uses image-first design.
- Hover state emphasizes the image subtly instead of heavy card styling.
- Metadata is intentionally minimal.

### Works detail logic
- Works are loaded from a typed catalog.
- The gallery and details use the same product/portfolio data model for consistency.

---

## Shop Page Behavior

### Catalog display
- Products are displayed as cards with a large image and compact metadata.
- Product type is shown in small uppercase labels.
- Product title is minimal and readable.

### Filters
- Catalog supports these filters:
  - All
  - Original
  - Print
  - Study
  - Others
- Active filter state updates the list immediately.

### Sorting
- The user can sort by price:
  - Low to high
  - High to low

### Pagination
- The shop has a fixed page size with Next / Prev controls.
- Total pages are calculated from current filtered results.

### Product pricing display
- If no discount exists, the price is shown normally.
- If a discount exists, the original price is shown with a strikethrough and the discounted price is shown in bold, olive accent color.

---

## Product Detail Page Behavior

### Product presentation
- Each item page displays the main image and supporting gallery images.
- Product type and medium are displayed in small uppercase labels.
- Product description is shown in readable editorial text.

### Size logic
- Original and study pieces do not require a selectable size in the same way as prints.
- Prints may require the user to choose a size if available sizes are present.
- If a size is unavailable, it is disabled and marked as not available.

### Quantity logic
- Quantity is limited to a maximum of 10.
- Increment and decrement controls are available when quantity is applicable.

### Sold-out logic
- Sold-out items are visually marked with a badge.
- If a product is sold out:
  - the add-to-cart button is disabled
  - the sold-out badge appears
  - for non-original and non-study products, a notify form appears with email input and Notify me button

### Add to cart flow
- When a valid product is added, the UI shows a brief confirmation state.
- Items are stored in localStorage through the cart context so they persist across reloads.

---

## Cart Logic and Behavior

### Cart contents
- The cart stores each item by product id and selected size.
- Quantity is stored per item entry.
- Cart items persist in browser localStorage.

### Quantity constraints
- Quantity values are capped at 10.
- Minimum quantity is 1.
- Users can change quantity directly from the cart input.

### Pricing behavior
- Each cart item keeps both:
  - original price
  - discounted price
- If a discount applies, the cart line item shows:
  - original price with strikethrough
  - discounted price in bold
- The subtotal follows the same pattern:
  - original subtotal
  - discounted subtotal

### Discounted total logic
- The cart summary always uses the discounted subtotal for the effective total.
- Savings are implied by the difference between original subtotal and discounted subtotal.

---

## Discount System

### Goal
The discount system supports different discount scopes and ensures they can stack together.

### Metadata model
Each discount record includes:
- description (optional)
- discount amount (percentage)
- date added
- date from
- date to
- scope
- productId when scope is product-specific
- category when scope is category-specific

### Supported scopes
1. Global
   - Applies to every product in the storefront.
2. Product
   - Applies to one specific product by id.
3. Category
   - Applies to all products in a category such as PRINT, ORIGINAL, STUDY, or OTHERS.

### Example structure
```json
{
  "id": "global-opening-offer",
  "description": "Opening studio sale",
  "amount": 25,
  "dateAdded": "2025-01-01T00:00:00.000Z",
  "dateFrom": "2025-01-01T00:00:00.000Z",
  "dateTo": "2026-12-31T23:59:59.000Z",
  "scope": "global"
}
```

### Activation rules
A discount is active only when:
- the current date is after or equal to dateAdded
- the current date is after or equal to dateFrom
- the current date is before or equal to dateTo

### Stacking behavior
When a product has multiple active discounts, they are combined mathematically.

Example:
- 25% global discount
- 10% print discount

Combined effect:
- not 35% flat off
- instead they stack as a compounded discount rate

Formula:
```ts
combinedRate = 1 - (1 - r1) * (1 - r2)
```

This ensures the true effective discount is applied properly.

### Price calculation
The product price is calculated as:
```ts
discountedPrice = originalPrice * (1 - effectiveDiscountRate)
```

The system stores:
- original price
- discounted price
- discount rate
- list of applicable discounts
- total discount amount

---

## Data Model Notes

### ShopItem shape
```ts
interface ShopItem {
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
```

### DiscountRule shape
```ts
interface DiscountRule {
  id: string;
  description?: string;
  amount: number;
  dateAdded: string;
  dateFrom: string;
  dateTo: string;
  scope: "global" | "product" | "category";
  productId?: number;
  category?: string;
}
```

---

## Cart and Discount Interaction

### Price behavior in cart
- Cart entries save the discounted unit price and the original unit price.
- Quantity changes update the line item total correctly.
- Summary total uses the discounted cart total.
- Old original value remains visible for clarity.

### Real-world behavior
- If a product has a discount and there is also a global discount, both work together.
- The user sees the final discounted amount immediately and without needing to manually calculate.
- The checkout summary remains consistent with the line-item display.

---

## Files Related to this Logic

- [lib/discounts.ts](lib/discounts.ts)
- [data/discounts.json](data/discounts.json)
- [lib/shop.ts](lib/shop.ts)
- [components/CartContext.tsx](components/CartContext.tsx)
- [app/shop/page.tsx](app/shop/page.tsx)
- [app/shop/[id]/page.tsx](app/shop/[id]/page.tsx)
- [app/shop/cart/page.tsx](app/shop/cart/page.tsx)

---

## Notes for Future Maintenance

- To add a new discount, update the discount JSON record with the correct scope, amount, and date range.
- To change the product pricing behavior, adjust the discount logic in [lib/discounts.ts](lib/discounts.ts).
- To change the cart summary display, update the price rendering in [app/shop/cart/page.tsx](app/shop/cart/page.tsx).
- To change the catalog card or product detail presentation, update the relevant pages in [app/shop/page.tsx](app/shop/page.tsx) and [app/shop/[id]/page.tsx](app/shop/[id]/page.tsx).

This document captures the current behavioral model of the storefront, including catalog flow, discount logic, and cart pricing behavior.
