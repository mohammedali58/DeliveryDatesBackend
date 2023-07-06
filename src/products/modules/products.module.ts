import { Module } from "@nestjs/common";
import { ProductsController } from "../controllers/products.controller";
import { ProductsService } from "../services/products.service";
import { ProductsUtility } from "../utilities/utility.service";

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsUtility],
})
export class ProductsModule {}
