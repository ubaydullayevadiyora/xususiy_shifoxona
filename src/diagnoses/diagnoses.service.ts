import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Diagnosis } from './models/diagnosis.model';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';

@Injectable()
export class DiagnosesService {
  constructor(
    @InjectModel(Diagnosis)
    private readonly diagnoseModel: typeof Diagnosis
  ) {}

  async create(createDiagnoseDto: CreateDiagnosisDto): Promise<Diagnosis> {
    try {
      return await this.diagnoseModel.create(createDiagnoseDto);
    } catch (error) {
      console.error(error);
      throw new Error("Diagnosis yaratishda xatolik");
    }
  }

  async findAll(): Promise<Diagnosis[]> {
    return await this.diagnoseModel.findAll();
  }

  async findOne(id: number): Promise<Diagnosis> {
    const diagnose = await this.diagnoseModel.findByPk(id);
    if (!diagnose) {
      throw new NotFoundException(`Diagnose with ID ${id} not found`);
    }
    return diagnose;
  }

  async update(
    id: number,
    updateDiagnoseDto: UpdateDiagnosisDto
  ): Promise<Diagnosis> {
    const diagnose = await this.diagnoseModel.findByPk(id);
    if (!diagnose) {
      throw new NotFoundException(`Diagnose with ID ${id} not found`);
    }
    await diagnose.update(updateDiagnoseDto);
    return diagnose;
  }

  async remove(id: number): Promise<void> {
    const diagnose = await this.diagnoseModel.findByPk(id);
    if (!diagnose) {
      throw new NotFoundException(`Diagnose with ID ${id} not found`);
    }
    await diagnose.destroy();
  }
}