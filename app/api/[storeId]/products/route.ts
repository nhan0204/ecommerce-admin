import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      modal,
      price,
      quantity,
      categoryId,
      sizeId,
      colorId,
      images,
      isFeatured,
      isArchived,
      isHorizontal,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!quantity) {
      return new NextResponse("Quantity is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size Id is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color Id is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        UserId: userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorization", { status: 403 });
    }

    const product = await prismadb.product.create({
      data: {
        storeId: params.storeId,
        name,
        modal,
        price,
        quantity,
        categoryId,
        sizeId,
        colorId,
        isArchived,
        isFeatured,
        isHorizontal,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured") || undefined;
    const isArchived = searchParams.get("isArchived") || undefined;
    const isHorizontal = searchParams.get("isHorizontal") || undefined;

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured:
          isFeatured !== undefined ? isFeatured === "true" : undefined,
        isArchived:
          isArchived !== undefined ? isArchived === "true" : undefined,
        isHorizontal:
          isHorizontal !== undefined ? isHorizontal === "true" : undefined,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
