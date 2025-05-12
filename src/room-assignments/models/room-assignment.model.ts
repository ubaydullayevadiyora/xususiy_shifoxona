import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
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
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
  })
  declare patient_id: number;

  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
  })
  declare doctor_id: number;

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
    type: DataType.DATE,
  })
  declare assigned_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare released_at: Date | null;

  // __________________________ room-assignment _________________________

  @BelongsTo(() => Patient)
  patient: Patient;

  @BelongsTo(() => Room)
  room: Room;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @BelongsTo(() => Staff)
  staff: Staff;
}
