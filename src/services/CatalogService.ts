import { ApiClient } from '@/api/ApiClient';
import { CatalogModel, CatalogUpdateModel } from '@/models/catalog/CatalogModel';

export class CatalogService {
  apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  async getCatalogsList(): Promise<CatalogModel[]> {
    try {
      const res = await this.apiClient.get('/admin/catalog');

      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async getCatalogDetails(catalogId: string): Promise<CatalogModel> {
    try {
      const res = await this.apiClient.get(`/admin/catalog/${catalogId}`);

      return res.data;
    } catch (err) {
      throw err;
    }
  }

  async saveCatalogDetails(catalogId: string, data: CatalogUpdateModel) {
    try {
      await this.apiClient.post(`/admin/catalog/${catalogId}`, data, 'PUT');
    } catch (err) {
      throw err;
    }
  }
}
