import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    const { userId } = auth();
    const { name } = await req.json();
    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is Required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store-Id is required", { status: 400 });
    }
    const store = await prisma.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[store_patch]", error);
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
    const store = await prisma.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[store_delete]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
