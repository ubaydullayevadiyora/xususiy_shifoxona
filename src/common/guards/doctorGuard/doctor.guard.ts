import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

@Injectable()
export class DoctorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: any = context.switchToHttp().getRequest();
    const user = req.user;
    console.log(user);
    
    if (!user) {
      throw new ForbiddenException("doctor topilmadi");
    }

    if (user.role !== "doctor") {
      throw new ForbiddenException("Faqat shifokorlar uchun ruxsat berilgan");
    }

    return true;
  }
}
