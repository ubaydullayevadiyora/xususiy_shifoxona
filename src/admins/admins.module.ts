import { AdminsController } from './admins.controller';
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import { PatientsService } from "../patients/patients.service";
import { PatientsController } from "../patients/patients.controller";
import { AdminsService } from "./admins.service";

@Module({
  imports: [SequelizeModule.forFeature([Admin])],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
