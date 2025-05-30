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
import { Staff } from "../../staffs/models/staff.model";
import { Room } from "../../rooms/models/room.model";
import { Appointment } from "../../appointments/models/appointment.model";
import { RoomAssignment } from "../../room-assignments/models/room-assignment.model";

interface IDoctorCreationAttr {
  staff_id: number;
  room_id: number;
  first_name: string;
  last_name: string;
  password: string;
  phone_number: string;
  email: string;
  specialty: string;
}

@Table({ tableName: "doctors" })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {
  @ApiProperty({ description: "Doctor ID", example: 1 })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ description: "Staff ID", example: 1 })
  @ForeignKey(() => Staff)
  @Column({
    type: DataType.INTEGER,
  })
  declare staff_id: number;

  @ApiProperty({ description: "Room ID", example: 1 })
  @ForeignKey(() => Room)
  @Column({
    type: DataType.INTEGER,
  })
  declare room_id: number;

  @ApiProperty({ description: "Doctor First Name", example: "John" })
  @Column({
    type: DataType.STRING,
  })
  declare first_name: string;

  @ApiProperty({ description: "Doctor Last Name", example: "Doe" })
  @Column({
    type: DataType.STRING,
  })
  declare last_name: string;

  @ApiProperty({ description: "Doctor Password", example: "hashed_password" })
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @ApiProperty({ description: "Phone Number", example: "+998912345678" })
  @Column({
    type: DataType.STRING,
  })
  declare phone_number: string;

  @ApiProperty({ description: "Email Address", example: "doctor@example.com" })
  @Column({
    type: DataType.STRING,
  })
  declare email: string;

  @ApiProperty({ description: "Specialty", example: "Cardiologist" })
  @Column({
    type: DataType.STRING,
  })
  declare specialty: string;

  @ApiProperty({
    description: "Doctor Refresh Token",
    example: "refresh_token_here",
  })
  @Column({
    type: DataType.STRING,
  })
  declare refreshToken: string;

  @ApiProperty({
    description: "Hashed Refresh Token",
    example: "hashed_refresh_token_here",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare hashed_refresh_token: string | null;

  // ________________________ doctor ____________________________

  @ApiProperty({ type: () => Staff })
  @BelongsTo(() => Staff)
  staff: Staff;

  @ApiProperty({ type: () => Appointment, isArray: true })
  @HasMany(() => Appointment)
  appointments: Appointment[];

  @ApiProperty({ type: () => RoomAssignment, isArray: true })
  @HasMany(() => RoomAssignment)
  roomAssignments: RoomAssignment[];

  @ApiProperty({ type: () => Room })
  @BelongsTo(() => Room)
  room: Room;
}
