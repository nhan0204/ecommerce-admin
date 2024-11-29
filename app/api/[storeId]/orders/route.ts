import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  if (!params.orderId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

  try {
    const orders = await prismadb.order.findMany({
      where: {
        id: params.orderId,
      },
      include: {
        orderItems: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.log("[PRODUCTS_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
