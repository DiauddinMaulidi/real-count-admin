"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Label from "../Label";
import Input from "../input/InputField";
import { Button } from "@/components/ui/button";

interface Calon {
  id: number;
  nomorUrut: number;
  namaCalon: string;
  foto: string;
}

const EditForms = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const [dataCalon, setDataCalon] = useState<Calon>({
    id: 0,
    nomorUrut: 0,
    namaCalon: "",
    foto: "",
  });
  const [loading, setLoading] = useState(true);
  const [save, setSave] = useState(false);
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/calon/${params.id}`);

        if (!res.ok) throw new Error("Gagal memuat data edit calon");

        const data = await res.json();

        setDataCalon(data);
      } catch (error) {
        console.error("Hasil edit form", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setDataCalon((prev) => ({
      ...prev,
      [name]: name === "nomorUrut" ? Number(value) : value,
    }));
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Format foto harus JPG, PNG, atau WEBP");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran foto maksimal 2 MB");
      e.target.value = "";
      return;
    }

    setFoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSave(true);

    try {
      const formData = new FormData();

      formData.append("namaCalon", dataCalon.namaCalon);
      formData.append("nomorUrut", String(dataCalon.nomorUrut));

      if (foto) {
        formData.append("foto", foto);
      }

      const resCalon = await fetch(`/api/calon/${params.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!resCalon.ok) {
        throw new Error("Gagal memperbarui data calon");
      }

      alert("Data berhasil diperbarui!");

      router.refresh();
      router.push("/data-kades");
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui data");
    } finally {
      setSave(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (loading) return <p>Memuat data...</p>;

  return (
    <ComponentCard title="">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="test">Nomor Urut</Label>
          <Input
            type="number"
            name="nomorUrut"
            value={dataCalon.nomorUrut}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Nama Calon</Label>
          <Input
            type="text"
            name="namaCalon"
            value={dataCalon.namaCalon}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Foto Calon</Label>

          <div className="mt-2 space-y-3">
            {/* Preview foto */}
            {(preview || dataCalon.foto) && (
              <div className="h-40 w-40 overflow-hidden rounded-lg border">
                <img
                  src={preview || dataCalon.foto || ""}
                  alt="Preview foto calon"
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <Input type="file" accept="image/*" onChange={handleFotoChange} />

            <p className="text-sm text-gray-500">
              Format JPG, JPEG, PNG. Maksimal 2 MB.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={save}
            className="bg-blue-100 text-blue-700 dark:bg-green-100 dark:text-green-700"
          >
            <span>{save ? "Menyimpan..." : "Simpan Perubahan"}</span>
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
};

export default EditForms;
