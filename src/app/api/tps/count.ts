import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function getTpsCount() {
  try {
    const totalTps = await prisma.tps.count();
    return totalTps;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Gagal menghitung jumlah tps" },
      { status: 500 },
    );
  }
}
