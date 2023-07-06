import { Injectable } from "@nestjs/common";
import { response } from "src/shared/utils/response";
import { ProductsUtility } from "../utilities/utility.service";
import { products } from "src/shared/products/products";
import { CartProduct } from "src/shared/types/cart-product";
import { CartProductDto } from "../dtos/cart-product.dto";

@Injectable()
export class ProductsService {
  cartProducts: CartProduct[] = [];

  constructor(private readonly productsUtility: ProductsUtility) {}

  getAllProducts() {
    return response(
      true,
      ["all available products are fetched successfully"],
      products
    );
  }

  getCartProducts() {
    return response(
      true,
      ["cart products are fetched successfully"],
      this.cartProducts
    );
  }

  getDeliveryDates(postalCode: number, productsList: CartProduct[]) {
    let deliveryHash: { [date: string]: number } = {};
    const numOfProducts = productsList.length;

    //get the current date for adding the product to the cart.
    const now = new Date();

    //get the last day of the upcoming 14 days.
    const futureDate = this.productsUtility.getFutureDate(now);

    //estimate the total delivery dates for every product.
    productsLoop: for (let product of this.cartProducts) {
      const maxFutureDays = product.productType == "temporary" ? 7 : 14;

      const daysInAdvance = product.daysInAdvance;
      const orderDateDay = new Date(product.orderDate).getDate();

      //calculate the start date for delivery for this project.
      const deliveryStartDate = this.productsUtility.getDeliveryStartDate(
        now,
        orderDateDay,
        daysInAdvance
      );

      //check every day from start delivery date till the end of the upcoming 14 days.
      daysLoop: for (let i = 0; i < maxFutureDays; i++) {
        const checkDate = this.productsUtility.checkDate(
          now,
          deliveryStartDate,
          i
        );

        // break if the date exceeds the upcoming 14 days.
        if (checkDate > futureDate) {
          break daysLoop;
        }

        if (product.productType == "temporary" && checkDate.getUTCDay() == 6) {
          break daysLoop;
        }

        // continue if the date is a weekend.
        if (checkDate.getUTCDay() == 6 || checkDate.getUTCDay() == 0) {
          continue;
        }

        // if the date is not in the delivery dates then continue.
        if (!product.deliveryDays.includes(checkDate.getUTCDay() as any)) {
          console.log("day", checkDate.getDay());
          console.log("utc-day", checkDate.getUTCDay());
          console.log("delivery day include.");

          continue;
        }

        // add the date to the delivery hash if it does not exist.
        if (!deliveryHash[checkDate.toISOString()]) {
          deliveryHash[checkDate.toISOString()] = 0;
        }

        deliveryHash[checkDate.toISOString()] += 1;
      }
    }

    const sortedDeliveryDates = this.productsUtility.deliveryDates(
      postalCode,
      numOfProducts,
      deliveryHash
    );

    return response(
      true,
      ["sorted delivery dates fetched successfully"],
      sortedDeliveryDates
    );
  }

  addCartProduct(cartProductDto: CartProductDto) {
    //create a new date for the new cart item
    const orderDate = new Date().toISOString();

    //check if the product was added before to the cart
    const existingProductIndex = this.cartProducts.findIndex(
      (elem) => elem.productId == cartProductDto.productId
    );

    //if the product was not added then create new product in the cart
    if (existingProductIndex == -1) {
      const newProduct: CartProduct = {
        ...cartProductDto,
        orderDate,
        quantity: 1,
      };

      this.cartProducts.push(newProduct);
      return response(
        true,
        ["product is added successfully to the cart"],
        this.cartProducts
      );
    }

    //if the product is already exist then increase the quantity
    this.cartProducts[existingProductIndex].quantity += 1;
    return response(
      true,
      ["product quantity is modified successfully"],
      this.cartProducts
    );
  }

  deleteCardProduct(id: number) {
    const filteredArr = this.cartProducts.filter((elem) => {
      return +elem.productId !== +id;
    });
    this.cartProducts = filteredArr;
    return response(true, ["product removed successfully"], this.cartProducts);
  }
}
