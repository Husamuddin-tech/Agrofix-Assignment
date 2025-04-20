"use client";

import { useState } from "react";
import {
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

interface Product {
  id: string;
  name: string;
  unit: string;
}

export default function OrderForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    buyer_name: "",
    buyer_contact: "",
    delivery_address: "",
    product_id: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch product list once
  useState(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setError("Failed to load products"));
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyer_name: form.buyer_name,
          buyer_contact: form.buyer_contact,
          delivery_address: form.delivery_address,
          items: JSON.stringify([
            {
              product_id: form.product_id,
              quantity: parseFloat(form.quantity),
            },
          ]),
        }),
      });

      if (!res.ok) throw new Error("Order submission failed");
      setSuccess("Order placed successfully!");
      setForm({
        buyer_name: "",
        buyer_contact: "",
        delivery_address: "",
        product_id: "",
        quantity: "",
      });
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

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        Place a New Order
      </Typography>

      <Stack spacing={2}>
        <TextField
          name="buyer_name"
          label="Name"
          fullWidth
          value={form.buyer_name}
          onChange={handleChange}
        />
        <TextField
          name="buyer_contact"
          label="Contact"
          fullWidth
          value={form.buyer_contact}
          onChange={handleChange}
        />
        <TextField
          name="delivery_address"
          label="Address"
          fullWidth
          value={form.delivery_address}
          onChange={handleChange}
        />
        <TextField
          select
          name="product_id"
          label="Select Product"
          fullWidth
          value={form.product_id}
          onChange={handleChange}
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name} ({product.unit})
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="quantity"
          label="Quantity"
          type="number"
          fullWidth
          value={form.quantity}
          onChange={handleChange}
        />

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        {loading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" onClick={handleSubmit}>
            Submit Order
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
