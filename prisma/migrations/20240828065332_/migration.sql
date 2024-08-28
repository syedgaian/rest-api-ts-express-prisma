/*
  Warnings:

  - You are about to drop the column `metadataId` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the `AssistantMetadata` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `Assistant` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Assistant" DROP CONSTRAINT "Assistant_metadataId_fkey";

-- AlterTable
ALTER TABLE "Assistant" DROP COLUMN "metadataId",
ADD COLUMN     "configId" TEXT,
ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "AssistantMetadata";

-- CreateTable
CREATE TABLE "AssistantConfig" (
    "id" TEXT NOT NULL,
    "assistantId" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "tools" TEXT[],
    "maxTokens" INTEGER NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "topP" DOUBLE PRECISION NOT NULL,
    "agentType" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "deployedAt" TIMESTAMP(3),
    "lastActiveAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssistantConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssistantConfig_assistantId_key" ON "AssistantConfig"("assistantId");

-- AddForeignKey
ALTER TABLE "Assistant" ADD CONSTRAINT "Assistant_configId_fkey" FOREIGN KEY ("configId") REFERENCES "AssistantConfig"("id") ON DELETE SET NULL ON UPDATE CASCADE;
