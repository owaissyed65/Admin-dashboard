import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
  try {
    const { userId } = auth();

    if (!params.billboardsId) {
      return new NextResponse("Store-Id is required", { status: 400 });
    }

    const BillBoards = await prisma.BillBoard.findUnique({
      where: {
        id: params.storeId,
        userId,
      },
    });
    return NextResponse.json(BillBoards);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function PATCH(req, { params }) {
  try {
    const { userId } = auth();
    const { label,imageUrl } = await req.json();

    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    if (!label) {
      return new NextResponse("label is Required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image Url is Required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store-Id is required", { status: 400 });
    }

    if (!params.billboardsId) {
      return new NextResponse("BillBoards is required", { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    const BillBoard = await prisma.BillBoard.updateMany({
      where: {
        id: params.billboardsId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(BillBoard);
  } catch (error) {
    console.log("[Billboard_patch]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store-Id is required", { status: 400 });
    }

    if (!params.billboardsId) {
      return new NextResponse("Store-Id is required", { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.billboardsId
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    const BillBoards = await prisma.BillBoard.deleteMany({
      where: {
        id: params.billboardsId,
      },
    });
    return NextResponse.json(BillBoards);
  } catch (error) {
    console.log("[BILLBOARD_delete]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
