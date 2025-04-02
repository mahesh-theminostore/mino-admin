import { ShopCatalogItemUpdate, ShopService } from '@/models/shop/ShopModel';
import { useEffect, useState } from 'react';

export const useShopDetailsViewModel = (shopId: string) => {
  const service = new ShopService(shopId);

  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [errorMessage, setErrorMessage] = useState('');

  async function updateShopCatalogItem(data: ShopCatalogItemUpdate) {
    await service.updateShopCatalogItem(data);
  }

  async function fetchShopDetails() {
    try {
      const res = await service.getShopDetails();

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
  }, [shopId]);

  return {
    data,
    isLoading,
    error,
    errorMessage,
    updateShopCatalogItem,
  };
};
