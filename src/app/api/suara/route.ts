import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const detailSuara = await prisma.detailSuara.findMany({
      select: {
        id: true,
        hasilTpsId: true,
        calonId: true,
        jumlahSuara: true,
      },
    });
    return NextResponse.json(detailSuara);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Gagal mengambil detail suara pemilih" },
      { status: 500 },
    );
  }
}
