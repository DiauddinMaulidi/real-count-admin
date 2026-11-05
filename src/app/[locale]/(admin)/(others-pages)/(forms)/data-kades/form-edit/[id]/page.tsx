import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EditForms from "@/components/form/form-elements/EditForms";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <div className="p-6">
      <PageBreadcrumb
        pageTitle="Edit Data Calon Kepala Desa"
        tujuan="/data-kades"
      />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <EditForms params={{ id }} />
        </div>
      </div>
    </div>
  );
}
