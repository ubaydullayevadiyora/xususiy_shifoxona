import {
  IsString,
  IsEmail,
  Length,
  IsNotEmpty,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStaffDto {
  @ApiProperty({ description: "Xodimning ismi" })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ description: "Xodimning familiyasi" })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: "Xodimning telefon raqami",
    example: "+998901234567",
  })
  @IsString()
  @Length(13)
  phone_number: string;

  @ApiProperty({
    description: "Xodimning elektron pochta manzili",
    example: "staff@example.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Xodimning paroli" })
  @IsString()
  @Length(6)
  password: string;

  @ApiProperty({ description: "Xodimning staff nomi", example: "Admin" })
  @IsString()
  @IsNotEmpty()
  staff_name: string;
}
