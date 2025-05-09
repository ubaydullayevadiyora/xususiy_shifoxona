import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
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
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Staff)
  @Column({
    type: DataType.INTEGER,
  })
  declare staff_id: number;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.INTEGER,
  })
  declare room_id: number;

  @Column({
    type: DataType.STRING,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING,
  })
  declare last_name: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
  })
  declare phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare specialty: string;

  @Column({
    type: DataType.STRING,
  })
  declare refreshToken: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare hashed_refresh_token: string | null;

  // ________________ doctor ______________________

  @BelongsTo(() => Staff)
  staff: Staff;

  @HasMany(() => Appointment)
  appointments: Appointment[];

  @HasMany(() => RoomAssignment)
  roomAssignments: RoomAssignment[];
}
