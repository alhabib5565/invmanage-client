import { TBaseUnits } from "../base-unit/baseUnits.type";

export type TUnit = {
  _id: string;
  name: string;
  slug: string;
  baseUnit: TBaseUnits;
  conversionRatio: number;
  operator: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};
