import CatalogList from '@/components/catalogs/catalogs-list';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Catalog | List',
  description: 'Catalog List',
};

const CatalogListPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle='Catalog List' />
      <div>
        <CatalogList />
      </div>
    </div>
  );
};

export default CatalogListPage;
