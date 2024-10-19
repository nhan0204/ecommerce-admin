import { prismadb } from "@/lib/prismadb";
import { Order, OrderItem } from "@prisma/client";

type OrderWithItems = Awaited<ReturnType<typeof prismadb.order.findMany>>[0];

export const getSalesCount = async (storeId: string): Promise<number> => {
  const salesCount: Order[] = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const sales = salesCount.reduce((totalCount: number, order: OrderWithItems) => {
    const orderCount = order.orderItems.reduce((orderSum: number, item: OrderItem) => {
      return orderSum + item.quantity;
    }, 0);

    return totalCount + orderCount;
  }, 0);

  return sales;
};
