import React from 'react';
import Input from '../form/input/InputField';
import Button from '../ui/button/Button';

interface ComponentProps {
  handleSave: () => void;
  closeModal: () => void;
}

const UserInfoForm: React.FC<ComponentProps> = ({ handleSave, closeModal }) => {
  return (
    <div className='relative no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900'>
      <div className='px-2 pr-14'>
        <h4 className='mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90'>Edit Personal Information</h4>
        <p className='mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400'>
          Update your details to keep your profile up-to-date.
        </p>
      </div>
      <form className='flex flex-col'>
        <div className='custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3'>
          <div className='mt-7'>
            <h5 className='mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90'>Personal Information</h5>

            <div className='grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2'>
              <div className='col-span-2 lg:col-span-1'>
                <Input type='text' name='name' label='Name' value='Musharof' />
              </div>

              <div className='col-span-2 lg:col-span-1'>
                <Input type='email' name='email' label='Email Addresss' value='randomuser@pimjo.com' />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6 flex items-center gap-3 px-2 lg:justify-end'>
          <Button size='sm' variant='outline' onClick={closeModal}>
            Close
          </Button>
          <Button size='sm' onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserInfoForm;
