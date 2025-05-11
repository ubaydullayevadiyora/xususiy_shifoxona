import { Module } from "@nestjs/common";
import { DiagnosesService } from "./diagnoses.service";
import { DiagnosesController } from "./diagnoses.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Diagnosis } from "./models/diagnosis.model";
import { DoctorOwnershipGuard } from "../common/guards/doctorGuard/doctorOwnership.guard";
import { PatientsModule } from "../patients/patients.module";
import { DoctorsModule } from "../doctors/doctors.module";
import { RoomAssignmentsService } from "../room-assignments/room-assignments.service";
import { RoomAssignmentsModule } from "../room-assignments/room-assignments.module";
import { AppointmentsModule } from "../appointments/appointments.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [SequelizeModule.forFeature([Diagnosis]), PatientsModule, DoctorsModule, RoomAssignmentsModule, AppointmentsModule, JwtModule],
  controllers: [DiagnosesController],
  providers: [DiagnosesService, DoctorOwnershipGuard],
  exports: [DiagnosesService],
})
export class DiagnosesModule {}
