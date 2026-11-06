import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getTpsCount } from "./count";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const [dataTps, countsTps] = await Promise.all([
      prisma.tps.findMany({
        select: {
          id: true,
          namaTps: true,
          wilayah: true,
          jumlahPemilih: true,
          namaSaksi: true,
          petugas: {
            select: {
              username: true,
            },
          },
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

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const namaTps = formData.get("namaTps") as string;
    const wilayah = formData.get("wilayah") as string;
    const jumlahPemilih = Number(formData.get("jumlahPemilih"));
    const namaSaksi = formData.get("namaSaksi") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    // Validasi data
    if (!namaTps || !wilayah || !jumlahPemilih || !username || !password) {
      return NextResponse.json(
        { message: "Semua data wajib harus diisi" },
        { status: 400 },
      );
    }

    if (!Number.isInteger(jumlahPemilih) || jumlahPemilih < 1) {
      return NextResponse.json(
        { message: "Jumlah pemilih tidak valid" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password minimal 8 karakter" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan TPS dan akun petugas sekaligus
    const simpanData = await prisma.tps.create({
      data: {
        namaTps,
        wilayah,
        jumlahPemilih,
        namaSaksi: namaSaksi || null,

        petugas: {
          create: {
            username,
            password: hashedPassword,
            role: "PETUGAS_TPS",
          },
        },
      },
      include: {
        petugas: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data TPS dan akun petugas berhasil disimpan",
      data: simpanData,
    });
  } catch (error) {
    console.error("Data TPS:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyimpan data TPS dan petugas",
      },
      { status: 500 },
    );
  }
}
