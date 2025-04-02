'use client';

import React, { useState } from 'react';
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { useGet } from '@/hooks/useGet';
import { VendorListDetailsModel } from '@/models/vendor/VendorListDetailsModel';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/ui/modal';
import VendorDetails from './vendor-details';

export default function VendorsList() {
  const [selectedVendor, setSelectedVendor] = useState<VendorListDetailsModel | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading, isFetching } = useGet<any[]>('/admin/api/v1/vendors');

  const { isOpen, openModal, closeModal } = useModal();

  function handleShowDetails(row: VendorListDetailsModel) {
    openModal();
    setSelectedVendor(row);
  }

  const columns = [
    {
      field: 'id',
      width: 250,
      cellRenderer: (params: CustomCellRendererProps) => (
        <button onClick={() => handleShowDetails(params.data)}>{params.value}</button>
      ),
    },
    {
      field: 'name',
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
  ];

  return (
    <>
      <div style={{ width: '100%', height: '500px' }}>
        <AgGridReact
          rowData={data}
          columnDefs={columns}
          loading={isLoading || isFetching}
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
