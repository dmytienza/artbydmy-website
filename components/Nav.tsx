"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <header className={pathname === "/" ? "relative z-30 bg-white" : "sticky top-0 z-20 bg-white"}>
      <div className="bg-[#636B2F] px-4 py-2 text-center text-[0.6rem] font-medium uppercase tracking-[0.22em] text-white">
        Opening offer: 25% off all works
      </div>

      {pathname === "/" ? (
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-6 py-7 text-center md:px-10 md:py-8 lg:px-12">
          <Link href="/" className="mb-0 text-[0.68rem] uppercase tracking-[0.38em] text-stone-900">
            Art by DMY
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-5 text-[0.7rem] font-normal uppercase tracking-[0.2em] text-[#636B2F] md:gap-7">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative inline-flex items-center transition-all duration-200 ease-out ${active ? "text-[#49501F] font-bold" : "text-[#636B2F] hover:-translate-y-0.5 hover:text-[#49501F]"}`}
                >
                  <span className="relative inline-flex items-center tracking-[0.2em] transition-all duration-200 ease-out hover:tracking-[0.24em]">
                    {link.label}
                  </span>
                </Link>
              );
            })}
            <Link href="/shop/cart" className="relative inline-flex items-center gap-2 text-[#636B2F] transition hover:-translate-y-0.5 hover:text-[#49501F]" aria-label="Shopping cart">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <circle cx="9" cy="18" r="1.5" />
                <circle cx="17" cy="18" r="1.5" />
                <path d="M3 4h2l2.4 9.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 .97-.76L20 7H7" />
              </svg>
              {totalItems > 0 && (
                <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#636B2F] px-1 text-[0.5rem] text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      ) : (
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 px-6 py-4 text-center md:px-10 md:py-5 lg:px-12">
          <Link href="/" className="mb-0 text-[0.7rem] uppercase tracking-[0.34em] text-stone-800">
            Art by DMY
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-5 text-[0.7rem] font-normal uppercase tracking-[0.2em] text-[#636B2F] md:gap-7">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative inline-flex items-center transition-all duration-200 ease-out ${active ? "text-[#49501F] font-bold" : "text-[#636B2F] hover:-translate-y-0.5 hover:text-[#49501F]"}`}
                >
                  <span className="relative inline-flex items-center tracking-[0.2em] transition-all duration-200 ease-out hover:tracking-[0.24em]">
                    {link.label}
                  </span>
                </Link>
              );
            })}
            <Link href="/shop/cart" className="relative inline-flex items-center gap-2 text-[#636B2F] transition hover:-translate-y-0.5 hover:text-[#49501F]" aria-label="Shopping cart">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <circle cx="9" cy="18" r="1.5" />
                <circle cx="17" cy="18" r="1.5" />
                <path d="M3 4h2l2.4 9.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 .97-.76L20 7H7" />
              </svg>
              {totalItems > 0 && (
                <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#636B2F] px-1 text-[0.5rem] text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
