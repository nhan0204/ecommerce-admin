import { prismadb } from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
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

  const dailyRevenue: { [key: string]: number } = {};

  for (const order of paidOrders) {
    const day = order.createdAt.getDay();
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber() * item.quantity;
    }

    dailyRevenue[day] = (dailyRevenue[day] || 0) + revenueForOrder;
  }

  const graphData: GraphData[] = [
    { name: "Mon", total: 0 },
    { name: "Tue", total: 0 },
    { name: "Wed", total: 0 },
    { name: "Thur", total: 0 },
    { name: "Fri", total: 0 },
    { name: "Sat", total: 0 },
    { name: "Sun", total: 0 },
  ];

  for (const day in dailyRevenue) {
    graphData[parseInt(day) - 1].total = dailyRevenue[parseInt(day)];
  }

  return graphData;
};
