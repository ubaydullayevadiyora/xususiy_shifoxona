import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { SignInDoctorDto } from "./dto/sign-in.dto";
import { DoctorAuthService } from "./doctor.auth.service";
import { Request, Response } from "express";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorators";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Doctor Auth")
@Controller("auth/doctor")
export class DoctorAuthController {
  constructor(private readonly doctorAuthService: DoctorAuthService) {}

  @Post("sign-in")
  @ApiOperation({ summary: "Doktor tizimga kiradi (sign-in)" })
  @ApiBody({ type: SignInDoctorDto })
  @ApiResponse({
    status: 200,
    description:
      "Doktor tizimga muvaffaqiyatli kirdi. Access token qaytariladi",
  })
  @ApiResponse({ status: 400, description: "Email yoki parol noto'g'ri" })
  @ApiResponse({ status: 401, description: "Ruxsat yo'q" })
  async signIn(
    @Body() singInDto: SignInDoctorDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.doctorAuthService.signIn(singInDto, res);
  }

  @Post("sign-out")
  @HttpCode(200)
  @ApiOperation({ summary: "Doktor tizimdan chiqadi (sign-out)" })

  @ApiResponse({ status: 200, description: "Doktor tizimdan chiqdi" })
  @ApiResponse({
    status: 403,
    description: "Foydalanuvchi topilmadi yoki token noto'g'ri",
  })
  signout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.doctorAuthService.signOut(refreshToken, res);
  }

  @Get("refresh")
  @ApiOperation({ summary: "Doktor uchun tokenlarni yangilash" })
  
  @ApiResponse({
    status: 200,
    description: "Yangi access va refresh tokenlar qaytarildi",
  })
  @ApiResponse({
    status: 401,
    description: "Eskirgan yoki noto'g'ri refresh token",
  })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refresh_token = req.cookies?.refresh_token;
    return this.doctorAuthService.refreshToken(refresh_token, res);
  }
}
