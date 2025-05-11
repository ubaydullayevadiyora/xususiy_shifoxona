import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("Token mavjud emas");
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException("Token formati noto'g'ri");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      if (!payload || payload.is_active === false) {
        throw new UnauthorizedException("Token yaroqsiz yoki faol emas");
      }

      req.user = payload; 
      return true;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException("Token tekshiruvida xatolik");
    }
  }
}
