import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const { status } = await req.json();

    const validStatuses = ["Pending", "In Progress", "Delivered"];
    if (!validStatuses.includes(status)) {
      return new Response("Invalid status", { status: 400 });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return Response.json(updated);
  } catch (error) {
    console.error("Status update error:", error);
    return new Response("Error updating order status", { status: 500 });
  }
}
