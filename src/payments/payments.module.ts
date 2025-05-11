import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";
import { AppointmentsModule } from "../appointments/appointments.module";
import { JwtModule } from "@nestjs/jwt";
import { DiagnosesModule } from "../diagnoses/diagnoses.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Payment]), JwtModule
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
