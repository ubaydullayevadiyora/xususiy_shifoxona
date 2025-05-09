import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class PatientGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }

    if (user.role !== "patient") {
      throw new ForbiddenException("Sizda ushbu sahifaga kirish huquqi yo'q");
    }

    return true;
  }
}
