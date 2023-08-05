import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
  try {
    const { userId } = auth();

    if (!params.categoryId) {
      return new NextResponse("categoryId is required", { status: 400 });
    }

    const category = await prisma.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function PATCH(req, { params }) {
  try {
    const { userId } = auth();
    const { name, billboardId } = await req.json();

    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name is Required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("BillBoard Id is Required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store-Id is required", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
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

    const category = await prisma.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_patch]", error);
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

    if (!params.categoryId) {
      return new NextResponse("Category-Id is required", { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    const category = await prisma.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_delete]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
