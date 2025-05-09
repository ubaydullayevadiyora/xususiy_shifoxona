import { Module } from '@nestjs/common';
import { RoomAssignmentsService } from './room-assignments.service';
import { RoomAssignmentsController } from './room-assignments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoomAssignment } from './models/room-assignment.model';

@Module({
  imports: [SequelizeModule.forFeature([RoomAssignment])],
  controllers: [RoomAssignmentsController],
  providers: [RoomAssignmentsService],
  exports:[RoomAssignmentsService]
})
export class RoomAssignmentsModule {}
