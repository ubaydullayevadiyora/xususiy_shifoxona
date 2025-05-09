import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ServicePrice } from "./models/service-price.model";
import { CreateServicePriceDto } from "./dto/create-service-price.dto";
import { UpdateServicePriceDto } from "./dto/update-service-price.dto";
import { Model } from "sequelize-typescript";

@Injectable()
export class ServicePricesService {
  constructor(
    @InjectModel(ServicePrice)
    private servicePriceModel: typeof ServicePrice
  ) {}

  async create(
    createServicePriceDto: CreateServicePriceDto
  ): Promise<ServicePrice> {
    return await this.servicePriceModel.create(createServicePriceDto);
  }

  async findAll(): Promise<ServicePrice[]> {
    return this.servicePriceModel.findAll();
  }

  async findOne(id: number): Promise<ServicePrice> {
    const servicePrice = await this.servicePriceModel.findByPk(id);
    if (!servicePrice) {
      throw new NotFoundException(`ServicePrice #${id} topilmadi`);
    }
    return servicePrice;
  }

  async update(
    id: number,
    updateServicePriceDto: UpdateServicePriceDto
  ): Promise<ServicePrice> {
    const servicePrice = await this.findOne(id);
    if (servicePrice) {
      return await servicePrice.update(updateServicePriceDto);
    }
    throw new NotFoundException(`ServicePrice #${id} topilmadi`);
  }

  async remove(id: number): Promise<{ message: string }> {
    const servicePrice = await this.findOne(id);
    if (servicePrice) {
      await servicePrice.destroy();
      return { message: `ServicePrice #${id} o'chirildi` };
    }
    throw new NotFoundException(`ServicePrice #${id} topilmadi`);
  }
}
