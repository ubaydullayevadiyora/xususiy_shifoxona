import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethodEnum, PaymentStatusEnum } from "../../app.constants";
import { Patient } from "../../patients/models/patient.model";
import { Staff } from "../../staffs/models/staff.model";
import { PaymentDetail } from "../../payment-details/models/payment-detail.model";
import { Appointment } from "../../appointments/models/appointment.model";

interface IPaymentCreationAttr {
  patient_id: number;
  total_amount: string;
  method: PaymentMethodEnum;
  status: PaymentStatusEnum;
  paid_at: Date;
  cashier_id: number;
}

@Table({ tableName: "payments" })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @ApiProperty({ description: "Payment ID", example: 1 })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ description: "Patient ID", example: 1 })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
  })
  declare patient_id: number;

  @ApiProperty({
    description: "Total amount of the payment",
    example: "100.00",
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  declare total_amount: string;

  @ApiProperty({ description: "Method of payment", example: "CASH" })
  @Column({
    type: DataType.ENUM(...Object.values(PaymentMethodEnum)),
    allowNull: false,
    defaultValue: PaymentMethodEnum.CASH,
  })
  declare method: PaymentMethodEnum;

  @ApiProperty({ description: "Payment status", example: "PENDING" })
  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatusEnum)),
    allowNull: false,
    defaultValue: PaymentStatusEnum.PANDING,
  })
  declare status: PaymentStatusEnum;

  @ApiProperty({
    description: "Date when the payment was made",
    example: "2025-05-01T00:00:00.000Z",
  })
  @Column({
    type: DataType.DATE,
  })
  declare paid_at: Date;

  @ApiProperty({
    description: "Cashier ID who processed the payment",
    example: 1,
  })
  @ForeignKey(() => Staff)
  @Column({
    type: DataType.INTEGER,
  })
  declare cashier_id: number;

  // __________________ payments _______________

  @ApiProperty({ type: () => Patient })
  @BelongsTo(() => Patient)
  patient: Patient;

  @ApiProperty({ type: () => [PaymentDetail] })
  @HasMany(() => PaymentDetail)
  paymentDetails: PaymentDetail[];

  @ApiProperty({ type: () => [Appointment] })
  @HasMany(() => Appointment)
  appointment: Appointment[];
}
