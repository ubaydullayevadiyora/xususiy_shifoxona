import { IsString, IsInt, IsNotEmpty } from "class-validator";

export class CreatePrescriptionDto {
  @IsInt()
  @IsNotEmpty()
  diagnosis_id: number;

  @IsString()
  @IsNotEmpty()
  medicines: string;

  @IsString()
  @IsNotEmpty()
  dosage: string;

  @IsString()
  @IsNotEmpty()
  instructions: string;
}
