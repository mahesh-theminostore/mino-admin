'use client';

import React from 'react';
import Checkbox from '@/components/form/input/Checkbox';
import Input from '@/components/form/input/InputField';
import MultiSelect from '@/components/form/MultiSelect';
import Select from '@/components/form/Select';
import Button from '@/components/ui/button/Button';
import { PlusIcon, TrashBinIcon } from '@/icons';
import { CatalogFormModel, CatalogModel } from '@/models/catalog/CatalogModel';
import { CategoryModel } from '@/models/tags/CategoryModel';
import { useForm } from '@tanstack/react-form';
import { AlertType } from './useCatalogDetailsViewModel';
import Alert from '@/components/ui/alert/Alert';
import ImageUpload from '@/components/common/ImageUpload';
import { useCatalogDetailsUpdateModel } from './useCatalogDetailsUpdateModel';

interface ComponentProps {
  data: CatalogFormModel;
  categories: CategoryModel[];
  alert: AlertType;
  saveFormData: (data: CatalogFormModel) => void;
}

interface DisplayItemProps {
  heading: string;
  value: string | number | null;
}

const DisplayItem: React.FC<DisplayItemProps> = ({ heading, value }) => {
  return (
    <div className='flex flex-col gap-1'>
      <div className='text-sm text-gray-500 decoration-solid'>{heading}</div>
      <div className='text-sm'>{value}</div>
    </div>
  );
};

