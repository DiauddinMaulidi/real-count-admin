import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FormsPetugas from "@/components/form/form-elements/FormsPetugas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Count",
  description: "Sistem Hitung Suara Real-time",
};

export default function FormPetugas() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Data Petugas" tujuan="/petugas-tps" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <FormsPetugas />
        </div>
      </div>
    </div>
  );
}
