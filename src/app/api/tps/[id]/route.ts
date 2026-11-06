import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET data TPS berdasarkan ID
export async function GET(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const tpsId = Number(id);

    if (!Number.isInteger(tpsId) || tpsId <= 0) {
      return NextResponse.json(
        { message: "ID TPS tidak valid" },
        { status: 400 },
      );
    }

    const getData = await prisma.tps.findUnique({
      where: {
        id: tpsId,
      },
    });

    if (!getData) {
      return NextResponse.json(
        { message: "Data petugas tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(getData);
  } catch (error) {
    console.error("ERROR GET TPS:", error);

    return NextResponse.json(
      { message: "Gagal mengambil data petugas" },
      { status: 500 },
    );
  }
}

// DELETE data TPS
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const tpsId = Number(id);

    if (!Number.isInteger(tpsId) || tpsId <= 0) {
      return NextResponse.json(
        { message: "ID TPS tidak valid" },
        { status: 400 },
      );
    }

    const getPetugas = await prisma.tps.findUnique({
      where: { id: tpsId },
    });

    if (!getPetugas) {
      return NextResponse.json(
        { message: "Data petugas tidak ditemukan" },
        { status: 404 },
      );
    }

    await prisma.tps.delete({
      where: { id: tpsId },
    });

    return NextResponse.json({
      success: true,
      message: "Data petugas berhasil dihapus",
    });
  } catch (error) {
    console.error("ERROR DELETE PETUGAS:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat menghapus petugas",
      },
      { status: 500 },
    );
  }
}

// PATCH update data TPS
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const tpsId = Number(id);

    if (!Number.isInteger(tpsId) || tpsId <= 0) {
      return NextResponse.json(
        { message: "ID TPS tidak valid" },
        { status: 400 },
      );
    }

    // Membaca JSON
    const body = await request.json();

    const { namaTps, wilayah, namaSaksi, jumlahPemilih } = body;

    // Validasi input
    if (
      typeof namaTps !== "string" ||
      typeof wilayah !== "string" ||
      typeof namaSaksi !== "string" ||
      !namaTps.trim() ||
      !wilayah.trim() ||
      !namaSaksi.trim() ||
      !Number.isInteger(Number(jumlahPemilih)) ||
      Number(jumlahPemilih) < 0
    ) {
      return NextResponse.json(
        { message: "Data TPS tidak valid atau belum lengkap" },
        { status: 400 },
      );
    }

    // Cek data TPS
    const tpsLama = await prisma.tps.findUnique({
      where: { id: tpsId },
    });

    if (!tpsLama) {
      return NextResponse.json(
        { message: "Data TPS tidak ditemukan" },
        { status: 404 },
      );
    }

    // Update database
    const updated = await prisma.tps.update({
      where: { id: tpsId },
      data: {
        namaTps: namaTps.trim(),
        wilayah: wilayah.trim(),
        namaSaksi: namaSaksi.trim(),
        jumlahPemilih: Number(jumlahPemilih),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data TPS berhasil diperbarui",
      data: updated,
    });
  } catch (error) {
    console.error("ERROR PATCH TPS:", error);

    return NextResponse.json(
      { message: "Gagal memperbarui data TPS" },
      { status: 500 },
    );
  }
}

// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET(req: Request, params: Promise<{ id: string }>) {
//   try {
//     const { id } = await params;
//     const getData = await prisma.tps.findUnique({
//       where: {
//         id: Number(id),
//       },
//     });

//     if (!getData) {
//       return NextResponse.json(
//         { message: "Data petugas tidak dapat ditemukan" },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json(getData);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Gagal mengambil data petugas" },
//       { status: 500 },
//     );
//   }
// }

// export async function DELETE(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     const { id } = await params;
//     const petugasId = Number(id);

//     if (!Number.isInteger(petugasId) || petugasId <= 0) {
//       return NextResponse.json(
//         { message: "ID TPS tidak valid" },
//         { status: 404 },
//       );
//     }

//     const getPetugas = await prisma.tps.findUnique({
//       where: {
//         id: petugasId,
//       },
//     });

//     if (!getPetugas) {
//       return NextResponse.json(
//         { message: "Data petugas tidak ditemukan" },
//         { status: 404 },
//       );
//     }

//     // Hapus calon jika belum memiliki data suara
//     await prisma.tps.delete({
//       where: { id: petugasId },
//     });
//     return NextResponse.json({
//       success: true,
//       message: "Data Petugas berhasil dihapus",
//     });
//   } catch (error) {
//     console.error("ERROR DELETE PETUGA:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Terjadi kesalahan saat menghapus petugas",
//       },
//       { status: 500 },
//     );
//   }
// }

// export async function PATCH(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   try {
//     const { id } = await params;
//     const tpsId = Number(id);

//     // Validasi ID
//     if (!Number.isInteger(tpsId) || tpsId <= 0) {
//       return NextResponse.json(
//         { message: "ID TPS tidak valid" },
//         { status: 400 },
//       );
//     }

//     const formData = await request.formData();

//     const namaTps = formData.get("namaTps");
//     const wilayah = formData.get("wilayah");
//     const namaSaksi = formData.get("namaSaksi");
//     const jumlahPemilih = Number(formData.get("jumlahPemilih"));

//     // Validasi input
//     if (
//       typeof namaTps !== "string" ||
//       typeof wilayah !== "string" ||
//       typeof namaSaksi !== "string" ||
//       !namaTps.trim() ||
//       !wilayah.trim() ||
//       !namaSaksi.trim() ||
//       !Number.isInteger(jumlahPemilih) ||
//       jumlahPemilih < 0
//     ) {
//       return NextResponse.json(
//         { message: "Data TPS tidak valid atau belum lengkap" },
//         { status: 400 },
//       );
//     }

//     // Cek data TPS
//     const tpsLama = await prisma.tps.findUnique({
//       where: { id: tpsId },
//     });

//     if (!tpsLama) {
//       return NextResponse.json(
//         { message: "Data TPS tidak ditemukan" },
//         { status: 404 },
//       );
//     }

//     // Update database
//     const updated = await prisma.tps.update({
//       where: { id: tpsId },
//       data: {
//         namaTps: namaTps.trim(),
//         wilayah: wilayah.trim(),
//         namaSaksi: namaSaksi.trim(),
//         jumlahPemilih,
//       },
//     });

//     return NextResponse.json({
//       message: "Data TPS berhasil diperbarui",
//       data: updated,
//     });
//   } catch (error) {
//     console.error("Gagal memperbarui TPS:", error);

//     return NextResponse.json(
//       { message: "Gagal memperbarui data TPS" },
//       { status: 500 },
//     );
//   }
// }
