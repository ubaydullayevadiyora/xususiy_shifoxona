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
import { PatientsService } from "./patients.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";
import { PatientGuard } from '../common/guards/patientGuard/patient.guard';
import { StaffGuard } from '../common/guards/staffGuard/staff.guard';
import { AuthGuard } from '../common/guards/auth.guard';
import { DoctorGuard } from "../common/guards/doctorGuard/doctor.guard";

@ApiTags("Patients")
@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @UseGuards(AuthGuard, PatientGuard)
  @ApiOperation({ summary: "Yangi bemor qo'shish" })
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @UseGuards(AuthGuard, StaffGuard, DoctorGuard)
  @ApiOperation({ summary: "Barcha bemorlarni olish" })
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @UseGuards(AuthGuard, StaffGuard, DoctorGuard)
  @ApiOperation({ summary: "ID orqali bitta bemorni olish" })
  @ApiParam({ name: "id", type: Number })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientsService.findOne(+id);
  }

  @UseGuards(AuthGuard, PatientGuard)
  @ApiOperation({ summary: "Bemor ma'lumotlarini yangilash" })
  @ApiParam({ name: "id", type: Number })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @UseGuards(AuthGuard, PatientGuard)
  @ApiOperation({ summary: "Bemorni o'chirish" })
  @ApiParam({ name: "id", type: Number })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientsService.remove(+id);
  }

  @Get("activate/:activation_link")
  async activateAccount(@Param("activation_link") activationLink: string) {
    return this.patientsService.verifyEmail(activationLink);
  }

  @Patch("refresh-token/:id")
  updateRefreshToken(
    @Param("id") id: number,
    @Body("hashed_refresh_token") hashed_refresh_token: string | null
  ) {
    return this.patientsService.updateRefreshToken(id, hashed_refresh_token);
  }

  // @Get(":id/appointments")
  // @UseGuards(PatientOwnershipGuard)
  // async getAppointments(@Param("id") patientId: number) {
  //   return this.appointmentsService.findByPatientId(patientId);
  // }

  // @Get(":id/diagnosis")
  // @UseGuards(PatientOwnershipGuard)
  // async getDiagnosis(@Param("id") patientId: number) {
  //   return this.patientsService.findDiagnosisByPatientId(patientId);
  // }

  // @Get(":id/prescriptions")
  // @UseGuards(PatientOwnershipGuard)
  // async getPrescriptions(@Param("id") patientId: number) {
  //   return this.patientsService.findPrescriptionsByPatientId(patientId);
  // }
}
