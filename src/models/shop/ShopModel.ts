import { AddressModel } from '../AddressModel';

export interface ShopModel {
  id: string;
  name: string;
  active: boolean;
  workingHours: {
    start: string;
    end: string;
  }[];
  deliveryEnabled: boolean;
  deliveryAvailable: boolean;
  address: AddressModel;
  deliveryRules: {
    delivery_hours: {
      start: string;
      end: string;
    }[];
    min_amount: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ShopViewModel
  extends Omit<ShopModel, 'deliveryRules' | 'createdAt' | 'updatedAt' | 'deliveryEnabled' | 'deliveryAvailable'> {
  deliveryHours: { start: string; end: string }[];
  minDeliveryAmount: number;
  isDeliveryEnabled: boolean;
  isDeliveryAvailable: boolean;
}

export interface ShopCatalogItemUpdate {
  sku_id: string;
  variants: {
    itemId?: string | null;
    price: number | null;
    discount: number | null;
    quantity: number | null;
    unit: string | null;
  }[];
}
