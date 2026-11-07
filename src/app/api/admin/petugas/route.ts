import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let clerkUserId: string | null = null;
  let createdTpsId: number | null = null;

  try {
    // 1. Verifikasi login Admin
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { message: "Silakan login terlebih dahulu." },
        { status: 401 },
      );
    }

    // 2. Periksa role Admin dari database
    const admin = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Akses ditolak. Khusus Admin." },
        { status: 403 },
      );
    }

    // 3. Ambil data form
    const body = await req.json();

    const namaTps = String(body.namaTps ?? "").trim();
    const wilayah = String(body.wilayah ?? "").trim();
    const jumlahPemilih = Number(body.jumlahPemilih);
    const namaSaksi = String(body.namaSaksi ?? "").trim();
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");

    if (
      !namaTps ||
      !username ||
      !password ||
      !Number.isInteger(jumlahPemilih) ||
      jumlahPemilih <= 0
    ) {
      return NextResponse.json(
        { message: "Data yang wajib diisi belum lengkap." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password minimal 8 karakter." },
        { status: 400 },
      );
    }

    // 4. Periksa username di database
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Username sudah digunakan." },
        { status: 409 },
      );
    }

    // 5. Buat data TPS
    const tps = await prisma.tps.create({
      data: {
        namaTps,
        wilayah: wilayah || null,
        jumlahPemilih,
        namaSaksi: namaSaksi || null,
      },
    });

    createdTpsId = tps.id;

    // 6. Buat akun Clerk
    const client = await clerkClient();

    const clerkUser = await client.users.createUser({
      username,
      password,
    });

    clerkUserId = clerkUser.id;

    // 7. Simpan akun petugas ke PostgreSQL
    const petugas = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        username,
        role: "PETUGAS_TPS",
        tpsId: tps.id,
      },
      select: {
        id: true,
        clerkId: true,
        username: true,
        role: true,
        tpsId: true,
      },
    });

    return NextResponse.json(
      {
        message: "TPS dan akun petugas berhasil dibuat.",
        data: {
          tps,
          petugas,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Gagal membuat TPS dan petugas:", error);

    // 8. Bersihkan akun Clerk jika proses database gagal
    if (clerkUserId) {
      try {
        const client = await clerkClient();
        await client.users.deleteUser(clerkUserId);
      } catch (cleanupError) {
        console.error("Gagal menghapus akun Clerk:", cleanupError);
      }
    }

    // 9. Bersihkan TPS jika proses pembuatan petugas gagal
    if (createdTpsId) {
      try {
        await prisma.tps.delete({
          where: { id: createdTpsId },
        });
      } catch (cleanupError) {
        console.error("Gagal menghapus TPS:", cleanupError);
      }
    }

    return NextResponse.json(
      { message: "Gagal membuat data TPS dan akun petugas." },
      { status: 500 },
    );
  }
}
