"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import greeneryTheme from "@/theme/greeneryTheme";

export default function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={greeneryTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
