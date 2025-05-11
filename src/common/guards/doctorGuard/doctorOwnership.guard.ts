import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { PatientsService } from "../../../patients/patients.service";
import { DoctorsService } from "../../../doctors/doctors.service";
import { RoomAssignmentsService } from "../../../room-assignments/room-assignments.service";

@Injectable()
export class DoctorOwnershipGuard implements CanActivate {
  constructor(
    private patientService: PatientsService,
    private doctorService: DoctorsService,
    private roomAssignmentService: RoomAssignmentsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Foydalanuvchi mavjudligini tekshirish
    if (!user) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }

    // Foydalanuvchi doktor ekanligini tekshirish
    if (user.role !== "doctor") {
      throw new ForbiddenException(
        "Siz doktor sifatida ro'yxatdan o'tmagansiz"
      );
    }

    // Resurs ID sini olish
    const resourceId = request.params.id;

    // Konsolga chiqarib tekshirish
    console.log("Resource ID:", resourceId); // id ni tekshirish uchun

    // ID bo'sh yoki noto'g'ri formatda bo'lsa
    if (!resourceId || isNaN(Number(resourceId))) {
      throw new BadRequestException("ID noto'g'ri formatda");
    }

    // ID ni raqamga aylantirish
    const numericResourceId = Number(resourceId);

    // Agar resurs bemor bo'lsa, bemorga tegishli bo'lib tekshirish
    const patient = await this.patientService.findOne(numericResourceId);
    if (patient) {
      const isAssigned = await this.roomAssignmentService.isAssigned(
        patient.id,
        user.id
      );
      if (!isAssigned) {
        throw new ForbiddenException("Siz bu bemorga biriktirilmagansiz");
      }
      return true;
    }

    // Agar resurs doktor bo'lsa, doktor profilini tekshirish
    const doctor = await this.doctorService.findOne(numericResourceId);
    if (doctor) {
      if (doctor.id !== user.id) {
        throw new ForbiddenException(
          "Siz boshqa doktorga tegishli profilingizga kira olmaysiz"
        );
      }
      return true;
    }

    // Agar resurs topilmasa
    throw new ForbiddenException("Resurs topilmadi");
  }
}
