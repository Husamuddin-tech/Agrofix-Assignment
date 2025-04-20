"use client";

import { useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

type Order = {
  id: string;
  buyer_name: string;
  buyer_contact: string;
  delivery_address: string;
  items: { productId: string; quantity: number }[];
  status: string;
};

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) throw new Error("Order not found");
      const data = await res.json();
      setOrder(data);
      setError(null);
    } catch {
      setOrder(null);
      setError("No order found with this ID");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Track Your Order
      </Typography>

      <Box display="flex" gap={2} alignItems="center" mb={3}>
        <TextField
          label="Order ID"
          variant="outlined"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      {order && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6">Order Details</Typography>
          <Typography>ID: {order.id}</Typography>
          <Typography>Name: {order.buyer_name}</Typography>
          <Typography>Contact: {order.buyer_contact}</Typography>
          <Typography>Address: {order.delivery_address}</Typography>
          <Typography>Status: {order.status}</Typography>
          <Typography sx={{ mt: 2 }}>Items:</Typography>
          <ul>
            {order.items.map((item, i) => (
              <li key={i}>
                Product ID: {item.productId}, Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </Paper>
      )}
    </Box>
  );
}
