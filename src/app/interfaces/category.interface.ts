export interface SubCategory {
  id: string;
  title: string;
  description?: string;
  images: string[];
}

export interface Category {
  id: string;
  title: string;
  imageUrl: string;
  subCategories: SubCategory[];
} 