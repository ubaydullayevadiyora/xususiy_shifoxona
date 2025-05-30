import { Module } from "@nestjs/common";
import { PaymentDetailsService } from "./payment-details.service";
import { PaymentDetailsController } from "./payment-details.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { PaymentDetail } from "./models/payment-detail.model";
import { AppointmentsModule } from "../appointments/appointments.module";
import { PaymentsModule } from "../payments/payments.module";
import { DiagnosesModule } from "../diagnoses/diagnoses.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    SequelizeModule.forFeature([PaymentDetail]),JwtModule
  ],
  controllers: [PaymentDetailsController],
  providers: [PaymentDetailsService],
  exports: [PaymentDetailsService],
})
export class PaymentDetailsModule {}
