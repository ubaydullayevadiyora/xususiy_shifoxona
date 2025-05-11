import { Module } from "@nestjs/common";
import { PrescriptionsService } from "./prescriptions.service";
import { PrescriptionsController } from "./prescriptions.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Prescription } from "./models/prescription.model";
import { PatientsModule } from "../patients/patients.module";
import { DoctorsModule } from "../doctors/doctors.module";
import { RoomAssignmentsModule } from "../room-assignments/room-assignments.module";
import { AppointmentsModule } from "../appointments/appointments.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    SequelizeModule.forFeature([Prescription]),PatientsModule, DoctorsModule, RoomAssignmentsModule, AppointmentsModule, JwtModule
  ],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],
  exports: [PrescriptionsService],
})
export class PrescriptionsModule {}
