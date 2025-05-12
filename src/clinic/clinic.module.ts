import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Doctor } from "../doctors/models/doctor.model";
import { Patient } from "../patients/models/patient.model";
import { Appointment } from "../appointments/models/appointment.model";
import { Room } from "../rooms/models/room.model";
import { ClinicController } from "./clinic.controller";
import { ClinicService } from "./clinic.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [SequelizeModule.forFeature([Doctor, Patient, Appointment, Room]), JwtModule],
  controllers: [ClinicController],
  providers: [ClinicService],
})
export class ClinicModule {}
