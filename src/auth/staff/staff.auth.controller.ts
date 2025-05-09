import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorators";
import { StaffAuthService } from "./staff.auth.service";
import { SignInStaffdto } from "./dto/sign-in.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Staff Authentication")
@Controller("auth/staff")
export class StaffAuthController {
  constructor(private readonly staffAuthService: StaffAuthService) {}

  @ApiOperation({ summary: "Xodim tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "Xodim tizimga muvaffaqiyatli kirdi",
  })
  @ApiResponse({ status: 400, description: "Xato email yoki parol" })
  @Post("sign-in")
  async signIn(
    @Body() singInDto: SignInStaffdto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.staffAuthService.signIn(singInDto, res);
  }

  @ApiOperation({ summary: "Xodim tizimdan chiqish" })
  @ApiResponse({ status: 200, description: "Xodim tizimdan chiqdi" })
  @Post("sign-out")
  @HttpCode(200)
  signout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.staffAuthService.signOut(refreshToken, res);
  }

  @ApiOperation({ summary: "Refresh token orqali yangi access token olish" })
  @ApiResponse({ status: 200, description: "Access token yangilandi" })
  @ApiResponse({
    status: 401,
    description: "Refresh token noto'g'ri yoki eskirgan",
  })
  @Get("refresh")
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refresh_token = req.cookies?.refresh_token;

    return this.staffAuthService.refreshToken(refresh_token, res);
  }
}
