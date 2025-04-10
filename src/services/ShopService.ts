import { ApiClient } from '@/api/ApiClient';
import { ShopCatalogItemUpdate, ShopModel } from '@/models/shop/ShopModel';

export class ShopService {
  apiClient: ApiClient;
  shopId: string;

  constructor(shopId: string) {
    this.apiClient = new ApiClient();
    this.shopId = shopId;
  }

  async getShopDetails(): Promise<ShopModel> {
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
