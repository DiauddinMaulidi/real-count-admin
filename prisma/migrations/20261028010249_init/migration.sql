-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PETUGAS_TPS');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'PETUGAS_TPS',
    "tpsId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tps" (
    "id" SERIAL NOT NULL,
    "namaTps" TEXT NOT NULL,
    "wilayah" TEXT,
    "jumlahPemilih" INTEGER NOT NULL,
    "img" TEXT,

    CONSTRAINT "Tps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tpsId_fkey" FOREIGN KEY ("tpsId") REFERENCES "Tps"("id") ON DELETE SET NULL ON UPDATE CASCADE;
