import { AddressModel } from '@/models/AddressModel';
import { useForm } from '@tanstack/react-form';
import React from 'react';
import Input from '../../input/InputField';
import Button from '@/components/ui/button/Button';

interface ComponentProps {
  address: AddressModel;
  handleSubmit: (value: AddressModel) => void;
}

const AddressForm: React.FC<ComponentProps> = ({ address, handleSubmit }) => {
  const form = useForm({
    defaultValues: {
      ...address,
    } as AddressModel,
    onSubmit: ({ value }) => handleSubmit(value),
  });

  return (
    <div className='flex flex-col gap-8'>
      <label htmlFor='address-form'>Address</label>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          form.handleSubmit();
        }}
      >
        <form.Field name='addressLine1'>
          {(field) => (
            <Input
              key='address-line-1'
              id='address-line-1'
              name={field.name}
              value={field.state.value}
              label='Address Line 1'
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder='Address Line 1'
              required
            />
          )}
        </form.Field>

        <form.Field name='addressLine2'>
          {(field) => (
            <Input
              key='address-line-2'
              id='address-line-2'
              name={field.name}
              value={field.state.value}
              label='Address Line 2'
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder='Address Line 2'
              required
            />
          )}
        </form.Field>

        <form.Field name='locality'>
          {(field) => (
            <Input
              key='locality'
              id='locality'
              name={field.name}
              value={field.state.value}
              label='Locality'
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder='Locality'
              required
            />
          )}
        </form.Field>

        <form.Field name='city'>
          {(field) => (
            <Input
              key='city'
              id='city'
              name={field.name}
              value={field.state.value}
              label='City'
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder='City'
              required
            />
          )}
        </form.Field>

        <form.Field name='state'>
          {(field) => (
            <Input
              key='state'
              id='state'
              name={field.name}
              value={field.state.value}
              label='State'
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder='State'
              required
            />
          )}
        </form.Field>

        <form.Field name='pinCode'>
          {(field) => (
            <Input
              key='pin_code'
              id='pin_code'
              name={field.name}
              type='number'
              value={field.state.value}
              label='Pin Code'
              onChange={(e) => field.handleChange(parseInt(e.target.value))}
              onBlur={field.handleBlur}
              placeholder='Pin Code'
              required
            />
          )}
        </form.Field>

        <form.Field name='lat'>
          {(field) => (
            <Input
              key='lat'
              id='lat'
              name={field.name}
              type='number'
              value={field.state.value}
              label='Latitude'
              onChange={(e) => field.handleChange(parseInt(e.target.value))}
              onBlur={field.handleBlur}
              placeholder='Latitude'
              required
            />
          )}
        </form.Field>

        <form.Field name='lng'>
          {(field) => (
            <Input
              key='lng'
              id='lng'
              name={field.name}
              type='number'
              value={field.state.value}
              label='Longitude'
              onChange={(e) => field.handleChange(parseInt(e.target.value))}
              onBlur={field.handleBlur}
              placeholder='Longitude'
              required
            />
          )}
        </form.Field>

        <Button type='submit'>Save</Button>
      </form>
    </div>
  );
};

export default AddressForm;
