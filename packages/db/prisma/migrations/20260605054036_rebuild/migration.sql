/*
  Warnings:

  - The values [OPEN] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `name` on the `Asset` table. All the data in the column will be lost.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `leverage` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `margin` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `market` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderType` on the `Order` table. All the data in the column will be lost.
  - You are about to alter the column `qty` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(38,18)`.
  - You are about to alter the column `price` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(38,18)`.
  - The primary key for the `Position` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `averagePrice` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `leverage` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `market` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `positionId` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `qty` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Position` table. All the data in the column will be lost.
  - You are about to drop the column `unrealizedPnl` on the `Position` table. All the data in the column will be lost.
  - You are about to alter the column `margin` on the `Position` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(38,18)`.
  - You are about to alter the column `entryPrice` on the `Position` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(38,18)`.
  - You are about to alter the column `liquidationPrice` on the `Position` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(38,18)`.
  - You are about to alter the column `realizedPnl` on the `Position` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(38,18)`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Collateral` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MarketSnapsshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAsset` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[symbol]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,clientOrderId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,marketId]` on the table `Position` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `decimals` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientOrderId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Order` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `marketId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `side` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `id` was added to the `Position` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `marketId` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MarketStatus" AS ENUM ('ACTIVE', 'PAUSED', 'DELISTED');

-- CreateEnum
CREATE TYPE "OrderSide" AS ENUM ('BUY', 'SELL');

-- CreateEnum
CREATE TYPE "TimeInForce" AS ENUM ('GTC', 'IOC', 'FOK', 'POST_ONLY');

-- CreateEnum
CREATE TYPE "MarginMode" AS ENUM ('CROSS', 'ISOLATED');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('WALLET', 'MARGIN', 'FEE', 'INSURANCE');

-- CreateEnum
CREATE TYPE "LedgerRef" AS ENUM ('DEPOSIT', 'WITHDRAWAL', 'TRADE', 'FEE', 'FUNDING', 'REALIZED_PNL', 'LIQUIDATION', 'INSURANCE', 'TRANSFER');

-- CreateEnum
CREATE TYPE "TransferStatus" AS ENUM ('PENDING', 'CONFIRMED', 'FAILED', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('NEW', 'PARTIALLY_FILLED', 'FILLED', 'CANCELLED', 'REJECTED', 'EXPIRED');
ALTER TABLE "public"."Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'NEW';
COMMIT;

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

-- DropForeignKey
ALTER TABLE "UserAsset" DROP CONSTRAINT "UserAsset_assetId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "decimals" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "leverage",
DROP COLUMN "margin",
DROP COLUMN "market",
DROP COLUMN "orderId",
DROP COLUMN "orderType",
ADD COLUMN     "avgFillPrice" DECIMAL(38,18),
ADD COLUMN     "clientOrderId" TEXT NOT NULL,
ADD COLUMN     "filledQty" DECIMAL(38,18) NOT NULL DEFAULT 0,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "marketId" TEXT NOT NULL,
ADD COLUMN     "postOnly" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reduceOnly" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rejectReason" TEXT,
ADD COLUMN     "sequence" BIGINT,
ADD COLUMN     "timeInForce" "TimeInForce" NOT NULL DEFAULT 'GTC',
ADD COLUMN     "type" "OrderType" NOT NULL,
DROP COLUMN "side",
ADD COLUMN     "side" "OrderSide" NOT NULL,
ALTER COLUMN "qty" SET DATA TYPE DECIMAL(38,18),
ALTER COLUMN "price" SET DATA TYPE DECIMAL(38,18),
ALTER COLUMN "status" SET DEFAULT 'NEW',
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Position" DROP CONSTRAINT "Position_pkey",
DROP COLUMN "averagePrice",
DROP COLUMN "createdAt",
DROP COLUMN "leverage",
DROP COLUMN "market",
DROP COLUMN "positionId",
DROP COLUMN "qty",
DROP COLUMN "status",
DROP COLUMN "type",
DROP COLUMN "unrealizedPnl",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "lastFundingSeq" BIGINT,
ADD COLUMN     "marginMode" "MarginMode" NOT NULL DEFAULT 'CROSS',
ADD COLUMN     "marketId" TEXT NOT NULL,
ADD COLUMN     "size" DECIMAL(38,18) NOT NULL,
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "margin" SET DEFAULT 0,
ALTER COLUMN "margin" SET DATA TYPE DECIMAL(38,18),
ALTER COLUMN "entryPrice" SET DEFAULT 0,
ALTER COLUMN "entryPrice" SET DATA TYPE DECIMAL(38,18),
ALTER COLUMN "liquidationPrice" DROP NOT NULL,
ALTER COLUMN "liquidationPrice" SET DATA TYPE DECIMAL(38,18),
ALTER COLUMN "realizedPnl" SET DATA TYPE DECIMAL(38,18),
ADD CONSTRAINT "Position_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "password",
DROP COLUMN "userId",
DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Collateral";

-- DropTable
DROP TABLE "Fill";

-- DropTable
DROP TABLE "MarketSnapsshot";

-- DropTable
DROP TABLE "UserAsset";

-- DropEnum
DROP TYPE "PositionStatus";

-- DropEnum
DROP TYPE "PositionType";

-- DropEnum
DROP TYPE "Side";

-- CreateTable
CREATE TABLE "Market" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "status" "MarketStatus" NOT NULL DEFAULT 'ACTIVE',
    "quoteAssetId" TEXT NOT NULL,
    "tickSize" DECIMAL(38,18) NOT NULL,
    "stepSize" DECIMAL(38,18) NOT NULL,
    "minQty" DECIMAL(38,18) NOT NULL,
    "maxQty" DECIMAL(38,18) NOT NULL,
    "maxLeverage" INTEGER NOT NULL,
    "initialMarginRate" DECIMAL(10,8) NOT NULL,
    "maintenanceMarginRate" DECIMAL(10,8) NOT NULL,
    "makerFeeRate" DECIMAL(10,8) NOT NULL,
    "takerFeeRate" DECIMAL(10,8) NOT NULL,
    "liquidationFeeRate" DECIMAL(10,8) NOT NULL,
    "fundingIntervalSec" INTEGER NOT NULL,
    "maxFundingRate" DECIMAL(10,8) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Market_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "type" "LedgerRef" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LedgerEntry" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "accountType" "AccountType" NOT NULL DEFAULT 'WALLET',
    "amount" DECIMAL(38,18) NOT NULL,
    "refType" "LedgerRef" NOT NULL,
    "refId" TEXT,
    "sequence" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LedgerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "available" DECIMAL(38,18) NOT NULL DEFAULT 0,
    "locked" DECIMAL(38,18) NOT NULL DEFAULT 0,
    "version" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "makerOrderId" TEXT NOT NULL,
    "takerOrderId" TEXT NOT NULL,
    "makerUserId" TEXT NOT NULL,
    "takerUserId" TEXT NOT NULL,
    "price" DECIMAL(38,18) NOT NULL,
    "qty" DECIMAL(38,18) NOT NULL,
    "makerFee" DECIMAL(38,18) NOT NULL,
    "takerFee" DECIMAL(38,18) NOT NULL,
    "sequence" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundingRateHistory" (
    "id" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "rate" DECIMAL(10,8) NOT NULL,
    "indexPrice" DECIMAL(38,18) NOT NULL,
    "markPrice" DECIMAL(38,18) NOT NULL,
    "fundingTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FundingRateHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundingPayment" (
    "id" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rate" DECIMAL(10,8) NOT NULL,
    "positionSize" DECIMAL(38,18) NOT NULL,
    "markPrice" DECIMAL(38,18) NOT NULL,
    "payment" DECIMAL(38,18) NOT NULL,
    "fundingTime" TIMESTAMP(3) NOT NULL,
    "sequence" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FundingPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Liquidation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "size" DECIMAL(38,18) NOT NULL,
    "markPrice" DECIMAL(38,18) NOT NULL,
    "bankruptcyPrice" DECIMAL(38,18) NOT NULL,
    "liquidationFee" DECIMAL(38,18) NOT NULL,
    "insuranceDelta" DECIMAL(38,18) NOT NULL DEFAULT 0,
    "isAdl" BOOLEAN NOT NULL DEFAULT false,
    "sequence" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Liquidation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceFund" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "balance" DECIMAL(38,18) NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsuranceFund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deposit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "amount" DECIMAL(38,18) NOT NULL,
    "txHash" TEXT NOT NULL,
    "status" "TransferStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Withdrawal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "amount" DECIMAL(38,18) NOT NULL,
    "status" "TransferStatus" NOT NULL DEFAULT 'PENDING',
    "idempotencyKey" TEXT NOT NULL,
    "txHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Withdrawal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EngineSnapshot" (
    "id" TEXT NOT NULL,
    "marketScope" TEXT NOT NULL,
    "sequence" BIGINT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EngineSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Market_symbol_key" ON "Market"("symbol");

-- CreateIndex
CREATE INDEX "LedgerEntry_userId_assetId_idx" ON "LedgerEntry"("userId", "assetId");

-- CreateIndex
CREATE INDEX "LedgerEntry_refType_refId_idx" ON "LedgerEntry"("refType", "refId");

-- CreateIndex
CREATE UNIQUE INDEX "Balance_userId_assetId_key" ON "Balance"("userId", "assetId");

-- CreateIndex
CREATE UNIQUE INDEX "Trade_sequence_key" ON "Trade"("sequence");

-- CreateIndex
CREATE INDEX "Trade_marketId_createdAt_idx" ON "Trade"("marketId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "FundingRateHistory_marketId_fundingTime_key" ON "FundingRateHistory"("marketId", "fundingTime");

-- CreateIndex
CREATE INDEX "FundingPayment_marketId_fundingTime_idx" ON "FundingPayment"("marketId", "fundingTime");

-- CreateIndex
CREATE UNIQUE INDEX "FundingPayment_userId_marketId_fundingTime_key" ON "FundingPayment"("userId", "marketId", "fundingTime");

-- CreateIndex
CREATE UNIQUE INDEX "Liquidation_sequence_key" ON "Liquidation"("sequence");

-- CreateIndex
CREATE INDEX "Liquidation_userId_idx" ON "Liquidation"("userId");

-- CreateIndex
CREATE INDEX "Liquidation_marketId_createdAt_idx" ON "Liquidation"("marketId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceFund_assetId_key" ON "InsuranceFund"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "Deposit_txHash_key" ON "Deposit"("txHash");

-- CreateIndex
CREATE UNIQUE INDEX "Withdrawal_idempotencyKey_key" ON "Withdrawal"("idempotencyKey");

-- CreateIndex
CREATE INDEX "EngineSnapshot_marketScope_sequence_idx" ON "EngineSnapshot"("marketScope", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "Asset_symbol_key" ON "Asset"("symbol");

-- CreateIndex
CREATE INDEX "Order_marketId_status_idx" ON "Order"("marketId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Order_userId_clientOrderId_key" ON "Order"("userId", "clientOrderId");

-- CreateIndex
CREATE INDEX "Position_marketId_idx" ON "Position"("marketId");

-- CreateIndex
CREATE UNIQUE INDEX "Position_userId_marketId_key" ON "Position"("userId", "marketId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Market" ADD CONSTRAINT "Market_quoteAssetId_fkey" FOREIGN KEY ("quoteAssetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LedgerEntry" ADD CONSTRAINT "LedgerEntry_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LedgerEntry" ADD CONSTRAINT "LedgerEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LedgerEntry" ADD CONSTRAINT "LedgerEntry_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_makerOrderId_fkey" FOREIGN KEY ("makerOrderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_takerOrderId_fkey" FOREIGN KEY ("takerOrderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundingRateHistory" ADD CONSTRAINT "FundingRateHistory_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundingPayment" ADD CONSTRAINT "FundingPayment_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liquidation" ADD CONSTRAINT "Liquidation_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deposit" ADD CONSTRAINT "Deposit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deposit" ADD CONSTRAINT "Deposit_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Withdrawal" ADD CONSTRAINT "Withdrawal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Withdrawal" ADD CONSTRAINT "Withdrawal_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
