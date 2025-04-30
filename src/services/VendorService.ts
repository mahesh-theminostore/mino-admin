import { ApiClient } from '@/api/ApiClient';
import { VendorListModel } from '@/models/vendor/VendorListModel';
import { VendorUpdateModel } from '@/models/vendor/VendorUpdateModel';

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

  async updateVendor(id: string, data: VendorUpdateModel) {
    try {
      await this.apiClient.post(`/admin/api/v1/vendors/${id}`, data);
    } catch (err) {
      throw err;
    }
  }
}
