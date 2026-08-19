export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-16 pt-[15px] lg:px-8">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[#636B2F]">
          About
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          Artist
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="overflow-hidden border border-zinc-200 bg-zinc-100">
          <img
            src="/placeholder-art.svg"
            alt="Artist portrait placeholder"
            className="h-full min-h-[420px] w-full object-cover"
          />
        </div>

        <div className="space-y-8">
          <p className="text-base leading-7 text-zinc-700">
            <b>Dhanica Ytienza</b> (DMY) is a Filipino self-taught artist based
            in Cebu, Philippines, working primarily in watercolor and oil.
          </p>

          <blockquote className="space-y-5 border-l border-[#D7D9BF] pl-5 text-[0.82rem] leading-6 text-zinc-700 italic">
            <p>
              I want to create paintings that feel like a quiet moment in a
              room, a pause in time, or a fleeting memory. I want to create
              paintings that hold a feeling over time.
            </p>

            <p>
              I create paintings about the things that are often felt before
              they are spoken — the quiet complexities of being human, the
              tenderness of memory, and the ways we experience ourselves and one
              another. Much of my work explores women, identity, and our inner
              worlds, while finding beauty in simplicity and in things that are
              imperfect, incomplete, and still becoming.
            </p>

            <p>
              Lately, my work has been opening outward. Through my own
              adventures and experiences, I’ve found a growing love for nature —
              its quietness, vastness, and fleeting moments of beauty. These
              experiences are slowly finding their way into my paintings
              alongside the things I carry within.
            </p>

            <p>At the heart of my work is a simple curiosity:</p>

            <p>
              <strong className="not-italic">
                What does it mean to feel, to exist, and to be here?
              </strong>
            </p>
          </blockquote>
        </div>
      </div>
    </main>
  );
}
