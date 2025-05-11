import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { Prescription } from "./models/prescription.model";

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectModel(Prescription)
    private readonly prescriptionModel: typeof Prescription
  ) {}

  async create(createPrescriptionDto: CreatePrescriptionDto) {
    const { diagnosisId, appointmentId, medicines, dosage, instructions } =
      createPrescriptionDto;

    const newPrescription = await this.prescriptionModel.create({
      diagnosisId,
      appointmentId,
      medicines,
      dosage,
      instructions,
    });

    return newPrescription;
  }

  async findAll(): Promise<Prescription[]> {
    return await this.prescriptionModel.findAll();
  }

  async findOne(id: number): Promise<Prescription> {
    const prescription = await this.prescriptionModel.findByPk(id);
    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }
    return prescription;
  }

  async update(
    id: number,
    updatePrescriptionDto: UpdatePrescriptionDto
  ): Promise<Prescription> {
    const prescription = await this.prescriptionModel.findByPk(id);
    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }
    await prescription.update(updatePrescriptionDto);
    return prescription;
  }

  async remove(id: number): Promise<void> {
    const prescription = await this.prescriptionModel.findByPk(id);
    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }
    await prescription.destroy();
  }
}
