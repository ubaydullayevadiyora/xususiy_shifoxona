import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { AppointmentStatus } from "../../app.constants";
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { ServicePrice } from "../../service-price/models/service-price.model";
import { Diagnosis } from "../../diagnoses/models/diagnosis.model";
import { LabTest } from "../../lab-tests/models/lab-test.model";

interface IAppointmentsCreationAttr {
  service_price_id: number;
  doctor_id: number;
  patient_id: number;
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

  @ForeignKey(() => ServicePrice)
  @Column({
    type: DataType.INTEGER,
  })
  declare service_price_id: number;

  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
  })
  declare doctor_id: number;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
  })
  declare patient_id: number;

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

  @BelongsTo(() => ServicePrice)
  servicePrice: ServicePrice;

  @HasMany(() => Diagnosis)
  diagnoses: Diagnosis[];

  @HasMany(() => LabTest)
  labTests: LabTest[];
}
