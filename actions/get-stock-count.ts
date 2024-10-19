import { prismadb } from "@/lib/prismadb";

export const getStockCount = async (storeId: string) => {
  const stockCount = await prismadb.product.findMany({
    where: {
      storeId,
      isArchived: false,
    },
  });

  const stock = stockCount.reduce((totalCount, product) => {
    return totalCount + product.quantity;
  }, 0);

  return stock;
};
