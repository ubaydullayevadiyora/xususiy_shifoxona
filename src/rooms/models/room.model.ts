import { Appointment } from "../../appointments/models/appointment.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { RoomAssignment } from "../../room-assignments/models/room-assignment.model";
import { RoomStatusEnum, RoomTypeEnum } from "./../../app.constants";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

interface IRoomCreationAttr {
  room_number: number;
  room_type: RoomTypeEnum;
  status: RoomStatusEnum;
  floor: number;
}
@Table({ tableName: "rooms" })
export class Room extends Model<Room, IRoomCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare room_number: number;

  @Column({
    type: DataType.ENUM(...Object.values(RoomTypeEnum)),
    allowNull: false,
    defaultValue: RoomTypeEnum.GENERAL,
  })
  declare room_type: RoomTypeEnum;

  @Column({
    type: DataType.ENUM(...Object.values(RoomStatusEnum)),
    allowNull: false,
    defaultValue: RoomStatusEnum.OCCUPIED,
  })
  declare status: RoomStatusEnum;

  @Column({
    type: DataType.INTEGER,
  })
  declare floor: number;

  // ________________________ room _____________________

  @HasMany(() => RoomAssignment)
  roomAssignments: RoomAssignment[];

  @HasMany(() => Doctor)
  doctor: Doctor[];
}
