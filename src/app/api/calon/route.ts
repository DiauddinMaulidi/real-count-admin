import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
