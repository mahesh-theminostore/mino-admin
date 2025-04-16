import { ApiClient, ParamsType } from '@/api/ApiClient';
import { CategoryModel } from '@/models/tags/CategoryModel';

export class CategoryService {
  apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  async getCategoryList(name?: string): Promise<CategoryModel[]> {
    try {
      const params: ParamsType = {};

      if (name) {
        params['name'] = name;
      }

      const res = await this.apiClient.get('/admin/categories', params);

      return res.data;
    } catch (err) {
      throw err;
    }
  }
}
