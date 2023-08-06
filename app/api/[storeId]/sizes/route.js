import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { userId } = auth();
    const { name, value } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
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
    const size = await prismadb.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_POST]", error);
    throw new Error(error);
  }
}

export async function GET(req, { params }) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    const size = await prismadb.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    throw new Error(error);
  }
}
