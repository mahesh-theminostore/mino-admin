import { CatalogModel } from '@/models/catalog/CatalogModel';
import { ShopCatalogItemUpdate, ShopViewModel } from '@/models/shop/ShopModel';
import { ShopService } from '@/services/ShopService';
import { useEffect, useState } from 'react';

export const useShopDetailsViewModel = (shopId: string) => {
  const service = new ShopService(shopId);

  const [data, setData] = useState<{ shop: ShopViewModel; items: CatalogModel[] }>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [errorMessage, setErrorMessage] = useState('');

  async function updateShopCatalogItem(data: ShopCatalogItemUpdate) {
    await service.updateShopCatalogItem(data);
  }

  async function updateShopDetails(data: ShopViewModel) {
    await service.updateShopDetails(data);
  }

  async function fetchShopDetails() {
    try {
      const res = await service.getShopDetails();

      const { shop, items } = res;

      const shopViewData: ShopViewModel = {
        id: shop.id,
        name: shop.name,
        active: shop.active,
        address: shop.address,
        deliveryHours: shop.deliveryRules.delivery_hours || [],
        minDeliveryAmount: shop.deliveryRules.min_amount,
        workingHours: shop.workingHours || [],
        isDeliveryAvailable: shop.deliveryAvailable,
        isDeliveryEnabled: shop.deliveryEnabled,
      };

      setData({ shop: shopViewData, items });

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
    updateShopDetails,
    updateShopCatalogItem,
  };
};
