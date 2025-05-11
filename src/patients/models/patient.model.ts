import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Appointment } from "../../appointments/models/appointment.model";
import { Payment } from "../../payments/models/payment.model";
import { RoomAssignment } from "../../room-assignments/models/room-assignment.model";

interface IPatientCreationsAttr {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  birth_date: string;
  gender: string;
  passport_number: string;
  address: string;
  activation_link: string;
}
@Table({ tableName: "patients" })
export class Patient extends Model<Patient, IPatientCreationsAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare last_name: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare phone_number: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare birth_date: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare passport_number: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare address: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare hashed_refresh_token: string | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_verified: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @Column({ type: DataType.STRING, allowNull: false })
  declare activation_link: string;

  // ______________________ relations _____________________

  // @HasMany(() => Appointment)
  // appointments: Appointment[];

  // @HasMany(() => Payment)
  // payments: Payment[];

  // @HasMany(() => RoomAssignment)
  // roomAssignments: RoomAssignment[];
}
