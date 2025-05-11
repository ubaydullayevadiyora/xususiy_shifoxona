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
import { AppointmentsService } from "./appointments.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { DoctorGuard } from "../common/guards/doctorGuard/doctor.guard";
import { PatientGuard } from "../common/guards/patientGuard/patient.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { StaffGuard } from "../common/guards/staffGuard/staff.guard";

@ApiTags("Appointments")
@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(AuthGuard, StaffGuard)
  @ApiOperation({ summary: "Yangi appointment yaratish" })
  @ApiResponse({
    status: 201,
    description: "Appointment muvaffaqiyatli yaratildi",
  })
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }
  @UseGuards(AuthGuard, StaffGuard, DoctorGuard)
  @ApiOperation({ summary: "Barcha appointmentlarni olish" })
  @ApiResponse({ status: 200, description: "Appointmentlar ro'yxati" })
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @UseGuards(AuthGuard, PatientGuard)
  @ApiOperation({ summary: "ID bo'yicha appointment olish" })
  @ApiResponse({ status: 200, description: "Topilgan appointment" })
  @ApiResponse({ status: 404, description: "Appointment topilmadi" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @UseGuards(AuthGuard, StaffGuard)
  @ApiOperation({ summary: "Appointmentni yangilash" })
  @ApiResponse({ status: 200, description: "Appointment yangilandi" })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @UseGuards(AuthGuard, StaffGuard, PatientGuard)
  @ApiOperation({ summary: "Appointmentni o'chirish" })
  @ApiResponse({ status: 200, description: "Appointment o'chirildi" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.appointmentsService.remove(+id);
  }
}
