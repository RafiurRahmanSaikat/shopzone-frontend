import React, { useState } from "react";

const categories = [
  { id: "cabins", name: "Cabins", icon: "🏡" },
  { id: "beach", name: "Beach", icon: "🏖️" },
  { id: "mansions", name: "Mansions", icon: "🏰" },
  { id: "skiing", name: "Skiing", icon: "⛷️" },
  { id: "tropical", name: "Tropical", icon: "🌴" },
  { id: "countryside", name: "Countryside", icon: "🌾" },
  { id: "lakefront", name: "Lakefront", icon: "🏞️" },
  { id: "islands", name: "Islands", icon: "🏝️" },
  { id: "tiny_homes", name: "Tiny homes", icon: "🏠" },
];

function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className,
  children,
  onClick,
  isSelected,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        "--border-radius": `${borderRadius}px`,
      }}
      className={`relative min-h-[60px] w-fit min-w-[100px] cursor-pointer place-items-center rounded-[--border-radius] bg-white p-3 text-black transition-all hover:scale-105 dark:bg-black dark:text-white ${isSelected ? "scale-105" : ""} ${className}`}
    >
      <div
        style={{
          "--border-width": `${borderWidth}px`,
          "--border-radius": `${borderRadius}px`,
          "--duration": `${duration}s`,
          "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          "--background-radial-gradient": `radial-gradient(transparent,transparent, ${color instanceof Array ? color.join(",") : color},transparent,transparent)`,
        }}
        className={`before:bg-shine-size motion-safe:before:animate-shine pointer-events-none before:absolute before:inset-0 before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:![mask-composite:exclude] before:[mask:--mask-linear-gradient]`}
      ></div>
      {children}
    </div>
  );
}

const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="w-full space-y-4">
      <h2 className="mb-6 text-center text-2xl font-semibold">
        Select Your Category
      </h2>
      <div className="w-full overflow-x-auto">
        <div className="flex min-w-max gap-4 px-4 pb-4">
          {categories.map((category) => (
            <ShineBorder
              key={category.id}
              color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              onClick={() => setSelectedCategory(category.id)}
              isSelected={selectedCategory === category.id}
              className="flex flex-col items-center justify-center gap-2"
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </ShineBorder>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
