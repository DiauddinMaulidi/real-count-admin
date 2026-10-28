import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const hasilTps = await prisma.hasilTps.findMany({
      select: {
        id: true,
        tpsId: true,
        suaraTidakSah: true,
        status: true,
        img: true,
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
