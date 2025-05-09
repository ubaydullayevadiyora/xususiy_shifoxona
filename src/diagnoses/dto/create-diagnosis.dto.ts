import { IsInt, IsString, Length, IsNotEmpty } from "class-validator";

export class CreateDiagnosisDto {
  @IsInt()
  @IsNotEmpty()
  appointment_id: number;

  @IsString()
  @IsNotEmpty()
  @Length(600)
  diagnose: string;
}
