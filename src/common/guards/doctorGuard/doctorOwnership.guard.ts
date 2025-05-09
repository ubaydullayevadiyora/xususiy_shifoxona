import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PatientsService } from "../../../patients/patients.service";
import { DoctorsService } from "../../../doctors/doctors.service";
import { RoomAssignmentsService } from "../../../room-assignments/room-assignments.service";


@Injectable()
export class DoctorOwnershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private patientService: PatientsService,
    private doctorService: DoctorsService,
    private roomAssignmentService: RoomAssignmentsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }

    if (user.role !== "doctor") {
      throw new ForbiddenException("Sizda ushbu sahifaga kirish huquqi yo'q");
    }

    const resourceId = +request.params.id;

    const patient = await this.patientService.findOne(resourceId);
    if (patient) {
      const isAssigned = await this.roomAssignmentService.isAssigned(
        patient.id,
        user.id
      );
      if (!isAssigned) {
        throw new ForbiddenException("Siz bu bemorga biriktirilmagansiz");
      }
    }

    const doctor = await this.doctorService.findOne(resourceId);
    if (doctor && doctor.id !== user.id) {
      throw new ForbiddenException("Sizning profilingizga kirish huquqi yo'q");
    }

    return true;
  }
}
