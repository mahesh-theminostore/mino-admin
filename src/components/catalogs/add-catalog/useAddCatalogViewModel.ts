import { useApiTransition } from '@/hooks/useApiTransition';
import { CatalogFormModel } from '@/models/catalog/CatalogModel';
import { CategoryModel } from '@/models/tags/CategoryModel';
import { CategoryService } from '@/services/CategoryService';

export const useAddCatalogViewModel = () => {
  const categoryService = new CategoryService();

  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useApiTransition<CategoryModel[]>(() => {
    return categoryService.getCategoryList();
  });

  const initialData: CatalogFormModel = {
    id: '',
    skuId: '',
    pid: '',
    name: '',
    type: 'PACKED',
    description: '',
    brand: '',
    price: null,
    fssaiLicense: '',
    nutritionInformation: '',
    active: true,
    availableQuantities: [],
    healthBenefits: [],
    default: false,
    searchKeywords: [],
    categories: [],
    imageUrl: '',
    categoryNames: [],
  };

  return {
    initialData,
    categoryData,
    categoryLoading,
    categoryError,
  };
};
