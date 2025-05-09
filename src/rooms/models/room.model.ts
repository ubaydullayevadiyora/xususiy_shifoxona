import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { RoomStatusEnum, RoomTypeEnum } from "../../app.constants";
import { RoomAssignment } from "../../room-assignments/models/room-assignment.model";

interface IRoomCreationAttr {
  patient_id: number;
  doctor_id: number;
  staff_id: number;
  room_id: number;
  assigned_at: Date;
  released_at: Date;
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
}
