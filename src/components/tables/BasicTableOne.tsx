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

interface Order {
  id: number;
  namaPetugas: string;
  wilayah: string;
  tps: string;
  jumlahPemilih: number;
}

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    namaPetugas: "Lindsey Curtis",
    wilayah: "Dusun 1",
    tps: "TPS 01",
    jumlahPemilih: 200,
  },
  {
    id: 2,
    namaPetugas: "amet suremet",
    wilayah: "Dusun 2",
    tps: "TPS 02",
    jumlahPemilih: 150,
  },
];

export default function BasicTableOne() {
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
            {tableData.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {index + 1}
                </TableCell>
                <TableCell className="px-5 py-4 text-start sm:px-6">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block text-theme-sm font-medium text-gray-800 dark:text-white/90">
                        {order.namaPetugas}
                      </span>
                      <span className="block text-theme-xs text-gray-500 dark:text-gray-400">
                        {order.wilayah}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {order.tps}
                </TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {order.jumlahPemilih}
                </TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  <Button
                    type="button"
                    className="bg-white text-center text-lg font-semibold text-red-500"
                  >
                    <Trash />
                  </Button>
                  <Link href={`petugas/edit/${order.id}`}>
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
