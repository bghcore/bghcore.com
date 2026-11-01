"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type ThemeName = "light" | "dark";

const themeChangeEvent = "themechange";

function readTheme(): ThemeName {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribeToTheme(onChange: () => void) {
  window.addEventListener(themeChangeEvent, onChange);
  return () => window.removeEventListener(themeChangeEvent, onChange);
}

export function ThemeToggle() {
  // Null during server render; the real theme is known only in the browser.
  const theme = useSyncExternalStore<ThemeName | null>(subscribeToTheme, readTheme, () => null);
  const nextTheme: ThemeName = theme === "light" ? "dark" : "light";

  function toggleTheme() {
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // Storage can be blocked; the choice still applies for this visit.
    }
    window.dispatchEvent(new Event(themeChangeEvent));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme ? `Switch to ${nextTheme} theme` : "Toggle color theme"}
      className="inline-flex size-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
    >
      {/* Both icons render on the server; CSS picks one so nothing flashes before hydration. */}
      <Sun aria-hidden="true" className="size-4 light:hidden" strokeWidth={1.75} />
      <Moon aria-hidden="true" className="hidden size-4 light:block" strokeWidth={1.75} />
    </button>
  );
}
