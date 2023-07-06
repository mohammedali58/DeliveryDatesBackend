import { ProductType } from "../enums/product-type.enum";
import { Product } from "../types/product.type";

export const products: Product[] = [
  {
    productId: "1",
    name: "IPhone 14 pro max",
    price: 1100,
    imgUrl:
      "https://m.media-amazon.com/images/I/71yzJoE7WlL.__AC_SX300_SY300_QL70_ML2_.jpg",
    deliveryDays: [1, 3, 5],
    productType: ProductType.NORMAL,
    daysInAdvance: 3,
  },
  {
    productId: "2",
    name: "LG UHD 4K",
    price: 450,
    imgUrl: "https://m.media-amazon.com/images/I/8156bwsDd+L._AC_SX569_.jpg",
    deliveryDays: [1, 2, 4, 5],
    productType: ProductType.EXTERNAL,
    daysInAdvance: 5,
  },
  {
    productId: "3",
    name: "Kenwood Kitchen Machine",
    price: 485,
    imgUrl:
      "https://m.media-amazon.com/images/I/71qUdKXe6qL.__AC_SY300_SX300_QL70_ML2_.jpg",
    deliveryDays: [1, 3, 5],
    productType: ProductType.NORMAL,
    daysInAdvance: 3,
  },
  {
    productId: "4",
    name: "Flower bouquet",
    price: 6,
    imgUrl:
      "https://m.media-amazon.com/images/I/61IXuCG2KbL.__AC_SY300_SX300_QL70_ML2_.jpg",
    deliveryDays: [1, 2, 3, 4, 5],
    productType: ProductType.TEMPORARY,
    daysInAdvance: 1,
  },
  {
    productId: "5",
    name: "Logitech Bluetooth Keyboard",
    price: 120,
    imgUrl: "https://m.media-amazon.com/images/I/61Vs0otp73L._AC_SX569_.jpg",
    deliveryDays: [1, 3, 5],
    productType: ProductType.NORMAL,
    daysInAdvance: 3,
  },
  {
    productId: "6",
    name: "Sony wireless headphones",
    price: 320,
    imgUrl: "https://m.media-amazon.com/images/I/8107kOhQuOL._AC_SX569_.jpg",
    deliveryDays: [1, 3, 5],
    productType: ProductType.NORMAL,
    daysInAdvance: 3,
  },
  {
    productId: "7",
    name: "Water Sport Mariner",
    price: 712,
    imgUrl: "https://m.media-amazon.com/images/I/51egms8F1zL._AC_SY450_.jpg",
    deliveryDays: [1, 2, 4, 5],
    productType: ProductType.EXTERNAL,
    daysInAdvance: 5,
  },
  {
    productId: "8",
    name: "Boxing Gloves",
    price: 85,
    imgUrl: "https://m.media-amazon.com/images/I/71uTDITFHhL._AC_SX569_.jpg",
    deliveryDays: [1, 2, 4, 5],
    productType: ProductType.EXTERNAL,
    daysInAdvance: 5,
  },
  {
    productId: "9",
    name: "Rubber Duck Toy",
    price: 12,
    imgUrl: "https://m.media-amazon.com/images/I/51zeMKpsMOL._AC_SX569_.jpg",
    deliveryDays: [1, 3, 5],
    productType: ProductType.NORMAL,
    daysInAdvance: 3,
  },
];
