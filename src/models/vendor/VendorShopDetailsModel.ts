import { AddressModel } from '../AddressModel';

export interface VendorShopDetailsModel {
  id: string;
  name: string;
  active: boolean;
  address: AddressModel;
  deliveryEnabled: boolean;
  deliveryAvailable: boolean;
  deliveryRules: {
    delivery_hours: {
      start: string;
      end: string;
    };
    min_amount: number;
  };
  workingHours: {
    start: string;
    end: string;
  }[];
}
