"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

type Order = {
  status: string;
  buyer_name: string;
  buyer_contact: string;
  delivery_address: string;
  items: string;
};

export default function OrderTracker() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrder = async () => {
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) throw new Error("Order not found");
      const data = await res.json();
      setOrder(data);
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
        Track Your Order
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Enter Order ID"
          fullWidth
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <Button variant="contained" onClick={fetchOrder}>
          Check
        </Button>
      </Box>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {order && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Status: <strong>{order.status}</strong>
          </Typography>
          <Typography variant="body1">
            <strong>Buyer:</strong> {order.buyer_name}
          </Typography>
          <Typography variant="body1">
            <strong>Contact:</strong> {order.buyer_contact}
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong> {order.delivery_address}
          </Typography>
          <Box mt={2}>
            <Typography variant="subtitle2">Items:</Typography>
            <pre>{JSON.stringify(JSON.parse(order.items), null, 2)}</pre>
          </Box>
        </Box>
      )}
    </Paper>
  );
}
