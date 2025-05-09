import { IsDateString, IsEmail, IsIn, IsString, Length } from "class-validator";

export class SignUpPatientDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  @Length(9, 15)
  phone_number: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 32)
  password: string;

  @IsDateString()
  birth_date: string;

  @IsIn(["male", "female"])
  gender: string;

  @IsString()
  @Length(7, 9)
  passport_number: string;

  @IsString()
  address: string;
}
