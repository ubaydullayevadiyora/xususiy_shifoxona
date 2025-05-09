import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { TestTypeEnum } from "../../app.constants";
import { Appointment } from "../../appointments/models/appointment.model";
import { ServicePrice } from "../../service-price/models/service-price.model";

interface ILabTestsCreationAttr {
  service_price_id: number;
  appointment_id: number;
  test_type: TestTypeEnum;
  result: string;
  result_date: Date;
}

@Table({ tableName: "lab_tests" })
export class LabTest extends Model<LabTest, ILabTestsCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => ServicePrice)
  @Column({
    type: DataType.INTEGER,
  })
  declare service_price_id: number;

  @ForeignKey(() => Appointment)
  @Column({
    type: DataType.INTEGER,
  })
  declare appointment_id: number;

  @Column({
    type: DataType.ENUM(...Object.values(TestTypeEnum)),
    allowNull: false,
    defaultValue: TestTypeEnum.COVID,
  })
  declare test_type: TestTypeEnum;

  @Column({
    type: DataType.STRING,
  })
  declare result: string;

  @Column({
    type: DataType.DATE,
  })
  declare result_date: Date;

  // ________________________ lab-test ________________________

  @BelongsTo(() => Appointment)
  appointment: Appointment;

  @BelongsTo(() => ServicePrice)
  servicePrice: ServicePrice;
}
