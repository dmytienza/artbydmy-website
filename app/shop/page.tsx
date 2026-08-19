"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getPriceBreakdown, products } from "@/lib/shop";

const pageSize = 8;
const filterOptions = ["ALL", "ORIGINAL", "PRINT", "STUDY", "OTHERS"] as const;

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<(typeof filterOptions)[number]>("ALL");
  const [sortOrder, setSortOrder] = useState<"low-high" | "high-low">("low-high");

  const filteredProducts = useMemo(() => {
    const filtered = activeFilter === "ALL" ? products : products.filter((product) => product.type === activeFilter);
    return [...filtered].sort((a, b) => {
      if (sortOrder === "low-high") return a.price - b.price;
      return b.price - a.price;
    });
  }, [activeFilter, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, safePage]);

  const handleFilterChange = (filter: (typeof filterOptions)[number]) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-16 pt-[15px] lg:px-8">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Shop</p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          Original paintings &amp; prints
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-600">
          Selected works available to collect.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => handleFilterChange(filter)}
                className={`group relative pb-1 text-[0.5rem] uppercase tracking-[0.12em] transition-all duration-200 ease-out ${
                  isActive
                    ? "text-[#48501E] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-[#636B2F]"
                    : "text-zinc-500 hover:text-[#48501E]"
                }`}
              >
                <span className={`inline-block transition-transform duration-200 ${isActive ? "translate-y-0" : "group-hover:-translate-y-0.5"}`}>
                  {filter === "ALL" ? "All" : filter}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-[12px] tracking-normal text-zinc-500">
          <span>Sort</span>
          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value as "low-high" | "high-low")}
            className="appearance-none border-none bg-transparent px-0 py-0 pr-4 text-[12px] tracking-normal text-[#48501E] outline-none transition hover:text-[#262E14]"
          >
            <option value="low-high">Price: low to high</option>
            <option value="high-low">Price: high to low</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-full border border-dashed border-zinc-300 px-6 py-10 text-center text-sm uppercase tracking-[0.18em] text-zinc-500">
          No pieces in this collection
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {paginatedProducts.map((product) => {
            const priceInfo = getPriceBreakdown(product);
            const hasDiscount = priceInfo.discountRate > 0;

            return (
              <Link key={product.id} href={`/shop/${product.id}`} className="group flex flex-col gap-3 bg-white">
                <article className="relative flex flex-col gap-3">
                  {product.soldOut && (
                    <span className="absolute right-3 top-3 z-10 rounded-full bg-[#636B2F] px-2.5 py-1 text-[0.56rem] font-medium uppercase tracking-[0.18em] text-white">
                      Sold out
                    </span>
                  )}

                  <div className="overflow-hidden bg-zinc-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-80 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="flex items-end justify-between gap-4 pt-1 text-zinc-900">
                    <div className="leading-none">
                      <p className="text-[0.62rem] uppercase tracking-[0.22em] text-zinc-500">{product.type}</p>
                      <h2 className="mt-1 text-[0.7rem] font-normal text-zinc-900">{product.title}</h2>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      {hasDiscount ? (
                        <>
                          <span className="text-zinc-400 line-through">₱{priceInfo.originalPrice}</span>
                          <span className="font-bold text-[#48501E]">₱{priceInfo.discountedPrice}</span>
                        </>
                      ) : (
                        <span className="text-zinc-700">₱{product.price}</span>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={safePage === 1}
            className="rounded-full border border-[#D7D9BF] px-3 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-[#636B2F] transition hover:border-[#49501F] hover:bg-[#636B2F] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-[0.62rem] uppercase tracking-[0.2em] text-zinc-700">
            {safePage} / {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={safePage === totalPages}
            className="rounded-full border border-[#D7D9BF] px-3 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-[#636B2F] transition hover:border-[#49501F] hover:bg-[#636B2F] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
