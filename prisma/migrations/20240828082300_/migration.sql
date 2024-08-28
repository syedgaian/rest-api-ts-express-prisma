/*
  Warnings:

  - You are about to drop the column `maxTokens` on the `AssistantConfig` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AssistantConfig" DROP COLUMN "maxTokens";
