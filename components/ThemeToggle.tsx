"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/Icon";

type ThemeName = "light" | "dark";

const themeChangeEvent = "themechange";

function readTheme(): ThemeName {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribeToTheme(onChange: () => void) {
  window.addEventListener(themeChangeEvent, onChange);
  return () => window.removeEventListener(themeChangeEvent, onChange);
}

export function ThemeToggle() {
  // Null during server render; the real theme is known only in the browser.
  const theme = useSyncExternalStore<ThemeName | null>(subscribeToTheme, readTheme, () => null);
  const nextTheme: ThemeName = theme === "dark" ? "light" : "dark";

  function toggleTheme() {
    if (nextTheme === "dark") document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
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
      className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-raised hover:text-ink"
    >
      {/* Both icons render on the server; CSS picks one so nothing flashes before hydration. */}
      <Icon name="moon" className="size-4 dark:hidden" />
      <Icon name="sun" className="hidden size-4 dark:block" />
    </button>
  );
}
