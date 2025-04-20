"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";

export default function CataloguePage() {
  interface Product {
    id: string;
    name: string;
    price: number;
  }

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then(setProducts)
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {products.map((p: Product) => (
        <Card key={p.id}>
          <CardContent>
            <h2>{p.name}</h2>
            <p>₹{p.price}</p>
            <input type="number" min="0" placeholder="Qty" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
