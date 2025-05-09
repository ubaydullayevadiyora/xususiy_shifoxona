import {
  IsString,
  IsEnum,
  IsBoolean,
  IsNumberString,
  Length,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { ServiceTypeEnum } from "../../app.constants";

export class CreateServicePriceDto {
  @ApiProperty({ enum: ServiceTypeEnum, description: "Xizmat turi" })
  @IsEnum(ServiceTypeEnum)
  service_type: ServiceTypeEnum;

  @ApiProperty({ example: "General Checkup", description: "Xizmat nomi" })
  @IsString()
  @Length(3, 255)
  service_name: string;

  @ApiProperty({ example: "100", description: "Xizmat narxi" })
  @IsNumberString()
  price: string;

  @ApiProperty({
    example: "Yuqori sifatdagi tibbiy tekshiruvlar",
    description: "Xizmat tavsifi",
  })
  @IsString()
  @Length(10, 500)
  description: string;

  @ApiProperty({ example: true, description: "Xizmat faolligi" })
  @IsBoolean()
  is_active: boolean;
}
