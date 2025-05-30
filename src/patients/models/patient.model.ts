import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty({ description: "Patient ID", example: 1 })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ description: "Patient First Name", example: "John" })
  @Column({
    type: DataType.STRING(50),
  })
  declare first_name: string;

  @ApiProperty({ description: "Patient Last Name", example: "Doe" })
  @Column({
    type: DataType.STRING(50),
  })
  declare last_name: string;

  @ApiProperty({ description: "Phone Number", example: "+998901234567" })
  @Column({
    type: DataType.STRING(50),
  })
  declare phone_number: string;

  @ApiProperty({
    description: "Email Address",
    example: "john.doe@example.com",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare email: string;

  @ApiProperty({ description: "Password", example: "password123" })
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @ApiProperty({ description: "Birth Date", example: "1990-01-01" })
  @Column({
    type: DataType.STRING(50),
  })
  declare birth_date: string;

  @ApiProperty({ description: "Passport Number", example: "A12345678" })
  @Column({
    type: DataType.STRING(50),
  })
  declare passport_number: string;

  @ApiProperty({ description: "Address", example: "123 Main St" })
  @Column({
    type: DataType.STRING(50),
  })
  declare address: string;

  @ApiProperty({
    description: "Hashed Refresh Token",
    example: null,
    nullable: true,
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare hashed_refresh_token: string | null;

  @ApiProperty({ description: "Is Patient Verified", example: false })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_verified: boolean;

  @ApiProperty({ description: "Is Patient Active", example: true })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @ApiProperty({
    description: "Activation Link",
    example: "https://example.com/activate?token=12345",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare activation_link: string;

  // ______________________ relations _____________________

  @ApiProperty({ type: () => Appointment, isArray: true })
  @HasMany(() => Appointment)
  appointments: Appointment[];

  @ApiProperty({ type: () => Payment, isArray: true })
  @HasMany(() => Payment)
  payments: Payment[];

  @ApiProperty({ type: () => RoomAssignment, isArray: true })
  @HasMany(() => RoomAssignment)
  roomAssignments: RoomAssignment[];
}
