import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PaymentDetailsService } from "./payment-details.service";
import { CreatePaymentDetailDto } from "./dto/create-payment-detail.dto";
import { UpdatePaymentDetailDto } from "./dto/update-payment-detail.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"; 

@ApiTags("Payment Details") 
@Controller("payment-details")
export class PaymentDetailsController {
  constructor(private readonly paymentDetailsService: PaymentDetailsService) {}

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

  @ApiOperation({ summary: "Get all payment details" })
  @ApiResponse({ status: 200, description: "List of all payment details." })
  @Get()
  findAll() {
    return this.paymentDetailsService.findAll();
  }

  @ApiOperation({ summary: "Get a payment detail by ID" })
  @ApiResponse({ status: 200, description: "The payment detail found." })
  @ApiResponse({ status: 404, description: "Payment detail not found" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentDetailsService.findOne(+id);
  }

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
