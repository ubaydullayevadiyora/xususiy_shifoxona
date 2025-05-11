import { Module } from "@nestjs/common";
import { RoomAssignmentsService } from "./room-assignments.service";
import { RoomAssignmentsController } from "./room-assignments.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { RoomAssignment } from "./models/room-assignment.model";
import { AppointmentsModule } from "../appointments/appointments.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [SequelizeModule.forFeature([RoomAssignment]), AppointmentsModule, JwtModule],
  controllers: [RoomAssignmentsController],
  providers: [RoomAssignmentsService],
  exports: [RoomAssignmentsService],
})
export class RoomAssignmentsModule {}
