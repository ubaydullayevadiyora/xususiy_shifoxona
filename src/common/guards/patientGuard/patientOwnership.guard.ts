import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AppointmentsService } from "../../../appointments/appointments.service";

@Injectable()
export class PatientOwnershipGuard implements CanActivate {
  constructor(
    private readonly appointmentService: AppointmentsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const appointmentId = Number(request.params.id);

    const appointment = await this.appointmentService.findOne(appointmentId);

    if (!appointment) {
      throw new NotFoundException("Uchrashuv topilmadi");
    }

    if (appointment.patientId !== user.id) {
      throw new ForbiddenException("Siz bu uchrashuvga kirishga haqli emassiz");
    }

  //   // ________________

  //   const diagnosisId = Number(request.params.id);

  //   const diagnosis = await this.diagnosesService.findOne(diagnosisId);

  //   if (!diagnosis) {
  //     throw new NotFoundException("Uchrashuv topilmadi");
  //   }

  //   if (diagnosis.patientId !== user.id) {
  //     throw new ForbiddenException("bu diagnose sizga tegishli emas");
  //   }

    return true;
  }
}
