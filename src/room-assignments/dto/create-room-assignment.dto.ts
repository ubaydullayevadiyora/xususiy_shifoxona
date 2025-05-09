import { IsInt, IsDateString, IsOptional, IsNotEmpty } from "class-validator";

export class CreateRoomAssignmentDto {
  @IsInt()
  @IsNotEmpty()
  patient_id: number;

  @IsInt()
  @IsNotEmpty()
  doctor_id: number;

  @IsInt()
  @IsNotEmpty()
  staff_id: number;

  @IsInt()
  @IsNotEmpty()
  room_id: number;

  @IsDateString()
  @IsNotEmpty()
  assigned_at: Date;

  @IsDateString()
  @IsOptional()
  released_at?: Date | null;
}
