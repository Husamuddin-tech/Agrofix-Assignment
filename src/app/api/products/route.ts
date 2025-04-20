import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma"; // adjust path if needed

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (err) {
    console.error("Error loading products:", err);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}
