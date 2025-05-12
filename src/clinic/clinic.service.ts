import { Injectable, NotFoundException } from "@nestjs/common";
import { Doctor } from "../doctors/models/doctor.model";
import { Patient } from "../patients/models/patient.model";
import { Room } from "../rooms/models/room.model";
import { Appointment } from "../appointments/models/appointment.model";
import { InjectModel } from "@nestjs/sequelize";
import { Staff } from "../staffs/models/staff.model";
import { Payment } from "../payments/models/payment.model";

@Injectable()
export class ClinicService {
  constructor(
    @InjectModel(Appointment) private appointmentModel: typeof Appointment,
    @InjectModel(Patient) private patientModel: typeof Patient,
    @InjectModel(Doctor) private doctorModel: typeof Doctor
  ) {}

  async getMyPatients(doctorId: number) {
    return this.appointmentModel.findAll({
      where: { doctorId },
      include: [{ model: Patient }],
      group: ["Appointment.id", "patient.id"],
    });
  }

  async getMyAppointments(patientId: number) {
    return this.appointmentModel.findAll({
      where: { patientId },
      include: [
        {
          model: Doctor,
          include: [Room],
        },
        {
          model: Payment, 
        },
        {
          model: Patient, 
        },
      ],
      order: [["start_date", "DESC"]],
    });
  }

  async getDoctorRoomInfo(doctorId: number) {
    return this.doctorModel.findByPk(doctorId, {
      include: [Room],
    });
  }

  async getDoctorInfo(id: number) {
    const doctor = await this.doctorModel.findByPk(id, {
      attributes: [
        "id",
        "first_name",
        "last_name",
        "specialty",
        "phone_number",
        "email",
      ],
      include: [
        {
          model: Room,
          attributes: ["room_number", "room_type", "status", "floor"],
        },
        {
          model: Staff,
          attributes: [
            "first_name",
            "last_name",
            "phone_number",
            "email",
            "password",
            "staff_name",
          ],
        },
      ],
    });

    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }

    return doctor;
  }
}
