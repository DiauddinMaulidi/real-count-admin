import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { message: "Silahkan Login terlebih dahulu" },
        { status: 401 },
      );
    }
    const users = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!users) {
      return NextResponse.json(
        { message: "Pengguna tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Gagal mengambil data users" },
      { status: 500 },
    );
  }
}
