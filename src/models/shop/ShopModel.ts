import { ApiClient } from '@/api/ApiClient';

export interface ShopModel {
  id: string;
  name: string;
  active: boolean;
  workingHours: object[];
  deliveryEnabled: boolean;
  deliveryAvailable: boolean;
  address: object;
  deliveryRules: object;
  createdAt: string;
  updatedAt: string;
}

export interface ShopCatalogItemUpdate {
  sku_id: string;
  variants: {
    itemId?: string | null;
    price: number;
    discount: number;
    quantity: number;
    unit: string;
  }[];
}

export class ShopService {
  apiClient: ApiClient;
  shopId: string;

  constructor(shopId: string) {
    this.apiClient = new ApiClient();
    this.shopId = shopId;
  }

  async getShopDetails() {
    try {
      const res = await this.apiClient.get(`/admin/api/v1/shops/${this.shopId}`);

      return res.data;
    } catch (err: unknown) {
      throw err;
    }
  }

  async updateShopCatalogItem(reqBody: ShopCatalogItemUpdate) {
    try {
      await this.apiClient.post(`/admin/api/v1/shops/${this.shopId}/items`, reqBody);
    } catch (err: unknown) {
      throw err;
    }
  }
}
