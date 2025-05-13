import { CatalogService } from '@/services/CatalogService';
import { useState } from 'react';

export const useCatalogDetailsUpdateModel = () => {
  const service = new CatalogService();

  const [uploadErrorMessage, setUploadErrorMessage] = useState('');
  const [isImageUploading, setImageUploading] = useState(false);

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

  return {
    uploadImage,
    isImageUploading,
    uploadErrorMessage,
  };
};
