import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        namaUser: true,
        username: true,
        role: true,
        tps: {
          select: {
            namaTps: true,
            wilayah: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Gagal mengambil data users" },
      { status: 500 },
    );
  }
}
