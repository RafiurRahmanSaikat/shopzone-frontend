export default function BackgroundGradientGridPattern() {
  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-gray-900">
        {/* Gradient background */}
        <div className="inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900 opacity-50"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_34px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        {/* <div className="absolute inset-0 opacity-20">

          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255, 255, 255, 0.1) 2px, transparent 2px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 2px, transparent 2px)",
              backgroundSize: "48px 48px",
              maskImage: "linear-gradient(180deg, red, transparent)",
            }}
          ></div>
        </div> */}
        {/* Colorful background elements */}
        {/* <div className="absolute bottom-44 left-[8%] top-28 hidden h-[150px] w-[900px] -rotate-45 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-800 opacity-30 blur-3xl filter lg:-left-20 lg:bottom-24 lg:block lg:h-28 lg:w-[250px] lg:-rotate-12 lg:opacity-20 xl:h-40 xl:w-[400px]"></div>

        <div className="absolute -left-64 hidden rotate-12 rounded-3xl bg-sky-800 opacity-30 blur-3xl filter lg:block lg:h-32 lg:w-[450px] xl:h-44 xl:w-[300px]"></div>
        <div className="absolute right-[28%] top-0 hidden h-[150px] w-[200px] rotate-12 rounded-3xl bg-gradient-to-l from-blue-600 to-sky-400 opacity-20 blur-3xl filter lg:-right-20 lg:top-44 lg:block lg:h-72 lg:w-[350px] xl:h-80 xl:w-[500px]"></div> */}
      </div>
    </>
  );
}
