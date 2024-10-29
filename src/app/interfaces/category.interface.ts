export interface SubCategory {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  images: string[];
}

export interface Category {
  id?: string;
  name: string;
  subcategories?: SubCategory[];
  imageUrl?: string;
} 