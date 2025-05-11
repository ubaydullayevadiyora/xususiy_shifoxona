import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethodEnum, PaymentStatusEnum } from "../../app.constants";

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: "Xizmat narxi ID raqami" })
  service_price_id: number;

  @ApiProperty({ example: 10, description: "Bemor ID raqami" })
  patient_id: number;

  @ApiProperty({ example: "100.50", description: "To'lov miqdori" })
  total_amount: string;

  @ApiProperty({
    enum: PaymentMethodEnum,
    example: PaymentMethodEnum.CARD,
    description: "To'lov turi (masalan: CASH, CARD)",
  })
  method: PaymentMethodEnum;

  @ApiProperty({
    enum: PaymentStatusEnum,
    example: PaymentStatusEnum.PAID,
    description: "To'lov holati (masalan: PAID, PENDING, CANCELLED)",
  })
  status: PaymentStatusEnum;

  @ApiProperty({
    example: "2025-05-10T10:30:00Z",
    description: "To'lov sanasi",
  })
  paid_at: Date;

  @ApiProperty({ example: 2, description: "Kasir ID raqami" })
  cashier_id: number;
}
