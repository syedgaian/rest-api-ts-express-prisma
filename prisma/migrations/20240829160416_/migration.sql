/*
  Warnings:

  - Added the required column `checkpoint_ns` to the `Checkpoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checkpoint" ADD COLUMN     "checkpoint_ns" TEXT NOT NULL;
