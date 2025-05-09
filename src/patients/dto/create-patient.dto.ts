import {
  IsString,
  IsEmail,
  IsDateString,
  IsIn,
  Length,
} from "class-validator";

export class CreatePatientDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  @Length(13)
  phone_number: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6)
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
