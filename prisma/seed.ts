import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Tomatoes",
        description: "Fresh farm tomatoes",
        price: 20,
        unit: "kg",
        stock: 50,
        image: "/images/tomatoes.jpg",
      },
      {
        name: "Potatoes",
        description: "Premium grade potatoes",
        price: 25,
        unit: "kg",
        stock: 40,
        image: "/images/potatoes.jpg",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
