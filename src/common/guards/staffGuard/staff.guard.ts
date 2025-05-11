import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { StaffNameEnum } from "../../../app.constants";

@Injectable()
export class StaffGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: any = context.switchToHttp().getRequest();
    const user = req.user;

    if (
      user?.role === "staff" &&
      user?.staffRole === StaffNameEnum.ITHAMSHIRA
    ) {
      return true;
    }

    throw new ForbiddenException("Sizga ushbu sahifaga kirishga ruxsat yoq");
  }
}

@Injectable()
export class CashierGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user?.role === "staff" && user?.staffRole === StaffNameEnum.KASSIR) {
      return true;
    }

    throw new ForbiddenException("Siz kassir sifatida kirishingiz kerak");
  }
}
