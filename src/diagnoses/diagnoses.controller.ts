import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DiagnosesService } from "./diagnoses.service";
import { CreateDiagnosisDto } from "./dto/create-diagnosis.dto";
import { UpdateDiagnosisDto } from "./dto/update-diagnosis.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Diagnoses") // Swagger tag
@Controller("diagnoses")
export class DiagnosesController {
  constructor(private readonly diagnosesService: DiagnosesService) {}

  @ApiOperation({ summary: "Yangi diagnoz qo'shish" })
  @ApiResponse({ status: 201, description: "Diagnoz muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumot" })
  @Post()
  create(@Body() createDiagnosisDto: CreateDiagnosisDto) {
    return this.diagnosesService.create(createDiagnosisDto);
  }

  @ApiOperation({ summary: "Barcha diagnozlarni ko'rish" })
  @ApiResponse({ status: 200, description: "Barcha diagnozlar qaytarildi" })
  @Get()
  findAll() {
    return this.diagnosesService.findAll();
  }

  @ApiOperation({ summary: "Ma'lum bir diagnozni ko'rish" })
  @ApiResponse({ status: 200, description: "Diagnoz topildi" })
  @ApiResponse({ status: 404, description: "Diagnoz topilmadi" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.diagnosesService.findOne(+id);
  }

  @ApiOperation({ summary: "Diagnozni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Diagnoz muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 404, description: "Diagnoz topilmadi" })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDiagnosisDto: UpdateDiagnosisDto
  ) {
    return this.diagnosesService.update(+id, updateDiagnosisDto);
  }

  @ApiOperation({ summary: "Diagnozni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Diagnoz muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({ status: 404, description: "Diagnoz topilmadi" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.diagnosesService.remove(+id);
  }
}
