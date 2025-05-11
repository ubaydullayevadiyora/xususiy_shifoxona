import { InjectModel } from "@nestjs/sequelize";
import { PaymentDetail } from "./models/payment-detail.model";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePaymentDetailDto } from "./dto/create-payment-detail.dto";
import { UpdatePaymentDetailDto } from "./dto/update-payment-detail.dto";


@Injectable()
export class PaymentDetailsService {
  constructor(
    @InjectModel(PaymentDetail)
    private readonly paymentDetailModel: typeof PaymentDetail
  ) {}

  async create(
    createPaymentDetailDto: CreatePaymentDetailDto
  ): Promise<PaymentDetail> {
    return await this.paymentDetailModel.create(createPaymentDetailDto);
  }

  async findAll(): Promise<PaymentDetail[]> {
    return await this.paymentDetailModel.findAll();
  }

  async findOne(id: number): Promise<PaymentDetail> {
    const paymentDetail = await this.paymentDetailModel.findByPk(id);
    if (!paymentDetail) {
      throw new NotFoundException(`PaymentDetail with ID ${id} not found`);
    }
    return paymentDetail;
  }

  async update(
    id: number,
    updatePaymentDetailDto: UpdatePaymentDetailDto
  ): Promise<PaymentDetail> {
    const paymentDetail = await this.paymentDetailModel.findByPk(id);
    if (!paymentDetail) {
      throw new NotFoundException(`PaymentDetail with ID ${id} not found`);
    }
    await paymentDetail.update(updatePaymentDetailDto);
    return paymentDetail;
  }

  async remove(id: number): Promise<void> {
    const paymentDetail = await this.paymentDetailModel.findByPk(id);
    if (!paymentDetail) {
      throw new NotFoundException(`PaymentDetail with ID ${id} not found`);
    }
    await paymentDetail.destroy();
  }
}
