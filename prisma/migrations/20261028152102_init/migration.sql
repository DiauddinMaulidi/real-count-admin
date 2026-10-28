/*
  Warnings:

  - You are about to drop the column `img` on the `Tps` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HasilTps" ADD COLUMN     "img" TEXT;

-- AlterTable
ALTER TABLE "Tps" DROP COLUMN "img";
