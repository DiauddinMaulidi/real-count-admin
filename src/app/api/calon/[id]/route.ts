import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import { mkdir, unlink, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
export const runtime = "nodejs";

// GET data berdasarkan ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const calon = await prisma.calon.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!calon) {
      return NextResponse.json(
        { message: "Data calon tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(calon);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengambil data calon" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const calonId = Number(id);

    if (!Number.isInteger(calonId) || calonId <= 0) {
      return NextResponse.json(
        { message: "ID calon tidak valid" },
        { status: 400 },
      );
    }

    // Periksa apakah calon tersedia
    const calon = await prisma.calon.findUnique({
      where: { id: calonId },
      include: {
        detailSuara: true,
      },
    });

    if (!calon) {
      return NextResponse.json(
        { message: "Data calon tidak ditemukan" },
        { status: 404 },
      );
    }

    // Periksa apakah calon sudah memiliki data suara
    if (calon.detailSuara.length > 0) {
      return NextResponse.json(
        {
          message:
            "Calon tidak dapat dihapus karena sudah memiliki data perolehan suara.",
        },
        { status: 409 },
      );
    }

    // Hapus calon jika belum memiliki data suara
    await prisma.calon.delete({
      where: { id: calonId },
    });

    if (calon.foto) {
      const fileName = path.basename(calon.foto);

      const filePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        "calon",
        fileName,
      );

      try {
        await unlink(filePath);
        console.log("Foto berhasil dihapus:", filePath);
      } catch (error) {
        console.error("Gagal menghapus foto:", error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Data calon berhasil dihapus",
    });
  } catch (error) {
    console.error("ERROR DELETE CALON:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat menghapus calon",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  let newFilePath: string | null = null;

  try {
    const { id } = await params;
    const formData = await request.formData();

    const namaCalon = formData.get("namaCalon") as string;
    const nomorUrut = Number(formData.get("nomorUrut"));
    const file = formData.get("foto");

    const calonLama = await prisma.calon.findUnique({
      where: { id: Number(id) },
    });

    if (!calonLama) {
      return NextResponse.json(
        { message: "Calon tidak ditemukan" },
        { status: 404 },
      );
    }

    let foto = calonLama.foto;

    // Upload foto baru jika ada
    if (file instanceof File && file.size > 0) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { message: "Format foto tidak didukung" },
          { status: 400 },
        );
      }

      if (file.size > 2 * 1024 * 1024) {
        return NextResponse.json(
          { message: "Ukuran foto maksimal 2 MB" },
          { status: 400 },
        );
      }

      const extension = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp",
      }[file.type];

      const filename = `${randomUUID()}${extension}`;

      const uploadDir = path.join(process.cwd(), "public/upload/calon");

      await mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, filename);

      await writeFile(filePath, Buffer.from(await file.arrayBuffer()));

      newFilePath = filePath;
      foto = `/upload/calon/${filename}`;
    }

    // Update database
    const updated = await prisma.calon.update({
      where: { id: Number(id) },
      data: {
        namaCalon,
        nomorUrut,
        foto,
      },
    });

    // Hapus foto lama setelah database berhasil diperbarui
    if (newFilePath && calonLama.foto) {
      const oldRelativePath = calonLama.foto.replace(/^\/+/, "");

      if (oldRelativePath.startsWith("upload/calon/")) {
        const oldPath = path.join(process.cwd(), "public", oldRelativePath);

        try {
          await unlink(oldPath);
        } catch (error) {
          console.error("Gagal menghapus foto lama:", error);
        }
      }
    }

    return NextResponse.json({
      message: "Data calon berhasil diperbarui",
      data: updated,
    });
  } catch (error) {
    console.error(error);

    // Bersihkan file baru jika proses update gagal
    if (newFilePath) {
      await unlink(newFilePath).catch(() => {});
    }

    return NextResponse.json(
      { message: "Gagal memperbarui data calon" },
      { status: 500 },
    );
  }
}
