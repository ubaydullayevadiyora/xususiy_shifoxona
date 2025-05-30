import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Doctor } from "../../doctors/models/doctor.model";
import { JwtService } from "@nestjs/jwt";
import { SignInDoctorDto } from "./dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { DoctorsService } from "../../doctors/doctors.service";
import { Response } from "express";

@Injectable()
export class DoctorAuthService {
  constructor(
    private readonly doctorService: DoctorsService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(doctor: Doctor) {
    const payload = {
      id: doctor.id,
      email: doctor.email,
      role: "doctor",
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

  async signIn(signInDto: SignInDoctorDto, res: Response) {
    const doctor = await this.doctorService.findDoctorByEmail(signInDto.email);
    if (!doctor) {
      throw new BadRequestException("Email yoki parol noto'g'ri");
    }

    const isMatch = await bcrypt.compare(signInDto.password, doctor.password);

    if (!isMatch) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(doctor);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    doctor.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await doctor.save();

    return {
      message: "Doctor tizimga kirdi",
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
  
      const hashed_refresh_token = null;
      await this.doctorService.updateRefreshToken(
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

    const doctor = await this.doctorService.findOne(payload.id);
    if (!doctor || !doctor.hashed_refresh_token) {
      throw new UnauthorizedException("Token yoki doctor topilmadi");
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      doctor.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mos emas");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(doctor);

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    doctor.hashed_refresh_token = await bcrypt.hash(newRefreshToken, 7);
    await doctor.save();

    return {
      message: "Tokenlar yangilandi",
      accessToken,
    };
  }
}
