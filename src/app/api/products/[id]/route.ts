// src/app/api/products/[id]/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// PUT: Update product
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const product = await prisma.product.update({
    where: { id: Number(params.id) },
    data,
  });
  return Response.json(product);
}

// DELETE: Remove product
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.product.delete({
    where: { id: Number(params.id) },
  });
  return new Response("Product deleted", { status: 200 });
}
