export default function DotBackground() {
  return (
    <div className="flex flex-col justify-center bg-slate-50 py-4 dark:bg-[#101726] sm:py-8">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 dark:[--dot-color:rgba(255,255,255,0.1)]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--dot-color, rgba(0, 0, 0, 0.1)) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}
