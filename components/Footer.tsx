"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const socials = [
  { label: "Instagram", href: "https://instagram.com/artbydmy", icon: "/ig-icon.png" },
  { label: "TikTok", href: "https://tiktok.com/@artbydmy", icon: "/tiktok-icon.png" },
  { label: "YouTube", href: "https://youtube.com/@artbydmy", icon: "/yt-icon.png" },
];

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-10 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 text-[#636B2F]">
          {socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className="flex h-9 w-9 items-center justify-center transition hover:opacity-80"
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
            >
              <img src={social.icon} alt={social.label} className="h-full w-full object-contain" />
            </Link>
          ))}
        </div>

        <div className="text-[0.8rem] text-[#636B2F]">
          © 2026 Copyright by Dhanica Ytienza
        </div>
      </div>
    </footer>
  );
}
