import CatalogList from '@/components/catalogs/catalogs-list';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import Button from '@/components/ui/button/Button';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Catalog | List',
  description: 'Catalog List',
};

const CatalogListPage = () => {
  return (
    <div>
      <PageBreadcrumb pageTitle='Catalog List' />
      <div className='flex flex-col gap-4'>
        <div>
          <Button>
            <Link href='/catalogs/add'>Add New Catalog Item</Link>
          </Button>
        </div>

        <CatalogList />
      </div>
    </div>
  );
};

export default CatalogListPage;
