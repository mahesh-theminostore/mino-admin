import React from 'react';
import Link from 'next/link';

import { useGet } from '@/hooks/useGet';
import { formatAddress } from '@/utils/formatters';

import { VendorListModel } from '@/models/vendor/VendorListModel';
import { VendorShopDetailsModel } from '@/models/vendor/VendorShopDetailsModel';

import VendorDetailsForm from './VendorDetailsForm';

interface ComponentProps {
  vendor: VendorListModel;
}

const VendorDetails: React.FC<ComponentProps> = ({ vendor }) => {
  const { data: shops, isLoading } = useGet<VendorShopDetailsModel[]>(`/admin/api/v1/vendors/${vendor.id}/shops`);

  return (
    <div className='flex flex-col justify-center gap-4 p-6'>
      <h4>Vendor Information</h4>

      <VendorDetailsForm vendor={vendor} />

      <div className='flex flex-col gap-2'>
        <h5>Shops</h5>

        {isLoading && <div>Loading...</div>}

        {shops?.map((shop) => (
          <div key={`shop-${shop.id}`} className='flex flex-col gap-2 rounded-lg border border-black p-3'>
            <div className='flex w-full justify-between'>
              <div>
                <Link className='text-blue-light-600' href={`/shops/${shop.id}`} target='_blank'>
                  {shop.name} (Open Shop & Edit Items)
                </Link>
              </div>
              <div className={`${shop.active ? 'text-active' : 'text-inactive'}`}>
                {shop.active ? 'Active' : 'InActive'}
              </div>
            </div>

            <hr />

            <div className='text-wrap'>{formatAddress(shop.address)}</div>

            <div className='flex gap-4'>
              <div>Shop Timings</div>

              <div className='flex flex-col gap-2'>
                {shop.workingHours?.map((timings) => (
                  <div key={`shop-working-hours-${timings.start}`} className='decoration-solid'>
                    {timings.start} - {timings.end}
                  </div>
                ))}
              </div>
            </div>

            <div className='flex flex-wrap justify-between gap-4'>
              <div className={`${shop.deliveryEnabled ? 'text-active' : 'text-inactive'}`}>
                {`Delivery ${shop.deliveryEnabled ? 'Enabled' : 'Disabled'}`}
              </div>

              <div className={`${shop.deliveryEnabled ? 'text-active' : 'text-inactive'}`}>
                {`Delivery ${shop.deliveryAvailable ? 'Available' : 'Unavailable'}`}
              </div>

              <div>{`Min Amount: ${shop.deliveryRules?.min_amount ?? 'N/A'}`}</div>

              <div>
                {`Delivery Timings: ${shop.deliveryRules?.delivery_hours?.start ?? 'N/A'} ${shop.deliveryRules?.delivery_hours?.end ?? ''}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorDetails;
