import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Petugas TPS" tujuan="/" />
      <div className="">
        <div className="flex justify-between">
          <h3 className="text-2xl text-black dark:text-white">
            Daftar Petugas TPS
          </h3>
          <Link href="/petugas-tps/forms">
            <Button className="bg-blue-100 text-blue-700 dark:bg-green-100 dark:text-green-700">
              <span>+ Tambah Petugas</span>
            </Button>
          </Link>
        </div>
        <Card>
          <BasicTableOne />
        </Card>
      </div>
    </div>
  );
}
