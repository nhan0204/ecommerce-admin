import { prismadb } from "@/lib/prismadb";

export const getSalesCount = async (storeId: string) => {
  const salesCount = await prismadb.order.findMany({
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

  const sales = salesCount.reduce((totalCount, order) => {
    const orderCount = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.quantity;
    }, 0);

    return totalCount + orderCount;
  }, 0);

  return sales;
};
