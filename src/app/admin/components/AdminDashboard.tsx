"use client";

import { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import OrderManager from "./OrderManager";
import ProductManager from "./ProductManager";

export default function AdminDashboard() {
  const [tab, setTab] = useState(0);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Tabs value={tab} onChange={(_, val) => setTab(val)} sx={{ mb: 3 }}>
        <Tab label="Orders" />
        <Tab label="Products" />
      </Tabs>

      {tab === 0 && <OrderManager />}
      {tab === 1 && <ProductManager />}
    </Box>
  );
}
