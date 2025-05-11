import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";

@Injectable()
export class AdminGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const req: any = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new ForbiddenException("Foydalanuvchii topilmadi");
    }

    if (user.role !== "admin") {
      throw new ForbiddenException("Sizdaa ushbu sahifaga kirish huquqi yo'q");
    }

    return true;
  }
}
