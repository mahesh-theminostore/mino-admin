import React from 'react';
import { useForm } from '@tanstack/react-form';

import Input from '@/components/form/input/InputField';
import RadioGroup from '@/components/form/group-input/RadioGroup';

import { ShopViewModel } from '@/models/shop/ShopModel';

import Address from '@/components/form/group-input/address-input/Address';
import Button from '@/components/ui/button/Button';
import TimeRange from '@/components/form/group-input/TimeRange';
import { PlusIcon } from '@/icons';
import { useShopDetailsViewModel } from './useShopDetailsViewModel';

interface ComponentProps {
  shopId: string;
  data: ShopViewModel;
}

interface DisplayItemProps {
  heading: string;
  value: string | number | null;
}

const DisplayItem: React.FC<DisplayItemProps> = ({ heading, value }) => {
  return (
    <div className='flex flex-col gap-1'>
      <div className='text-sm text-gray-500 decoration-solid'>{heading}</div>
      <div className='text-sm'>{value}</div>
    </div>
  );
};

const ShopDetailsForm: React.FC<ComponentProps> = ({ shopId, data }) => {
  const { updateShopDetails } = useShopDetailsViewModel(shopId);

  const form = useForm({
    defaultValues: {
      ...data,
    } as ShopViewModel,
    onSubmit: ({ value }) => updateShopDetails(value),
  });

  return (
    <>
      <h3 className='text-xl'>Shop Information</h3>

      <form
        className='flex flex-col gap-8'
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          form.handleSubmit();
        }}
      >
        <div className='flex flex-wrap gap-12'>
          <DisplayItem heading='ID' value={data.id} />

          <form.Field name='name' key='shop-name'>
            {(field) => {
              return (
                <>
                  <Input
                    label='Name'
                    id='shop-name'
                    type='text'
                    required
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              );
            }}
          </form.Field>

          <form.Field name='active' key='active-group'>
            {(field) => (
              <>
                <RadioGroup
                  label='Active?'
                  name='shop_active'
                  options={[
                    {
                      id: 'active-yes',
                      name: field.name,
                      checked: field.state.value,
                      value: 'yes',
                      label: 'Yes',
                      onChange: () => field.handleChange(true),
                    },
                    {
                      id: 'active-no',
                      name: field.name,
                      checked: !field.state.value,
                      value: 'no',
                      label: 'No',
                      onChange: () => field.handleChange(false),
                    },
                  ]}
                />
              </>
            )}
          </form.Field>

          <form.Field name='address' key='shop-address'>
            {(field) => (
              <Address address={field.state.value} label='Shop Address' onChange={(val) => field.handleChange(val)} />
            )}
          </form.Field>
        </div>

        <div className='flex flex-wrap gap-12'>
          <form.Field name='isDeliveryAvailable' key='delivery-available-group'>
            {(field) => (
              <>
                <RadioGroup
                  label='Delivery Available?'
                  name={field.name}
                  options={[
                    {
                      id: 'delivery-available-yes',
                      name: field.name,
                      checked: field.state.value,
                      value: 'yes',
                      label: 'Yes',
                      onChange: () => field.handleChange(true),
                    },
                    {
                      id: 'delivery-available-no',
                      name: field.name,
                      checked: !field.state.value,
                      value: 'no',
                      label: 'No',
                      onChange: () => field.handleChange(false),
                    },
                  ]}
                />
              </>
            )}
          </form.Field>

          <form.Field name='isDeliveryEnabled' key='delivery-enabled-group'>
            {(field) => (
              <>
                <RadioGroup
                  label='Delivery Enabled?'
                  name='deliveryEnabled'
                  options={[
                    {
                      id: 'delivery-enabled-yes',
                      name: field.name,
                      checked: field.state.value,
                      value: 'yes',
                      label: 'Yes',
                      onChange: () => field.handleChange(true),
                    },
                    {
                      id: 'delivery-enabled-no',
                      name: field.name,
                      checked: !field.state.value,
                      value: 'no',
                      label: 'No',
                      onChange: () => field.handleChange(false),
                    },
                  ]}
                />
              </>
            )}
          </form.Field>

          <form.Field name='minDeliveryAmount' key='min-delivery-amount'>
            {(field) => {
              return (
                <>
                  <Input
                    label='Min Delivery Amount'
                    id='min-delivery-amount'
                    type='number'
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(parseInt(e.target.value))}
                  />
                </>
              );
            }}
          </form.Field>

          <form.Field name='workingHours' key='working-hours'>
            {(field) => (
              <div className='flex flex-col gap-4'>
                <label className='text-sm font-medium'>Working Hours</label>

                {field.state.value.map((range, index) => (
                  <TimeRange
                    key={`working-time-range-${range.start}-${range.end}`}
                    name={`working-time-range-${index}`}
                    start={range.start}
                    end={range.end}
                    onChange={(val) => field.replaceValue(index, val)}
                  />
                ))}

                <Button variant='outline' onClick={() => field.pushValue({ start: '', end: '' })}>
                  <PlusIcon /> Add Timing
                </Button>
              </div>
            )}
          </form.Field>

          <form.Field name='deliveryHours' key='delivery-hours'>
            {(field) => (
              <div className='flex flex-col gap-4'>
                <label className='text-sm font-medium'>Delivery Timings</label>

                {field.state.value.map((range, index) => (
                  <TimeRange
                    key={`delivery-time-range-${range.start}-${range.end}`}
                    name={`delivery-time-range-${index}`}
                    start={range.start}
                    end={range.end}
                    onChange={(val) => field.replaceValue(index, val)}
                  />
                ))}

                <Button variant='outline' onClick={() => field.pushValue({ start: '', end: '' })}>
                  <PlusIcon /> Add Timing
                </Button>
              </div>
            )}
          </form.Field>
        </div>

        <div>
          <Button type='submit'>Save</Button>
        </div>
      </form>
    </>
  );
};

export default ShopDetailsForm;
