import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Admin } from "../../admins/models/admin.model";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { SignInAdminDto } from "./dto/admin.auth.dto";
import { AdminsService } from "../../admins/admins.service";

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly adminService: AdminsService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      role: "admin",
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(signInAdminDto: SignInAdminDto, res: Response) {
    const admin = await this.adminService.findAdminByEmail(
      signInAdminDto.email
    );

    if (!admin) {
      throw new BadRequestException("Email yoki parol noto'g'ri");
    }

    // if (!admin.is_active) {
    //   throw new BadRequestException("Admin hali faollashtirilmagan");
    // }

    const isMatch = await bcrypt.compare(
      signInAdminDto.password,
      admin.password
    );

    if (!isMatch) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    admin.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();

    return {
      message: "Admin tizimga kirdi",
      accessToken,
    };
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }

    const hashed_refresh_token = null;
    await this.adminService.updateRefreshToken(
      userData.id,
      hashed_refresh_token
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out successfully",
    };
    return response;
  }

  async refreshToken(refresh_token: string, res: Response) {
    if (!refresh_token) {
      throw new UnauthorizedException("Refresh token mavjud emas");
    }

    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException("Token noto'g'ri yoki eskirgan");
    }

    const admin = await this.adminService.findOne(payload.id);
    if (!admin || !admin.hashed_refresh_token) {
      throw new UnauthorizedException("Token yoki admin topilmadi");
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      admin.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mos emas");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(admin);

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    admin.hashed_refresh_token = await bcrypt.hash(newRefreshToken, 7);
    await admin.save();

    return {
      message: "Tokenlar yangilandi",
      accessToken,
    };
  }
}
