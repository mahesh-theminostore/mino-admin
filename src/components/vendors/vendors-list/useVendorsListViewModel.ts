import { useState, useEffect } from 'react';

import { VendorService } from '@/services/VendorService';
import { VendorListModel } from '@/models/vendor/VendorListModel';

export const useVendorsListViewModel = () => {
  const service = new VendorService();

  const [data, setData] = useState<VendorListModel[]>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [errorMessage, setErrorMessage] = useState('');

  async function fetchShopDetails() {
    try {
      const res = await service.getVendorsList();

      setData(res);

      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
        setErrorMessage(err?.message);
      } else {
        setError(new Error('Something went wrong'));
        setErrorMessage('Something went wrong');
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchShopDetails();
  }, []);

  return {
    data,
    isLoading,
    error,
    errorMessage,
  };
};
