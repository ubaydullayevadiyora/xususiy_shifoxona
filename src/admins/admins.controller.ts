import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { AdminsService } from "./admins.service";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Admins")
@Controller("admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi admin yaratish" })
  @ApiResponse({ status: 201, description: "Admin muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 400, description: "Noto'g'ri ma'lumot kiritildi" })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha adminlarni olish" })
  @ApiResponse({ status: 200, description: "Adminlar ro'yxati qaytarildi" })
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta adminni ID bo'yicha olish" })
  @ApiParam({ name: "id", type: "string", description: "Admin ID" })
  @ApiResponse({ status: 200, description: "Admin topildi" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  findOne(@Param("id") id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Admin ma'lumotlarini yangilash" })
  @ApiParam({ name: "id", type: "string", description: "Admin ID" })
  @ApiResponse({ status: 200, description: "Admin yangilandi" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Adminni o'chirish" })
  @ApiParam({ name: "id", type: "string", description: "Admin ID" })
  @ApiResponse({ status: 200, description: "Admin o'chirildi" })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  remove(@Param("id") id: string) {
    return this.adminsService.remove(+id);
  }
}
