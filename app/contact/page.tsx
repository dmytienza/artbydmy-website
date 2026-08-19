export default function ContactPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 pb-16 pt-[15px] lg:px-8">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Contact</p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          Let’s connect
        </h1>
      </div>

      <div className="space-y-6">
        <p className="max-w-2xl text-base leading-7 text-zinc-600">
          I’d love to hear from you. Questions, inquiries, thoughts, or just a hello are always welcome.
        </p>

        <a href="mailto:artbydmy@gmail.com" className="inline-block text-base font-medium text-[#636B2F] underline decoration-[#636B2F] underline-offset-4 transition hover:text-[#49501F]">
          artbydmy@gmail.com
        </a>

        <form className="w-full space-y-5 bg-white p-0">
          <div className="grid w-full gap-5">
            <label className="block w-full text-[0.7rem] font-medium uppercase tracking-[0.2em] text-zinc-600">
              Name
              <input
                type="text"
                className="mt-2 block w-full border-b border-zinc-300 bg-transparent pb-2 text-sm text-zinc-900 outline-none transition focus:border-[#636B2F]"
                placeholder="Your name"
              />
            </label>

            <label className="block w-full text-[0.7rem] font-medium uppercase tracking-[0.2em] text-zinc-600">
              Email
              <input
                type="email"
                className="mt-2 block w-full border-b border-zinc-300 bg-transparent pb-2 text-sm text-zinc-900 outline-none transition focus:border-[#636B2F]"
                placeholder="you@email.com"
              />
            </label>
          </div>

          <label className="block w-full text-[0.7rem] font-medium uppercase tracking-[0.2em] text-zinc-600">
            Subject
            <input
              type="text"
              className="mt-2 block w-full border-b border-zinc-300 bg-transparent pb-2 text-sm text-zinc-900 outline-none transition focus:border-[#636B2F]"
              placeholder="General inquiry"
            />
          </label>

          <label className="block w-full text-[0.7rem] font-medium uppercase tracking-[0.2em] text-zinc-600">
            Message
            <textarea
              rows={6}
              className="mt-2 block w-full resize-none border border-zinc-300 bg-transparent p-3 text-sm text-zinc-900 outline-none transition focus:border-[#636B2F]"
              placeholder="Say hello..."
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full border border-[#636B2F] bg-[#636B2F] px-5 py-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#49501F] hover:border-[#49501F]"
          >
            Send message
          </button>
        </form>
      </div>
    </main>
  );
}
