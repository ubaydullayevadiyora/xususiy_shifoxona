import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsDate, IsEnum, IsNotEmpty } from "class-validator";
import { TestTypeEnum } from "../../app.constants";

export class CreateLabTestDto {
  @ApiProperty({ example: 1, description: "Xizmat narxi ID raqami" })
  @IsInt()
  @IsNotEmpty()
  service_price_id: number;

  @ApiProperty({ example: 123, description: "Uchrashuv ID raqami" })
  @IsInt()
  @IsNotEmpty()
  appointment_id: number;

  @ApiProperty({
    enum: TestTypeEnum,
    example: TestTypeEnum.BLOOD,
    description: "Test turi (masalan, BLOOD_TEST, URINE_TEST, etc.)",
  })
  @IsEnum(TestTypeEnum)
  @IsNotEmpty()
  test_type: TestTypeEnum;

  @ApiProperty({ example: "Test natijasi: normal", description: "Natija" })
  @IsString()
  @IsNotEmpty()
  result: string;

  @ApiProperty({
    example: "2025-05-15T10:00:00Z",
    description: "Natija chiqarilgan sana",
  })
  @IsDate()
  @IsNotEmpty()
  result_date: Date;
}
