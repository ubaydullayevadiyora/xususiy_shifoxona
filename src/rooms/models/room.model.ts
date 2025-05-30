import { Appointment } from "../../appointments/models/appointment.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { RoomAssignment } from "../../room-assignments/models/room-assignment.model";
import { RoomStatusEnum, RoomTypeEnum } from "./../../app.constants";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IRoomCreationAttr {
  room_number: number;
  room_type: RoomTypeEnum;
  status: RoomStatusEnum;
  floor: number;
}

@Table({ tableName: "rooms" })
export class Room extends Model<Room, IRoomCreationAttr> {
  @ApiProperty({ description: "Room ID", example: 1 })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ description: "Room number", example: 101 })
  @Column({
    type: DataType.INTEGER,
  })
  declare room_number: number;

  @ApiProperty({
    description: "Room type",
    enum: RoomTypeEnum,
    default: RoomTypeEnum.GENERAL,
  })
  @Column({
    type: DataType.ENUM(...Object.values(RoomTypeEnum)),
    allowNull: false,
    defaultValue: RoomTypeEnum.GENERAL,
  })
  declare room_type: RoomTypeEnum;

  @ApiProperty({
    description: "Room status",
    enum: RoomStatusEnum,
    default: RoomStatusEnum.OCCUPIED,
  })
  @Column({
    type: DataType.ENUM(...Object.values(RoomStatusEnum)),
    allowNull: false,
    defaultValue: RoomStatusEnum.OCCUPIED,
  })
  declare status: RoomStatusEnum;

  @ApiProperty({
    description: "Floor number where the room is located",
    example: 2,
  })
  @Column({
    type: DataType.INTEGER,
  })
  declare floor: number;

  // ________________________ room _____________________

  @ApiProperty({ type: () => RoomAssignment, isArray: true })
  @HasMany(() => RoomAssignment)
  roomAssignments: RoomAssignment[];

  @ApiProperty({ type: () => Doctor, isArray: true })
  @HasMany(() => Doctor)
  doctor: Doctor[];
}
