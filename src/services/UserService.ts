import { ApiClient } from '@/api/ApiClient';

export class UserService {
  apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  async getUserProfile() {
    try {
      const res = await this.apiClient.get('/admin/me');

      return res.data;
    } catch (err) {
      throw err;
    }
  }
}
