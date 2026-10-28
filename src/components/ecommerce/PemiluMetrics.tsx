"use client";

import { GroupIcon } from "@/icons";
import { CircleDashedCheck, CircleX, TicketCheck, Vote } from "lucide-react";
import { useEffect, useState } from "react";

export const PemiluMetrics = () => {
  const [countsTps, setCountsTps] = useState(0);

  useEffect(() => {
    async function jumlahTps() {
      try {
        const res = await fetch("/api/tps");
        if (!res.ok) {
          throw new Error("gagal mengambil data tps");
        }

        const data = await res.json();
        setCountsTps(data.countsTps);
      } catch (error) {
        console.log(error);
      }
    }
    jumlahTps();
  }, []);

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
              7.450
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
              1.258.394
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
              30
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
              30
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
