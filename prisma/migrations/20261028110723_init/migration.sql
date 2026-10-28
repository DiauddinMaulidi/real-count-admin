-- CreateEnum
CREATE TYPE "StatusHasil" AS ENUM ('DRAFT', 'MENUNGGU_VERIFIKASI', 'TERVERIFIKASI', 'DITOLAK');

-- CreateTable
CREATE TABLE "Calon" (
    "id" SERIAL NOT NULL,
    "namaCalon" TEXT NOT NULL,
    "nomorUrut" INTEGER NOT NULL,
    "foto" TEXT,

    CONSTRAINT "Calon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HasilTps" (
    "id" SERIAL NOT NULL,
    "tpsId" INTEGER NOT NULL,
    "suaraTidakSah" INTEGER NOT NULL DEFAULT 0,
    "status" "StatusHasil" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "HasilTps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailSuara" (
    "id" SERIAL NOT NULL,
    "hasilTpsId" INTEGER NOT NULL,
    "calonId" INTEGER NOT NULL,
    "jumlahSuara" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DetailSuara_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Calon_nomorUrut_key" ON "Calon"("nomorUrut");

-- CreateIndex
CREATE UNIQUE INDEX "HasilTps_tpsId_key" ON "HasilTps"("tpsId");

-- CreateIndex
CREATE UNIQUE INDEX "DetailSuara_hasilTpsId_calonId_key" ON "DetailSuara"("hasilTpsId", "calonId");

-- AddForeignKey
ALTER TABLE "HasilTps" ADD CONSTRAINT "HasilTps_tpsId_fkey" FOREIGN KEY ("tpsId") REFERENCES "Tps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailSuara" ADD CONSTRAINT "DetailSuara_hasilTpsId_fkey" FOREIGN KEY ("hasilTpsId") REFERENCES "HasilTps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailSuara" ADD CONSTRAINT "DetailSuara_calonId_fkey" FOREIGN KEY ("calonId") REFERENCES "Calon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
