'use client';

import React from 'react';
import { useShopDetailsViewModel } from './useShopDetailsViewModel';
import ShopCatalogForm from './ShopCatalogForm';
import ShopDetailsForm from './ShopDetailsForm';

interface ComponentProps {
  shopId: string;
}

export default function ShopDetails({ shopId }: ComponentProps) {
  const { data, isLoading, updateShopCatalogItem } = useShopDetailsViewModel(shopId);

  if (isLoading) return <div>Loading...</div>;

  const { shop, items } = data!;

  return (
    <div className='flex flex-col justify-center gap-12 p-6'>
      <ShopDetailsForm shopId={shopId} data={shop} />

      <hr className='border-1' />

      <ShopCatalogForm shopItems={items} onUpdateItem={updateShopCatalogItem} />
    </div>
  );
}
