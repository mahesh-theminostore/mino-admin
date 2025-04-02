export interface CatalogModel {
  pid: string;
  skuId: string;
  name: string;
  type: 'LOOSE' | 'PACKED';
  availableUnits: string[];
  quantity: {
    size: number;
    unit: string;
  };
  quantityLabel: string;
  variants: {
    itemId?: string | null;
    quantity: number;
    unit: string;
    price: number;
    sellingPrice: number;
    discount: number;
  }[];
}
