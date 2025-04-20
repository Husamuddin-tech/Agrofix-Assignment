/*
  Warnings:

  - You are about to drop the column `buyerEmail` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Product` table. All the data in the column will be lost.
  - Added the required column `buyerContact` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "buyerEmail",
ADD COLUMN     "buyerContact" TEXT NOT NULL,
ADD COLUMN     "deliveryAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "createdAt",
ALTER COLUMN "description" SET NOT NULL;
