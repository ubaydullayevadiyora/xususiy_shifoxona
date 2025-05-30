import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty({ description: "Payment Detail ID", example: 1 })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ description: "Payment ID", example: 1 })
  @ForeignKey(() => Payment)
  @Column({
    type: DataType.INTEGER,
  })
  declare payment_id: number;

  @ApiProperty({ description: "Price of the payment detail", example: "99.99" })
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  declare price: string;

  @ApiProperty({
    description: "Description of the payment detail",
    example: "Consultation fee",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare description: string;

  // _________________________

  @ApiProperty({ type: () => Payment })
  @BelongsTo(() => Payment)
  payment: Payment;
}
