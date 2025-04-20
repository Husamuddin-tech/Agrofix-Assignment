"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/store/productStore";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  CardActions,
  Button,
  Chip,
} from "@mui/material";
import { useOrderStore } from "@/store/orderStore";
import OrderSummary from "@/store/buyer/OrderSummary";
import GardenBox from "@/store/GardenBox";
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  image?: string;
}

export default function ProductCatalogue() {
  const { products, setProducts } = useProductStore();
  const { addToOrder } = useOrderStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts]);

  if (loading)
    return (
      <GardenBox display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </GardenBox>
    );

  if (error) return <Alert severity="error">{error}</Alert>;

  if (!products.length)
    return (
      <GardenBox textAlign="center" mt={5}>
        <Typography>No products found. Check back soon!</Typography>
      </GardenBox>
    );

  const stockColor = (stock: number) => {
    if (stock === 0) return "error";
    if (stock <= 10) return "warning";
    return "success";
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        mt: 5,
        background: "linear-gradient(to bottom right, #e8f5e9, #f1f8e9)",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
        🌱 Product Catalogue
      </Typography>
      <GardenBox
        display="flex"
        flexWrap="wrap"
        gap={3}
        justifyContent="center"
        mt={4}
        px={2}
      >
        {products.map((product: Product) => (
          <GardenBox
            key={product.id}
            width={{ xs: "100%", sm: "48%", md: "30%" }}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Card
              sx={{
                background: "transparent",
                boxShadow: "none",
              }}
            >
              {product.image && (
                <CardMedia
                  component="img"
                  height="160"
                  image={product.image || "/leaf-placeholder.jpg"}
                  alt={product.name}
                  sx={{ objectFit: "cover", borderRadius: "12px 12px 0 0" }}
                />
              )}

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#2e7d32", fontWeight: 600 }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "#4e944f", mb: 1 }}
                >
                  {product.description}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "#2e7d32", fontWeight: "bold" }}
                >
                  ₹{product.price} / {product.unit}
                </Typography>

                <Chip
                  label={`Stock: ${product.stock}`}
                  color={stockColor(product.stock)}
                  size="small"
                  sx={{ color: "#fffff", mt: 1 }}
                />
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  fullWidth
                  onClick={() =>
                    addToOrder({
                      productId: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                    })
                  }
                  variant="contained"
                  disabled={product.stock === 0}
                  sx={{
                    mt: 2,
                    backgroundColor: "#66bb6a",
                    "&:hover": {
                      backgroundColor: "#388e3c",
                    },
                  }}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Order"}
                </Button>
              </CardActions>
            </Card>
          </GardenBox>
        ))}
      </GardenBox>

      <GardenBox mt={5}>
        <OrderSummary />
      </GardenBox>
    </Paper>
  );
}
