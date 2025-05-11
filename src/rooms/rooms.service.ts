import { Injectable } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Room } from "./models/room.model";

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room) private readonly roomModel: typeof Room) {}

  async create(createRoomDto: CreateRoomDto) {
    try {
      const newRoom = await this.roomModel.create(createRoomDto);
      return newRoom;
    } catch (error) {
      console.error("Error creating room:", error);
      throw new Error("Error creating room");
    }
  }

  async findAll() {
    return await this.roomModel.findAll();
  }

  async findOne(id: number) {
    const room = await this.roomModel.findByPk(id);
    if (!room) {
      throw new Error(`Room with id ${id} not found`);
    }
    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.findOne(id);
    return await room.update(updateRoomDto);
  }

  async remove(id: number) {
    const room = await this.findOne(id);
    await room.destroy();
    return { message: `Room with id ${id} has been removed` };
  }
}
