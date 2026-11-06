/*
  Warnings:

  - You are about to drop the column `namaUser` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tpsId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "namaUser";

-- CreateIndex
CREATE UNIQUE INDEX "User_tpsId_key" ON "User"("tpsId");
