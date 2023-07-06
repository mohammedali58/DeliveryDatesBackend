import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ProductsService } from "../services/products.service";
import { products } from "src/shared/products/products";
import { response } from "src/shared/utils/response";
import { CartProductDto } from "../dtos/cart-product.dto";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get("all")
  allProduct() {
    return this.productsService.getAllProducts();
  }

  @Get("cart")
  cartProducts() {
    return this.productsService.getCartProducts();
  }

  @Get("delivery/:postalCode")
  deliveryDays(@Param("postalCode") postalCode: number) {
    postalCode;
    return this.productsService.getDeliveryDates(
      postalCode,
      this.productsService.cartProducts
    );
  }

  @Post("cart")
  addCartProducts(@Body() cartProductDto: CartProductDto) {
    return this.productsService.addCartProduct(cartProductDto);
  }

  @Delete("cart/:id")
  deleteCartProduct(@Param("id") id: number) {
    return this.productsService.deleteCardProduct(id);
  }
}
