import { useEffect, useState } from "react";

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setCurrentTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, [currentTheme]);

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return { currentTheme, toggleTheme };
};
