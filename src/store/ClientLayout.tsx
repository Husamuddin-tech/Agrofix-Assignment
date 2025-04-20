"use client";

import { ReactNode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import theme from "@/theme";
import createEmotionCache from "@/createEmotionCache";

const emotionCache = createEmotionCache();

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
