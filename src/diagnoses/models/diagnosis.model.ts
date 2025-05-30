import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Appointment } from "../../appointments/models/appointment.model";
import { Prescription } from "../../prescriptions/models/prescription.model";
import { Patient } from "../../patients/models/patient.model";

interface IDiagnosesCreationAttr {
  appointment_id: number;
  patientId: number;
  diagnose: string;
}

@Table({ tableName: "diagnosis" })
export class Diagnosis extends Model<Diagnosis, IDiagnosesCreationAttr> {
  @ApiProperty({ description: "Diagnosis ID", example: 1 })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ description: "Appointment ID", example: 1 })
  @ForeignKey(() => Appointment)
  @Column({
    type: DataType.INTEGER,
  })
  declare appointment_id: number;

  @ApiProperty({ description: "Patient ID", example: 1 })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
  })
  declare patientId: number;

  @ApiProperty({
    description: "Diagnosis description",
    example: "High blood pressure",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare diagnose: string;

  // __________________________________________________________

  @ApiProperty({ type: () => Appointment })
  @BelongsTo(() => Appointment)
  appointment: Appointment;

  @ApiProperty({ type: () => Prescription, isArray: true })
  @HasMany(() => Prescription)
  prescriptions: Prescription[];
}
