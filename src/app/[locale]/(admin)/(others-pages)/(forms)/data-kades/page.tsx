import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { CardImage } from "./dataCalon";

export const metadata: Metadata = {
  title: "Real Count",
  description: "Sistem Hitung Suara Real-time",
};

export default function FormElements() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Data Calon Kades" tujuan="/" />
      <Link href="/data-kades/forms">
        <Button className="bg-blue-100 text-blue-700 dark:bg-green-100 dark:text-green-700">
          <span>+ Tambah Calon</span>
        </Button>
      </Link>
      <CardImage />
    </div>
  );
}
