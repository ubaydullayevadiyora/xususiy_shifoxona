import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Payment } from "../../payments/models/payment.model";

interface IPaymentDetailsCreationAttr {
  payment_id: number;
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

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  declare price: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare description: string;

  // _________________________

  @BelongsTo(() => Payment)
  payment: Payment;
}
