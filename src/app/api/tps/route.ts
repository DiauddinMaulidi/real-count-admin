import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getTpsCount } from "./count";

export async function GET() {
  try {
    const [dataTps, countsTps] = await Promise.all([
      prisma.tps.findMany({
        select: {
          id: true,
          namaTps: true,
          wilayah: true,
          jumlahPemilih: true,
          namaSaksi: true,
        },
      }),
      getTpsCount(),
    ]);
    return NextResponse.json({ dataTps, countsTps });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Gagal mengambil data tps" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const namaTps = formData.get("namaTps") as string;
    const wilayah = formData.get("wilayah") as string;
    const jumlahPemilih = Number(formData.get("jumlahPemilih"));
    const namaSaksi = formData.get("namaSaksi") as string;

    const simpanData = await prisma.tps.create({
      data: {
        namaTps,
        wilayah,
        jumlahPemilih,
        namaSaksi,
      },
    });

    if (!simpanData) {
      throw new Error("Data tidak ada");
    }

    return NextResponse.json({
      succes: true,
      message: "Data berhasil disimpan",
      data: simpanData,
    });
  } catch (error) {
    console.error("Data TPS: ", error);
    return NextResponse.json(
      {
        succes: false,
        message: "Gagal menyimpan data",
      },
      { status: 500 },
    );
  }
}
