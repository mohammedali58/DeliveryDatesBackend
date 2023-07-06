import {
  IsAlpha,
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
} from "class-validator";
import { ProductType } from "src/shared/enums/product-type.enum";

export class CartProductDto {
  @IsString()
  productId: string;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  imgUrl: string;

  @IsArray()
  deliveryDays: Array<1 | 2 | 3 | 4 | 5>;

  @IsEnum(ProductType)
  productType: ProductType;

  @IsNumber()
  daysInAdvance: number;
}
