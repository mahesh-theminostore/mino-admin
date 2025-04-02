export interface CatalogModel {
  pid: string;
  skuId: string;
  name: string;
  type: 'LOOSE' | 'PACKED';
  availableUnits: string[];
  quantity: {
    size: number | null;
    unit: string;
  } | null;
  quantityLabel: string;
  variants: {
    itemId?: string | null;
    quantity: number | null;
    unit: string;
    price: number | null;
    sellingPrice: number | null;
    discount: number | null;
  }[];
}
