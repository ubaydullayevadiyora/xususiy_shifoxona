import { ApiProperty } from "@nestjs/swagger";
import { AppointmentStatus } from "../../app.constants";
import {
  IsInt,
  IsString,
  IsDateString,
  IsEnum,
  Min,
  MaxLength,
} from "class-validator";

export class CreateAppointmentDto {
  @ApiProperty({ example: 1, description: "Xizmat narxi ID raqami" })
  paymentDetailsId: number;

  @ApiProperty({ example: 3, description: "Shifokor ID raqami" })

  doctorId: number;

  @ApiProperty({ example: 7, description: "Bemor ID raqami" })
  patientId: number;

  @ApiProperty({
    example: "Bemor analiz uchun keladi",
    description: "Uchrashuv tavsifi",
  })
  @IsString()
  @MaxLength(255)
  description: string;

  @ApiProperty({
    example: "2025-05-10T10:00:00Z",
    description: "Uchrashuv boshlanish sanasi",
  })
  @IsDateString()
  start_date: Date;

  @ApiProperty({
    example: "2025-05-10T10:30:00Z",
    description: "Uchrashuv tugash sanasi",
  })
  @IsDateString()
  end_date: Date;

  @ApiProperty({
    enum: AppointmentStatus,
    example: AppointmentStatus.PENDING,
    description: "Uchrashuv holati (PENDING, APPROVED, CANCELLED, etc.)",
  })
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @ApiProperty({
    example: 2,
    description: "Uchrashuvni yaratgan admin/xodim ID raqami",
  })
  @IsInt()
  @Min(1)
  created_by: number;
}
