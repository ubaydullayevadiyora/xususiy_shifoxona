import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import * as bcrypt from "bcrypt";
import { Room } from "../rooms/models/room.model";
import { RoomAssignment } from "../room-assignments/models/room-assignment.model";

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor) private readonly doctorModel: typeof Doctor,
    @InjectModel(RoomAssignment)private roomAssignmentModel: typeof RoomAssignment,
    @InjectModel(Room)private roomsModel: typeof Room
  ) {}
  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const existing = await this.doctorModel.findOne({
      where: { email: createDoctorDto.email },
    });

    if (existing) {
      throw new ConflictException("Bu email bilan xodim allaqachon mavjud");
    }

    const hashedPassword = await bcrypt.hash(createDoctorDto.password, 7);
    const newDoctor = await this.doctorModel.create({
      ...createDoctorDto,
      password: hashedPassword,
    });
    return newDoctor;
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorModel.findAll();
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorModel.findByPk(id);
    if (!doctor) {
      throw new NotFoundException(`Doctor not found`);
    }
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.findOne(id);
    return doctor.update(updateDoctorDto);
  }

  async remove(id: number): Promise<void> {
    const doctor = await this.findOne(id);
    await doctor.destroy();
  }

  async findDoctorByEmail(email: string): Promise<Doctor> {
    const doctor = await this.doctorModel.findOne({ where: { email } });
    if (!doctor) {
      throw new NotFoundException(`Doctor with email ${email} not found`);
    }
    return doctor;
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updatePatient = await this.doctorModel.update(
      { hashed_refresh_token },
      { where: { id } }
    );
    return updatePatient;
  }
}
