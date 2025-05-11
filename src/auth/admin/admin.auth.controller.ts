import {
  BadRequestException,
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
import { AdminAuthService } from "./admin.auth.service";
import { SignInAdminDto } from "./dto/admin.auth.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Admin Auth")
@Controller("auth/admin")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post("sign-in")
  @ApiOperation({ summary: "Admin tizimga kirishi" })
  @ApiResponse({
    status: 200,
    description: "Admin muvaffaqiyatli tizimga kirdi",
  })
  @ApiResponse({ status: 401, description: "Login yoki parol noto'g'ri" })
  // @Post("sign-in")
  async signIn(@Body() signInAdminDto: SignInAdminDto, @Res() res: Response) {
    if (!signInAdminDto?.email) {
      throw new BadRequestException("Email kiritilmagan");
    }
    return this.adminAuthService.signIn(signInAdminDto, res);
  }

  @Post("sign-out")
  @HttpCode(200)
  @ApiOperation({ summary: "Admin tizimdan chiqishi" })
  @ApiResponse({ status: 200, description: "Admin tizimdan chiqdi" })
  signout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.signOut(refreshToken, res);
  }

  @Get("refresh")
  @ApiOperation({ summary: "Tokenlarni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Tokenlar muvaffaqiyatli yangilandi",
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
    return this.adminAuthService.refreshToken(refresh_token, res);
  }
}
