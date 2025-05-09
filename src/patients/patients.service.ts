import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
    private readonly mailService: MailService
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    const { password, ...otherData } = createPatientDto;

    if (!password) {
      throw new BadRequestException("Parol kiritilmagan");
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const newPatient = await this.patientModel.create({
      ...otherData,
      password: hashedPassword,
    });

    try {
      await this.mailService.sendMail(newPatient);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Email yuborishda xatolik");
    }

    return newPatient;
  }

  async findAll(): Promise<Patient[]> {
    return await this.patientModel.findAll();
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientModel.findByPk(id);
    if (!patient) {
      throw new NotFoundException(`Patient with id ${id} not found`);
    }
    return patient;
  }

  async update(
    id: number,
    updatePatientDto: UpdatePatientDto
  ): Promise<Patient> {
    const patient = await this.findOne(id);
    return await patient.update(updatePatientDto);
  }

  async remove(id: number): Promise<void> {
    const patient = await this.findOne(id);
    await patient.destroy();
  }

  async findPatientByEmail(email: string): Promise<Patient | null> {
    return await this.patientModel.findOne({ where: { email } });
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updatePatient = await this.patientModel.update(
      { hashed_refresh_token },
      { where: { id } }
    );
    return updatePatient;
  }
}
