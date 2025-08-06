"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  // On mount: check localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    const dark = root.classList.contains("dark");

    if (dark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        size="lg"
        className="px-8 py-4 text-xl font-semibold"
        onClick={toggleDarkMode}
      >
        {isDark ? "Light Mode" : "Dark Mode"}
      </Button>
    </div>
  );
}
