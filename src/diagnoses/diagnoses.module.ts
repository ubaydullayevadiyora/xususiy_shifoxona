import { Module } from "@nestjs/common";
import { DiagnosesService } from "./diagnoses.service";
import { DiagnosesController } from "./diagnoses.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Diagnosis } from "./models/diagnosis.model";

@Module({
  imports: [SequelizeModule.forFeature([Diagnosis])],
  controllers: [DiagnosesController],
  providers: [DiagnosesService],
  exports: [DiagnosesService],
})
export class DiagnosesModule {}
