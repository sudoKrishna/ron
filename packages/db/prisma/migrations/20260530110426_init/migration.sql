/*
  Warnings:

  - The primary key for the `Collateral` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `available` on the `Collateral` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `locked` on the `Collateral` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - The primary key for the `Fill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `qty` on the `Fill` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `price` on the `Fill` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `qty` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `price` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `margin` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `leverage` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - The primary key for the `Position` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `updateAt` on the `Position` table. All the data in the column will be lost.
  - You are about to alter the column `qty` on the `Position` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `margin` on the `Position` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `entryPrice` on the `Position` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `leverage` on the `Position` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `averagePrice` on the `Position` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `liquidationPrice` on the `Position` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `realizedPnl` on the `Position` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `unrealizedPnl` on the `Position` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collateral" DROP CONSTRAINT "Collateral_userId_fkey";

-- DropForeignKey
ALTER TABLE "Fill" DROP CONSTRAINT "Fill_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Fill" DROP CONSTRAINT "Fill_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_userId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Collateral" DROP CONSTRAINT "Collateral_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "available" SET DEFAULT 0,
ALTER COLUMN "available" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "locked" SET DEFAULT 0,
ALTER COLUMN "locked" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Collateral_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Collateral_id_seq";

-- AlterTable
ALTER TABLE "Fill" DROP CONSTRAINT "Fill_pkey",
ADD COLUMN     "fee" DECIMAL(65,30) NOT NULL DEFAULT 0,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "buyOrderId" SET DATA TYPE TEXT,
ALTER COLUMN "sellOrderId" SET DATA TYPE TEXT,
ALTER COLUMN "qty" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30),
ADD CONSTRAINT "Fill_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Fill_id_seq";

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
ALTER COLUMN "orderId" DROP DEFAULT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "qty" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "margin" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "leverage" SET DEFAULT 10,
ALTER COLUMN "leverage" SET DATA TYPE DECIMAL(65,30),
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId");
DROP SEQUENCE "Order_orderId_seq";

-- AlterTable
ALTER TABLE "Position" DROP CONSTRAINT "Position_pkey",
DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "positionId" DROP DEFAULT,
ALTER COLUMN "positionId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "qty" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "margin" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "entryPrice" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "leverage" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "averagePrice" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "liquidationPrice" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "realizedPnl" SET DEFAULT 0,
ALTER COLUMN "realizedPnl" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "unrealizedPnl" SET DEFAULT 0,
ALTER COLUMN "unrealizedPnl" SET DATA TYPE DECIMAL(65,30),
ADD CONSTRAINT "Position_pkey" PRIMARY KEY ("positionId");
DROP SEQUENCE "Position_positionId_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "userId" DROP DEFAULT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");
DROP SEQUENCE "User_userId_seq";

-- CreateTable
CREATE TABLE "MarketSnapsshot" (
    "id" TEXT NOT NULL,
    "market" TEXT NOT NULL,
    "markPrice" DECIMAL(65,30) NOT NULL,
    "snapshot" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarketSnapsshot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Collateral" ADD CONSTRAINT "Collateral_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fill" ADD CONSTRAINT "Fill_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fill" ADD CONSTRAINT "Fill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
