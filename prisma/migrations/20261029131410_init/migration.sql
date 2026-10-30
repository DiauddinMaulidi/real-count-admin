-- AlterTable
ALTER TABLE "HasilTps" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Tps" ADD COLUMN     "namaSaksi" TEXT;
