import { prismadb } from "@/lib/prismadb";
import { Product } from "@prisma/client";

export const getStockCount = async (storeId: string) => {
  const stockCount = await prismadb.product.findMany({
    where: {
      storeId,
      isArchived: false,
    },
  });

  const stock = stockCount.reduce((totalCount: number, product: Product) => {
    return totalCount + product.quantity;
  }, 0);

  return stock;
};
