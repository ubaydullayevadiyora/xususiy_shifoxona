import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from './models/staff.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from "bcrypt";

@Injectable()
export class StaffsService {
  constructor(@InjectModel(Staff) private readonly staffModel: typeof Staff) {}
  async create(createStaffDto: CreateStaffDto): Promise<Staff> {
    const existing = await this.staffModel.findOne({
      where: { email: createStaffDto.email },
    });

    if (existing) {
      throw new ConflictException("Bu email bilan xodim allaqachon mavjud");
    }

    const hashedPassword = await bcrypt.hash(createStaffDto.password, 7);
    const newStaff = await this.staffModel.create({
      ...createStaffDto,
      password: hashedPassword,
    });
    return newStaff;
  }

  async findAll(): Promise<Staff[]> {
    return this.staffModel.findAll();
  }

  async findOne(id: number): Promise<Staff> {
    const staff = await this.staffModel.findByPk(id);
    if (!staff) {
      throw new NotFoundException(`Staff #${id} topilmadi`);
    }
    return staff;
  }

  async update(id: number, updateStaffDto: UpdateStaffDto): Promise<Staff> {
    const staff = await this.findOne(id);

    if (updateStaffDto.password) {
      const hashedPassword = await bcrypt.hash(updateStaffDto.password, 7);
      updateStaffDto.password = hashedPassword;
    }

    Object.assign(staff, updateStaffDto);
    await staff.save();

    return staff;
  }

  async remove(id: number): Promise<{ message: string }> {
    const staff = await this.findOne(id);
    await staff.destroy();
    return { message: `Staff #${id} o'chirildi` };
  }

  async findStaffByEmail(email: string): Promise<Staff> {
    const staff = await this.staffModel.findOne({ where: { email } });
    if (!staff) {
      throw new NotFoundException(`Staff with email ${email} not found`);
    }
    return staff;
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updatePatient = await this.staffModel.update(
      { hashed_refresh_token },
      { where: { id } }
    );
    return updatePatient;
  }
}
