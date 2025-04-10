'use client';

import React, { useState } from 'react';
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { VendorListModel } from '@/models/vendor/VendorListModel';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/ui/modal';
import VendorDetails from './vendor-details';
import { useVendorsListViewModel } from './useVendorsListViewModel';

export default function VendorsList() {
  const [selectedVendor, setSelectedVendor] = useState<VendorListModel | null>(null);

  const { data, isLoading } = useVendorsListViewModel();

  const { isOpen, openModal, closeModal } = useModal();

  function handleShowDetails(row: VendorListModel) {
    openModal();
    setSelectedVendor(row);
  }

  return (
    <>
      <div style={{ width: '100%', height: '500px' }}>
        <AgGridReact<VendorListModel>
          rowData={data}
          columnDefs={[
            {
              field: 'id',
              width: 250,
              cellRenderer: (params: CustomCellRendererProps) => (
                <button onClick={() => handleShowDetails(params.data)}>{params.value}</button>
              ),
            },
            {
              field: 'name',
              filter: true,
              filterParams: {
                filterOptions: ['contains'],
              },
            },
            {
              field: 'active',
            },
            {
              field: 'dob',
            },
            {
              field: 'phoneNumber',
              filter: true,
              filterParams: {
                filterOptions: ['equals'],
              },
            },
            {
              field: 'pinSet',
            },
            {
              field: 'verified',
            },
            {
              field: 'createdAt',
            },
            {
              field: 'updatedAt',
            },
          ]}
          loading={isLoading}
          pagination
          paginationPageSize={20}
        />
      </div>
      <Modal className='max-w-1/2' isOpen={isOpen} onClose={closeModal} showCloseButton>
        <VendorDetails vendor={selectedVendor!} />
      </Modal>
    </>
  );
}
