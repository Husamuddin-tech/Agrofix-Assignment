"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import emotionCache from "../lib/emotionCache";
import AppThemeProvider from "@/app/theme-provider"; // your new garden theme
import Layout from "@/store/Layout"; // the background + container layout

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CacheProvider value={emotionCache}>
          <AppThemeProvider>
            <CssBaseline />
            <Layout>{children}</Layout>
          </AppThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
