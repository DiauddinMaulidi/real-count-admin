"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Pen, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Petugas {
  id: number;
  namaTps: string;
  namaSaksi: string;
  wilayah: string;
  jumlahPemilih: number;
}

export default function BasicTableOne() {
  const [dataPetugas, setDataPetugas] = useState<Petugas[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const petugas = await fetch("/api/petugas");

        if (!petugas.ok) {
          throw new Error("Gagal mengambil data petugas");
        }

        const resPetugas = await petugas.json();
        setDataPetugas(resPetugas);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/5">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                No
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                User
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                TPS
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                DPT
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Aksi
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
            {dataPetugas.map((petugas, index) => (
              <TableRow key={petugas.id}>
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {index + 1}
                </TableCell>
                <TableCell className="px-5 py-4 text-start sm:px-6">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block text-theme-sm font-medium text-gray-800 dark:text-white/90">
                        {petugas.namaSaksi}
                      </span>
                      <span className="block text-theme-xs text-gray-500 dark:text-gray-400">
                        {petugas.wilayah}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {petugas.namaTps}
                </TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {petugas.jumlahPemilih}
                </TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  <Button
                    type="button"
                    className="bg-white text-center text-lg font-semibold text-red-500"
                  >
                    <Trash />
                  </Button>
                  <Link href={`petugas-tps/edit/${petugas.id}`}>
                    <Button className="bg-white text-center text-lg font-semibold text-green-500">
                      <Pen />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
