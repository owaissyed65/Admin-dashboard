import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { userId } = auth();
    const { label, imageUrl } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image Url is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 404 });
    }
    const BillBoards = await prismadb.BillBoard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(BillBoards);
  } catch (error) {
    console.log("[BillBoard_POST]", error);
    throw new Error(error);
  }
}

export async function GET(req, { params }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    const BillBoards = await prismadb.BillBoard.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(BillBoards);
  } catch (error) {
    console.log("[BillBoard_GET]", error);
    throw new Error(error);
  }
}
