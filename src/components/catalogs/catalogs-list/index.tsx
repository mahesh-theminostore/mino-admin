'use client';

import React from 'react';
import { useCatalogsListViewModel } from './useCatalogsListViewModel';
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { CatalogModel } from '@/models/catalog/CatalogModel';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Category {
  _id: string;
  name: string;
  path: string;
}

const CategoryChips: React.FC<CustomCellRendererProps> = ({ value }) => {
  const router = useRouter();
  const categories: Category[] = value || [];

  if (!categories.length) return <span className='text-gray-400'>No categories</span>;

  return (
    <div className='flex flex-wrap gap-2'>
      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => router.push(`/categories/${category._id}`)}
          className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 transition-colors hover:bg-blue-200'
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

const CatalogList = () => {
  const { data, isLoading } = useCatalogsListViewModel();

  // const [selectedItem, setSelectedItem] = useState<CatalogModel | null>(null);

  // const { isOpen, openModal, closeModal } = useModal();

  // function handleShowDetails(row: CatalogModel) {
  //   openModal();
  //   setSelectedItem(row);
  // }

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <AgGridReact<CatalogModel>
        rowData={data}
        columnDefs={[
          {
            field: 'id',
            width: 250,
            cellRenderer: (params: CustomCellRendererProps) => (
              <Link href={`/catalogs/${params.value}`}>{params.value}</Link>
            ),
          },
          {
            field: 'pid',
            width: 250,
          },
          {
            field: 'skuId',
            width: 250,
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
            field: 'default',
          },
          {
            field: 'categories',
            cellRenderer: CategoryChips,
            autoHeight: true,
            width: 300,
            sortable: false,
          },
          {
            field: 'type',
            filter: true,
            filterParams: {
              filterOptions: ['equals'],
            },
          },
          {
            field: 'brand',
          },
        ]}
        loading={isLoading}
        pagination
        paginationPageSize={20}
      />
    </div>
  );
};

export default CatalogList;
