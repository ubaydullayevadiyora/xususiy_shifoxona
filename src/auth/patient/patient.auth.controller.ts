import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  Get,
  HttpCode,
} from "@nestjs/common";
import { SignInPatientDto } from "./dto/sign-in.dto";
import { PatientAuthService } from "./patient.auth.service";
import { Response, Request } from "express";
import { CreatePatientDto } from "../../patients/dto/create-patient.dto";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorators";
import { ApiTags, ApiBody } from "@nestjs/swagger";

@ApiTags("patient auth")
@Controller("auth/patient")
export class PatientAuthController {
  constructor(private readonly patientAuthService: PatientAuthService) {}

  @Post("sign-in")
  @ApiBody({ type: SignInPatientDto })
  async signIn(
    @Body() signInDto: SignInPatientDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.patientAuthService.signIn(signInDto, res);
  }

  @Post("sign-up")
  @ApiBody({ type: CreatePatientDto })
  async signUp(@Body() createPatientDto: CreatePatientDto) {
    return this.patientAuthService.signUp(createPatientDto);
  }

  @HttpCode(200)
  @Post("sign-out")
  signout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.patientAuthService.signOut(refreshToken, res);
  }

  @Get("refresh")
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refresh_token = req.cookies?.refresh_token;
    return this.patientAuthService.refreshToken(refresh_token, res);
  }
}
