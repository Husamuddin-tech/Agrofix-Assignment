"use client";

import { SnackbarProvider } from "notistack";

export default function ClientSnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
}
