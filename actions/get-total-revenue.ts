import { prismadb } from "@/lib/prismadb";
import { Prisma } from "@prisma/client";

type OrderItemWithProduct = Prisma.OrderItemGetPayload<{
  include: { product: true };
}>;

type OrderWithItems = Awaited<ReturnType<typeof prismadb.order.findMany>>[0];

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        }
      }
    }
  });

  const totalRevenue = paidOrders.reduce((total: number, order: OrderWithItems) => {
    const orderTotal = order.orderItems.reduce((orderSum: number, item: OrderItemWithProduct) => {
      return orderSum + item.product.price.toNumber() * item.quantity;
    }, 0);

    return total + orderTotal;
  }, 0);

  return totalRevenue;
}