import { useApiTransition } from '@/hooks/useApiTransition';
import { AddCatalogFormModel } from '@/models/catalog/CatalogModel';
import { CatalogService } from '@/services/CatalogService';
import { useState } from 'react';
import { AlertType } from './useCatalogDetailsViewModel';

export const useCatalogDetailsUpdateModel = (mode: 'create' | 'update') => {
  const service = new CatalogService();

  const [uploadErrorMessage, setUploadErrorMessage] = useState('');
  const [isImageUploading, setImageUploading] = useState(false);
  const [isSavingData, setSavingData] = useState(false);
  const [alert, setAlert] = useState<AlertType>({
    open: false,
    variant: 'info',
    title: '',
    message: '',
  });
  const [isDataSaved, setDataSaved] = useState(false);

  const {
    data: uniqueProducts,
    isLoading: uniqueProductsLoading,
    errorMessage: uniqueProductsErrorMessage,
  } = useApiTransition(async () => {
    if (mode === 'update') return [];

    const data = await service.getAllUniqueProducts();

    return data || [];
  });

  const resetAlert = () => {
    setAlert({
      open: false,
      variant: 'info',
      title: '',
      message: '',
    });
  };

  const uploadImage = async (file: File) => {
    try {
      setImageUploading(true);
      setUploadErrorMessage('');

      const data = await service.uploadImage(file);

      setImageUploading(false);

      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setUploadErrorMessage(err.message);
      }

      setUploadErrorMessage('Something went wrong with Catalog Image Upload');

      setImageUploading(false);
    }
  };

  const createCatalogItem = async (data: AddCatalogFormModel) => {
    resetAlert();
    setSavingData(true);

    try {
      const requestBody = { ...data, categories: data['categoryNames'] };
      await service.addCatalogItem(requestBody);

      setDataSaved(true);
    } catch (err: unknown) {
      let message = 'something went wrong';
      if (err instanceof Error) message = err.message;

      setAlert({
        message,
        open: true,
        title: 'Error Creating Catalog Item',
        variant: 'error',
      });
    } finally {
      setSavingData(false);
    }
  };

  return {
    uploadImage,
    isImageUploading,
    uploadErrorMessage,
    uniqueProducts,
    uniqueProductsLoading,
    uniqueProductsErrorMessage,
    createCatalogItem,
    isSavingData,
    alert,
    isDataSaved,
    setDataSaved,
  };
};
