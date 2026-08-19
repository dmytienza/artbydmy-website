type ArtworkCardProps = {
  work: { id: number; title: string; medium: string; image: string; year: number };
};

export default function ArtworkCard({ work }: ArtworkCardProps) {
  return (
    <article className="group relative mb-5 block overflow-hidden rounded-none bg-white transition duration-300 hover:opacity-95 break-inside-avoid">
      <div className="relative overflow-hidden bg-white">
        <img
          src={work.image}
          alt={work.title}
          className="block h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/15 via-black/0 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center gap-3 p-4 text-white opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="text-[0.7rem] uppercase tracking-[0.18em] leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
            {work.title}
          </span>
          <span className="text-[0.7rem] uppercase tracking-[0.18em] leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
            {work.year}
          </span>
        </div>
      </div>
    </article>
  );
}
