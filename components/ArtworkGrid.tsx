import ArtworkCard from "@/components/ArtworkCard";

type ArtworkGridProps = {
  works: Array<{ id: number; title: string; medium: string; image: string; year: number }>;
};

export default function ArtworkGrid({ works }: ArtworkGridProps) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 xl:columns-4">
      {works.map((work) => (
        <ArtworkCard key={work.id} work={work} />
      ))}
    </div>
  );
}
