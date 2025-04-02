import React, { useState, useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { CatalogModel } from '@/models/catalog/CatalogModel';
import { ShopCatalogItemUpdate } from '@/models/shop/ShopModel';

interface ComponentProps {
  shopItems: CatalogModel[];
  onUpdateItem: (data: ShopCatalogItemUpdate) => Promise<void>;
}

interface VariantFormProps {
  variant: CatalogModel['variants'][0];
  onChange: (val: CatalogModel['variants'][0]) => void;
  availableUnits: string[];
}

const VariantForm: React.FC<VariantFormProps> = ({ variant, onChange, availableUnits }) => (
  <div className='flex gap-4'>
    <div>
      <label>Quantity:</label>
      <input
        type='number'
        value={variant.quantity ?? ''}
        onChange={(e) =>
          onChange({
            ...variant,
            quantity: e.target.value === '' ? null : Number(e.target.value),
          })
        }
      />
    </div>
    <div>
      <label>Unit:</label>
      <select value={variant.unit} onChange={(e) => onChange({ ...variant, unit: e.target.value })}>
        <option value=''>Select Unit</option>
        {availableUnits.map((unit, i) => (
          <option key={i} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label>Price:</label>
      <input
        type='number'
        value={variant.price ?? ''}
        onChange={(e) =>
          onChange({
            ...variant,
            price: e.target.value === '' ? null : Number(e.target.value),
          })
        }
      />
    </div>
    <div>
      <label>Discount (%):</label>
      <input
        type='number'
        value={variant.discount ?? ''}
        onChange={(e) =>
          onChange({
            ...variant,
            discount: e.target.value === '' ? null : Number(e.target.value),
          })
        }
      />
    </div>
    <div>
      <label>Selling Price:</label>
      <input type='number' readOnly value={variant.sellingPrice ?? ''} />
    </div>
  </div>
);

const ShopDetailsForm: React.FC<ComponentProps> = ({ shopItems, onUpdateItem }) => {
  const [items, setItems] = useState<CatalogModel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const form = useForm({
    defaultValues: {
      catalogItems: shopItems as CatalogModel[],
    },
  });

  // Initial sync of form state with React state
  useEffect(() => {
    const formItems = form.getFieldValue('catalogItems');
    setItems(formItems);
  }, []); // Empty dependency array for initial sync only

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    form.setFieldValue('catalogItems', updatedItems);
  };

  const updateItem = (index: number, field: keyof CatalogModel, value: CatalogModel[keyof CatalogModel]) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setItems(updatedItems);
    form.setFieldValue('catalogItems', updatedItems);
  };

  const updateVariant = (itemIndex: number, variantIndex: number, updatedVariant: CatalogModel['variants'][0]) => {
    const updatedItems = [...items];
    const item = updatedItems[itemIndex];

    if (!item.variants) {
      item.variants = [];
    }

    item.variants[variantIndex] = updatedVariant;
    setItems(updatedItems);
    form.setFieldValue('catalogItems', updatedItems);
  };

  const addVariant = (itemIndex: number) => {
    const updatedItems = [...items];
    const item = updatedItems[itemIndex];

    if (!item.variants) {
      item.variants = [];
    }

    item.variants.push({
      itemId: null,
      quantity: 0,
      unit: '',
      price: 0,
      sellingPrice: 0,
      discount: 0,
    });

    setItems(updatedItems);
    form.setFieldValue('catalogItems', updatedItems);
  };

  const removeVariant = (itemIndex: number, variantIndex: number) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].variants = updatedItems[itemIndex].variants.filter((_, i) => i !== variantIndex);
    setItems(updatedItems);
    form.setFieldValue('catalogItems', updatedItems);
  };

  const saveItem = async (index: number) => {
    const item = items[index];
    try {
      const updatePayload: ShopCatalogItemUpdate = {
        sku_id: item.skuId,
        variants: item.variants.map((variant) => ({
          itemId: variant.itemId,
          price: variant.price,
          discount: variant.discount,
          quantity: variant.quantity,
          unit: variant.unit,
        })),
      };

      await onUpdateItem(updatePayload);
      console.log('Item saved successfully:', item.skuId);
    } catch (error) {
      console.error('Failed to save item:', error);
    }
  };

  // Pagination logic
  const filteredItems = items.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(search) ||
      item.pid.toLowerCase().includes(search) ||
      item.skuId.toLowerCase().includes(search)
    );
  });

  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const paginatedItems = filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className='flex flex-col gap-2'>
      <h5>Shop Catalog</h5>

      {/* Search and page size controls */}
      <div className='mb-4 flex items-center gap-4'>
        <input
          type='text'
          placeholder='Search by name, PID, or SKU ID...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='flex-1 rounded-sm border p-2'
        />
        <div className='flex items-center gap-2'>
          <label>Items per page:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className='rounded-sm border p-2'
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        {paginatedItems.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3>Item {index + 1}</h3>
              <div className='flex gap-2'>
                <button
                  type='button'
                  className='rounded-sm border-2 border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white'
                  onClick={() => saveItem(index)}
                >
                  Save
                </button>
                <button
                  type='button'
                  className='rounded-sm border-2 border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white'
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </div>
            </div>

            <div>
              <label>PID:</label>
              <input
                type='text'
                readOnly
                value={item.pid}
                onChange={(e) => updateItem(index, 'pid', e.target.value as CatalogModel['pid'])}
              />
            </div>
            <div>
              <label>SKU ID:</label>
              <input
                type='text'
                readOnly
                value={item.skuId}
                onChange={(e) => updateItem(index, 'skuId', e.target.value as CatalogModel['skuId'])}
              />
            </div>
            <div>
              <label>Name:</label>
              <input
                type='text'
                value={item.name}
                readOnly
                className='bg-gray-100'
                onChange={(e) => updateItem(index, 'name', e.target.value as CatalogModel['name'])}
              />
            </div>
            <div>
              <label>Type:</label>
              <input type='text' readOnly value={item.type} className='bg-gray-100' />
            </div>
            <div>
              <label>Available Units:</label>
              <input type='text' readOnly className='bg-gray-100' value={item.availableUnits.join(', ')} />
            </div>
            {/* Only show quantity and quantity label for PACKED items */}
            {item.type === 'PACKED' && (
              <>
                <div>
                  <label>Quantity:</label>
                  <div className='flex gap-2'>
                    <input
                      type='number'
                      value={item.quantity?.size ?? ''}
                      onChange={(e) =>
                        updateItem(index, 'quantity', {
                          size: e.target.value === '' ? null : Number(e.target.value),
                          unit: item.quantity?.unit ?? item.availableUnits[0] ?? '',
                        } as CatalogModel['quantity'])
                      }
                    />
                    <select
                      value={item.quantity?.unit ?? ''}
                      onChange={(e) =>
                        updateItem(index, 'quantity', {
                          size: item.quantity?.size ?? 0,
                          unit: e.target.value,
                        } as CatalogModel['quantity'])
                      }
                    >
                      <option value=''>Select Unit</option>
                      {item.availableUnits.map((unit, i) => (
                        <option key={i} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label>Quantity Label:</label>
                  <input
                    type='text'
                    value={item.quantityLabel}
                    onChange={(e) =>
                      updateItem(index, 'quantityLabel', e.target.value as CatalogModel['quantityLabel'])
                    }
                  />
                </div>
              </>
            )}

            {item.type === 'LOOSE' ? (
              <div className='mt-4'>
                <div className='mb-2 flex items-center justify-between'>
                  <h4>Variants</h4>
                  <button type='button' onClick={() => addVariant(index)}>
                    Add Variant
                  </button>
                </div>
                {item.variants?.map((variant, variantIndex) => (
                  <div key={variantIndex} className='mb-4 rounded border p-2'>
                    <div className='mb-2 flex justify-between'>
                      <h5>Variant {variantIndex + 1}</h5>
                      <button type='button' onClick={() => removeVariant(index, variantIndex)}>
                        Remove
                      </button>
                    </div>
                    <VariantForm
                      variant={variant}
                      onChange={(updated) => updateVariant(index, variantIndex, updated)}
                      availableUnits={item.availableUnits}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className='mt-4'>
                <h4>Package Details</h4>
                <VariantForm
                  variant={
                    item.variants?.[0] || {
                      itemId: item.pid,
                      quantity: 0,
                      unit: '',
                      price: 0,
                      sellingPrice: 0,
                      discount: 0,
                    }
                  }
                  onChange={(updated) => updateVariant(index, 0, updated)}
                  availableUnits={item.availableUnits}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className='mt-4 flex items-center justify-between'>
        <div>
          Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredItems.length)} of{' '}
          {filteredItems.length} items
        </div>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className='rounded-sm border px-3 py-1 disabled:opacity-50'
          >
            First
          </button>
          <button
            type='button'
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className='rounded-sm border px-3 py-1 disabled:opacity-50'
          >
            Previous
          </button>
          <span className='px-3 py-1'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            type='button'
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className='rounded-sm border px-3 py-1 disabled:opacity-50'
          >
            Next
          </button>
          <button
            type='button'
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className='rounded-sm border px-3 py-1 disabled:opacity-50'
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailsForm;
