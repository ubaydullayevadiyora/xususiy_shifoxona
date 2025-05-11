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
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AdminGuard } from "../common/guards/adminGuard/admin.guard";
import { StaffGuard } from "../common/guards/staffGuard/staff.guard";
import { AuthGuard } from "../common/guards/auth.guard";

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(AuthGuard, StaffGuard)
  @Post()
  @ApiOperation({ summary: "Yangi xona yaratish" })
  @ApiResponse({ status: 201, description: "Xona muvaffaqiyatli yaratildi" })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @UseGuards(AuthGuard, StaffGuard)
  @Get()
  @ApiOperation({ summary: "Barcha xonalarni olish" })
  @ApiResponse({ status: 200, description: "Barcha xonalar ro'yxati" })
  findAll() {
    return this.roomsService.findAll();
  }

  @UseGuards(AuthGuard, StaffGuard)
  @Get(":id")
  @ApiOperation({ summary: "Xonaning ma'lumotlarini olish" })
  @ApiResponse({ status: 200, description: "Xona ma'lumotlari" })
  @ApiResponse({ status: 404, description: "Xona topilmadi" })
  findOne(@Param("id") id: string) {
    return this.roomsService.findOne(+id);
  }

  @UseGuards(AuthGuard, StaffGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Xonaning ma'lumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Xona muvaffaqiyatli yangilandi" })
  @ApiResponse({ status: 404, description: "Xona topilmadi" })
  update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @UseGuards(AuthGuard, StaffGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Xonani o'chirish" })
  @ApiResponse({ status: 200, description: "Xona muvaffaqiyatli o'chirildi" })
  @ApiResponse({ status: 404, description: "Xona topilmadi" })
  remove(@Param("id") id: string) {
    return this.roomsService.remove(+id);
  }
}
