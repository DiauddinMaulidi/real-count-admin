"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Label from "../Label";
import Input from "../input/InputField";
import { Button } from "@/components/ui/button";

interface Petugas {
  id: number;
  namaTps: string;
  wilayah: string;
  jumlahPemilih: number;
  namaSaksi: string;
}

interface EditPetugasProps {
  params: {
    id: string;
  };
}

const EditPetugas = ({ params }: EditPetugasProps) => {
  const router = useRouter();
  const id = params.id;

  const [dataPetugas, setDataPetugas] = useState<Petugas>({
    id: 0,
    namaTps: "",
    wilayah: "",
    jumlahPemilih: 0,
    namaSaksi: "",
  });
  const [loading, setLoading] = useState(true);
  const [save, setSave] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/tps/${params.id}`);

        if (!res.ok) throw new Error("Gagal memuat data edit Petugas");

        const data = await res.json();

        setDataPetugas({
          id: data.id,
          namaTps: data.namaTps ?? "",
          wilayah: data.wilayah ?? "",
          jumlahPemilih: data.jumlahPemilih ?? 0,
          namaSaksi: data.namaSaksi ?? "",
        });
      } catch (error) {
        console.error("Error mengambil data:", error);
        setError("Gagal memuat data petugas TPS.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getData();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDataPetugas((prev) => ({
      ...prev,
      [name]:
        name === "jumlahPemilih" ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSave(true);
    setError("");

    try {
      const res = await fetch(`/api/tps/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          namaTps: dataPetugas.namaTps,
          wilayah: dataPetugas.wilayah,
          namaSaksi: dataPetugas.namaSaksi,
          jumlahPemilih: dataPetugas.jumlahPemilih,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Gagal memperbarui data petugas");
      }

      alert("Data petugas berhasil diperbarui!");

      router.push("/petugas-tps");
      router.refresh();
    } catch (error) {
      console.error("Error update:", error);

      setError(
        error instanceof Error ? error.message : "Gagal memperbarui data.",
      );
    } finally {
      setSave(false);
    }
  };

  if (loading) return <p>Memuat data...</p>;

  return (
    <ComponentCard title="">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="test">Nama Petugas</Label>
          <Input
            type="text"
            name="namaSaksi"
            value={dataPetugas.namaSaksi}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Nama TPS</Label>
          <Input
            type="text"
            name="namaTps"
            value={dataPetugas.namaTps}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Wilayah</Label>
          <Input
            type="text"
            name="wilayah"
            value={dataPetugas.wilayah}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Jumlah Pemilih</Label>
          <Input
            type="number"
            name="jumlahPemilih"
            value={dataPetugas.jumlahPemilih}
            onChange={handleChange}
            required
          />
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

export default EditPetugas;
