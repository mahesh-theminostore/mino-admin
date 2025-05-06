import { CatalogService } from '@/services/CatalogService';
import { useState } from 'react';

export const useCatalogDetailsUpdateModel = () => {
  const service = new CatalogService();

  const [uploadErrorMessage, setUploadErrorMessage] = useState('');

  const uploadImage = async (file: File) => {
    try {
      setUploadErrorMessage('');

      const data = await service.uploadImage(file);

      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setUploadErrorMessage(err.message);
      }

      setUploadErrorMessage('Something went wrong with Catalog Image Upload');
    }
  };

  return {
    uploadImage,
    uploadErrorMessage,
  };
};
