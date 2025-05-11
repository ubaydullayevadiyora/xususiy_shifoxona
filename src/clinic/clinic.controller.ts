import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ClinicService } from "./clinic.service";
import { DoctorGuard } from "../common/guards/doctorGuard/doctor.guard";
import { PatientGuard } from "../common/guards/patientGuard/patient.guard";

@Controller("clinic")
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Get("my-patients")
  @UseGuards(DoctorGuard)
  async getMyPatients(@Req() req) {
    const doctorId = req.user.id;
    return this.clinicService.getMyPatients(doctorId);
  }

  @Get("my-appointments")
  @UseGuards(PatientGuard)
  async getMyAppointments(@Req() req) {
    const patientId = req.user.id;
    return this.clinicService.getMyAppointments(patientId);
  }

  @Get("my-room-info")
  @UseGuards(DoctorGuard)
  async getMyRoomInfo(@Req() req) {
    const doctorId = req.user.id;
    return this.clinicService.getDoctorRoomInfo(doctorId);
  }
}
