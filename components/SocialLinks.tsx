const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "Email", href: "mailto:hello@artbydmy.com" },
];

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[#D7D9BF] px-4 py-2 text-sm font-medium text-[#636B2F] transition hover:border-[#49501F] hover:bg-[#636B2F] hover:text-white"
        >
          {social.label}
        </a>
      ))}
    </div>
  );
}
