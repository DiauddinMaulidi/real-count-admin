"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pen, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DetailSuara {
  id: number;
  jumlahSuara: number;
}

interface Calon {
  id: number;
  namaCalon: string;
  nomorUrut: string;
  foto: string;
  detailSuara: DetailSuara[];
}

export function CardImage() {
  const [calonKades, setCalonKades] = useState<Calon[]>([]);

  useEffect(() => {
    async function fetchCalon() {
      try {
        const resKades = await fetch("/api/calon");

        if (!resKades.ok) {
          throw new Error("Gagal mengambil data calon");
        }

        const dataKades = await resKades.json();
        setCalonKades(dataKades);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCalon();
  }, []);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2">
      {calonKades.map((kades) => {
        const totalSuara = kades.detailSuara.reduce(
          (total, item) => total + item.jumlahSuara,
          0,
        );
        return (
          <Card
            key={kades.id}
            className="group relative my-5 w-full max-w-xs border-2 border-blue-700 bg-white p-3 shadow-xl transition duration-300 hover:scale-105 dark:border-white dark:bg-blue-700"
          >
            <div className="mt-3 font-bold text-blue-950 dark:text-white">
              <span className="rounded-lg bg-blue-400 p-3 dark:bg-green-700">
                0{kades.nomorUrut}
              </span>
            </div>
            <div className="flex">
              <div>
                <Image
                  src={kades.foto}
                  alt="Event cover"
                  className="border-2 border-red-600"
                  width={100}
                  height={100}
                />
              </div>
              <CardHeader className="w-full pt-0 text-blue-950 dark:text-white">
                <CardTitle className="rounded-lg bg-blue-400 p-1 dark:bg-green-700">
                  {kades.namaCalon}
                </CardTitle>
                <CardTitle>Perolehan Suara</CardTitle>
                <CardDescription className="text-4xl font-semibold">
                  {totalSuara}{" "}
                  <span className="text-2xl font-normal">Suara</span>
                </CardDescription>
              </CardHeader>
            </div>

            <div className="absolute inset-0 bg-black/30 p-6 opacity-0 group-hover:opacity-100">
              <div className="flex h-full items-center justify-center gap-3">
                <Button className="bg-white text-center text-lg font-semibold text-red-500">
                  <Trash />
                </Button>
                <Link href="data-kades/edit">
                  <Button className="bg-white text-center text-lg font-semibold text-green-500">
                    <Pen />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
