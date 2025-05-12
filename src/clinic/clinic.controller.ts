import { DoctorsService } from "./../doctors/doctors.service";
import { AuthGuard } from "./../common/guards/auth.guard";
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ClinicService } from "./clinic.service";
import { DoctorGuard } from "../common/guards/doctorGuard/doctor.guard";
import { PatientGuard } from "../common/guards/patientGuard/patient.guard";
import { StaffGuard } from "../common/guards/staffGuard/staff.guard";

@Controller("clinic")
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Get("my-patients") //doctor o'ziga tegishli bo'lgan bemorni ko'rishi uchun
  @UseGuards(AuthGuard, DoctorGuard)
  async getMyPatients(@Req() req) {
    const doctorId = req.user.id;
    return this.clinicService.getMyPatients(doctorId);
  }

  @Get("my-appointments") // patient o'zini qabullarini ko'rishi mumkin
  @UseGuards(AuthGuard, PatientGuard)
  async getMyAppointments(@Req() req) {
    const patientId = req.user.id;
    return this.clinicService.getMyAppointments(patientId);
  }

  @Get("my-room-info") // doctor o'ziga qaysi xona berilganini ko'rishi mumkin
  @UseGuards(AuthGuard, DoctorGuard)
  async getMyRoomInfo(@Req() req) {
    const doctorId = req.user.id;
    return this.clinicService.getDoctorRoomInfo(doctorId);
  }

  @Get(":id/info") // IT hamshira doctorlar haqida malumotlarni ko'rishi uchun
  @UseGuards(AuthGuard, StaffGuard)
  async getDoctorInfo(@Param("id", ParseIntPipe) id: number) {
    const doctor = await this.clinicService.getDoctorInfo(id);
    return doctor;
  }
}
