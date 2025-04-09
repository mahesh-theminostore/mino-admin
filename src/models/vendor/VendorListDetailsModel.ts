import { ApiClient } from '@/api/ApiClient';

export interface VendorListDetailsModel {
  id: string;
  name: string;
  active: boolean;
  dob: string;
  phoneNumber: string;
  pinSet: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export class VendorService {
  apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  async getVendorsList() {
    try {
      const res = await this.apiClient.get('/admin/api/v1/vendors');

      return res;
    } catch (err) {
      throw err;
    }
  }
}
