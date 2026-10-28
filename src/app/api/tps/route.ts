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
