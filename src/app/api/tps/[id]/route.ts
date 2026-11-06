import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: Promise<{ id: string }>) {
  try {
    const { id } = await params;
    const getData = await prisma.tps.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!getData) {
      return NextResponse.json(
        { message: "Data petugas tidak dapat ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(getData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengambil data petugas" },
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
    const petugasId = Number(id);

    if (!Number.isInteger(petugasId) || petugasId <= 0) {
      return NextResponse.json(
        { message: "ID TPS tidak valid" },
        { status: 404 },
      );
    }

    const getPetugas = await prisma.tps.findUnique({
      where: {
        id: petugasId,
      },
    });

    if (!getPetugas) {
      return NextResponse.json(
        { message: "Data petugas tidak ditemukan" },
        { status: 404 },
      );
    }

    // Hapus calon jika belum memiliki data suara
    await prisma.tps.delete({
      where: { id: petugasId },
    });
    return NextResponse.json({
      success: true,
      message: "Data Petugas berhasil dihapus",
    });
  } catch (error) {
    console.error("ERROR DELETE PETUGA:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat menghapus petugas",
      },
      { status: 500 },
    );
  }
}
