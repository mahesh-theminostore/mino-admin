import { Modal } from '@/components/ui/modal';
import { PencilIcon } from '@/icons';
import { AddressModel } from '@/models/AddressModel';
import { formatAddress } from '@/utils/formatters';
import React, { useState } from 'react';
import AddressForm from './AddressForm';

interface ComponentProps {
  label: string;
  address: AddressModel;
  onChange: (value: AddressModel) => void;
}

const Address: React.FC<ComponentProps> = ({ label, address, onChange }) => {
  const [editModal, setEditModal] = useState(false);

  function openEditModal() {
    setEditModal(true);
  }

  function closeEditModal() {
    setEditModal(false);
  }

  function handleAddressSubmit(val: AddressModel) {
    onChange(val);
    closeEditModal();
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row gap-2'>
        <label className='text-sm font-medium'>{label}</label>

        <PencilIcon onClick={openEditModal} />
      </div>

      <div>{formatAddress(address)}</div>

      <Modal isOpen={editModal} onClose={closeEditModal} key='address-edit-modal' className='max-w-1/2 p-4'>
        <AddressForm address={address} handleSubmit={handleAddressSubmit} />
      </Modal>
    </div>
  );
};

export default Address;
