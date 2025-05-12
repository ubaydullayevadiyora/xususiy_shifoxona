import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { StaffNameEnum } from "../../app.constants";
import { Doctor } from "../../doctors/models/doctor.model";
import { RoomAssignment } from "../../room-assignments/models/room-assignment.model";

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
    type: DataType.ENUM(...Object.values(StaffNameEnum)),
    allowNull: false,
  })
  declare staff_name: StaffNameEnum;

  @Column({ type: DataType.STRING, allowNull: true })
  declare hashed_refresh_token: string | null;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @HasMany(() => Doctor)
  doctor: Doctor[];

  @HasMany(() => RoomAssignment)
  roomAssignment: RoomAssignment[];
}
