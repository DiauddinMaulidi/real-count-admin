"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Label from "../Label";
import { Button } from "@/components/ui/button";

export default function FormsPetugas() {
  const [form, setForm] = useState({
    nama: "",
    wilayah: "",
    jumlahPemilih: "",
    namaSaksi: "",
    petugas: {
      username: "",
      password: "",
      role: "petugas",
    },
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      // const formData = new FormData();

      // formData.append("namaTps", form.nama);
      // formData.append("wilayah", form.wilayah);
      // formData.append("jumlahPemilih", form.jumlahPemilih);
      // formData.append("namaSaksi", form.namaSaksi);
      // formData.append("username", form.petugas.username);
      // formData.append("password", form.petugas.password);

      const res = await fetch("/api/admin/petugas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          namaTps: form.nama,
          wilayah: form.wilayah,
          jumlahPemilih: Number(form.jumlahPemilih),
          namaSaksi: form.namaSaksi,
          username: form.petugas.username,
          password: form.petugas.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      alert("Data TPS dan akun petugas berhasil dibuat!");

      setForm({
        nama: "",
        wilayah: "",
        jumlahPemilih: "",
        namaSaksi: "",
        petugas: {
          username: "",
          password: "",
          role: "PETUGAS_TPS",
        },
      });
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
            value={form.namaSaksi}
            onChange={(e) => setForm({ ...form, namaSaksi: e.target.value })}
            id="test"
            required
            placeholder="Aq. Ali"
          />
        </div>
        <div>
          <Label htmlFor="test">Nama TPS</Label>
          <Input
            type="text"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            id="test"
            required
            placeholder="TPS 01"
          />
        </div>
        <div>
          <Label>Wilayah</Label>
          <Input
            type="text"
            value={form.wilayah}
            onChange={(e) => setForm({ ...form, wilayah: e.target.value })}
            required
            placeholder="Dusun 1"
          />
        </div>
        <div>
          <Label>Jumlah Pemilih</Label>
          <Input
            type="number"
            value={form.jumlahPemilih}
            onChange={(e) =>
              setForm({ ...form, jumlahPemilih: e.target.value })
            }
            required
            placeholder="200"
          />
        </div>
        <div>
          <Label>Username</Label>
          <Input
            type="text"
            value={form.petugas.username}
            onChange={(e) =>
              setForm({
                ...form,
                petugas: { ...form.petugas, username: e.target.value },
              })
            }
            required
            placeholder="alexander"
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            value={form.petugas.password}
            onChange={(e) =>
              setForm({
                ...form,
                petugas: { ...form.petugas, password: e.target.value },
              })
            }
            required
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
