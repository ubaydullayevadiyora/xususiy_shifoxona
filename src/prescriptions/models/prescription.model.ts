import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
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
export class Prescription extends Model<Prescription, PrescriptionCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Diagnosis)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare diagnosisId: number;

  @ForeignKey(() => Appointment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare appointmentId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare medicines: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare dosage: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare instructions: string;

  //__________________

  // @BelongsTo(() => Diagnosis)
  // diagnosis: Diagnosis;
}
