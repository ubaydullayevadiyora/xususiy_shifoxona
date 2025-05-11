import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLabTestDto } from './dto/create-lab-test.dto';
import { UpdateLabTestDto } from './dto/update-lab-test.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LabTest } from './models/lab-test.model';

@Injectable()
export class LabTestsService {
  constructor(
    @InjectModel(LabTest)
    private readonly labTestModel: typeof LabTest
  ) {}

  async create(
    createLabTestDto: CreateLabTestDto
  ): Promise<LabTest> {
    return await this.labTestModel.create(createLabTestDto);
  }

  async findAll(): Promise<LabTest[]> {
    return await this.labTestModel.findAll();
  }

  async findOne(id: number): Promise<LabTest> {
    const labTest = await this.labTestModel.findByPk(id);
    if (!labTest) {
      throw new NotFoundException(`LabTest with ID ${id} not found`);
    }
    return labTest;
  }

  async update(
    id: number,
    updateLabTestDto: UpdateLabTestDto
  ): Promise<LabTest> {
    const labTest = await this.labTestModel.findByPk(id);
    if (!labTest) {
      throw new NotFoundException(`LabTest with ID ${id} not found`);
    }
    await labTest.update(updateLabTestDto);
    return labTest;
  }

  async remove(id: number): Promise<void> {
    const labTest = await this.labTestModel.findByPk(id);
    if (!labTest) {
      throw new NotFoundException(`LabTest with ID ${id} not found`);
    }
    await labTest.destroy();
  }
}
