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
import { AppointmentStatus } from "../../app.constants";
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { Diagnosis } from "../../diagnoses/models/diagnosis.model";
import { LabTest } from "../../lab-tests/models/lab-test.model";
import { Payment } from "../../payments/models/payment.model";
import { Room } from "../../rooms/models/room.model";

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
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
  })
  declare doctorId: number;

  @ForeignKey(() => Payment)
  @Column({ type: DataType.INTEGER })
  payment_id: number;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
  })
  declare patientId: number;

  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @Column({
    type: DataType.DATE,
  })
  declare start_date: Date;

  @Column({
    type: DataType.DATE,
  })
  declare end_date: Date;

  @Column({
    type: DataType.ENUM(...Object.values(AppointmentStatus)),
    allowNull: false,
    defaultValue: AppointmentStatus.PENDING,
  })
  declare status: AppointmentStatus;

  @Column({
    type: DataType.INTEGER,
  })
  declare created_by: number;

  // ___________________ appointment __________________

  @BelongsTo(() => Patient)
  patient: Patient;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @BelongsTo(() => Payment)
  payment: Payment;

  @HasOne(() => LabTest)
  labTest: LabTest;

  @HasOne(() => Diagnosis)
  diagnosis: Diagnosis;
}
