import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Diagnosis } from "../../diagnoses/models/diagnosis.model";
import { Appointment } from "../../appointments/models/appointment.model";

export interface PrescriptionCreationAttrs {
  diagnosisId: number;
  appointmentId: number;
  medicines: string;
  dosage: string;
  instructions?: string;
}

@Table({ tableName: "prescriptions" })
export class Prescription extends Model<
  Prescription,
  PrescriptionCreationAttrs
> {
  @ApiProperty({ description: "Prescription ID", example: 1 })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({
    description: "Diagnosis ID related to the prescription",
    example: 1,
  })
  @ForeignKey(() => Diagnosis)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare diagnosisId: number;

  @ApiProperty({
    description: "Appointment ID related to the prescription",
    example: 1,
  })
  @ForeignKey(() => Appointment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare appointmentId: number;

  @ApiProperty({
    description: "Medicines prescribed in the prescription",
    example: "Paracetamol",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare medicines: string;

  @ApiProperty({
    description: "Dosage of the prescribed medicines",
    example: "500mg",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare dosage: string;

  @ApiProperty({
    description: "Additional instructions for the prescription",
    example: "Take after meals",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare instructions: string;

  //__________________

  @ApiProperty({ type: () => Diagnosis })
  @BelongsTo(() => Diagnosis)
  diagnosis: Diagnosis;
}
