"use client"

import { createContext, useState, useEffect } from "react"

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check for saved theme preference or use system preference
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme) {
        return savedTheme
      }

      // Check system preference
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark"
      }
    }

    return "light"
  })

  // Apply theme when it changes
  useEffect(() => {
    if (typeof window === "undefined") return

    const root = window.document.documentElement

    // Remove both classes first to ensure clean state
    root.classList.remove("dark")
    root.classList.remove("light")

    // Add the appropriate class
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.add("light")
    }

    // Save theme preference
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
