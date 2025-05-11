import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Appointment } from "./models/appointment.model";

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment)
    private readonly appointmentModel: typeof Appointment
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto
  ): Promise<Appointment> {
    return await this.appointmentModel.create(createAppointmentDto);
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentModel.findAll();
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentModel.findByPk(id);
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto
  ): Promise<Appointment> {
    const appointment = await this.appointmentModel.findByPk(id);
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    await appointment.update(updateAppointmentDto);
    return appointment;
  }

  async remove(id: number): Promise<void> {
    const appointment = await this.appointmentModel.findByPk(id);
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    await appointment.destroy();
  }

  // async findByPatientId(patientId: number): Promise<Appointment[]> {
  //   return this.appointmentModel.findAll({
  //     where: { patientId },
  //   });
  // }
}
