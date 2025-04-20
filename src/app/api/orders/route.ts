// src/app/api/orders/route.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.order.findMany();
    return Response.json(orders);
  } catch {
    return new Response("Failed to fetch orders", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { buyerName, buyerContact, deliveryAddress, items } =
      await req.json();
    if (!buyerName || !buyerContact || !deliveryAddress || !items?.length)
      return new Response("Missing required fields", { status: 400 });

    const order = await prisma.order.create({
      data: {
        buyerName,
        buyerContact,
        deliveryAddress,
        items,
        status: "pending",
      },
    });
    return Response.json(order, { status: 201 });
  } catch {
    return new Response("Error creating order", { status: 500 });
  }
}
