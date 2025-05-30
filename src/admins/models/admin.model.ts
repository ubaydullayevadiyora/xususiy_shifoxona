import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IAdminCreationAttr {
  fullname: string;
  phone_number: string;
  email: string;
  password: string;
}

@Table({ tableName: "admins" })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @ApiProperty({ description: "ID of the admin", example: 1 })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ description: "Full name of the admin", example: "John Doe" })
  @Column({
    type: DataType.STRING(50),
  })
  declare fullname: string;

  @ApiProperty({
    description: "Phone number of the admin",
    example: "+998991234567",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare phone_number: string;

  @ApiProperty({
    description: "Email address of the admin",
    example: "admin@example.com",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare email: string;

  @ApiProperty({ description: "Password of the admin" })
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @ApiProperty({
    description: "Hashed refresh token of the admin",
    required: false,
    example: "hashed_token_here",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare hashed_refresh_token: string | null;

  @ApiProperty({ description: "Is the admin account active?", example: true })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;
}
