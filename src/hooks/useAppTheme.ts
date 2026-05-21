"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AppTheme, getThemeFromDom } from "@/lib/theme";

/** Matches ThemeProvider defaultTheme — used for SSR and pre-hydration renders. */
const SSR_THEME: AppTheme = "dark";

/**
 * Resolves theme after mount. Until then, returns SSR_THEME so server HTML
 * matches the client's first React render (avoids hydration mismatch when
 * themeInitScript applied a different class from localStorage).
 */
export function useAppTheme() {
  const { theme, setTheme, resolvedTheme: nextResolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedAppTheme: AppTheme =
    (theme as AppTheme | undefined) ?? getThemeFromDom();

  const currentTheme: AppTheme = mounted ? resolvedAppTheme : SSR_THEME;

  return {
    theme,
    setTheme,
    resolvedTheme: nextResolvedTheme,
    mounted,
    currentTheme,
  };
}
