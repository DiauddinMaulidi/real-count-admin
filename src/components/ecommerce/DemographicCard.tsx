"use client";

import {
  ChevronDown,
  FileCheck2,
  GitCompareArrows,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const tpsData = [
  {
    id: 1,
    name: "TPS 01",
    officer: "Aris Munandar",
    time: "15:38 WIB",
    title: "Form Model C1-Desa",
    image: "/images/cards/card-01.png",
  },
  {
    id: 2,
    name: "TPS 09",
    officer: "Aris Sudianto",
    time: "15:38 WIB",
    title: "Form Model C1-Desa",
    image: "/images/cards/card-02.jpg",
  },
];

export default function DemographicCard() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-white/3">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Arsip C1 Plano Lapangan
          </h3>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="my-5 flex flex-col items-center gap-3">
            {tpsData.map((tps) => {
              const isOpen = openId === tps.id;

              return (
                <div
                  key={tps.id}
                  className="w-full overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-white/3 dark:bg-gray-800 dark:text-gray-800"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : tps.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-3 p-4 text-left"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                      <FileCheck2 size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {tps.name}
                      </p>
                      <p className="text-xs text-zinc-900 dark:text-zinc-400">
                        Bukti hasil perhitungan suara
                      </p>
                    </div>
                    <ChevronDown
                      size={19}
                      className={`shrink-0 text-zinc-500 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {/* Content */}
                  {isOpen && (
                    <div className="border-t border-zinc-200 bg-slate-50 p-3">
                      <div className="rounded-lg border border-slate-200 bg-white p-3">
                        {/* Title and time */}
                        <div className="mb-3 flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-xs font-bold text-slate-800">
                              {tps.title} ({tps.name})
                            </h3>
                            <p className="mt-1 text-[10px] text-slate-500">
                              Bukti unggahan petugas TPS
                            </p>
                          </div>

                          <span className="shrink-0 text-[10px] text-slate-500">
                            {tps.time}
                          </span>
                        </div>

                        {/* Photo evidence */}
                        <div className="overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                          <Image
                            src={tps.image}
                            alt={`Dokumen C1 ${tps.name}`}
                            className="h-44 w-full object-cover"
                            width={500}
                            height={500}
                          />
                        </div>
                        {/* Footer */}
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-2">
                            <FileCheck2
                              size={16}
                              className="shrink-0 text-emerald-700"
                            />
                            <div className="min-w-0">
                              <p className="text-[12px]">
                                Saksi Pengunggah: <b>Sdr. {tps.officer}</b>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
