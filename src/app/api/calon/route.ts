import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const calonKades = await prisma.calon.findMany({
      include: {
        detailSuara: {
          select: {
            jumlahSuara: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(calonKades);
  } catch (error) {
    console.error("Hasilnya adalah ", error);
    return NextResponse.json(
      { message: "Gagal mengambil data calon" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const nama = formData.get("namaCalon") as string;
    const nomor = Number(formData.get("nomorUrut"));

    const fotoCalon = formData.get("foto")! as File;

    let foto: string | null = null;

    if (fotoCalon && fotoCalon.size > 0) {
      if (!fotoCalon.type.startsWith("image/")) {
        return NextResponse.json(
          { message: "File berupa gambar" },
          { status: 500 },
        );
      }
      if (fotoCalon.size > 2 * 1024 * 1024) {
        return NextResponse.json(
          { message: "Ukuran foto maksimal 2 mb" },
          { status: 400 },
        );
      }

      const extention = path.extname(fotoCalon.name).toLowerCase();

      const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

      if (!allowedExtensions.includes(extention)) {
        return NextResponse.json(
          { message: "Format foto tidak didukung" },
          { status: 400 },
        );
      }

      const fileName = `${randomUUID()}${extention}`;

      const uploadDir = path.join(process.cwd(), "public", "uploads/calon");

      await mkdir(uploadDir, { recursive: true });

      const bytes = await fotoCalon.arrayBuffer();
      const buffer = Buffer.from(bytes);

      await writeFile(path.join(uploadDir, fileName), buffer);

      foto = `/uploads/calon/${fileName}`;
    }

    const simpanData = await prisma.calon.create({
      data: {
        namaCalon: nama,
        nomorUrut: nomor,
        foto,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data berhasil disimpan",
      data: simpanData,
    });
  } catch (error) {
    console.error("Error menyimpan calon:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyimpan data",
      },
      { status: 500 },
    );
  }
}
