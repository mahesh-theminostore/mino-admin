'use client';

import React from 'react';
import { useCatalogDetailsViewModel } from './useCatalogDetailsViewModel';
import CatalogDetailsForm from './CatalogDetailsForm';
import { AddCatalogFormModel, CatalogFormModel } from '@/models/catalog/CatalogModel';

interface ComponentProps {
  catalogId: string;
  mode: 'create' | 'update';
}

const CatalogDetails: React.FC<ComponentProps> = ({ catalogId, mode }) => {
  const {
    catalogData,
    catalogLoading,
    catalogError,
    categoryData,
    categoryError,
    categoryLoading,
    alert,
    saveCatalogFormData,
    savingData,
  } = useCatalogDetailsViewModel(catalogId);

  const isLoading = categoryLoading || catalogLoading;

  const error = catalogError?.message || categoryError?.message;

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  const saveFormData = (data: CatalogFormModel | AddCatalogFormModel) => {
    saveCatalogFormData(data as CatalogFormModel);
  };

  return (
    <CatalogDetailsForm
      mode={mode}
      data={catalogData!}
      categories={categoryData!}
      saveFormData={saveFormData}
      savingData={savingData}
      alert={alert}
    />
  );
};

export default CatalogDetails;
