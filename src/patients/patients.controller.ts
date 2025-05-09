import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PatientsService } from "./patients.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";

@ApiTags("Patients")
@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiOperation({ summary: "Yangi bemor qo'shish" })
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @ApiOperation({ summary: "Barcha bemorlarni olish" })
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @ApiOperation({ summary: "ID orqali bitta bemorni olish" })
  @ApiParam({ name: "id", type: Number })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientsService.findOne(+id);
  }

  @ApiOperation({ summary: "Bemor ma'lumotlarini yangilash" })
  @ApiParam({ name: "id", type: Number })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @ApiOperation({ summary: "Bemorni o'chirish" })
  @ApiParam({ name: "id", type: Number })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientsService.remove(+id);
  }
}
