export const APP_THEMES = ["light", "dark", "neon"] as const;
export type AppTheme = (typeof APP_THEMES)[number];

/** Runs before paint — keeps saved theme on refresh (avoids dark flash). */
export const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem("theme");
    var root = document.documentElement;
    root.classList.remove("light", "dark", "neon");
    if (theme === "light" || theme === "dark" || theme === "neon") {
      root.classList.add(theme);
    } else {
      root.classList.add("dark");
    }
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`;

export function getThemeFromDom(): AppTheme {
  if (typeof document === "undefined") return "dark";
  const root = document.documentElement;
  if (root.classList.contains("neon")) return "neon";
  if (root.classList.contains("light")) return "light";
  if (root.classList.contains("dark")) return "dark";
  return "dark";
}
