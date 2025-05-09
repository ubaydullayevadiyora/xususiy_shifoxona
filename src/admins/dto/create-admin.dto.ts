import { IsEmail, IsString, Length } from "class-validator";

export class CreateAdminDto {
  @IsString()
  fullname: string;

  @IsString()
  @Length(13)
  phone_number: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6)
  password: string;
}
