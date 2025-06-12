import AddCatalog from '@/components/catalogs/add-catalog';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Catalog | Details',
  description: 'Catalog Details View & Edit',
};

const AddCatalogPage = async () => {
  return (
    <div>
      <PageBreadcrumb pageTitle='Add Catalog' />

      <AddCatalog />
    </div>
  );
};

export default AddCatalogPage;
