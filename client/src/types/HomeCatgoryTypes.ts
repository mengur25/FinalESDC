import { Deal } from "./DealType";

export interface HomeData {
  id: number;
  grid: HomeCategory[];
  shopByCategories: HomeCategory[];
  electricCategories: HomeCategory[];
  deals: Deal[];
  dealCategories: HomeCategory[];
}

export interface HomeCategory {
  id?: number;
  categoryId: string;
  section?: string;
  name?: string;
  image: string;
  parentCategoryId?: string;
}


export interface MinimalCategoryUpdate {
    id: number;
}

export interface DealUpdateRequestBody extends Omit<Deal, 'category'> {
    category: MinimalCategoryUpdate; 
}
