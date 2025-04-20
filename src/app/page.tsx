"use client";

import ProductCatalogue from "./components/ProductCatalogue";
import OrderSummary from "@/store/buyer/OrderSummary";
import { Box, Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Agri Bulk Orders
      </Typography>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        <Box flex={2}>
          <ProductCatalogue />
        </Box>
        <Box flex={1}>
          <OrderSummary />
        </Box>
      </Box>
    </Container>
  );
}
