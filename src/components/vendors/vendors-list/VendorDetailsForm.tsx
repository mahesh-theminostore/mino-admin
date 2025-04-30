import React from 'react';
import { VendorListModel } from '@/models/vendor/VendorListModel';
import { useForm } from '@tanstack/react-form';
import Input from '@/components/form/input/InputField';
import Checkbox from '@/components/form/input/Checkbox';
import Button from '@/components/ui/button/Button';
import { SaveIcon } from '@/icons';
import { useVendorDetailsFormModel } from './useVendorDetailsFormModel';

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

const VendorDetailsForm: React.FC<ComponentProps> = ({ vendor }) => {
  const { isLoading, saveVendorDetails } = useVendorDetailsFormModel(vendor.id);

  const form = useForm({
    defaultValues: {
      ...vendor,
    },
    onSubmit({ value }) {
      saveVendorDetails(value);
    },
  });

  return (
    <form
      className='flex flex-col gap-4'
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className='flex justify-between'>
        <div className='flex flex-row flex-wrap gap-4'>
          <DisplayItem heading='ID' value={vendor.id} />
          <DisplayItem heading='Pin Set?' value={vendor.pinSet ? 'Yes' : 'No'} />
          <DisplayItem heading='Verified?' value={vendor.verified ? 'Yes' : 'No'} />
        </div>

        <Button size='sm' type='submit' disabled={isLoading}>
          <SaveIcon />
        </Button>
      </div>

      <div className='flex flex-row flex-wrap gap-4'>
        <form.Field name='name' key='vendor-name'>
          {(field) => (
            <Input
              id='vendor-name'
              label='Name'
              placeholder='Name'
              required
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        <form.Field name='phoneNumber' key='vendor-phone-number'>
          {(field) => (
            <Input
              id='vendor-phone-number'
              label='Phone Number'
              type='tel'
              placeholder='Phone Number'
              required
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        <form.Field name='active' key='vendor-active'>
          {(field) => (
            <Checkbox id='vendor-active' label='Active?' checked={field.state.value} onChange={field.handleChange} />
          )}
        </form.Field>

        <form.Field name='dob' key='vendor-dob'>
          {(field) => (
            <Input
              id='vendor-dob'
              label='DOB'
              type='date'
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>
      </div>
    </form>
  );
};

export default VendorDetailsForm;
