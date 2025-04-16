export interface CatalogModel {
  id: string;
  name: string;
  skuId: string;
  pid: string;
  type: 'LOOSE' | 'PACKED';
  description: string;
  brand: string;
  price: number;
  fssaiLicense: string;
  nutritionInformation: string;
  active: boolean;
  availableQuantities: {
    id: number;
    size: number;
    unit: string;
  }[];
  healthBenefits: string[];
  default: boolean;
  searchKeywords: string[];
  categories: { id: string; label: string; name: string; path: string }[];
}

export interface CatalogFormModel extends CatalogModel {
  categoryNames: string[];
}

export interface CatalogUpdateModel extends Omit<CatalogModel, 'categories'> {
  categories: string[];
}
