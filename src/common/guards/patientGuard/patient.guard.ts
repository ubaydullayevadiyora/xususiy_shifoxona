import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";

@Injectable()
export class PatientGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const req: any = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new ForbiddenException("Foydalanuvchi p topilmadi");
    }

    if (user.role !== "patient") {
      throw new ForbiddenException("Sizda ushbu sahifaga kirish huquqi yo''q");
    }

    return true;
  }
}
