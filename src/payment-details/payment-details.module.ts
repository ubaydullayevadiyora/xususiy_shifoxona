import { Module } from '@nestjs/common';
import { PaymentDetailsService } from './payment-details.service';
import { PaymentDetailsController } from './payment-details.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentDetail } from './models/payment-detail.model';

@Module({
   imports: [SequelizeModule.forFeature([PaymentDetail])],
  controllers: [PaymentDetailsController],
  providers: [PaymentDetailsService],
  exports:[PaymentDetailsService]
})
export class PaymentDetailsModule {}
