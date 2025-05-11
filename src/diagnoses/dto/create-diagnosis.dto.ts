import { IsInt, IsString, Length, IsNotEmpty } from "class-validator";

export class CreateDiagnosisDto {
  @IsInt()
  @IsNotEmpty()
  appointment_id: number;

  @IsInt()
  @IsNotEmpty()
  patientId: number;

  @IsString()
  @IsNotEmpty()
  diagnose: string;
}
