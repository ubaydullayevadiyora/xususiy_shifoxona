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
import { LabTestsService } from "./lab-tests.service";
import { CreateLabTestDto } from "./dto/create-lab-test.dto";
import { UpdateLabTestDto } from "./dto/update-lab-test.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { DoctorGuard } from "../common/guards/doctorGuard/doctor.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { PatientGuard } from "../common/guards/patientGuard/patient.guard";

@ApiTags("Laboratoriya testlari")
@Controller("lab-tests")
export class LabTestsController {
  constructor(private readonly labTestsService: LabTestsService) {}

  @UseGuards(AuthGuard, DoctorGuard)
  @Post()
  @ApiOperation({ summary: "Yangi laboratoriya testi yaratish" })
  @ApiBody({ type: CreateLabTestDto })
  @ApiResponse({
    status: 201,
    description: "Laboratoriya testi muvaffaqiyatli yaratildi",
  })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  create(@Body() createLabTestDto: CreateLabTestDto) {
    return this.labTestsService.create(createLabTestDto);
  }

  @UseGuards(AuthGuard, DoctorGuard, PatientGuard)
  @Get()
  @ApiOperation({ summary: "Barcha laboratoriya testlarini ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Barcha laboratoriya testlarining ro'yxati",
  })
  @ApiResponse({
    status: 404,
    description: "Hech qanday laboratoriya testi topilmadi",
  })
  findAll() {
    return this.labTestsService.findAll();
  }

  @UseGuards(AuthGuard, DoctorGuard, PatientGuard)
  @Get(":id")
  @ApiOperation({ summary: "ID bo'yicha laboratoriya testini ko'rish" })
  @ApiParam({
    name: "id",
    type: "string",
    description: "Laboratoriya testi ID raqami",
  })
  @ApiResponse({ status: 200, description: "Laboratoriya testi topildi" })
  @ApiResponse({ status: 404, description: "Laboratoriya testi topilmadi" })
  findOne(@Param("id") id: string) {
    return this.labTestsService.findOne(+id);
  }

  @UseGuards(AuthGuard, DoctorGuard)
  @Patch(":id")
  @ApiOperation({ summary: "ID bo'yicha laboratoriya testini yangilash" })
  @ApiParam({
    name: "id",
    type: "string",
    description: "Laboratoriya testi ID raqami",
  })
  @ApiBody({ type: UpdateLabTestDto })
  @ApiResponse({
    status: 200,
    description: "Laboratoriya testi muvaffaqiyatli yangilandi",
  })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumotlar" })
  @ApiResponse({ status: 404, description: "Laboratoriya testi topilmadi" })
  update(@Param("id") id: string, @Body() updateLabTestDto: UpdateLabTestDto) {
    return this.labTestsService.update(+id, updateLabTestDto);
  }

  @UseGuards(AuthGuard, DoctorGuard)
  @Delete(":id")
  @ApiOperation({ summary: "ID bo'yicha laboratoriya testini o'chirish" })
  @ApiParam({
    name: "id",
    type: "string",
    description: "Laboratoriya testi ID raqami",
  })
  @ApiResponse({
    status: 200,
    description: "Laboratoriya testi muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({ status: 404, description: "Laboratoriya testi topilmadi" })
  remove(@Param("id") id: string) {
    return this.labTestsService.remove(+id);
  }
}
