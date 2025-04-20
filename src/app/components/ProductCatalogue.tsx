"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/store/productStore";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  CardActions,
  Button,
} from "@mui/material";
import { useOrderStore } from "@/store/orderStore";
// Removed from top level and will be used inside the component
import OrderSummary from "@/store/buyer/OrderSummary";

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
  const { addToOrder } = useOrderStore(); // Moved inside the component
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

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 5, backgroundColor: "#fafafa" }}>
      <Typography variant="h6" gutterBottom>
        Product Catalogue
      </Typography>

      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="flex-start"
        sx={{
          "& > div": {
            flex: "1 1 calc(100% - 16px)",
            "@media (min-width:600px)": {
              flex: "1 1 calc(50% - 16px)",
            },
            "@media (min-width:960px)": {
              flex: "1 1 calc(33.33% - 16px)",
            },
          },
        }}
      >
        {products.map((product: Product) => (
          <Box
            key={product.id}
            width={{ xs: "100%", md: "48%" }}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Card>
              {product.image && (
                <CardMedia
                  component="img"
                  height="160"
                  image={product.image}
                  alt={product.name}
                />
              )}

              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  {product.description}
                </Typography>
                <Typography variant="body2">
                  Price: ₹{product.price} / {product.unit}
                </Typography>
                <Typography variant="body2">Stock: {product.stock}</Typography>
              </CardContent>

              <CardActions>
                <Button
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
                  sx={{ mt: 2 }}
                >
                  Add to Order
                  {product.stock === 0 ? "Out of Stock" : "Add to Order"}
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
      <OrderSummary />
    </Paper>
  );
}
