import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { userId } = auth();
    const {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      images,
      isFeatured,
      isArchived,
    } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("Color Id is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("size Id is required", { status: 400 });
    }
    if (!images) {
      return new NextResponse("Images is required", { status: 400 });
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
    const products = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        images: {
          createMany: {
            data: [...images.map((image) => image)],
          },
        },
        storeId: params.storeId,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log("[BillBoard_POST]", error);
    throw new Error(error);
  }
}

export async function GET(req, { params }) {
  try {
    const { searchParams } = new URL(req.url);
    const sizeId = searchParams.get("sizeId") || undefined;
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const isFeatured = searchParams.get("isFeatured") || undefined;

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        sizeId,
        categoryId,
        colorId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        size: true,
        category: true,
        color: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log("[BillBoard_GET]", error);
    throw new Error(error);
  }
}
