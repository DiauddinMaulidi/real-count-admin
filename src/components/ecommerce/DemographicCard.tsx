"use client";

import { ChevronDown, FileCheck2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DropdownMenuBasic } from "../form/ButtonVerif";

interface HasilTps {
  id: number;
  tpsId: number;
  suaraTidakSah: number;
  status: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  tps: {
    namaTps: string;
    wilayah: string | null;
    namaSaksi: string;
    jumlahPemilih: number;
  };
}

export default function DemographicCard() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [hasilTps, setHasilTps] = useState<HasilTps[]>([]);

  useEffect(() => {
    async function fetctBukti() {
      try {
        const [resHasilTps] = await Promise.all([fetch("/api/hasilTps")]);

        if (!resHasilTps.ok) {
          throw new Error("gagal mengambil data bukti TPS");
        }

        const [dataHasilTps] = await Promise.all([resHasilTps.json()]);

        setHasilTps(dataHasilTps);
      } catch (error) {
        console.error("Gagal memuat data", error);
      }
    }

    fetctBukti();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    // Simpan status lama untuk antisipasi jika API gagal
    const previousData = hasilTps;

    // Perbarui tampilan secara langsung
    setHasilTps((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    );

    try {
      const res = await fetch(`/api/hasilTps/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error("Gagal memperbarui status TPS");
      }
    } catch (error) {
      // Kembalikan data jika penyimpanan gagal
      setHasilTps(previousData);
      console.error("Gagal memperbarui status:", error);
      alert("Status gagal disimpan ke database.");
    }
  };

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
            {hasilTps.map((tps) => {
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
                        {tps.tps.namaTps}
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
                              {tps.tps.namaTps} ({tps.tps.wilayah})
                            </h3>
                            <p className="mt-1 text-[10px] text-slate-500">
                              Bukti unggahan petugas TPS
                            </p>
                          </div>

                          <span className="shrink-0 text-[10px] text-slate-500">
                            Diupload:{" "}
                            {new Date(tps.createdAt).toLocaleString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              timeZone: "UTC",
                            })}
                          </span>
                        </div>

                        {/* Photo evidence */}
                        <div className="overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                          <Image
                            src={tps.img}
                            alt={`Dokumen C1 ${tps.status}`}
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
                                Saksi Pengunggah:{" "}
                                <b>Sdr. {tps.tps.namaSaksi}</b>
                              </p>
                            </div>
                          </div>
                          <DropdownMenuBasic
                            status={tps.status}
                            onStatusChange={(status) => {
                              handleStatusChange(tps.id, status);
                            }}
                          />
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
