'use client';

import React from 'react';
import CatalogDetailsForm from '../catalog-details/CatalogDetailsForm';
import { useAddCatalogViewModel } from './useAddCatalogViewModel';
import { AddCatalogFormModel, CatalogFormModel } from '@/models/catalog/CatalogModel';

const AddCatalog = () => {
  const { initialData, categoryData, categoryLoading } = useAddCatalogViewModel();

  const saveFormData = (data: CatalogFormModel | AddCatalogFormModel) => {
    console.log(data);
  };

  if (categoryLoading) return <div>Loading...</div>;

  return (
    <CatalogDetailsForm
      mode='create'
      data={initialData}
      saveFormData={saveFormData}
      alert={{ message: '', open: false, title: '', variant: 'error' }}
      categories={categoryData!}
    />
  );
};

export default AddCatalog;
