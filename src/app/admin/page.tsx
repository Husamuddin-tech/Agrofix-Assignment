// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../../lib/auth";
// import { redirect } from "next/navigation";
// import AdminDashboard from "./components/AdminDashboard";

// export default async function AdminPage() {
//   const session = (await getServerSession(authOptions)) as {
//     user: { role: string };
//   } | null;

//   if (!session || session.user.role !== "admin") {
//     redirect("/unauthorized"); // Or fallback route like "/"
//   }

//   return <AdminDashboard />;
// }
"use client";

import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";

// Dynamically import the ProductCatalogue without SSR
const ProductCatalogue = dynamic(
  () => import("../components/ProductCatalogue"),
  {
    ssr: false,
  }
);

export default function AdminPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <ProductCatalogue />
    </Box>
  );
}
