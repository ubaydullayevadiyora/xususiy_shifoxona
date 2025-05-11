import { Module } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { RoomsController } from "./rooms.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Room } from "./models/room.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [SequelizeModule.forFeature([Room]),  JwtModule
],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
