import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./models/admin.model";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin) private readonly adminModel: typeof Admin) {}
  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      password: hashedPassword,
    });
    return newAdmin;
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.findAll();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`Admin #${id} topilmadi`);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.findOne(id);
    Object.assign(admin, updateAdminDto);
    return admin;
  }

  async remove(id: number): Promise<{ message: string }> {
    const admin = await this.findOne(id);
    await admin.destroy();
    return { message: `Admin #${id} o'chirildi` };
  }

  async findAdminByEmail(email: string): Promise<Admin> {
    console.log(email);

    const admin = await this.adminModel.findOne({ where: { email } });
    if (!admin) {
      throw new NotFoundException(`Admin with email ${email} not found`);
    }
    return admin;
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updatePatient = await this.adminModel.update(
      { hashed_refresh_token },
      { where: { id } }
    );
    
    if (updatePatient[0] > 0) {
      return { message: "Refresh token successfully updated" };
    } else {
      return { message: "Admin not found or token not updated" };
    }
  }
}
