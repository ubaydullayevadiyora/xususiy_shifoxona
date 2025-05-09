import { Module } from "@nestjs/common";
import { ServicePriceController } from "./service-price.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { ServicePrice } from "./models/service-price.model";
import { ServicePricesService } from "./service-price.service";

@Module({
  imports: [SequelizeModule.forFeature([ServicePrice])],
  controllers: [ServicePriceController],
  providers: [ServicePricesService],
  exports: [ServicePricesService],
})
export class ServicePriceModule {}
