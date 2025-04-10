export interface ShopModel {
  id: string;
  name: string;
  active: boolean;
  workingHours: object[];
  deliveryEnabled: boolean;
  deliveryAvailable: boolean;
  address: object;
  deliveryRules: object;
  createdAt: string;
  updatedAt: string;
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
