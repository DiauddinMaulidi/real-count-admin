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
      include: {
        petugas: {
          select: {
            id: true,
            username: true,
          },
        },
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
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const tpsId = Number(id);

    const body = await req.json();

    const data = await prisma.$transaction(async (tx) => {
      const tps = await tx.tps.findUnique({
        where: { id: tpsId },
        include: { petugas: true },
      });

      if (!tps) {
        throw new Error("TPS tidak ditemukan");
      }

      // Update data TPS
      await tx.tps.update({
        where: { id: tpsId },
        data: {
          namaTps: body.namaTps,
          wilayah: body.wilayah || null,
          namaSaksi: body.namaSaksi || null,
          jumlahPemilih: Number(body.jumlahPemilih),
        },
      });

      // Update username petugas jika tersedia
      if (body.petugas?.username && tps.petugas) {
        await tx.user.update({
          where: {
            id: tps.petugas.id,
          },
          data: {
            username: body.petugas.username,
          },
        });
      }

      return tx.tps.findUnique({
        where: { id: tpsId },
        include: {
          petugas: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Data berhasil diperbarui",
      data,
    });
  } catch (error) {
    console.error("Update TPS:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Gagal memperbarui data",
      },
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
