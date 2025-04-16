import CatalogDetails from '@/components/catalogs/catalog-details';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { Metadata } from 'next';
import React from 'react';

interface PageProps {
  params: Promise<{ catalogId: string }>;
}

export const metadata: Metadata = {
  title: 'Catalog | Details',
  description: 'Catalog Details View & Edit',
};

const CatalogDetailsPage: React.FC<PageProps> = async ({ params }) => {
  const { catalogId } = await params;

  return (
    <div>
      <PageBreadcrumb pageTitle={`Catalog Details: ${catalogId}`} />

      <CatalogDetails catalogId={catalogId} />
    </div>
  );
};

export default CatalogDetailsPage;
