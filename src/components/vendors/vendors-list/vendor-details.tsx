import { useGet } from '@/hooks/useGet';
import { VendorListModel } from '@/models/vendor/VendorListModel';
import { VendorShopDetailsModel } from '@/models/vendor/VendorShopDetailsModel';
import { formatAddress } from '@/utils/formatters';
import Link from 'next/link';
import React from 'react';

interface ComponentProps {
  vendor: VendorListModel;
}

interface DisplayItemProps {
  heading: string;
  value: string;
}

const DisplayItem: React.FC<DisplayItemProps> = ({ heading, value }) => {
  return (
    <div className='flex flex-col gap-1'>
      <div className='text-sm text-gray-500 decoration-solid'>{heading}</div>
      <div className='text-sm'>{value}</div>
    </div>
  );
};

const VendorDetails: React.FC<ComponentProps> = ({ vendor }) => {
  const { data: shops, isLoading } = useGet<VendorShopDetailsModel[]>(`/admin/api/v1/vendors/${vendor.id}/shops`);

  return (
    <div className='flex flex-col justify-center gap-4 p-6'>
      <h4>Vendor Information</h4>

      <div className='flex flex-wrap gap-4'>
        <DisplayItem heading='ID' value={vendor.id} />
        <DisplayItem heading='Name' value={vendor.name} />
        <DisplayItem heading='Active?' value={vendor.active ? 'Yes' : 'No'} />
        <DisplayItem heading='DOB' value={vendor.dob} />
        <DisplayItem heading='Phone Number' value={vendor.phoneNumber} />
        <DisplayItem heading='Pin Set?' value={vendor.pinSet ? 'Yes' : 'No'} />
        <DisplayItem heading='Verified?' value={vendor.verified ? 'Yes' : 'No'} />
      </div>

      <div className='flex flex-col gap-2'>
        <h5>Shops</h5>

        {isLoading && <div>Loading...</div>}

        {shops?.map((shop) => (
          <div key={`shop-${shop.id}`} className='flex flex-col gap-2 rounded-lg border border-black p-3'>
            <div className='flex w-full justify-between'>
              <div>
                {shop.name} (
                <Link className='text-blue-light-600' href={`/shops/${shop.id}`} target='_blank'>
                  {shop.id}
                </Link>
                )
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
