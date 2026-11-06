import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EditPetugas from "@/components/form/form-elements/EditPetugas";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-6">
      <PageBreadcrumb pageTitle="Edit Data Petugas" tujuan="/petugas-tps" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <EditPetugas params={{ id }} />
        </div>
      </div>
    </div>
  );
}
