import { RoomAssignmentsModule } from 'src/room-assignments/room-assignments.module';
import { Module } from "@nestjs/common";
import { AppointmentsService } from "./appointments.service";
import { AppointmentsController } from "./appointments.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Appointment } from "./models/appointment.model";
import { JwtModule } from "@nestjs/jwt";
import { PatientsModule } from "../patients/patients.module";
import { DoctorsModule } from "../doctors/doctors.module";
import { DiagnosesModule } from '../diagnoses/diagnoses.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Appointment]),JwtModule, PatientsModule, DoctorsModule
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
