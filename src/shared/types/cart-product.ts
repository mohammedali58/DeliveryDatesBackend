import { ProductType } from "../enums/product-type.enum";

export type CartProduct = {
  quantity: number;
  productId: string;
  name: string;
  price: number;
  imgUrl: string;
  orderDate: string;
  deliveryDays: Array<1 | 2 | 3 | 4 | 5>;
  productType: ProductType;
  daysInAdvance: number;
};
