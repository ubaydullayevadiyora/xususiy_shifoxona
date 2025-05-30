import { MailService } from "./../../mail/mail.service";
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { Patient } from "../../patients/models/patient.model";
import { JwtService } from "@nestjs/jwt";
import { SignInPatientDto } from "./dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { PatientsService } from "../../patients/patients.service";
import { Response } from "express";
import { CreatePatientDto } from "../../patients/dto/create-patient.dto";
import { v4 as uuidv4 } from "uuid";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class PatientAuthService {
  constructor(
    private readonly patientService: PatientsService,
    private readonly jwtService: JwtService,
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
    private readonly mailService: MailService
  ) {}

  async generateTokens(patient: Patient) {
    const payload = {
      id: patient.id,
      email: patient.email,
      role: "patient",
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

  async signUp(createPatientDto: CreatePatientDto) {
    const candidate = await this.patientService.findPatientByEmail(
      createPatientDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday emailli bemor mavjud");
    }

    const { password, ...otherData } = createPatientDto;

    if (!password) {
      throw new BadRequestException("Parol kiritilmagan");
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const newPatient = await this.patientModel.create({
      ...otherData,
      password: hashedPassword,
      activation_link: uuidv4(),
    });

    // const newPatient = await this.patientModel.create({
    //   ...createPatientDto,
    //   activation_link: uuidv4(),
    // });

    try {
      await this.mailService.sendMail(newPatient);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Email yuborishda xatolik");
    }

    return { message: "Bemor ro'yxatdan o'tdi. Endi emailingizni activlashtiring", patientId: newPatient.id };
  }

  async signIn(signInDto: SignInPatientDto, res: Response) {
    const patient = await this.patientService.findPatientByEmail(
      signInDto.email
    );
    if (!patient) {
      throw new BadRequestException("Email yoki parol noto'g'ri");
    }

    if (!patient.is_active) {
      throw new BadRequestException("Patient hali faollashtirilmagan");
    }

    const isMatch = await bcrypt.compare(signInDto.password, patient.password);

    if (!isMatch) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(patient);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    patient.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await patient.save();

    return {
      message: "Patient tizimga kirdi",
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
    await this.patientService.updateRefreshToken(
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

    const patient = await this.patientService.findOne(payload.id);
    if (!patient || !patient.hashed_refresh_token) {
      throw new UnauthorizedException("Token yoki patient topilmadi");
    }

    const isMatch = await bcrypt.compare(
      refresh_token,
      patient.hashed_refresh_token
    );
    if (!isMatch) {
      throw new UnauthorizedException("Token mos emas");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(patient);

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME_REFRESH),
    });

    patient.hashed_refresh_token = await bcrypt.hash(newRefreshToken, 7);
    await patient.save();

    return {
      message: "Tokenlar yangilandi",
      accessToken,
    };
  }

  async verifyEmail(activation_link: string) {
    const patient =
      await this.patientService.findPatientByActivationLink(activation_link);

    if (!patient) {
      throw new BadRequestException("Noto'g'ri yoki eskirgan link");
    }

    if (patient.is_verified) {
      return { message: "Email allaqachon tasdiqlangan" };
    }

    patient.is_verified = true;
    patient.is_active = true;
    await patient.save();

    return { message: "Email tasdiqlandi. Endi sign in qilishingiz mumkin" };
  }
}
