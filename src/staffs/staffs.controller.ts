import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { StaffsService } from "./staffs.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { AdminGuard } from "../common/guards/adminGuard/admin.guard";
import { AuthGuard } from "../common/guards/auth.guard";

@ApiTags("staffs")
@Controller("staffs")
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "Xodim yaratish" })
  @ApiResponse({ status: 201, description: "Xodim muvaffaqiyatli yaratildi." })
  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "Barcha xodimlarni ko'rish" })
  @ApiResponse({ status: 200, description: "Barcha xodimlar ro'yxati." })
  @Get()
  findAll() {
    return this.staffsService.findAll();
  }

  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "Bir xodimni ko'rish" })
  @ApiParam({ name: "id", description: "Xodimning ID raqami" })
  @ApiResponse({ status: 200, description: "Xodim ma'lumotlari." })
  @ApiResponse({ status: 404, description: "Xodim topilmadi." })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.staffsService.findOne(+id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: "Xodimni yangilash" })
  @ApiParam({ name: "id", description: "Yangilanadigan xodimning ID raqami" })
  @ApiResponse({ status: 200, description: "Xodim muvaffaqiyatli yangilandi." })
  @ApiResponse({ status: 404, description: "Xodim topilmadi." })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(+id, updateStaffDto);
  }

  @UseGuards(AuthGuard,AdminGuard)
  @ApiOperation({ summary: "Xodimni o'chirish" })
  @ApiParam({ name: "id", description: "O'chiriladigan xodimning ID raqami" })
  @ApiResponse({ status: 200, description: "Xodim muvaffaqiyatli o'chirildi." })
  @ApiResponse({ status: 404, description: "Xodim topilmadi." })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.staffsService.remove(+id);
  }
}
