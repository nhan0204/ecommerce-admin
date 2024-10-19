import Heading from '@/components/ui/heading';
import { prismadb } from '@/lib/prismadb';
import React from 'react';
import { useStoreModal } from '@/hooks/use-store-modal';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, DollarSign, Package } from 'lucide-react';
import { formatter } from '@/lib/utils';
import { getTotalRevenue } from '@/actions/get-total-revenue';
import { getSalesCount } from '@/actions/get-sales-count';
import { getStockCount } from '@/actions/get-stock-count';
import Overview from '@/components/overview';
import { getGraphRevenue } from '@/actions/get-graph-revenue';

interface DashboardPageProps {
  params: { storeId: string}
}

const DashboardPage: React.FC<DashboardPageProps> = async({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  });

  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dash board" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex pt-4 pb-0">
              <CardTitle className="text-md lg:text-lg font-medium flex items-center">
                Total Revenue
                <DollarSign className="ml-auto h-4 w-4 lg:h-5 lg:w-5 m-0 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="text-xl lg:text-2xl font-bold">{formatter.format(totalRevenue)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex pt-4 pb-0">
              <CardTitle className="text-md lg:text-lg font-medium flex items-center">
                Sales
                <CreditCard className="ml-auto h-4 w-4 lg:h-5 lg:w-5 m-0 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="text-xl lg:text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex pt-4 pb-0">
              <CardTitle className="text-md lg:text-lg font-medium flex items-center">
                Products In Stock
                <Package className="ml-auto h-4 w-4 lg:h-5 lg:w-5 m-0 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="text-xl lg:text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-4">
            <Overview data={graphRevenue}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;