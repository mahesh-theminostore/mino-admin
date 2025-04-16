import { useEffect, useState } from 'react';
import { CatalogModel } from '@/models/catalog/CatalogModel';
import { CatalogService } from '@/services/CatalogService';

export const useCatalogsListViewModel = () => {
  const service = new CatalogService();

  const [data, setData] = useState<CatalogModel[]>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [errorMessage, setErrorMessage] = useState('');

  async function fetchCatalogList() {
    try {
      const res = await service.getCatalogsList();

      setData(res);

      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
        setErrorMessage(err.message || 'Something went wrong');
      } else {
        setError(new Error('Something went wrong'));
        setErrorMessage('Something went wrong');
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCatalogList();
  }, []);

  return {
    data,
    isLoading,
    error,
    errorMessage,
  };
};
