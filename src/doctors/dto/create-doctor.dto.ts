import {
  IsInt,
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
} from "class-validator";

export class CreateDoctorDto {
  @IsInt()
  @IsNotEmpty()
  staff_id: number;

  @IsInt()
  @IsNotEmpty()
  room_id: number;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  password: string;

  @IsNotEmpty()
  @Length(12)
  phone_number: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  specialty: string;
}
