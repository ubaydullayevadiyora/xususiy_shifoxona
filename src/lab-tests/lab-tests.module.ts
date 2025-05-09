import { Module } from '@nestjs/common';
import { LabTestsService } from './lab-tests.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { LabTest } from './models/lab-test.model';
import { LabTestsController } from './lab-tests.controller';

@Module({
  imports: [SequelizeModule.forFeature([LabTest])],
  controllers: [LabTestsController],
  providers: [LabTestsService],
  exports:[LabTestsService]
})
export class LabTestsModule {}
