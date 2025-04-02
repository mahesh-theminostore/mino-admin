'use client';

import React from 'react';
import { useShopDetailsViewModel } from './useShopDetailsViewModel';
import { formatAddress, formatTimeRange } from '@/utils/formatters';
import ShopDetailsForm from './ShopDetailsForm';

interface ComponentProps {
  shopId: string;
}

interface DisplayItemProps {
  heading: string;
  value: string | null;
}

const DisplayItem: React.FC<DisplayItemProps> = ({ heading, value }) => {
  return (
    <div className='flex flex-col gap-1'>
      <div className='text-sm text-gray-500 decoration-solid'>{heading}</div>
      <div className='text-sm'>{value}</div>
    </div>
  );
};

export default function ShopDetails({ shopId }: ComponentProps) {
  const { data, isLoading, updateShopCatalogItem } = useShopDetailsViewModel(shopId);

  if (isLoading) return <div>Loading...</div>;

  // return JSON.stringify(data);

  // @ts-expect-error  define type later
  const { shop, items } = data;

  return (
    <div className='flex flex-col justify-center gap-4 p-6'>
      <h4>Shop Information</h4>

      <div className='flex flex-wrap gap-4'>
        <DisplayItem heading='ID' value={shop.id} />
        <DisplayItem heading='Name' value={shop.name} />
        <DisplayItem heading='Active?' value={shop.active ? 'Yes' : 'No'} />
        <DisplayItem heading='Address' value={formatAddress(shop.address)} />
        <DisplayItem heading='Delivery Available?' value={shop.deliveryAvailable ? 'Yes' : 'No'} />
        <DisplayItem heading='Delivery Enabled?' value={shop.deliveryEnabled ? 'Yes' : 'No'} />
        <DisplayItem heading='Min Delivery Value' value={shop.deliveryRules?.min_amount || 'N/A'} />
        <DisplayItem
          heading='Delivery Hours'
          value={formatTimeRange(shop.deliveryRules?.delivery_hours?.start, shop.deliveryRules?.delivery_hours?.end)}
        />
      </div>

      <ShopDetailsForm shopItems={items} onUpdateItem={updateShopCatalogItem} />
    </div>
  );
}
