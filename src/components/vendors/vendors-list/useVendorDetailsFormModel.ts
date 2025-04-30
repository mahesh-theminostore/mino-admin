import { useApiTransition } from '@/hooks/useApiTransition';
import { VendorUpdateModel } from '@/models/vendor/VendorUpdateModel';
import { VendorService } from '@/services/VendorService';

export const useVendorDetailsFormModel = (id: string) => {
  const service = new VendorService();

  const { apiFetch, error, isLoading } = useApiTransition();

  async function saveVendorDetails(data: VendorUpdateModel) {
    apiFetch(async () => {
      await service.updateVendor(id, data);
    });
  }

  return {
    saveVendorDetails,
    error,
    isLoading,
  };
};
