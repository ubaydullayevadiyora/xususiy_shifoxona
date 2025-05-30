import { AuthGuard } from './../common/guards/auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CashierGuard } from "../common/guards/staffGuard/staff.guard";
import { PatientGuard } from '../common/guards/patientGuard/patient.guard';

@ApiTags("To'lovlar")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(AuthGuard, CashierGuard)
  @Post()
  @ApiOperation({ summary: "Yangi to'lov yaratish" })
  @ApiResponse({ status: 201, description: "To'lov muvaffaqiyatli yaratildi." })
  @ApiResponse({ status: 400, description: "Noto'g'ri so'rov." })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @UseGuards(AuthGuard, CashierGuard)
  @Get()
  @ApiOperation({ summary: "Barcha to'lovlarni ko'rish" })
  @ApiResponse({ status: 200, description: "Barcha to'lovlar ro'yxati" })
  findAll() {
    return this.paymentsService.findAll();
  }

  @UseGuards(AuthGuard, CashierGuard)
  @Get(":id")
  @ApiOperation({ summary: "To'lovni ID bo'yicha ko'rish" })
  @ApiResponse({ status: 200, description: "To'lov ma'lumotlari" })
  @ApiResponse({ status: 404, description: "To'lov topilmadi" })
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @UseGuards(AuthGuard, CashierGuard)
  @Patch(":id")
  @ApiOperation({ summary: "To'lov ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "To'lov muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Noto'g'ri so'rov." })
  @ApiResponse({ status: 404, description: "To'lov topilmadi" })
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @UseGuards(AuthGuard, CashierGuard)
  @Delete(":id")
  @ApiOperation({ summary: "To'lovni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "To'lov muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({ status: 404, description: "To'lov topilmadi" })
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }
}
