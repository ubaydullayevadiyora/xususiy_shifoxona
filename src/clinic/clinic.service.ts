import { Injectable } from "@nestjs/common";
import { Doctor } from "../doctors/models/doctor.model";
import { Patient } from "../patients/models/patient.model";
import { Room } from "../rooms/models/room.model";
import { Appointment } from "../appointments/models/appointment.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class ClinicService {
  constructor(
    @InjectModel(Appointment) private appointmentRepo: typeof Appointment,
    @InjectModel(Patient) private patientRepo: typeof Patient,
    @InjectModel(Doctor) private doctorRepo: typeof Doctor
  ) {}

  async getMyPatients(doctorId: number) {
    return this.appointmentRepo.findAll({
      where: { doctorId },
      include: [{ model: Patient }],
      group: ["Appointment.id", "patient.id"],
    });
  }

  async getMyAppointments(patientId: number) {
    return this.appointmentRepo.findAll({
      where: { patientId },
      include: [{ model: Doctor, include: [Room] }, { model: Room }],
      order: [["dateTime", "DESC"]],
    });
  }

  async getDoctorRoomInfo(doctorId: number) {
    return this.doctorRepo.findByPk(doctorId, {
      include: [Room],
    });
  }
}
