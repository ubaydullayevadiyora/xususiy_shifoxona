import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { TestTypeEnum } from "../../app.constants";
import { Appointment } from "../../appointments/models/appointment.model";

interface ILabTestsCreationAttr {
  appointment_id: number;
  test_type: TestTypeEnum;
  result: string;
  result_date: Date;
}

@Table({ tableName: "lab_tests" })
export class LabTest extends Model<LabTest, ILabTestsCreationAttr> {
  @ApiProperty({ description: "Lab Test ID", example: 1 })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ description: "Appointment ID", example: 1 })
  @ForeignKey(() => Appointment)
  @Column({
    type: DataType.INTEGER,
  })
  declare appointment_id: number;

  @ApiProperty({
    description: "Test Type",
    enum: TestTypeEnum,
    default: TestTypeEnum.COVID,
  })
  @Column({
    type: DataType.ENUM(...Object.values(TestTypeEnum)),
    allowNull: false,
    defaultValue: TestTypeEnum.COVID,
  })
  declare test_type: TestTypeEnum;

  @ApiProperty({ description: "Test Result", example: "Positive" })
  @Column({
    type: DataType.STRING,
  })
  declare result: string;

  @ApiProperty({
    description: "Result Date",
    example: "2025-05-12T00:00:00.000Z",
  })
  @Column({
    type: DataType.DATE,
  })
  declare result_date: Date;

  // ________________________ lab-test ________________________

  @ApiProperty({ type: () => Appointment })
  @BelongsTo(() => Appointment)
  appointment: Appointment;
}
