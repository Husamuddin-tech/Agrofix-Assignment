"use client";

import { useOrderStore } from "@/store/orderStore";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

export default function OrderSummary() {
  const { orderItems, removeFromOrder, updateQuantity, clearOrder } =
    useOrderStore();

  const total = orderItems.reduce(
    (sum: number, item: { product: { price: number }; quantity: number }) =>
      sum + item.product.price * item.quantity,
    0
  );

  if (orderItems.length === 0)
    return <Typography>No items in your order.</Typography>;
  const handlePlaceOrder = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerName: "Test Buyer",
          buyerContact: "9999999999",
          deliveryAddress: "123 Farm Lane, Agro City",
          items: orderItems.map(({ product, quantity }) => ({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to place order");

      const data = await response.json();
      alert("✅ Order placed successfully!");
      console.log("Order:", data);

      clearOrder();
    } catch (err) {
      console.error(err);
      alert("❌ Order placement failed");
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>

      {orderItems.map(
        ({ product, quantity }: { product: Product; quantity: number }) => (
          <Box
            key={product.id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Box>
              <Typography>{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                ₹{product.price} × {quantity} = ₹{product.price * quantity}
              </Typography>
            </Box>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => updateQuantity(product.id, quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <Typography>{quantity}</Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={() => updateQuantity(product.id, quantity + 1)}
                disabled={quantity >= product.stock}
              >
                +
              </Button>
              <IconButton onClick={() => removeFromOrder(product.id)}>
                <Delete />
              </IconButton>
            </Stack>
          </Box>
        )
      )}

      <Typography variant="h6" mt={2}>
        Total: ₹{total.toFixed(2)}
      </Typography>

      <Stack direction="row" spacing={2} mt={3}>
        <Button variant="outlined" onClick={clearOrder}>
          Clear
        </Button>
        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Stack>
    </Paper>
  );
}
