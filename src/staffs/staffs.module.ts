import {  Module } from "@nestjs/common";
import { StaffsService } from "./staffs.service";
import { StaffsController } from "./staffs.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Staff } from "./models/staff.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    SequelizeModule.forFeature([Staff]),JwtModule

  ],
  controllers: [StaffsController],
  providers: [StaffsService],
  exports: [StaffsService, SequelizeModule],
})
export class StaffsModule {}
