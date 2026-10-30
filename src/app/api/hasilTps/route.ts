import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const hasilTps = await prisma.hasilTps.findMany({
      include: {
        tps: {
          select: {
            namaTps: true,
            wilayah: true,
            jumlahPemilih: true,
            namaSaksi: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(hasilTps);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Gagal mengambil detail suara pemilih" },
      { status: 500 },
    );
  }
}
