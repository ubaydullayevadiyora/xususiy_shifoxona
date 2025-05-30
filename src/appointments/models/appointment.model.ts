import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { AppointmentStatus } from "../../app.constants";
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { Diagnosis } from "../../diagnoses/models/diagnosis.model";
import { LabTest } from "../../lab-tests/models/lab-test.model";
import { Payment } from "../../payments/models/payment.model";

interface IAppointmentsCreationAttr {
  payment_id: number;
  doctorId: number;
  patientId: number;
  description: string;
  start_date: Date;
  end_date: Date;
  status: AppointmentStatus;
  created_by: number;
}

@Table({ tableName: "appointments" })
export class Appointment extends Model<Appointment, IAppointmentsCreationAttr> {
  @ApiProperty({ description: "Appointment ID", example: 1 })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ description: "Doctor ID", example: 1 })
  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
  })
  declare doctorId: number;

  @ApiProperty({ description: "Payment ID", example: 1 })
  @ForeignKey(() => Payment)
  @Column({ type: DataType.INTEGER })
  payment_id: number;

  @ApiProperty({ description: "Patient ID", example: 1 })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
  })
  declare patientId: number;

  @ApiProperty({
    description: "Appointment description",
    example: "Routine checkup",
  })
  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @ApiProperty({
    description: "Start date and time of appointment",
    example: "2025-05-09T10:00:00.000Z",
  })
  @Column({
    type: DataType.DATE,
  })
  declare start_date: Date;

  @ApiProperty({
    description: "End date and time of appointment",
    example: "2025-05-09T10:30:00.000Z",
  })
  @Column({
    type: DataType.DATE,
  })
  declare end_date: Date;

  @ApiProperty({
    description: "Appointment status",
    enum: AppointmentStatus,
    example: AppointmentStatus.PENDING,
  })
  @Column({
    type: DataType.ENUM(...Object.values(AppointmentStatus)),
    allowNull: false,
    defaultValue: AppointmentStatus.PENDING,
  })
  declare status: AppointmentStatus;

  @ApiProperty({
    description: "ID of the user who created the appointment",
    example: 1,
  })
  @Column({
    type: DataType.INTEGER,
  })
  declare created_by: number;

  // _______________ Relationships _________________

  @ApiProperty({ type: () => Patient })
  @BelongsTo(() => Patient)
  patient: Patient;

  @ApiProperty({ type: () => Doctor })
  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @ApiProperty({ type: () => Payment })
  @BelongsTo(() => Payment)
  payment: Payment;

  @ApiProperty({ type: () => LabTest })
  @HasOne(() => LabTest)
  labTest: LabTest;

  @ApiProperty({ type: () => Diagnosis })
  @HasOne(() => Diagnosis)
  diagnosis: Diagnosis;
}
