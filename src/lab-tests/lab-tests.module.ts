import { forwardRef, Module } from "@nestjs/common";
import { LabTestsService } from "./lab-tests.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { LabTest } from "./models/lab-test.model";
import { LabTestsController } from "./lab-tests.controller";
import { PatientsModule } from "../patients/patients.module";
import { DoctorsModule } from "../doctors/doctors.module";
import { RoomAssignmentsModule } from "../room-assignments/room-assignments.module";
import { AppointmentsModule } from "../appointments/appointments.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    SequelizeModule.forFeature([LabTest]),
    JwtModule
  ],
  controllers: [LabTestsController],
  providers: [LabTestsService],
  exports: [LabTestsService],
})
export class LabTestsModule {}
