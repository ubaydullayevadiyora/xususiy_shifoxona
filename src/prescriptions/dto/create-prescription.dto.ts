import { IsNumber } from "class-validator";

export class CreatePrescriptionDto {
  @IsNumber()
  diagnosisId: number;
  @IsNumber()
  appointmentId: number;
  medicines: string;
  dosage: string;
  instructions?: string;
}

