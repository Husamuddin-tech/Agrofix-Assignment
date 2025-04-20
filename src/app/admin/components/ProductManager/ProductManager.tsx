"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  IconButton,
  Stack,
} from "@mui/material";
import { Delete, Edit, Save, Cancel } from "@mui/icons-material";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const handleSave = async (product: Product) => {
    await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    setEditingId(null);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const handleAdd = async () => {
    await fetch(`/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    setNewProduct({ name: "", price: 0, stock: 0 });
    fetchProducts();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Manage Products
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography>Add New Product</Typography>
        <Stack direction="row" spacing={2} mt={1}>
          <TextField
            label="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <TextField
            label="Price"
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: Number(e.target.value) })
            }
          />
          <TextField
            label="Stock"
            type="number"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: Number(e.target.value) })
            }
          />
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </Stack>
      </Paper>

      {products.map((product) => {
        const isEditing = editingId === product.id;
        return (
          <Paper key={product.id} sx={{ p: 2, mb: 2 }}>
            {isEditing ? (
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Name"
                  value={product.name}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((p) =>
                        p.id === product.id ? { ...p, name: e.target.value } : p
                      )
                    )
                  }
                />
                <TextField
                  label="Price"
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((p) =>
                        p.id === product.id
                          ? { ...p, price: Number(e.target.value) }
                          : p
                      )
                    )
                  }
                />
                <TextField
                  label="Stock"
                  type="number"
                  value={product.stock}
                  onChange={(e) =>
                    setProducts((prev) =>
                      prev.map((p) =>
                        p.id === product.id
                          ? { ...p, stock: Number(e.target.value) }
                          : p
                      )
                    )
                  }
                />
                <IconButton onClick={() => handleSave(product)}>
                  <Save />
                </IconButton>
                <IconButton onClick={() => setEditingId(null)}>
                  <Cancel />
                </IconButton>
              </Stack>
            ) : (
              <Stack direction="row" justifyContent="space-between">
                <Typography>
                  {product.name} — ₹{product.price} — Stock: {product.stock}
                </Typography>
                <Box>
                  <IconButton onClick={() => setEditingId(product.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </Stack>
            )}
          </Paper>
        );
      })}
    </Box>
  );
}
