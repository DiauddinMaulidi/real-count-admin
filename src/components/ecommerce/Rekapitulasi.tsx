"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";

// Define the TypeScript interface for the table rows
interface Tps {
  id: number;
  namaTps: string;
  wilayah: string;
  jumlahPemilih: number;
  masuk: number;
}

interface HasilTps {
  id: number;
  tpsId: number;
  status: string;
}

interface HasilSuara {
  id: number;
  hasilTpsId: number;
  calonId: number;
  jumlahSuara: number;
}

export default function Rekapitulasi() {
  const [dataTps, setDataTps] = useState<Tps[]>([]);
  const [counts, setCounts] = useState(0);
  const [hasilSuara, setHasilSuara] = useState<HasilSuara[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasilTps, setHasilTps] = useState<HasilTps[]>([]);

  useEffect(() => {
    async function fetchTps() {
      try {
        const [resTps, resSuaraTps, resHasilTps] = await Promise.all([
          fetch("/api/tps"),
          fetch("/api/suara"),
          fetch("/api/hasilTps"),
        ]);
        if (!resTps.ok || !resSuaraTps.ok || !resHasilTps.ok) {
          throw new Error("Gagal mengambil data per-TPS");
        }

        const [dataTps, dataSuaraTps, dataHasilTps] = await Promise.all([
          resTps.json(),
          resSuaraTps.json(),
          resHasilTps.json(),
        ]);
        setDataTps(dataTps.dataTps);
        setCounts(dataTps.countsTps);

        setHasilSuara(dataSuaraTps);
        setHasilTps(dataHasilTps);
      } catch {
        setError("Data tps gagal dimuat.");
      } finally {
        setLoading(false);
      }
    }

    fetchTps();
  }, []);

  const totalSuaraTps = (hasilTpsId: number) => {
    return hasilSuara
      .filter((item) => item.hasilTpsId === hasilTpsId)
      .reduce((total, item) => total + item.jumlahSuara, 0);
  };

  const finalBukti = () => {
    return hasilTps
      .filter((item) => item.status === "TERVERIFIKASI")
      .reduce((total, _) => total + 1, 0);
  };

  if (loading) {
    return <p className="p-6">Memuat data pengguna...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/3">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Matriks Rekapitulasi Suara Per TPS
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200">
            {finalBukti()}/{counts} Final
          </span>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                No TPS & Wilayah
              </TableCell>
              <TableCell
                isHeader
                className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                DPT
              </TableCell>
              <TableCell
                isHeader
                className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Masuk
              </TableCell>
              <TableCell
                isHeader
                className="py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Bukti C1
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {dataTps.map((data) => (
              <TableRow key={data.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                        {data.namaTps}
                      </p>
                      <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                        {data.wilayah}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {data.jumlahPemilih}
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {totalSuaraTps(data.id)}
                </TableCell>
                <TableCell className="py-3">
                  {(() => {
                    const hasil = hasilTps.find(
                      (item) => item.tpsId === data.id,
                    );
                    const status = hasil?.status ?? "BELUM ADA";

                    return (
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-medium ${
                          status === "TERVERIFIKASI"
                            ? "bg-green-100 text-green-700"
                            : status === "DITOLAK"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {status}
                      </span>
                    );
                  })()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
