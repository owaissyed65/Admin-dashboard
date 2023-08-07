import prisma from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color-Id is required", { status: 400 });
    }

    const color = await prisma.color.findUnique({
      where: {
        id: params.colorId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { userId } = auth();
    const { name, value } = await req.json();

    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is Required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is Required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store-Id is required", { status: 400 });
    }

    if (!params.colorId) {
      return new NextResponse("Color-Id is required", { status: 400 });
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

    const color = await prisma.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_patch]", error);
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

    if (!params.colorId) {
      return new NextResponse("Color-Id is required", { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    const color = await prisma.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[color_delete]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
