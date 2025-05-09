import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Appointment } from "../../appointments/models/appointment.model";
import { Prescription } from "../../prescriptions/models/prescription.model";

interface IDiagnosesCreationAttr {
  appointment_id: number;
  diagnose: string;
}
@Table({ tableName: "diagnosis" })
export class Diagnosis extends Model<Diagnosis, IDiagnosesCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Appointment)
  @Column({
    type: DataType.INTEGER,
  })
  declare appointment_id: number;

  @Column({
    type: DataType.STRING(50),
  })
  declare diagnose: string;

  // ________________________ diagnosis ____________________________

  @BelongsTo(() => Appointment)
  appointment: Appointment;

  @HasMany(() => Prescription)
  prescriptions: Prescription[];
}
