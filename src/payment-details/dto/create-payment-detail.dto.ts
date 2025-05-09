import { IsString, IsNumber, IsDecimal, Length } from "class-validator";

export class CreatePaymentDetailDto {
  @IsNumber()
  payment_id: number;

  @IsNumber()
  service_price_id: number;

  @IsDecimal()
  price: string;

  @IsString()
  @Length(500) 
  description: string;
}
