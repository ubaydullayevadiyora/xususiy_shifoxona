import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Staff } from "../../staffs/models/staff.model";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { StaffsService } from "../../staffs/staffs.service";
import { Response } from "express";
import { SignInStaffdto } from "./dto/sign-in.dto";

@Injectable()
export class StaffAuthService {
  constructor(
    private readonly staffService: StaffsService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(staff: Staff) {
    const payload = {
      id: staff.id,
      email: staff.email,
      role: "staff",
      staffRole: staff.staff_name,
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

  async signIn(signInDto: SignInStaffdto, res: Response) {
    const staff = await this.staffService.findStaffByEmail(signInDto.email);
    if (!staff) {
      throw new BadRequestException("Email yoki parol noto'g'ri");
    }

    const allowedRoles = ["IT hamshira", "kassir"];
    if (!allowedRoles.includes(staff.staff_name)) {
      throw new ForbiddenException(
        "Faqat IT hamshira yoki Kassir tizimga kirishi mumkin"
      );
    }

    const isMatch = await bcrypt.compare(signInDto.password, staff.password);
    if (!isMatch) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(staff);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    staff.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    staff.is_active = true;
    await staff.save();

    return {
      message: `${staff.staff_name} tizimga kirdi`,
      accessToken,
      refreshToken
    };
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!userData) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }

    await this.staffService.updateRefreshToken(userData.id, null);

    res.clearCookie("refresh_token");
    return {
      message: "User logged out successfully",
    };
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

    const staff = await this.staffService.findOne(payload.id);
    if (!staff || !staff.hashed_refresh_token) {
      throw new UnauthorizedException("Token yoki foydalanuvchi topilmadi");
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      staff.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mos emas");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(staff);

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    staff.hashed_refresh_token = await bcrypt.hash(newRefreshToken, 7);
    await staff.save();

    return {
      message: "Tokenlar yangilandi",
      accessToken,
    };
  }
}
