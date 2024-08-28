/*
  Warnings:

  - You are about to drop the column `configId` on the `Assistant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assistant" DROP CONSTRAINT "Assistant_configId_fkey";

-- AlterTable
ALTER TABLE "Assistant" DROP COLUMN "configId";

-- AddForeignKey
ALTER TABLE "AssistantConfig" ADD CONSTRAINT "AssistantConfig_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "Assistant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
