'use client';

import { AlertVariant } from '@/components/ui/alert/Alert';
import { useApiTransition } from '@/hooks/useApiTransition';
import { CatalogFormModel } from '@/models/catalog/CatalogModel';
import { CategoryModel } from '@/models/tags/CategoryModel';
import { CatalogService } from '@/services/CatalogService';
import { CategoryService } from '@/services/CategoryService';
import { useState } from 'react';

export type AlertType = {
  open: boolean;
  variant: AlertVariant;
  title: string;
  message: string;
};

export const useCatalogDetailsViewModel = (catalogId: string) => {
  const service = new CatalogService();

  const categoryService = new CategoryService();

  const [alert, setAlert] = useState<AlertType>({
    open: false,
    variant: 'info',
    title: '',
    message: '',
  });

  const resetAlert = () => {
    setAlert({
      open: false,
      variant: 'info',
      title: '',
      message: '',
    });
  };

  const {
    data: catalogData,
    isLoading: catalogLoading,
    error: catalogError,
  } = useApiTransition<CatalogFormModel>(async () => {
    const data = await service.getCatalogDetails(catalogId);

    const transformedData: CatalogFormModel = {
      ...data,
      searchKeywords: [],
      categoryNames: data.categories.map((e) => e.name),
      availableQuantities: data.availableQuantities.map((e, i) => ({ ...e, id: i })),
    };

    return transformedData;
  });

  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useApiTransition<CategoryModel[]>(() => {
    return categoryService.getCategoryList();
  });

  const saveCatalogFormData = async (data: CatalogFormModel) => {
    resetAlert();

    try {
      const requestBody = { ...data, categories: data['categoryNames'] };

      await service.saveCatalogDetails(catalogId, requestBody);

      setAlert({
        open: true,
        variant: 'success',
        title: 'Data saved successfully',
        message: '',
      });

      setTimeout(() => resetAlert(), 5000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAlert({
          open: true,
          variant: 'error',
          title: 'Error saving data',
          message: err.message,
        });

        setTimeout(() => resetAlert(), 5000);
      }
    }
  };

  return {
    catalogData,
    catalogLoading,
    catalogError,
    categoryData,
    categoryLoading,
    categoryError,
    saveCatalogFormData,
    alert,
  };
};
