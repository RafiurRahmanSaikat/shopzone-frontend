export default function NoisyGridPattern() {
  return (
    <section className="absolute inset-0 overflow-hidden bg-white/10 px-4 backdrop-blur-3xl dark:bg-zinc-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_35px] backdrop-blur-xl [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div
        aria-hidden="true"
        className="absolute inset-0 -translate-x-1/2 overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#4098FF] to-[#0CC043] opacity-30"
        />
      </div>
      {/* Wavy Design */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 transform blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(50% 0%, 65% 15%, 80% 0%, 100% 20%, 90% 50%, 70% 80%, 40% 100%, 20% 85%, 0% 60%, 10% 20%)",
          }}
          className="aspect-[1155/678] w-[50vw] max-w-4xl bg-gradient-to-tr from-[#42a5f5] via-[#7e57c2] to-[#26c6da] opacity-20"
        />
      </div>
    </section>
  );
}
