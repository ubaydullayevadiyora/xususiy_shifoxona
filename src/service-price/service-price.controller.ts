import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreateServicePriceDto } from "./dto/create-service-price.dto";
import { UpdateServicePriceDto } from "./dto/update-service-price.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ServicePricesService } from "./service-price.service";

@ApiTags("Xizmat narxlari")
@Controller("service-price")
export class ServicePriceController {
  constructor(private readonly servicePriceService: ServicePricesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi xizmat narxini yaratish" })
  @ApiResponse({
    status: 201,
    description: "Xizmat narxi muvaffaqiyatli yaratildi",
  })
  create(@Body() createServicePriceDto: CreateServicePriceDto) {
    return this.servicePriceService.create(createServicePriceDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha xizmat narxlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha xizmat narxlarining ro'yxati",
  })
  findAll() {
    return this.servicePriceService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Xizmat narxini ID bo'yicha olish" })
  @ApiResponse({ status: 200, description: "Xizmat narxi tafsilotlari" })
  @ApiResponse({ status: 404, description: "Xizmat narxi topilmadi" })
  findOne(@Param("id") id: string) {
    return this.servicePriceService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Xizmat narxini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Xizmat narxi muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "Xizmat narxi topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateServicePriceDto: UpdateServicePriceDto
  ) {
    return this.servicePriceService.update(+id, updateServicePriceDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xizmat narxini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Xizmat narxi muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({ status: 404, description: "Xizmat narxi topilmadi" })
  remove(@Param("id") id: string) {
    return this.servicePriceService.remove(+id);
  }
}