const CatalogDetailsForm: React.FC<ComponentProps> = ({ data, categories, alert, saveFormData }) => {
  const form = useForm({
    defaultValues: { ...data } as CatalogFormModel,
    onSubmit: ({ value }) => saveFormData(value),
  });

  const { uploadImage, uploadErrorMessage } = useCatalogDetailsUpdateModel();

  // const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-row gap-16'>
        <DisplayItem heading='ID' value={data.id} />
        <DisplayItem heading='SKU ID' value={data.skuId} />
        <DisplayItem heading='PID' value={data.pid} />
      </div>

      {uploadErrorMessage && <Alert title='Error' message={uploadErrorMessage} variant='error' />}

      <form
        name='catalog-details-form'
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className='flex flex-col gap-8'>
          <div className='flex justify-between gap-16'>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-row gap-16'>
                <form.Field name='name' key='catalog-item-name'>
                  {(field) => (
                    <Input
                      id='catalog-item-name'
                      label='Name'
                      placeholder='Name'
                      required
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </form.Field>

                <form.Field name='price' key='catalog-item-price'>
                  {(field) => (
                    <Input
                      id='catalog-item-price'
                      label='Price'
                      placeholder='Price'
                      type='number'
                      required
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(parseInt(e.target.value))}
                    />
                  )}
                </form.Field>

                <form.Field name='active' key='catalog-item-active'>
                  {(field) => (
                    <Checkbox
                      id='catalog-item-active'
                      label='Active?'
                      checked={field.state.value}
                      onChange={(checked) => field.setValue(checked)}
                    />
                  )}
                </form.Field>

                <form.Field name='default' key='catalog-item-default'>
                  {(field) => (
                    <Checkbox
                      id='catalog-item-default'
                      label='Default?'
                      checked={field.state.value}
                      onChange={(checked) => field.setValue(checked)}
                    />
                  )}
                </form.Field>
              </div>

              <div className='flex flex-row gap-16'>
                <form.Field name='type' key='catalog-item-type'>
                  {(field) => (
                    <Select
                      label='Item Type'
                      name={field.name}
                      placeholder='Item Type'
                      value={field.state.value}
                      onChange={(value) => field.handleChange(value as CatalogModel['type'])}
                      options={[
                        { value: 'LOOSE', label: 'Loose' },
                        { value: 'PACKED', label: 'Packed' },
                      ]}
                      className='min-w-[120px]'
                    />
                  )}
                </form.Field>

                <form.Field name='brand' key='catalog-item-brand'>
                  {(field) => (
                    <Input
                      id='catalog-item-brand'
                      label='Brand'
                      placeholder='Brand'
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  )}
                </form.Field>

                <form.Field name='categories' key={'catalog-item-categories'}>
                  {() => (
                    <MultiSelect
                      label='Categories'
                      defaultSelected={form.getFieldValue('categoryNames')}
                      options={categories.map((c) => ({
                        value: c.name,
                        text: c.label,
                        selected: form.getFieldValue('categoryNames').includes(c.name),
                      }))}
                      onChange={(selected) => {
                        form.setFieldValue('categoryNames', selected);
                      }}
                    />
                  )}
                </form.Field>
              </div>
            </div>

            <div>
              <form.Field name='imageUrl' key='catalog-item-imageUrl'>
                {(field) => {
                  return (
                    <ImageUpload
                      url={field.state.value}
                      width='200'
                      height='200'
                      handleFileChange={async (file) => {
                        const asset = await uploadImage(file);

                        if (asset?.url) field.setValue(asset.url);
                      }}
                    />
                  );
                }}
              </form.Field>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <label className='text-sm font-medium'>Available Quantities</label>
            <form.Field name='availableQuantities' key='catalog-item-availableQuantities'>
              {(field) => {
                return field.state.value.map((entry, index) => (
                  <div className='flex flex-row gap-4' key={`item-available-quantity-${entry.id}`}>
                    <form.Field name={`availableQuantities[${index}].size`}>
                      {(subField) => (
                        <Input
                          placeholder='Size'
                          name={subField.name}
                          type='number'
                          value={subField.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => subField.setValue(parseInt(e.target.value))}
                        />
                      )}
                    </form.Field>

                    <form.Field name={`availableQuantities[${index}].unit`}>
                      {(subField) => (
                        <Input
                          placeholder='Unit'
                          name={subField.name}
                          value={subField.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => subField.setValue(e.target.value)}
                        />
                      )}
                    </form.Field>

                    <Button className='button-red outlined' onClick={() => field.removeValue(index)}>
                      <TrashBinIcon />
                    </Button>
                  </div>
                ));
              }}
            </form.Field>

            <div>
              <Button
                onClick={() =>
                  form.pushFieldValue('availableQuantities', {
                    id: form.getFieldValue('availableQuantities').length + 1,
                    size: 0,
                    unit: '',
                  })
                }
              >
                <PlusIcon />
              </Button>
            </div>
          </div>

          {/* Commenting this part until the backend is fixed */}
          {/* <div className='flex flex-col gap-4'>
            <label className='text-sm font-medium'>Search Keywords</label>
            <form.Field name='searchKeywords' key='catalog-item-search-keywords'>
              {(field) => {
                console.log(field.state.value);
                return (
                  <>
                    <div className='flex flex-wrap gap-4'>
                      {field.state.value?.map((keyword, index) => (
                        <div
                          key={`search-keyword-${keyword}-${index}}`}
                          className='flex items-center gap-1 rounded-xl border-2 border-blue-700 p-0.5'
                        >
                          <div>{keyword}</div>

                          <div className='cursor-pointer'>
                            <CloseLineIcon onClick={() => field.removeValue(index)} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Input
                      id='catalog-item-search-keyword-input'
                      placeholder='Add new keyword'
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value) {
                          field.pushValue(e.currentTarget.value);
                          setSearchKeyword('');
                        }
                      }}
                    />
                  </>
                );
              }}
            </form.Field>
          </div> */}

          <form.Field name='description' key='catalog-item-description'>
            {(field) => (
              <Input
                id='catalog-item-description'
                label='Description'
                placeholder='Description'
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>

          <form.Field name='nutritionInformation' key='catalog-item-nutrition-information'>
            {(field) => (
              <Input
                id='catalog-item-nutrition-information'
                label='Nutrition Information'
                placeholder='Nutrition'
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          </form.Field>

          <div className='flex gap-32'>
            <div>
              <Button type='submit'>Save Changes</Button>
            </div>

            {alert.open && <Alert variant={alert.variant} title={alert.title} message={alert.message} />}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CatalogDetailsForm;
