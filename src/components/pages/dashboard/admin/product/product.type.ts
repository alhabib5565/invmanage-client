import { TBaseUnits } from "../base-unit/baseUnits.type";
import { TBrand } from "../brand/brand.type";
import { TCategory } from "../category/category.type";

export type TImage = {
  secure_url: string;
  public_id: string;
};

export type TStock = { warehouse: string; quantity: number };

export interface TProduct {
  _id: string;
  productName: string;
  slug: string;
  productID: string;
  code: string;
  stockAlert: number;
  stock: TStock[];
  brand: TBrand;
  category: TCategory;
  productTaxRate: number;
  discountAmount?: number;
  productUnit: TBaseUnits;
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
