'use client';

import React from 'react';
import { useCatalogDetailsViewModel } from './useCatalogDetailsViewModel';
import CatalogDetailsForm from './CatalogDetailsForm';
import { CatalogFormModel } from '@/models/catalog/CatalogModel';

interface ComponentProps {
  catalogId: string;
}

const CatalogDetails: React.FC<ComponentProps> = ({ catalogId }) => {
  const {
    catalogData,
    catalogLoading,
    catalogError,
    categoryData,
    categoryError,
    categoryLoading,
    alert,
    saveCatalogFormData,
  } = useCatalogDetailsViewModel(catalogId);

  const isLoading = categoryLoading || catalogLoading;

  const error = catalogError?.message || categoryError?.message;

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  const saveFormData = (data: CatalogFormModel) => {
    saveCatalogFormData(data);
  };

  return (
    <CatalogDetailsForm data={catalogData!} categories={categoryData!} saveFormData={saveFormData} alert={alert} />
  );
};

export default CatalogDetails;
