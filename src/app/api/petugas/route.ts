import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const petugasTps = await prisma.tps.findMany({
      select: {
        namaTps: true,
        wilayah: true,
        jumlahPemilih: true,
        namaSaksi: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(petugasTps);
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

    const nama = formData.get("namaTps") as string;
    const wilayah = formData.get("wilayah") as string;
    const jumlahPemilih = Number(formData.get("jumlahPemilih"));
    const namaSaksi = formData.get("namaSaksi") as string;

    const simpanData = await prisma.tps.create({
      data: {
        namaTps: nama,
        wilayah: wilayah,
        jumlahPemilih: jumlahPemilih,
        namaSaksi: namaSaksi,
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
