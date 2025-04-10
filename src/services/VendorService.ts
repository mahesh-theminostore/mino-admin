import { ApiClient } from '@/api/ApiClient';
import { VendorListModel } from '@/models/vendor/VendorListModel';

export class VendorService {
  apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  async getVendorsList(): Promise<VendorListModel[]> {
    try {
      const res = await this.apiClient.get('/admin/api/v1/vendors');

      return res.data;
    } catch (err) {
      throw err;
    }
  }
}
