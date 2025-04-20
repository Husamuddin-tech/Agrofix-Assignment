import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const Order = await prisma.order.findMany();
    return Response.json(Order);
  } catch {
    return new Response("Failed to fetch orders", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { buyerName, buyerContact, deliveryAddress, items } =
      await req.json();

    if (!buyerName || !buyerContact || !deliveryAddress || !items?.length) {
      return new Response("Missing required fields", { status: 400 });
    }

    const Order = await prisma.order.create({
      data: {
        buyerName,
        buyerContact,
        deliveryAddress,
        status: "pending",
        items: {
          create: items.map(
            (item: { productId: string; quantity: number }) => ({
              productId: item.productId,
              quantity: item.quantity,
            })
          ),
        },
      },
      include: {
        items: true, // to return created items
      },
    });

    return Response.json(Order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response("Error creating order", { status: 500 });
  }
}
