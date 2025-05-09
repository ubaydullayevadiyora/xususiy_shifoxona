import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Payment } from "../../payments/models/payment.model";
import { ServicePrice } from "../../service-price/models/service-price.model";

interface IPaymentDetailsCreationAttr {
  payment_id: number;
  service_price_id: number;
  price: string;
  description: string;
}

@Table({ tableName: "payment_details" })
export class PaymentDetail extends Model<
  PaymentDetail,
  IPaymentDetailsCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Payment)
  @Column({
    type: DataType.INTEGER,
  })
  declare payment_id: number;

  @ForeignKey(() => ServicePrice)
  @Column({
    type: DataType.INTEGER,
  })
  declare service_price_id: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  declare price: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare description: string;

  @BelongsTo(() => ServicePrice)
  servicePrice: ServicePrice;

  @BelongsTo(() => Payment)
  payment: Payment;
}
