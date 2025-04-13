import { ApiClient } from '@/api/ApiClient';
import { ShopCatalogModel } from '@/models/shop/ShopCatalogModel';
import { ShopCatalogItemUpdate, ShopModel, ShopViewModel } from '@/models/shop/ShopModel';

interface ShopDetailsResponse {
  shop: ShopModel;
  items: ShopCatalogModel[];
}

export class ShopService {
  apiClient: ApiClient;
  shopId: string;

  constructor(shopId: string) {
    this.apiClient = new ApiClient();
    this.shopId = shopId;
  }

  async getShopDetails(): Promise<ShopDetailsResponse> {
    try {
      const res = await this.apiClient.get(`/admin/api/v1/shops/${this.shopId}`);

      return res.data;
    } catch (err: unknown) {
      throw err;
    }
  }

  async updateShopDetails(data: ShopViewModel) {
    await this.apiClient.post(`/admin/api/v1/shops/${this.shopId}`, data);
  }

  async updateShopCatalogItem(reqBody: ShopCatalogItemUpdate) {
    try {
      await this.apiClient.post(`/admin/api/v1/shops/${this.shopId}/items`, reqBody);
    } catch (err: unknown) {
      throw err;
    }
  }
}
