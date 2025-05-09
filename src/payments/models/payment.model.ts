import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { PaymentStatusEnum } from "../../app.constants";
import { Patient } from "../../patients/models/patient.model";
import { ServicePrice } from "../../service-price/models/service-price.model";
import { PaymentDetail } from "../../payment-details/models/payment-detail.model";
import { Staff } from "../../staffs/models/staff.model";

interface IPaymentCreationAttr {
  service_price_id: number;
  patient_id: number;
  total_amount: string;
  status: PaymentStatusEnum;
  paid_at: Date;
  cashier_id: number;
}
@Table({ tableName: "payments" })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
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

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
  })
  declare patient_id: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  declare total_amount: string;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatusEnum)),
    allowNull: false,
    defaultValue: PaymentStatusEnum.PANDING,
  })
  declare test_type: PaymentStatusEnum;

  @Column({
    type: DataType.DATE,
  })
  declare paid_at: Date;

  @ForeignKey(() => Staff)
  @Column({
    type: DataType.INTEGER,
  })
  declare cashier_id: number;

  // ______________ payments_______________

  @BelongsTo(() => Patient)
  patient: Patient;

  @BelongsTo(() => ServicePrice)
  servicePrice: ServicePrice;

  @HasMany(() => PaymentDetail)
  paymentDetails: PaymentDetail[];
}
