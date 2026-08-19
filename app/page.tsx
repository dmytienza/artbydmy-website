import Link from "next/link";

export default function Home() {
  return (
    <main className="flex w-full flex-1 bg-transparent px-0 py-0">
      <div className="relative w-full overflow-hidden bg-zinc-100" aria-label="Home page content">
        <img
          src="/placeholder-landscape-a.svg"
          alt="Art by DMY placeholder artwork"
          className="h-[72vh] w-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="translate-y-[18vh]">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-[6px] border border-white/80 bg-white/10 px-8 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-[1px] transition-all hover:bg-white/15"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
