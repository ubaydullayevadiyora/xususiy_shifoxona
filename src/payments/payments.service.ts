import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment)
    private readonly paymentModel: typeof Payment
  ) {}

  async create(
    createPaymentDto: CreatePaymentDto
  ): Promise<Payment> {
    return await this.paymentModel.create(createPaymentDto);
  }

  async findAll(): Promise<Payment[]> {
    return await this.paymentModel.findAll();
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto
  ): Promise<Payment> {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    await payment.update(updatePaymentDto);
    return payment;
  }

  async remove(id: number): Promise<void> {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    await payment.destroy();
  }
}