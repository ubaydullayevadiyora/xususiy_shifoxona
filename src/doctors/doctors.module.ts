import { Module } from "@nestjs/common";
import { DoctorsService } from "./doctors.service";
import { DoctorsController } from "./doctors.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import { RoomAssignment } from "../room-assignments/models/room-assignment.model";
import { Room } from "../rooms/models/room.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    SequelizeModule.forFeature([Doctor, RoomAssignment, Room]), JwtModule
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}
