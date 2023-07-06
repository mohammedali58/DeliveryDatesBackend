import { ProductType } from "../enums/product-type.enum";

export type Product = {
  productId: string;
  name: string;
  price: number;
  imgUrl: string;
  deliveryDays: Array<1 | 2 | 3 | 4 | 5>;
  productType: ProductType;
  daysInAdvance: number;
};
