/*
  Warnings:

  - You are about to drop the `Assistant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AssistantMetadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assistant" DROP CONSTRAINT "Assistant_metadataId_fkey";

-- DropTable
DROP TABLE "Assistant";

-- DropTable
DROP TABLE "AssistantMetadata";
