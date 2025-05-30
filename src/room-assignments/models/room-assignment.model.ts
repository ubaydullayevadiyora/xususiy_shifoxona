import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Patient } from "../../patients/models/patient.model";
import { Room } from "../../rooms/models/room.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { Staff } from "../../staffs/models/staff.model";

// models/room-assignment.interface.ts (yoki qayerda bo‘lsa)
export interface IRoomAssignmentCreationAttr {
  patient_id: number;
  doctor_id: number;
  staff_id: number;
  room_id: number;
  assigned_at: Date;
  released_at?: Date | null; // <-- Shuni qo‘shing
}

@Table({ tableName: "room_assignment" })
export class RoomAssignment extends Model<
  RoomAssignment,
  IRoomAssignmentCreationAttr
> {
  @ApiProperty({ description: "Room Assignment ID", example: 1 })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    description: "Patient ID associated with the room assignment",
    example: 1,
  })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
  })
  declare patient_id: number;

  @ApiProperty({
    description: "Doctor ID associated with the room assignment",
    example: 1,
  })
  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
  })
  declare doctor_id: number;

  @ApiProperty({
    description: "Staff ID associated with the room assignment",
    example: 1,
  })
  @ForeignKey(() => Staff)
  @Column({
    type: DataType.INTEGER,
  })
  declare staff_id: number;

  @ApiProperty({ description: "Room ID assigned to the patient", example: 1 })
  @ForeignKey(() => Room)
  @Column({
    type: DataType.INTEGER,
  })
  declare room_id: number;

  @ApiProperty({
    description: "Date and time when the room was assigned",
    example: "2025-05-12T08:30:00Z",
  })
  @Column({
    type: DataType.DATE,
  })
  declare assigned_at: Date;

  @ApiProperty({
    description: "Date and time when the room was released",
    example: "2025-05-14T10:30:00Z",
    required: false,
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare released_at: Date | null;

  // __________________________ room-assignment _________________________

  @ApiProperty({ type: () => Patient })
  @BelongsTo(() => Patient)
  patient: Patient;

  @ApiProperty({ type: () => Room })
  @BelongsTo(() => Room)
  room: Room;

  @ApiProperty({ type: () => Doctor })
  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @ApiProperty({ type: () => Staff })
  @BelongsTo(() => Staff)
  staff: Staff;
}
