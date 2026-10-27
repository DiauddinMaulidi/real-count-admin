import { useTranslations } from "next-intl";
import Image from "next/image";
import Badge from "../ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

// Define the TypeScript interface for the table rows
interface Product {
  id: number; // Unique identifier for each product
  name: string; // Product name
  wilayah: string; // Number of wilayah
  dpt: number;
  masuk: number;
  image: string; // URL or path to the product image
  bukti: number; // Status of the product
}

// Define the table data using the interface
const tableData: Product[] = [
  {
    id: 1,
    name: "TPS 01",
    wilayah: "Dusun 1/RT 01",
    dpt: 200,
    masuk: 198,
    bukti: 3,
    image: "/images/product/product-01.jpg", // Replace with actual image URL
  },
];

export default function Rekapitulasi() {
  const t = useTranslations("ecommerce.recentOrders");

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
            18/20 Final
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
            {tableData.map((product) => (
              <TableRow key={product.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12.5 w-12.5 overflow-hidden rounded-md">
                      <Image
                        width={50}
                        height={50}
                        src={product.image}
                        className="h-12.5 w-12.5"
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90">
                        {product.name}
                      </p>
                      <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                        {product.wilayah}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {product.dpt}
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {product.masuk}
                </TableCell>
                <TableCell className="py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      product.bukti === 3
                        ? "success"
                        : product.bukti !== 3
                          ? "warning"
                          : "error"
                    }
                  >
                    Saksi {product.bukti}/3
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
