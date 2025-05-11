import { IsEmail, Length } from "class-validator";

export class SignInPatientDto {
  @IsEmail()
  readonly email: string;
  @Length(6)
  readonly password: string;
}
