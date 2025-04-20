"use client";
import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Chip,
  Select,
  MenuItem,
} from "@mui/material";
import toast from "react-hot-toast";

interface Order {
  id: string;
  buyer_name: string;
  buyer_contact: string;
  status: "Pending" | "In Progress" | "Delivered";
}

export default function OrderManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Order["status"]) => {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      toast.success(`Order ${id} marked as ${status}`);
      fetchOrders();
    } else {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Manage Orders
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading &&
        !error &&
        orders.map((order) => (
          <Box
            key={order.id}
            sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}
          >
            <Typography>
              <strong>ID:</strong> {order.id}
            </Typography>
            <Typography>
              <strong>Buyer:</strong> {order.buyer_name}
            </Typography>
            <Typography>
              <strong>Contact:</strong> {order.buyer_contact}
            </Typography>
            <Typography>
              <strong>Status:</strong>{" "}
              <Chip
                label={order.status}
                color={
                  order.status === "Delivered"
                    ? "success"
                    : order.status === "In Progress"
                    ? "warning"
                    : "default"
                }
              />
            </Typography>
            <Select
              size="small"
              sx={{ mt: 1 }}
              value={order.status}
              onChange={(e) =>
                updateStatus(order.id, e.target.value as Order["status"])
              }
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
          </Box>
        ))}
    </Paper>
  );
}
