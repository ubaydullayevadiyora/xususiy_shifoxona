import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
  fullname: string;
  phone_number: string;
  email: string;
  password: string;
}
@Table({ tableName: "admins" })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
  })
  declare fullname: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare phone_number: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare email: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare password: string;

  @Column({ type: DataType.STRING, allowNull: true })
  hashed_refresh_token: string | null;

  // @Column({ type: DataType.BOOLEAN, defaultValue: false })
  // is_verified: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_active: boolean;

  // @Column({ type: DataType.STRING, defaultValue: false })
  // activation_link: string;
}
