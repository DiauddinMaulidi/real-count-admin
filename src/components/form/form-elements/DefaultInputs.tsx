"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Label from "../Label";
import { useModal } from "@/hooks/useModal";
import { useDropzone } from "react-dropzone";
import { EyeIcon, TrashBinIcon, UploadIcon } from "@/icons";
import Image from "next/image";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

interface FileWithPreview extends File {
  preview?: string;
}

export default function DefaultInputs() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [previewImage, setPreviewImage] = useState<FileWithPreview | null>(
    null,
  );
  const { isOpen, openModal, closeModal } = useModal();

  const [form, setForm] = useState({
    nama: "",
    nomorUrut: "",
  });
  const [foto, setFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const filesRef = useRef<FileWithPreview[]>(files);
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
        }),
      ),
    ]);

    if (acceptedFiles.length > 0) {
      setFoto(acceptedFiles[0]);
    }
  }, []);

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => {
      const target = prevFiles.find((f) => f.name === fileName);
      if (target?.preview) {
        URL.revokeObjectURL(target.preview);
      }
      return prevFiles.filter((f) => f.name !== fileName);
    });
  };

  const handleOpenPreview = (file: FileWithPreview) => {
    setPreviewImage(file);
    openModal();
  };

  const handleClosePreview = () => {
    closeModal();
    setPreviewImage(null);
  };

  useEffect(() => {
    return () => {
      filesRef.current.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFocused,
  } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
      "image/svg+xml": [".svg"],
    },
    maxSize: 5 * 1024 * 1024,
  });

  const getBorderColor = () => {
    if (isDragReject)
      return "border-error-500 bg-error-50/60 dark:bg-error-950/20";
    if (isDragAccept)
      return "border-brand-500 bg-brand-50/60 dark:bg-brand-950/20";
    if (isFocused)
      return "border-brand-500 ring-2 ring-brand-500/20 bg-gray-50 dark:bg-gray-900";
    return "border-gray-300 bg-gray-50 hover:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-500";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

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
          <Label htmlFor="test">Nomor Urut</Label>
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
          <Label>Nama Calon Kades</Label>
          <Input
            type="text"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            required
            placeholder="Ex. Alexander Graham"
          />
        </div>

        <div
          {...getRootProps()}
          className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-7 text-center outline-hidden transition-all duration-200 lg:p-10 ${getBorderColor()}`}
        >
          {/* Hidden file input handled by react-dropzone */}
          <input {...getInputProps()} />

          <div className="flex flex-col items-center">
            {/* Icon Container */}
            <div className="mb-4 flex size-15 items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <UploadIcon className="size-6 text-current" />
            </div>

            {/* Title / Status Message */}
            <h4 className="mb-2 text-theme-xl font-semibold text-gray-800 dark:text-white/90">
              {isDragReject
                ? "File type not supported"
                : isDragAccept
                  ? "Drop images here"
                  : isDragActive
                    ? "Drop files here"
                    : foto
                      ? "Foto berhasil dipilih"
                      : "Drag & Drop Files Here"}
            </h4>

            {/* Helper Text */}
            <p className="mb-4 max-w-72.5 text-sm text-gray-600 dark:text-gray-400">
              {isDragReject
                ? "Only PNG, JPG, WebP, and SVG images up to 5MB are allowed"
                : foto
                  ? foto.name
                  : "Drag and drop your PNG, JPG, WebP, SVG images here or browse"}
            </p>

            {/* Action Prompt */}
            <span className="text-theme-sm font-medium text-brand-500 underline hover:text-brand-600">
              Browse File
            </span>
          </div>
        </div>

        {foto && (
          <div className="mt-3 flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="size-5" />
              <span className="text-sm">{foto.name}</span>
            </div>
            <button
              type="button"
              onClick={() => setFoto(null)}
              className="text-sm text-red-500"
            >
              Hapus
            </button>
          </div>
        )}

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
