import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const STATUS_VALID = ["DRAFT", "TERVERIFIKASI", "DITOLAK"];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!STATUS_VALID.includes(body.status)) {
      return NextResponse.json(
        { message: "Status tidak valid" },
        { status: 400 },
      );
    }

    const hasil = await prisma.hasilTps.update({
      where: { id: Number(id) },
      data: { status: body.status },
    });

    return NextResponse.json(hasil);
  } catch (error) {
    console.error("Gagal memperbarui status:", error);

    return NextResponse.json(
      { message: "Gagal memperbarui status TPS" },
      { status: 500 },
    );
  }
}
