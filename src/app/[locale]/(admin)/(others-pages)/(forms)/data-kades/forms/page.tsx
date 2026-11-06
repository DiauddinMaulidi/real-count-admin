import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DefaultInputs from "@/components/form/form-elements/DefaultInputs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Count",
  description: "Sistem Hitung Suara Real-time",
};

export default function FormCalon() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Data Calon Kades" tujuan="/data-kades" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs />
        </div>
      </div>
    </div>
  );
}
