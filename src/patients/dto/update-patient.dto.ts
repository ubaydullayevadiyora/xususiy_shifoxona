import { PartialType } from "@nestjs/swagger";
import { CreatePatientDto } from "./create-patient.dto";

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  birth_date: string;
  gender: string;
  passport_number: string;
  address: string;
}
