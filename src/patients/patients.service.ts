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
import { Diagnosis } from "../diagnoses/models/diagnosis.model";
import { Prescription } from "../prescriptions/models/prescription.model";
import { Appointment } from "../appointments/models/appointment.model";

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
    private readonly mailService: MailService,
    // @InjectModel(Diagnosis) private readonly diagnosisModel: typeof Diagnosis,
    // @InjectModel(Prescription)
    // private readonly prescriptionModel: typeof Prescription,
    // @InjectModel(Appointment)
    // private readonly appointmentModel: typeof Appointment
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
    return await this.patientModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const patient = await this.patientModel.findByPk(id);
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const [updatedCount] = await this.patientModel.update(updatePatientDto, {
      where: { id },
    });
    if (!updatedCount) throw new NotFoundException('Patient not found');
    return this.findOne(id);
  }

  async remove(id: number) {
    const deletedCount = await this.patientModel.destroy({ where: { id } });
    if (!deletedCount) throw new NotFoundException('Patient not found');
    return { message: 'Patient deleted successfully' };
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

  async findPatientByActivationLink(link: string): Promise<Patient | null> {
    return this.patientModel.findOne({ where: { activation_link: link } });
  }

  async verifyEmail(activationLink: string) {
    const patient = await this.findPatientByActivationLink(activationLink);
    if (!patient) {
      throw new BadRequestException("Noto'g'ri yoki eskirgan link");
    }

    if (patient.is_verified) {
      return { message: "Email allaqachon tasdiqlangan" };
    }

    if (patient.is_active) {
      return { message: "bemor allaqachon active!" };
    }

    patient.is_active = true;
    patient.is_verified = true;
    await patient.save();

    return { message: "Email tasdiqlandi. Endi sign-in qilishingiz mumkin" };
  }

  // async findDiagnosisByPatientId(patientId: number): Promise<Diagnosis[]> {
  //   return this.diagnosisModel.findAll({
  //     where: { appointmentId },
  //     include: [Appointment],
  //   });
  // }

  // async findPrescriptionsByPatientId(
  //   patientId: number
  // ): Promise<Prescription[]> {
  //   return this.prescriptionModel.findAll({
  //     where: {patientId },
  //   });
  // }
}
