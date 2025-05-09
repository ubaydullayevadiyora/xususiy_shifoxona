import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRoomAssignmentDto } from "./dto/create-room-assignment.dto";
import { UpdateRoomAssignmentDto } from "./dto/update-room-assignment.dto";
import { RoomAssignment } from "./models/room-assignment.model";

@Injectable()
export class RoomAssignmentsService {
  constructor(
    @InjectModel(RoomAssignment)
    private readonly roomAssignmentModel: typeof RoomAssignment
  ) {}

  async create(createDto: CreateRoomAssignmentDto): Promise<RoomAssignment> {
    return this.roomAssignmentModel.create(createDto);
  }

  async findAll(): Promise<RoomAssignment[]> {
    return this.roomAssignmentModel.findAll();
  }

  async findOne(id: number): Promise<RoomAssignment> {
    const assignment = await this.roomAssignmentModel.findByPk(id);
    if (!assignment) {
      throw new NotFoundException(`RoomAssignment ID ${id} topilmadi`);
    }
    return assignment;
  }

  async update(
    id: number,
    updateDto: UpdateRoomAssignmentDto
  ): Promise<RoomAssignment> {
    const assignment = await this.findOne(id);
    await assignment.update(updateDto);
    return assignment;
  }

  async remove(id: number): Promise<void> {
    const assignment = await this.findOne(id);
    await assignment.destroy();
  }

  async isAssigned(patientId: number, doctorId: number): Promise<boolean> {
    const assignment = await this.roomAssignmentModel.findOne({
      where: {
        patient_id: patientId,
        doctor_id: doctorId,
        released_at: null,
      },
    });
    return !!assignment;
  }
}
