import { TBrand } from "../brand/brand.type";
import { TCategory } from "../category/category.type";

export type TImage = {
  secure_url: string;
  public_id: string;
};

export interface TProduct {
  _id: string;
  productName: string;
  slug: string;
  productID: string;
  stockAlert: number;
  brand: TBrand;
  category: TCategory;
  tax: number;
  productUnit: string;
  purchaseUnit: string;
  saleUnit: string;
  productCost: number;
  productPrice: number;
  taxType: string;
  images: TImage[];
  is_active: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
}
