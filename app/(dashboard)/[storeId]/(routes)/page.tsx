import { useStoreModal } from '@/hooks/use-store-modal';
import { prismadb } from '@/lib/prismadb';
import React from 'react';

interface DashboardPageProps {
  params: { storeId: string}
}

const DashboardPage: React.FC<DashboardPageProps> = async({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  });


  return (
    <div>This is a dashboard {store?.name}</div>
  )
}

export default DashboardPage;