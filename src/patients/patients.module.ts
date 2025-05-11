import { Module } from "@nestjs/common";
import { PatientsService } from "./patients.service";
import { PatientsController } from "./patients.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import { MailModule } from "../mail/mail.module";
import { JwtModule } from "@nestjs/jwt";
import { DoctorsModule } from "../doctors/doctors.module";
import { RoomAssignmentsModule } from "../room-assignments/room-assignments.module";
import { Appointment } from "../appointments/models/appointment.model";
import { AppointmentsModule } from "../appointments/appointments.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Patient]),
    MailModule,
    JwtModule,
    DoctorsModule,
    RoomAssignmentsModule,
    AppointmentsModule
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService, SequelizeModule],
})
export class PatientsModule {}
