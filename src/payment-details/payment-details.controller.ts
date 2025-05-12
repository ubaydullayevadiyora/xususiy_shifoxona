import { CashierGuard } from './../common/guards/staffGuard/staff.guard';
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
import { PaymentDetailsService } from "./payment-details.service";
import { CreatePaymentDetailDto } from "./dto/create-payment-detail.dto";
import { UpdatePaymentDetailDto } from "./dto/update-payment-detail.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"; 
import { AdminGuard } from "../common/guards/adminGuard/admin.guard";
import { PatientGuard } from '../common/guards/patientGuard/patient.guard';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiTags("Payment Details")
@Controller("payment-details")
export class PaymentDetailsController {
  constructor(private readonly paymentDetailsService: PaymentDetailsService) {}

  @UseGuards(AuthGuard, CashierGuard)
  @ApiOperation({ summary: "Create a payment detail" })
  @ApiResponse({
    status: 201,
    description: "The payment detail has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request" })
  @Post()
  create(@Body() createPaymentDetailDto: CreatePaymentDetailDto) {
    return this.paymentDetailsService.create(createPaymentDetailDto);
  }

  @UseGuards(AuthGuard, AdminGuard, CashierGuard)
  @ApiOperation({ summary: "Get all payment details" })
  @ApiResponse({ status: 200, description: "List of all payment details." })
  @Get()
  findAll() {
    return this.paymentDetailsService.findAll();
  }

  @UseGuards(AuthGuard, AdminGuard, CashierGuard)
  @ApiOperation({ summary: "Get a payment detail by ID" })
  @ApiResponse({ status: 200, description: "The payment detail found." })
  @ApiResponse({ status: 404, description: "Payment detail not found" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentDetailsService.findOne(+id);
  }

  @UseGuards(AuthGuard, CashierGuard)
  @ApiOperation({ summary: "Update a payment detail by ID" })
  @ApiResponse({
    status: 200,
    description: "The payment detail has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "Payment detail not found" })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePaymentDetailDto: UpdatePaymentDetailDto
  ) {
    return this.paymentDetailsService.update(+id, updatePaymentDetailDto);
  }

  @UseGuards(AuthGuard, CashierGuard)
  @ApiOperation({ summary: "Delete a payment detail by ID" })
  @ApiResponse({
    status: 200,
    description: "The payment detail has been successfully removed.",
  })
  @ApiResponse({ status: 404, description: "Payment detail not found" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentDetailsService.remove(+id);
  }
}
