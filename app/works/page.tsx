import ArtworkGrid from "@/components/ArtworkGrid";
import { getWorks } from "@/lib/getWorks";

export default function WorksPage() {
  const works = getWorks();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-16 pt-[15px] lg:px-8">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Portfolio</p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">Selected works</h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-600">
          A focused collection of paintings and studies.
        </p>
      </div>

      <ArtworkGrid works={works} />
    </main>
  );
}
