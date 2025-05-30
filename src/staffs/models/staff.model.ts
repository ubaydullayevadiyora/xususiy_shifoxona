import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { StaffNameEnum } from "../../app.constants";
import { Doctor } from "../../doctors/models/doctor.model";
import { RoomAssignment } from "../../room-assignments/models/room-assignment.model";
import { ApiProperty } from "@nestjs/swagger";

interface IStaffCreationAttr {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  staff_name: string;
}

@Table({ tableName: "staffs" })
export class Staff extends Model<Staff, IStaffCreationAttr> {
  @ApiProperty({ description: "Staff ID", example: 1 })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ description: "Staff first name", example: "John" })
  @Column({
    type: DataType.STRING(50),
  })
  declare first_name: string;

  @ApiProperty({ description: "Staff last name", example: "Doe" })
  @Column({
    type: DataType.STRING(50),
  })
  declare last_name: string;

  @ApiProperty({ description: "Staff phone number", example: "+1234567890" })
  @Column({
    type: DataType.STRING(50),
  })
  declare phone_number: string;

  @ApiProperty({
    description: "Staff email address",
    example: "john.doe@example.com",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare email: string;

  @ApiProperty({ description: "Staff password", example: "password123" })
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @ApiProperty({ description: "Staff role or title", enum: StaffNameEnum })
  @Column({
    type: DataType.ENUM(...Object.values(StaffNameEnum)),
    allowNull: false,
  })
  declare staff_name: StaffNameEnum;

  @ApiProperty({
    description: "Hashed refresh token",
    example: "hashed_refresh_token",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare hashed_refresh_token: string | null;

  @ApiProperty({
    description: "Indicates if the staff is active",
    example: true,
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @ApiProperty({ type: () => Doctor, isArray: true })
  @HasMany(() => Doctor)
  doctor: Doctor[];

  @ApiProperty({ type: () => RoomAssignment, isArray: true })
  @HasMany(() => RoomAssignment)
  roomAssignment: RoomAssignment[];
}
