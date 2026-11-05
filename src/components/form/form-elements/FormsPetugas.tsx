"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Label from "../Label";
import { Button } from "@/components/ui/button";

export default function FormsPetugas() {
  const [form, setForm] = useState({
    nama: "",
    nomorUrut: "",
  });
  const [foto, setFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("namaCalon", form.nama);
      formData.append("nomorUrut", form.nomorUrut);

      if (foto) {
        formData.append("foto", foto);
      }

      const res = await fetch("/api/calon", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      alert("Data berhasil disimpan!");

      setForm({
        nama: "",
        nomorUrut: "",
      });

      setFoto(null);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentCard title="">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="test">Nama Petugas</Label>
          <Input
            type="text"
            value={form.nomorUrut}
            onChange={(e) => setForm({ ...form, nomorUrut: e.target.value })}
            id="test"
            required
            placeholder="Buat tanpa angka 0 didepan"
          />
        </div>
        <div>
          <Label htmlFor="test">Nama TPS</Label>
          <Input
            type="number"
            value={form.nomorUrut}
            onChange={(e) => setForm({ ...form, nomorUrut: e.target.value })}
            id="test"
            required
            placeholder="Buat tanpa angka 0 didepan"
          />
        </div>
        <div>
          <Label>Wilayah</Label>
          <Input
            type="text"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            required
            placeholder="Ex. Alexander Graham"
          />
        </div>
        <div>
          <Label>Jumlah Pemilih</Label>
          <Input
            type="text"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            required
            placeholder="Ex. Alexander Graham"
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-100 text-blue-700 dark:bg-green-100 dark:text-green-700"
          >
            <span>{loading ? "Menyimpan..." : "Submit"}</span>
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
