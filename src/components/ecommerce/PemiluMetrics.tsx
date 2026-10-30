"use client";

import { GroupIcon } from "@/icons";
import { CircleDashedCheck, CircleX, TicketCheck, Vote } from "lucide-react";
import { useEffect, useState } from "react";

interface HasilSuara {
  id: number;
  hasilTpsId: number;
  calonId: number;
  jumlahSuara: number;
}

interface HasilTps {
  id: number;
  tpsId: number;
  suaraTidakSah: number;
  status: string;
  img: string;
}

interface Tps {
  id: number;
  namaTps: string;
  wilayah: string;
  jumlahPemilih: number;
  masuk: number;
}

export const PemiluMetrics = () => {
  const [countsTps, setCountsTps] = useState(0);
  const [hasilSuara, setHasilSuara] = useState<HasilSuara[]>([]);
  const [hasilTps, setHasilTps] = useState<HasilTps[]>([]);
  const [dataDpt, setDataDpt] = useState<Tps[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resTps, resSuara, resHasilTps] = await Promise.all([
          fetch("/api/tps"),
          fetch("/api/suara"),
          fetch("/api/hasilTps"),
        ]);

        console.log("Status API:", {
          tps: resTps.status,
          suara: resSuara.status,
          hasilTps: resHasilTps.status,
        });

        console.log("Respons API:", {
          tps: await resTps.clone().text(),
          suara: await resSuara.clone().text(),
          hasilTps: await resHasilTps.clone().text(),
        });

        if (!resTps.ok || !resSuara.ok || !resHasilTps.ok) {
          throw new Error("gagal mengambil data");
        }

        const [dataSuara, dataTps, dataHasilTps] = await Promise.all([
          resSuara.json(),
          resTps.json(),
          resHasilTps.json(),
        ]);

        setHasilSuara(dataSuara);
        setCountsTps(dataTps.countsTps);
        setHasilTps(dataHasilTps);
        setDataDpt(dataTps.dataTps);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    }
    fetchData();
  }, []);

  const dataPemilihTetap = dataDpt.reduce(
    (total, item) => total + item.jumlahPemilih,
    0,
  );

  const dataSuaraTidakSah = hasilTps.reduce(
    (total, item) => total + item.suaraTidakSah,
    0,
  );

  const totalSuara = hasilSuara.reduce(
    (total, item) => total + item.jumlahSuara,
    0,
  );

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
          <GroupIcon className="size-6 text-gray-800 dark:text-white/90" />
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              TOTAL DPT
            </span>
            <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
              {dataPemilihTetap}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
          <Vote className="size-6 text-gray-800 dark:text-white/90" />
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              TPS TERVERIFIKASI
            </span>
            <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
              {countsTps}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
          <TicketCheck className="size-6 text-gray-800 dark:text-white/90" />
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              SUARA MASUK
            </span>
            <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
              {totalSuara}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
          <CircleDashedCheck className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              SUARA SAH
            </span>
            <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
              {totalSuara - dataSuaraTidakSah}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
          <CircleX className="dark:text-red/90 text-red-500" />
        </div>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              SUARA TIDAK SAH
            </span>
            <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
              {dataSuaraTidakSah}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
