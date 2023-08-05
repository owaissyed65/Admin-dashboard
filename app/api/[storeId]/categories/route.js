import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { userId } = auth();
    const { name, billboardId } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("BillboardId is required", { status: 400 });
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
    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    throw new Error(error);
  }
}

export async function GET(req, { params }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    const category = await prismadb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[Category_GET]", error);
    throw new Error(error);
  }
}
