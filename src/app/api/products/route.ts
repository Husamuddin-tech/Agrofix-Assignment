// src/app/api/products/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// GET all products
export async function GET() {
  const products = await prisma.product.findMany();
  return Response.json(products);
}

// POST: Add a new product
export async function POST(req: NextRequest) {
  const body = await req.json();
  const product = await prisma.product.create({ data: body });
  return Response.json(product);
}
