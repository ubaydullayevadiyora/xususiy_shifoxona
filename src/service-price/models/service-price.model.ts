import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ServiceTypeEnum } from "../../app.constants";
import { Appointment } from "../../appointments/models/appointment.model";
import { Payment } from "../../payments/models/payment.model";
import { PaymentDetail } from "../../payment-details/models/payment-detail.model";
import { LabTest } from "../../lab-tests/models/lab-test.model";

interface IServicePriceCreationAttr {
  service_type: ServiceTypeEnum;
  service_name: string;
  price: string;
  description: string;
  is_active: boolean;
}

@Table({ tableName: "service_price" })
export class ServicePrice extends Model<
  ServicePrice,
  IServicePriceCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.ENUM(...Object.values(ServiceTypeEnum)),
    allowNull: false,
    defaultValue: ServiceTypeEnum.CONSULTATION,
  })
  declare test_type: ServiceTypeEnum;

  @Column({
    type: DataType.STRING(50),
  })
  declare service_name: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  declare price: string;

  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;

  // ____________ Associations ____________

  @HasMany(() => Appointment)
  appointments: Appointment[];

  @HasMany(() => Payment)
  payments: Payment[];

  @HasMany(() => LabTest)
  labTests: LabTest[];

  @HasMany(() => PaymentDetail)
  paymentDetails: PaymentDetail[]; 
}
